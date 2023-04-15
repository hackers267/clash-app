use crate::dirs::{config_path, CLASH_CONFIG};
use anyhow::{bail, Result};
use log::{error, info};
use reqwest::StatusCode;
use std::fs::File;
use std::io::Write;
use std::path::Path;

pub async fn download_profile(url: &str) -> Result<()> {
    let client = reqwest::Client::new();
    let response = client.get(url).send().await?;
    let status_code = response.status();
    if status_code == StatusCode::OK {
        let bytes = response.bytes().await?;
        let file_path = config_path(Path::new(CLASH_CONFIG))?;
        let mut files = File::create(&file_path)?;
        files.write_all(&bytes)?;
        info!("已下载:{:?}", file_path);
        Ok(())
    } else {
        error!("无法下载配置");
        bail!("无法下载配置，状态代码为: {}", status_code);
    }
}
