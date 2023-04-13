import styles from "./index.module.css";
import classNames from "classnames";
import { useObservableState } from "observable-hooks";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";

export interface CardProps {
  name: string;
  type: string;
  active: boolean;
  onSuccess: () => void;
}

function useActive(): { state: boolean; setActive: (name: string) => void } {
  const [state, setActive] = useObservableState<boolean, string>(
    (input$) =>
      input$.pipe(
        switchMap((name) => {
          console.log("name:", name);
          return from(invoke<boolean>("handoff_proxy", { name }));
        }),
        catchError((err) => {
          console.log("err:", err);
          return of(false);
        }),
        tap((x) => {
          console.log("State:", x);
        }),
        map(() => true)
      ),
    false
  );
  return { state, setActive };
}

export function Card({
  name,
  type,
  active,
  onSuccess,
}: CardProps): JSX.Element {
  const { state, setActive } = useActive();
  useEffect(() => {
    if (state) {
      onSuccess();
    }
  }, [state]);
  const containerClass = classNames(styles.card, {
    [styles.cardActive]: active,
  });
  return (
    <div className={containerClass}>
      <div
        className={styles.cardName}
        onClick={() => {
          setActive(name);
        }}
      >
        {name}
      </div>
      <div className={styles.cardCheck}>Check</div>
      <div className={styles.cardType}>
        <span>{type}</span>
        <span className={styles.cardLabel}>UDP</span>
      </div>
    </div>
  );
}
