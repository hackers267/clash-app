import styles from "./index.module.css";
import { Header } from "./Header";
import { Card } from "./Card";
import { Suspense, useEffect } from "react";
import { useObservableState } from "observable-hooks";
import { catchError, from, map, of, switchMap } from "rxjs";
import { invoke } from "@tauri-apps/api";

export type Proxy = any;

export function Global(): JSX.Element {
  const [list, setList] = useObservableState<Proxy[], string>((input$) => {
    return input$.pipe(
      switchMap(() => {
        return from(invoke<Proxy>("proxies")).pipe(
          catchError((err) => {
            console.log(err);
            return of([]);
          }),
          map((array: Proxy[]) => {
            array.sort((a, b) => (a.name > b.name ? 1 : -1));
            return array;
          })
        );
      })
    );
  }, []);
  useEffect(() => {
    setList("");
  }, []);
  console.log("Loaded List");
  return (
    <Suspense fallback="Loading...">
      <div className="global">
        <Header />
        <div className={styles.cardContainer}>
          {list.map((item: Proxy) => {
            return (
              <Card
                onSuccess={() => {
                  console.log("Click Success");
                  setList("");
                }}
                active={item.active}
                name={item.name}
                type={item.type}
                key={item.name}
              />
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}
