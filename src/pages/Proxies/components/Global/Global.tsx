import styles from "./index.module.css";
import { Header } from "./Header";
import { Card } from "./Card";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

export function Global(): JSX.Element {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    getProxies();
  }, []);
  return (
    <div className="global">
      <Header />
      <div className={styles.cardContainer}>
        {list.map((item: any) => {
          return <Card name={item.name} type={item.type} key={item.name} />;
        })}
      </div>
    </div>
  );

  async function getProxies(): Promise<void> {
    const all: any[] = await invoke("proxies").catch((err) => {
      console.log(err);
      return [];
    });
    console.log(all);
    setList(all);
  }
}
