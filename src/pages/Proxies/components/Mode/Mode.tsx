import { FormattedMessage } from "react-intl";
import styles from "./index.module.css";
import classNames from "classnames";
import { useState } from "react";

export function Mode(): JSX.Element {
  const modes = ["global", "rule", "direct"];
  const [current, setMode] = useState("global");
  return (
    <div className={styles.container}>
      <div>代理模式：</div>
      <div className={styles.content}>
        {modes.map((mode) => {
          const active = current === mode;
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
