// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use badger_client::types::{self, CurrentServer, Error, ServerList};
use tauri::{Manager, State};

/// Never returns error
#[tauri::command]
async fn fetch_server_list(servers: State<'_, ServerList>) -> Result<Vec<String>, ()> {
    Ok(servers.keys().await)
}

#[tauri::command]
async fn import_server(config: String) -> Result<String, Error> {
    let _config: types::Server = serde_json::from_str(&config)?;
    return Ok(String::new());
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut folder = app
                .path()
                .app_config_dir()
                .expect("Failed to resolve local data directory");
            folder.push("servers");

            std::fs::create_dir_all(folder.clone()).expect("Failed to create config folder");
            let list: ServerList = ServerList::init(folder);

            app.manage(list);
            app.manage(CurrentServer::default());

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![fetch_server_list, import_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
