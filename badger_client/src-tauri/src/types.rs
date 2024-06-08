use std::{net::IpAddr, path::PathBuf};

use serde::{Deserialize, Serialize};
use tauri::async_runtime::Mutex;
use tokio::fs;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error("Failed to decode json file")]
    Deserialize(#[from] serde_json::Error),
}

#[derive(Debug, Serialize, Deserialize)]
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

#[derive(Default)]
pub struct CurrentServer(Mutex<Option<Server>>);

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

    pub async fn update(&mut self) {
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
    }

    pub async fn keys(&self) -> Vec<String> {
        let mut list = Vec::with_capacity(self.servers.len());
        for server in &self.servers {
            let addr = match &server.addr {
                ServerAddress::Ip(v) => v.to_string(),
                ServerAddress::Dns(v) => v.to_string(),
            };
            list.push(addr);
        }

        list
    }
}

impl Server {
    /// Takes a file path, reads the contents, and returns a Server type
    pub fn read(file: PathBuf) -> Result<Self, Box<dyn std::error::Error>> {
        let data = std::fs::read(file)?;
        Ok(serde_json::from_slice(&data)?)
    }

    pub async fn save_to_disk(&self, path: PathBuf) -> Result<(), Error> {
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
