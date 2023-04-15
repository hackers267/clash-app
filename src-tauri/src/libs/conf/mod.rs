use std::path::Path;

use anyhow::Result;
use serde::{Deserialize, Serialize};

pub mod handoff;

#[derive(Deserialize)]
pub struct Config {
    pub port: Option<u16>,
}

impl Config {
    pub fn init(path: &Path) -> Result<Self> {
        Self::read_config(path)
    }
    fn read_config(path: &Path) -> Result<Config> {
        let config = std::fs::read_to_string(path).unwrap();
        let x: Config = serde_yaml::from_str(&config)?;
        Ok(x)
    }
}
