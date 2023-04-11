import { useReducer } from "react";
import { lang } from "../locales";

type Locals = "zh-CN" | "en";

interface State {
  message: any;
  locals: Locals;
}

export function useLocals(): {
  switchLocals: (type: { type: Locals }) => void;
  state: State;
} {
  const [state, switchLocals] = useReducer(reducer, {
    message: lang.cn,
    locals: "zh-CN",
  });
  return { state, switchLocals };

  function reducer(state: State, action: { type: Locals }): State {
    switch (action.type) {
      case "zh-CN":
        return {
          message: lang.cn,
          locals: "zh-CN",
        };
      case "en":
        return {
          message: lang.en,
          locals: "en",
        };
      default:
        return state;
    }
  }
}
