use std::{net::IpAddr, path::PathBuf};

use serde::{Deserialize, Serialize};
use tauri::Manager;
use tauri_plugin_dialog::DialogExt;
use tokio::fs;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("IO failed: {0}")]
    Io(#[from] std::io::Error),

    #[error(transparent)]
    Deserialize(#[from] serde_json::Error),

    #[error("A Config with the same address already exists")]
    AlreadyExists,

    #[error("File doesn't exist or is invalid type")]
    InvalidFile,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ServerAddress {
    Ip(IpAddr),
    Dns(String),
}

#[derive(Debug)]
pub struct ServerList {
    pub cfg_dir: PathBuf,
    pub servers: Vec<Server>,
}

/// Outline for `server` configs
#[derive(Debug, Serialize, Deserialize)]
pub struct Server {
    pub addr: ServerAddress,
    pub client_name: String,
    server_ca: String,
    client_pub: String,
    client_key: String,
}

#[derive(Clone, serde::Serialize)]
pub struct EventArray {
    pub message: Vec<String>,
}

/// Server configurations are expected to be stored individually per server
/// Config files are pulled from $APPCONFIG/servers/
impl ServerList {
    pub fn init(path: PathBuf) -> Self {
        let mut servers = Vec::new();
        for file in path
            .read_dir()
            .expect("Failed to read directory")
            .filter_map(|v| v.ok())
        {
            if let Ok(file) = Server::read(file.path()) {
                servers.push(file);
            }
        }

        ServerList {
            cfg_dir: path,
            servers,
        }
    }

    pub async fn update(&mut self, app: &tauri::AppHandle) {
        self.servers.clear();

        for file in self
            .cfg_dir
            .read_dir()
            .expect("Failed to read directory")
            .filter_map(|v| v.ok())
        {
            if let Ok(file) = Server::read(file.path()) {
                self.servers.push(file);
            }
        }

        self.sync_servers(app);
    }

    pub fn keys(&self) -> Vec<String> {
        let mut list: Vec<String> = Vec::with_capacity(self.servers.len());
        for server in &self.servers {
            let addr = match &server.addr {
                ServerAddress::Ip(v) => v.to_string(),
                ServerAddress::Dns(v) => v.to_string(),
            };
            list.push(addr);
        }

        list
    }

    pub fn sync_servers(&self, app: &tauri::AppHandle) {
        let keys = self.keys();
        app.emit("updateServerList", EventArray { message: keys })
            .unwrap();
    }
}

impl Server {
    /// Takes a file path, reads the contents, and returns a Server type
    pub fn read(file: PathBuf) -> Result<Self, Box<dyn std::error::Error>> {
        let data = std::fs::read(file)?;
        Ok(serde_json::from_slice(&data)?)
    }

    pub async fn save_to_disk(&self, path: PathBuf, app: &tauri::AppHandle) -> Result<(), Error> {
        // 
        if fs::try_exists(path.clone()).await? {
            let is_ok = app.dialog()
                .message("A config file with a similar name exists, would you like to replace it?")
                .kind(tauri_plugin_dialog::MessageDialogKind::Error)
                .title("Badger Client")
                .ok_button_label("Overwrite")
                .cancel_button_label("Cancel")
                .blocking_show();
            if !is_ok {
                return Ok(())
            }
        }

        let json = serde_json::to_vec_pretty(&self)?;
        fs::write(path, json).await?;
        Ok(())
    }
}

/// for serializing errors in order to return to frontend
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

impl ToString for ServerAddress {
    fn to_string(&self) -> String {
        match self {
            ServerAddress::Ip(v) => v.to_string(),
            ServerAddress::Dns(v) => v.to_owned(),
        }
    }
}
