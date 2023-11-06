import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BAR_CHART_DATA, DATA_TABLE_DATA, STACKBAR_CHART_DATA } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sum(values: number[]) {
  return values.reduce((prev, value) => prev + value, 0);
}

export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateBarData = () => {
  return BAR_CHART_DATA.map((bd) => {
    return {
      ...bd,
      value: randomNumber(1, bd.value),
    };
  });
};
export const generateStackBarData = () => {
  return STACKBAR_CHART_DATA.map((sbd) => {
    return {
      ...sbd,
      valueA: randomNumber(1, sbd.valueA),
      valueB: randomNumber(1, sbd.valueB),
    };
  });
};
export const generateDataTableData = () => {
  return DATA_TABLE_DATA.map((dt) => {
    return {
      ...dt,
      thisMonth: randomNumber(1, +dt.thisMonth).toString(),
      ytd: randomNumber(1, +dt.ytd).toString(),
    };
  });
};