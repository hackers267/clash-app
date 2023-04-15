import { useAtom } from "jotai";
import { rulesAtom } from "@/storage";
import { useEffect } from "react";
import styles from "./index.module.css";
import { FormattedMessage } from "react-intl";

function RuleItem(props: Rule): JSX.Element {
  const item = props;
  return (
    <>
      <span>{item.payload}</span>
      <span>{item.proxy}</span>
      <span>{item.type}</span>
    </>
  );
}

export function Rule(): JSX.Element {
  const [rules, fetch] = useAtom(rulesAtom);
  useEffect(() => {
    fetch("");
  }, []);
  const headers = ["rule", "proxy", "type"];
  return (
    <div className="rule">
      <div className={styles.list}>
        {headers.map((header) => {
          return (
            <span key={header}>
              <FormattedMessage
                id={`proxy.rule.header.${header}`}
                defaultMessage="The header is {header}"
                values={{ header }}
              />
            </span>
          );
        })}
        {rules.map((rule: Rule) => {
          const key = rule.payload + rule.proxy + rule.type;
          return (
            <RuleItem
              key={key}
              type={rule.type}
              payload={rule.payload}
              proxy={rule.proxy}
            />
          );
        })}
      </div>
    </div>
  );
}
