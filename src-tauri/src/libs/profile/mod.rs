use std::fs::File;
use std::io::Write;
use std::path::Path;

use anyhow::{bail, Result};
use log::{error, info};
use reqwest::header::HeaderValue;
use reqwest::{get, Response, StatusCode};

use crate::dirs::{config_path, CLASH_CONFIG};

pub struct ProFile {
    pub id: String,
    pub filename: String,
}

pub async fn download_profile(url: &str) -> Result<()> {
    let client = reqwest::Client::new();
    let response = client.get(url).send().await?;
    let file_name = pick_file_name(&response);
    println!("{:?}", file_name);
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

/// 该函数从 HTTP 响应的“Content-Disposition”标头中选取文件名。
///
/// Arguments:
///
/// * `response`: `response` 参数的类型为 `&Response`，它是对 HTTP 响应对象的引用。
///
/// Returns:
///
/// 函数 `pick_file_name` 返回一个 `Option<&str>`。
fn pick_file_name(response: &Response) -> Option<&str> {
    response
        .headers()
        .get("Content-Disposition")
        .map(header_value_to_str)
        .map(split_file_name)
}

/// 该函数将 HeaderValue 转换为字符串，如果失败则返回空字符串。
///
/// Arguments:
///
/// * `value`: `HeaderValue`，它表示 HTTP 标头的值。
///
/// Returns:
///
/// 把`HeaderValue`转为一个字符串，成功就返回字符串，否则返回一个空字符串。
fn header_value_to_str(value: &HeaderValue) -> &str {
    value.to_str().unwrap_or("")
}

/// 该函数通过“filename=”拆分文件名字符串，并"filename="后面的字符串，如果不存在则返回空字符串。
///
/// Arguments:
///
/// * `filename`: `filename` 参数是表示文件名的字符串切片 (`&str`)。
///
/// Returns:
///
/// 返回"filename="后面的字符串，如果不存在则返回空字符串。
fn split_file_name(filename: &str) -> &str {
    filename
        .split("filename=")
        .collect::<Vec<&str>>()
        .get(1)
        .unwrap_or(&"")
}
