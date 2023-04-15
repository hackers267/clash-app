use anyhow::{bail, Result};
use mock4rs::base::random_string_by_len;
use mock4rs::char::CharType;
use std::path::{Path, PathBuf};
use tauri::api::path::home_dir;
static CLASH_CONFIG: &str = "config.yaml";
static CLASH_DIR: &str = "clash_app";

pub fn app_home_dir() -> Result<PathBuf> {
    home_dir()
        .map(|dir| dir.join(".config"))
        .map(|f| f.join(CLASH_DIR))
        .ok_or(bail!("Could not find home directory"))
}
pub fn config_exist(path: &Path) -> bool {
    let config_path = app_home_dir().map(|file| file.join(path));
    config_path.map(|path| path.exists()).unwrap_or(false)
}

fn default_config() -> Result<PathBuf> {
    app_home_dir().map(|path| path.join(CLASH_CONFIG))
}

fn random_file_name() -> String {
    random_string_by_len(CharType::Alpha, 6)
}

pub fn config_path(path: &Path) -> Result<PathBuf> {
    let default_config = default_config()?;
    if !config_exist(&default_config) {
        Ok(default_config)
    } else if !config_exist(path) {
        Ok(path.to_path_buf())
    } else {
        let str = random_file_name();
        let path = config_path(Path::new(&str));
        path
    }
}
