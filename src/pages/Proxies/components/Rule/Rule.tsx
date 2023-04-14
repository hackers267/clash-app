import { useAtom } from "jotai";
import { rulesAtom } from "@/storage";
import { useEffect } from "react";
import styles from "./index.module.css";

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
  return (
    <div className="rule">
      <div className={styles.list}>
        <span>规则</span>
        <span>代理</span>
        <span>类型</span>
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
      <h1>Rule</h1>
      <button
        onClick={() => {
          fetch("");
        }}
      >
        Fetch
      </button>
    </div>
  );
}
