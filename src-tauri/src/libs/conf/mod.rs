use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Proxy {
    pub name: String,
    pub r#type: String,
    pub server: String,
    pub port: i32,
    pub cipher: String,
    pub password: String,
    pub plugin: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Config {
    pub proxies: Vec<Proxy>,
}

pub fn read_config(path: &str) -> Result<Config> {
    // TODO: 路径作为参数或配置设置
    let file = std::fs::File::open(path)?;
    let config: Config = serde_yaml::from_reader(&file)?;
    println!("{:?}", config);
    Ok(config)
}

pub fn get_proxies(path: &str) -> Result<Vec<Proxy>> {
    read_config(path).map(|config| config.proxies)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = read_config("/home/silence/.config/clash/config.yaml");
        println!("{:?}", result);
        assert!(result.is_ok());
    }
}
