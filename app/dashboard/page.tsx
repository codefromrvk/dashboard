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

import { Separator } from "@/components/ui/separator";
import { BarChart } from "@/components/custom/charts/bar-plot";
import { StackBarChart } from "@/components/custom/charts/stack-bar-plot";
import { columns } from "@/components/custom/table/column";
import { DataTable } from "@/components/custom/table/data-table";
import { DialogCloseButton } from "@/components/custom/dialog-button";
import {
  BAR_CHART_DATA,
  STACKBAR_CHART_DATA,
  DATA_TABLE_DATA,
} from "@/lib/data";

const Dashboard = () => {
  const [data, setData] = useState<{
    line: any;
    bar: any;
    stackBar: any;
    dataTable: any;
  }>(() => {
    return {
      line: d3.ticks(-2, 8, 4).map(Math.cos),
      bar: BAR_CHART_DATA,
      stackBar: STACKBAR_CHART_DATA,
      dataTable: DATA_TABLE_DATA,
    };
  });

  const changeData = () => {
    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const generateBarData = () => {
      return BAR_CHART_DATA.map((bd) => {
        return {
          ...bd,
          value: randomNumber(1, bd.value),
        };
      });
    };
    const generateStackBarData = () => {
      return STACKBAR_CHART_DATA.map((sbd) => {
        return {
          ...sbd,
          valueA: randomNumber(1, sbd.valueA),
          valueB: randomNumber(1, sbd.valueB),
        };
      });
    };
    const generateDataTableData = () => {
      return DATA_TABLE_DATA.map((dt) => {
        return {
          ...dt,
          thisMonth: randomNumber(1, +dt.thisMonth),
          ytd: randomNumber(1, +dt.ytd),
        };
      });
    };

    setData((prev) => {
      return {
        ...prev,
        line: d3.ticks(-2, randomNumber(1, 10), 4).map(Math.cos),
        bar: generateBarData(),
        stackBar: generateStackBarData(),
        dataTable: generateDataTableData(),
      };
    });
  };

  return (
    <div className="xl:grid hidden lg:grid-cols-2 gap-5 ">
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-3  ">
          <p className="font-semibold ">Checking account</p>
          <div className="flex  items-center gap-2">
            <Select onValueChange={changeData}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Manage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={changeData}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="h-[2px]" />
        <LinePlot data={data.line} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-3  ">
          <p className="font-semibold ">Invoices owned to you</p>
          <div className="flex  items-center gap-2">
            <DialogCloseButton />
          </div>
        </div>
        <Separator className="h-[2px]" />
        <BarChart data={data.bar} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-4  ">
          <p className="font-semibold ">Total Cash Flow</p>
          <div className="flex  items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>In
            <div className="w-3 h-3 bg-[#16a34a] rounded-sm"></div>Out
          </div>
        </div>
        <Separator className="h-[3px]" />
        <StackBarChart data={data.stackBar} />
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex justify-between items-center p-4  ">
          <p className="font-semibold ">Account Watchlist</p>
        </div>
        <Separator className="h-[3px]" />
        <DataTable columns={columns} data={data.dataTable} />
      </div>
    </div>
  );
};

export default Dashboard;
