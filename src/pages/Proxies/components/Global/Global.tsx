import styles from "./index.module.css";
import { Header } from "./Header";
import { Card } from "./Card";
import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import { useObservableState } from "observable-hooks";
import { catchError, from, of } from "rxjs";

export type Proxy = any;

export function Global(): JSX.Element {
  const [list, setList] = useObservableState<Proxy[], string>((input$) => {
    return from(invoke<Proxy>("proxies")).pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }, []);
  useEffect(() => {
    setList("");
  }, []);
  return (
    <div className="global">
      <Header />
      <div className={styles.cardContainer}>
        {list.map((item: Proxy) => {
          if (item.active) {
            console.log(item);
          }
          return (
            <Card
              active={item.active}
              name={item.name}
              type={item.type}
              key={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
