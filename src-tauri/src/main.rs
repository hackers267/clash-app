// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use clash::{get_proxies, Proxy};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn proxies() -> Result<Vec<Proxy>, ()> {
    let path = "/home/silence/.config/clash/config.yaml";
    get_proxies(path).map_err(|_| ())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, proxies])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
