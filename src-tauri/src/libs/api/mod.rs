pub struct Api {
    pub base: String,
}

impl Api {
    pub fn new(base: String) -> Self {
        Self { base }
    }
    pub fn default() -> Self {
        Self::new(String::from("http://localhost:9090"))
    }

    pub fn proxies(&self) -> String {
        format!("{}/proxies", self.base)
    }

    pub fn proxies_with(&self, name: &str) -> String {
        format!("{}/proxies/{}", self.base, name)
    }

    pub fn rules(&self) -> String {
        format!("{}/rules", self.base)
    }
}
