use crate::dirs::{config_path, CLASH_CONFIG};
use crate::mode::Mode;
use crate::Config;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::Path;

#[derive(Debug, Deserialize, Serialize, Clone)]
/// 上面的代码定义了一个名为“Proxy”的 Rust 结构，它有四个字段：name（一个字符串）、type（一个字符串）、udp（一个布尔值）和 active（一个布尔值）。
///
/// Properties:
///
/// * `name`: 代表代理名称的字符串。
/// * `r#type`: `r#type` 是 `Proxy` 结构的属性。它是一个表示代理类型的字符串。
/// * `udp`: `udp` 属性是一个布尔值，指示代理是否支持 UDP（用户数据报协议）。
/// * `active`: `active` 属性是一个布尔值，指示代理当前是否处于活动状态。
pub struct Proxy {
    pub name: String,
    pub r#type: String,
    pub udp: bool,
    pub active: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
/// 该代码定义了一个名为 ProxyRes 的 Rust 结构。
///
/// Properties:
///
/// * `all`: 所有代理的名称。
/// * `history`: 历史代理的名称。
/// * `name`: 代理名称。
/// * `now`: 当前使用代理的名称。
/// * `r#type`: 代理类型。
/// * `udp`: 代理是否支持 UDP。
pub struct ProxyRes {
    pub all: Option<Vec<String>>,
    pub history: Option<Vec<String>>,
    pub name: String,
    pub now: Option<String>,
    pub r#type: String,
    pub udp: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
/// 这是一个名为 ProxiesRes 的 Rust 结构。
///
/// Properties:
///
/// * `proxies`: 代理列表。
pub struct ProxiesRes {
    pub proxies: HashMap<String, ProxyRes>,
}

/// 此 Rust 函数检索代理列表，按活动状态过滤它们，并返回 Proxy 结构的数组。
///
/// Returns:
///
/// 此函数返回一个包含 `Proxy` 结构的 `Vec` 的 `Result`。
pub async fn get_proxies() -> anyhow::Result<Vec<Proxy>> {
    let proxies = fetch_proxies().await?;
    let selectors = pick_selectors_from_proxies(&proxies);
    let active = proxies_filter_by(&proxies, false);
    let active_names = pick_active_proxy(&selectors, &active);
    let result: Vec<_> = proxies_filter_by(&proxies, false)
        .iter()
        .map(|proxy| Proxy {
            name: proxy.name.to_string(),
            r#type: proxy.r#type.to_string(),
            udp: proxy.udp,
            active: active_names.contains(&proxy.name),
        })
        .collect();
    Ok(result)
}

pub fn get_active_mode() -> Result<Mode> {
    let path = config_path(Path::new(CLASH_CONFIG))?;
    let conf = Config::init(&path)?;
    Ok(conf.mode)
}

/// 该函数根据选择器列表过滤活动代理列表，并返回它们的名称列表。
///
/// Arguments:
///
/// * `selectors`: 表示可以选择的代理的名称数组。
/// * `active`: `active` 参数是 `ProxyRes` 引用的向量，其中包含有关当前活动代理的信息。
///
/// Returns:
///
/// 返回一个“Vec<String>”，其中包含与作为输入提供的选择器匹配的活动代理的名称。
fn pick_active_proxy(selectors: &[Option<String>], proxy_res: &[&ProxyRes]) -> Vec<String> {
    proxy_res
        .iter()
        .filter(|proxy| selectors.contains(&Some(proxy.name.to_string())))
        .map(|proxy| proxy.name.clone())
        .collect()
}

/// 该函数从代理列表中提取选择器。
///
/// Arguments:
///
/// * `proxies`: `proxies` 参数的类型为 `&ProxiesRes`，它是对包含代理映射的结构的引用。
///
/// Returns:
///
/// 类型为`Selector`的代理
fn pick_selectors_from_proxies(proxies: &ProxiesRes) -> Vec<Option<String>> {
    let selectors: Vec<_> = proxies
        .proxies
        .values()
        .filter(|proxy| is_selector_proxy(proxy))
        .map(|proxy| proxy.now.clone())
        .collect();
    selectors
}

/// 指定的 URL 获取代理，并返回包含 ProxiesRes 的结果。
///
/// Returns:
///
/// `fetch_proxies` 函数返回一个包含 `ProxiesRes` 的 `Result`。
///
async fn fetch_proxies() -> anyhow::Result<ProxiesRes> {
    let proxies = reqwest::Client::new()
        .get("http://localhost:9090/proxies")
        .send()
        .await?
        .json::<ProxiesRes>()
        .await?;
    Ok(proxies)
}

/// 该函数根据代理是选择器代理还是非选择器代理来过滤代理列表。
///
/// 参数:
///
/// * `proxies`: `proxies` 是对 `ProxiesRes` 结构的引用，其中包含 `ProxyRes` 结构的 `HashMap`。
/// * `is_selector`: `is_selector` 是一个布尔参数，用于确定是通过选择器代理还是非选择器代理来过滤代理。如果为 true ，函数将按选择器代理过滤代理，如果为 false
/// ，函数将按非选择器代理过滤代理。
///
/// Returns:
///
/// 函数 `proxies_filter_by` 返回对 `ProxyRes` 对象的引用向量。
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

/// 判断一个代理是否不是Selector类型
///
/// # 参数
///
/// * `proxy`: &ProxyRes 对象
///
/// returns: bool true:代理不是Selector类型,false:代理是Selector类型
///
fn not_selector_proxy(proxy: &ProxyRes) -> bool {
    !is_selector_proxy(proxy)
}

/// 判断一个代理是否是Selector类型
///
/// # 参数
///
/// * `proxy`: &ProxyRes 对象
///
/// returns: bool ture:代理是Selector类型,false:代理不是Selector类型
///
fn is_selector_proxy(proxy: &ProxyRes) -> bool {
    proxy.r#type == "Selector"
}
