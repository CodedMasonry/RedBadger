// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![deny(clippy::all)]

use badger_client::types::{self, Error, ServerList};
use tauri::{Manager, State};
use tokio::sync::Mutex;

#[tauri::command]
async fn import_server(
    file_name: String,
    config: String,
    list: State<'_, Mutex<ServerList>>,
    app: tauri::AppHandle,
) -> Result<String, Error> {
    let config: types::Server = serde_json::from_str(&config)?;
    // Since it is unknown which file the conflict is in, return error instead of prompt
    if list.lock().await.keys().contains(&config.addr.to_string()) {
        return Err(Error::AlreadyExists);
    }
    let mut path: std::path::PathBuf = list.lock().await.cfg_dir.clone();
    path.push(file_name);

    config.save_to_disk(path, &app).await?;
    list.lock().await.update(&app).await;
    Ok(config.addr.to_string())
}

#[tauri::command]
async fn get_list(list: State<'_, Mutex<ServerList>>) -> Result<Vec<String>, ()> {
    Ok(list.lock().await.keys())
}

fn setup<'a>(app: &'a mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let mut folder = app
        .path()
        .app_config_dir()
        .expect("Failed to resolve local data directory");
    folder.push("servers");

    std::fs::create_dir_all(folder.clone()).expect("Failed to create config folder");
    let list: ServerList = ServerList::init(folder);

    app.manage(Mutex::new(list));

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(setup)
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_list, import_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
