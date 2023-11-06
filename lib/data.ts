import { DataTableType } from "@/components/custom/table/column";
import { BarChartData, StackBarChartData } from "./types";

export const BAR_CHART_DATA: BarChartData[] = [
    { label: "Jan 01-07", value: 10 },
    { label: "Jan 08-14", value: 100 },
    { label: "Jan 15-21", value: 50 },
    { label: "Jan 22-31", value: 70 },
];

export const STACKBAR_CHART_DATA: StackBarChartData[] = [
    { label: "January", valueA: 30, valueB: 60 },
    { label: "February", valueA: 20, valueB: 70 },
    { label: "March", valueA: 10, valueB: 80 },
    { label: "April", valueA: 10, valueB: 120 },
];

export const DATA_TABLE_DATA: DataTableType[] = [
    {
        id: "1",
        account: "Sales",
        thisMonth: "1940.33",
        ytd: "11222.45",
    },
    {
        id: "2",
        account: "Advertizing",
        thisMonth: "1123.33",
        ytd: "15222.45",
    },
    {
        id: "3",
        account: "Inventory",
        thisMonth: "4940.33",
        ytd: "34222.45",
    },
    {
        id: "4",
        account: "Entertainment",
        thisMonth: "5940.33",
        ytd: "66222.45",
    },
    {
        id: "5",
        account: "Product",
        thisMonth: "940.33",
        ytd: "11423.45",
    },
];

