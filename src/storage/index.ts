import { atom } from "jotai";
import { lang } from "../locales";

export const langAtom = atom({ message: lang.cn, locals: "zh-CN" });
