use std::path::Path;

use anyhow::Result;
use serde::Deserialize;

pub mod handoff;
pub mod mode;

#[derive(Deserialize)]
pub struct Config {
    pub port: Option<u16>,
    pub mode: mode::Mode,
}

impl Config {
    pub fn init(path: &Path) -> Result<Self> {
        Self::read_config(path)
    }
    fn read_config(path: &Path) -> Result<Config> {
        println!("{:?}", path);
        let config = std::fs::read_to_string(path)?;
        let x: Config = serde_yaml::from_str(&config)?;
        Ok(x)
    }
}
