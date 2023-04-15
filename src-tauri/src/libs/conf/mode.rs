use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Serialize, Deserialize)]
pub enum Mode {
    Rule,
    Global,
    Direct,
}

impl From<String> for Mode {
    fn from(s: String) -> Self {
        match s.as_str() {
            "rule" => Mode::Rule,
            "global" => Mode::Global,
            "direct" => Mode::Direct,
            _ => Mode::Rule,
        }
    }
}

impl Display for Mode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Mode::Rule => write!(f, "rule"),
            Mode::Global => write!(f, "global"),
            Mode::Direct => write!(f, "direct"),
        }
    }
}
