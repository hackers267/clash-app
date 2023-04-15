declare interface Rule {
  type: string;
  payload: string;
  proxy: string;
}

declare interface Proxy {
  active: boolean;
  name: string;
  type: string;
}

declare interface ProfileCard {
  name: string;
  type: string;
  active: boolean;
}
