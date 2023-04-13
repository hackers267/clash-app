use crate::api::Api;
use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

/// 上面的代码定义了一个名为“Rules”的 Rust 结构体，其中包含三个公共字段：“type”、“payload”和“proxy”，它们都是字符串。
///
/// Properties:
///
/// * `r#type`: 属性“r#type”表示规则类型。
/// * `payload`: `payload` 表示具体规则的内容。
/// * `proxy`: `proxy` 表示要用于规则的代理服务器,可以是 IP 地址或域名。
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Rule {
    pub r#type: String,
    pub payload: String,
    pub proxy: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Rules {
    rules: Vec<Rule>,
}

impl Rule {
    /// 此 Rust 函数从 API 端点获取规则列表，并将它们作为`vec<Rule>`返回。
    ///
    /// Returns:
    ///
    /// 此函数返回一个包含 `Rules` 结构的 `Vec` 的 `Result`。 `Vec` 包含从 API 端点获取的规则。
    pub async fn fetch() -> Result<Vec<Rule>> {
        let res = Client::new()
            .get(Api::default().rules())
            .send()
            .await?
            .json::<Rules>()
            .await?
            .rules;
        Ok(res)
    }
}
