use std::{
    fs::File,
    io::{BufReader, Write},
    net::IpAddr,
    path::PathBuf,
};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Config {
    current_server: Option<Server>,
    servers: Vec<Server>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Server {
    ip: Option<IpAddr>,
    dns: Option<String>,
}

impl Config {
    pub fn resolve_from_file(path: PathBuf) -> Self {
        let handle = match File::open(file) {
            Ok(v) => v,
            Err(_) => Config::init_config(path).expect("Failed to create config"),
        };

        serde_json::from_reader(handle)?
    }

    pub fn init_config(file: PathBuf) -> std::io::Result<File> {
        let handle = File::create(path)?;
        let default_config = serde_json::to_string_pretty(&Config::default())?;
        handle.write_all(default_config)?;

        return Ok(handle);
    }
}
