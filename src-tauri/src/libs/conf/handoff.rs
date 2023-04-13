use crate::api::Api;
use anyhow::Result;
use serde::Serialize;

#[derive(Serialize)]
struct Proxy {
    name: String,
}

pub async fn fetch(name: &str) -> Result<()> {
    let url = Api::default().proxies_with("代理");
    let proxy = Proxy {
        name: name.to_string(),
    };
    reqwest::Client::new()
        .put(&url)
        .json(&proxy)
        .send()
        .await?
        .json::<()>()
        .await?;
    Ok(())
}
