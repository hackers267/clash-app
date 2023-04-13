use std::collections::HashMap;

use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Proxy {
    pub name: String,
    pub r#type: String,
    pub udp: bool,
    pub active: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ProxyRes {
    pub all: Option<Vec<String>>,
    pub history: Option<Vec<String>>,
    pub name: String,
    pub now: Option<String>,
    pub r#type: String,
    pub udp: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ProxiesRes {
    pub proxies: HashMap<String, ProxyRes>,
}

pub async fn get_proxies(path: &str) -> Result<Vec<Proxy>> {
    let proxies = reqwest::Client::new()
        .get("http://localhost:9090/proxies")
        .send()
        .await?
        .json::<ProxiesRes>()
        .await?;
    let selectors: Vec<_> = proxies
        .proxies
        .values()
        .filter(|proxy| is_selector_proxy(proxy))
        .map(|proxy| proxy.now.clone())
        .collect();
    let active = proxies_filter_by(&proxies, true);
    let active: Vec<_> = active
        .iter()
        .filter(|proxy| selectors.contains(&Some(proxy.name.to_string())))
        .map(|proxy| proxy.name.clone())
        .collect();
    let result: Vec<_> = proxies_filter_by(&proxies, false)
        .iter()
        .map(|proxy| Proxy {
            name: proxy.name.to_string(),
            r#type: proxy.r#type.to_string(),
            udp: proxy.udp,
            active: active.contains(&proxy.name),
        })
        .collect();
    Ok(result)
}

fn proxies_filter_by(proxies: &ProxiesRes, is_selector: bool) -> Vec<&ProxyRes> {
    proxies
        .proxies
        .values()
        .filter(|proxy| {
            if is_selector {
                is_selector_proxy(proxy)
            } else {
                not_selector_proxy(proxy)
            }
        })
        .collect()
}

fn not_selector_proxy(proxy: &ProxyRes) -> bool {
    !is_selector_proxy(proxy)
}

fn is_selector_proxy(proxy: &ProxyRes) -> bool {
    proxy.r#type == "Selector"
}
