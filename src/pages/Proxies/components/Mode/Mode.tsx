import { FormattedMessage } from "react-intl";
import styles from "./index.module.css";
import classNames from "classnames";
import { useState } from "react";
import { useObservableState } from "observable-hooks";
import { from } from "rxjs";
import { invoke } from "@tauri-apps/api";

function useFetchActiveMode(): string | undefined {
  const fetchActiveMode = from<Promise<string>>(invoke("active_mode"));
  const activeMode = useObservableState(fetchActiveMode);
  return activeMode?.toLowerCase();
}

export function Mode(): JSX.Element {
  const modes = ["global", "rule", "direct"];
  const [, setMode] = useState("global");
  const activeMode = useFetchActiveMode();
  return (
    <div className={styles.container}>
      <div>代理模式：</div>
      <div className={styles.content}>
        {modes.map((mode) => {
          const active = activeMode === mode;
          return (
            <Item
              key={mode}
              mode={mode}
              active={active}
              onClick={(value) => {
                setMode(value);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ItemProps {
  mode: string;
  active: boolean;
  onClick: (value: string) => void;
}

function Item({ onClick, mode, active }: ItemProps): JSX.Element {
  const itemClass = classNames(styles.item, {
    [styles.active]: active,
  });
  return (
    <div
      className={itemClass}
      key={mode}
      onClick={() => {
        onClick(mode);
      }}
    >
      <FormattedMessage id={`proxy.mode.${mode}`} values={{ mode }} />
    </div>
  );
}
