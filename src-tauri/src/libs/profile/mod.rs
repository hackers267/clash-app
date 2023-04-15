use anyhow::{bail, Result};
use log::{error, info};
use reqwest::StatusCode;
use std::fs::File;
use std::io::Write;

pub async fn download_profile(url: &str, file: &str) -> Result<()> {
    let client = reqwest::Client::new();
    let response = client.get(url).send().await?;
    let status_code = response.status();
    if status_code == StatusCode::OK {
        let bytes = response.bytes().await?;
        let mut files = File::create(file)?;
        files.write_all(&bytes)?;
        info!("已下载:{}", file);
        Ok(())
    } else {
        error!("无法下载配置");
        bail!("无法下载配置，状态代码为: {}", status_code);
    }
}
