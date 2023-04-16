use std::ops::Deref;
use std::path::Path;

use anyhow::Result;
use serde::Deserialize;
use serde_yaml::Mapping;

pub mod handoff;
pub mod mode;

#[derive(Deserialize)]
pub struct ClashConfig {
    pub port: Option<u16>,
    pub mode: mode::Mode,
}

pub struct AppConfig{
}

pub struct ConfigTemp(Mapping);

impl Deref for ConfigTemp {
    type Target = Mapping;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ConfigTemp {
    fn default() -> Self {
        Self::new()
    }
}

impl ConfigTemp {
    pub fn new() -> Self {
        Self::from_config_file().unwrap()
    }

    fn from_config_file() -> Result<Self> {
        let config = std::fs::read_to_string("config.yaml")?;
        let x: Mapping = serde_yaml::from_str(&config)?;
        Ok(Self(x))
    }
}

impl ClashConfig {
    pub fn init(path: &Path) -> Result<Self> {
        Self::read_config(path)
    }
    fn read_config(path: &Path) -> Result<ClashConfig> {
        let config = std::fs::read_to_string(path)?;
        let x: ClashConfig = serde_yaml::from_str(&config)?;
        Ok(x)
    }
}
