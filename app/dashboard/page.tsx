"use client";

import { useState } from "react";
import * as d3 from "d3";
import LinePlot from "@/components/custom/charts/line-plot";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  BarChartData,
  StackBarChartData,
} from "@/components/custom/charts/bar-plot";
import { Button } from "@/components/ui/button";
import { StackBarChart } from "@/components/custom/charts/stack-bar-plot";
import { Payment, columns } from "@/components/custom/table/column";
import { DataTable } from "@/components/custom/table/data-table";
import { DialogCloseButton } from "@/components/custom/dialog-button";

const Dashboard = () => {
  const [data, setData] = useState<number[]>(() =>
    d3.ticks(-2, 8, 4).map(Math.cos)
  );

  const handleInvoiceUpload = () => {};

  const BAR_CHART_DATA: BarChartData[] = [
    { label: "Jan 01-07", value: 10 },
    { label: "Jan 08-14", value: 100 },
    { label: "Jan 15-21", value: 50 },
    { label: "Jan 22-31", value: 70 },
  ];

  const STACKBAR_CHART_DATA: StackBarChartData[] = [
    { label: "January", valueA: 30, valueB: 60 },
    { label: "February", valueA: 20, valueB: 70 },
    { label: "March", valueA: 10, valueB: 80 },
    { label: "April", valueA: 10, valueB: 120 },
  ];

  const DATA_TABLE_DATA: Payment[] = [
    {
      id: "1",
      account: "Sales",
      thisMonth: "1,940.33",
      ytd: "11,222.45",
    },
    {
      id: "2",
      account: "Advertizing",
      thisMonth: "1,123.33",
      ytd: "15,222.45",
    },
    {
      id: "3",
      account: "Inventory",
      thisMonth: "4,940.33",
      ytd: "34,222.45",
    },
    {
      id: "4",
      account: "Entertainment",
      thisMonth: "5,940.33",
      ytd: "66,222.45",
    },
    {
      id: "5",
      account: "Product",
      thisMonth: "940.33",
      ytd: "11,423.45",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-3  ">
          <p className="font-semibold ">Checking account</p>
          <div className="flex  items-center gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Manage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Option 1</SelectItem>
                <SelectItem value="dark">Option 2</SelectItem>
                <SelectItem value="system">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Option 1</SelectItem>
                <SelectItem value="dark">Option 2</SelectItem>
                <SelectItem value="system">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="h-[2px]" />
        <LinePlot data={data} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-3  ">
          <p className="font-semibold ">Invoices owned to you</p>
          <div className="flex  items-center gap-2">
            <DialogCloseButton />
          </div>
        </div>
        <Separator className="h-[2px]" />
        <BarChart data={BAR_CHART_DATA} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-4  ">
          <p className="font-semibold ">Total Cash Flow</p>
          <div className="flex  items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>In
            <div className="w-3 h-3 bg-[#16a34a] rounded-sm"></div>Out
          </div>
        </div>
        <Separator className="h-[2px]" />
        <StackBarChart data={STACKBAR_CHART_DATA} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-4  ">
          <p className="font-semibold ">Account Watchlist</p>
        </div>
        <Separator className="h-[2px]" />
        <DataTable columns={columns} data={DATA_TABLE_DATA} />
      </div>
    </div>
  );
};

export default Dashboard;
