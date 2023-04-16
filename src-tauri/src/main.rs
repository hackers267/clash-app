// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use clash::handoff::fetch;
use clash::mode::Mode;
use clash::{download_profile, get_active_mode, get_proxies, Proxy, Rule};
use log::error;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn proxies() -> Result<Vec<Proxy>, String> {
    get_proxies().await.map_err(|err| {
        error!("{:?}", err);
        err.to_string()
    })
}

#[tauri::command]
async fn handoff_proxy(name: &str) -> Result<bool, ()> {
    let result = fetch(name).await.is_ok();
    error!("{:?}", result);
    Ok(result)
}

#[tauri::command]
async fn fetch_rules() -> Result<Vec<Rule>, String> {
    Rule::fetch().await.map_err(|err| {
        error!("{:?}", err);
        err.to_string()
    })
}

#[tauri::command]
async fn down_profile(url: &str) -> Result<(), String> {
    download_profile(url).await.map_err(|err| {
        error!("{:?}", err);
        err.to_string()
    })
}

#[tauri::command]
fn active_mode() -> Result<Mode, String> {
    get_active_mode().map_err(|err| {
        error!("{:?}", err);
        err.to_string()
    })
}

fn main() {
    tracing_subscriber::fmt::init();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            proxies,
            handoff_proxy,
            fetch_rules,
            down_profile,
            active_mode
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
