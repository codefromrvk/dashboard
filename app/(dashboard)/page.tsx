//@ts-nocheck

"use client";

import { useEffect, useMemo, useState } from "react";
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
import { DataTableType, columns } from "@/components/custom/table/column";
import { DataTable } from "@/components/custom/table/data-table";
import { DialogCloseButton } from "@/components/custom/dialog-button";
import {
  BAR_CHART_DATA,
  STACKBAR_CHART_DATA,
  DATA_TABLE_DATA,
} from "@/lib/data";

import { Skeleton } from "@/components/ui/skeleton";

import { BarChartData, StackBarChartData } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/custom/date-picker";


 function getMaxDate(dateArray) {
  if (dateArray.length === 0) {
    return null; 
  }

  return new Date(Math.max(...dateArray.map((date) => new Date(date))));
}

 function getMinDate(dateArray) {
  if (dateArray.length === 0) {
    return null; 
  }

  return new Date(Math.min(...dateArray.map((date) => new Date(date))));
}
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [lineChartData, setLineChartData] = useState<Record<string, string>>();
  const [selectedData, setSelectedData] = useState({
    from: "",
    to: "",
    state: "AN",
  });

  const [data, setData] = useState<{
    line: number[];
    bar: BarChartData[];
    stackBar: StackBarChartData[];
    dataTable: DataTableType[];
  }>(() => {
    return {
      line: d3.ticks(-2, 8, 4).map(Math.cos),
      bar: BAR_CHART_DATA,
      stackBar: STACKBAR_CHART_DATA,
      dataTable: DATA_TABLE_DATA,
    };
  });
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const url = process.env.NEXT_PUBLIC_URL;
      const res = await fetch(url!);
      const data = await res.json();
      setLineChartData(data);
      const dates = Object.keys(data[selectedData.state].dates);
      setSelectedData((prev) => {
        return {
          ...prev,
          to: getMaxDate(dates).toISOString().split("T")[0],
          from: getMinDate(dates).toISOString().split("T")[0],
        };
      });
      setLoading(false);
    }
    getData();
  }, []);


  const filteredData = useMemo(() => {
    if (
      lineChartData &&
      selectedData &&
      selectedData.state &&
      lineChartData[selectedData.state]
    ) {
      const dates = lineChartData[selectedData.state].dates;

      if (dates) {
        const _dates = Object.keys(dates)
          .filter((date) => {
            return (
              new Date(date) > new Date(selectedData.from) &&
              new Date(date) < new Date(selectedData.to)
            );
          })
          .map((date) => {
            return {
              date: new Date(date),
              confirmed:
                dates[date].delta?.confirmed < 0
                  ? 0
                  : dates[date].delta?.confirmed || 0,
              recovered:
                dates[date].delta?.recovered < 0
                  ? 0
                  : dates[date].delta?.recovered || 0,
              deceased:
                dates[date].delta?.deceased < 0
                  ? 0
                  : dates[date].delta?.deceased || 0,
            };
          });

        return _dates;
      }
    }
  }, [lineChartData, selectedData]);

  const dateRange = useMemo(() => {
    if (lineChartData) {
      const dates = Object.keys(lineChartData[selectedData.state]?.dates);
      return {
        max: getMaxDate(dates).toISOString().split("T")[0],
        min: getMinDate(dates).toISOString().split("T")[0],
      };
    }
    return {};
  }, [lineChartData, selectedData]);


  const changeData = (type: string, val: string) => {
    setSelectedData((prev) => {
      if (type === "state") {
        const dates = Object.keys(lineChartData[selectedData.state].dates);
        return {
          state: val,
          to: getMaxDate(dates).toISOString().split("T")[0],
          from: getMinDate(dates).toISOString().split("T")[0],
        };
      }
      return { ...prev, [type]: val };
    });
  };

  return (
    <div className="xl:grid hidden lg:grid-cols-2 gap-5 ">
      <div className="rounded-lg bg-white">
        <div className="flex flex-col">
          <p className="font-semibold p-3 my-2">Covid Stats</p>
        <Separator className="h-[2px]" />

          <div className="flex justify-around items-center gap-2 p-3">
            <div className="flex flex-col">
              <Label>State</Label>
              <Select
                value={selectedData.state}
                onValueChange={(val) => changeData("state", val)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="max-h-44">
                  {lineChartData &&
                    Object.keys(lineChartData)?.map((state, i) => {
                      return (
                        <SelectItem key={i} value={state}>
                          {state}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label>From</Label>
              <DatePicker name="from" dateRange={dateRange} date={selectedData.from} changeData={changeData}/>

              {/* <Input
                type="date"
                className="w-[130px]"
                onBlur={(e) => {
                  changeData("from", e.target.value);
                }}
                defaultValue={dateRange.min}
                max={dateRange.max}
                min={dateRange.min}
              /> */}
            </div>
            <div className="flex flex-col">
              <Label>To</Label>
              <DatePicker name="to" dateRange={dateRange} date={selectedData.to} changeData={changeData}/>
              {/* <Input
                type="date"
                className="w-[130px]"
                onBlur={(e) => {
                  changeData("to", e.target.value);
                }}
                defaultValue={dateRange.max}
                max={dateRange.max}
                min={dateRange.min}
              /> */}
            </div>
            
          </div>
        </div>

        {loading && (
          <div className="text-xl flex flex-col justify-center items-center  gap-2 m-4">
            <Skeleton className="w-full h-[75px]" />
            <Skeleton className="w-full h-[75px]" />
            <Skeleton className="w-full h-[75px]" />
          </div>
        )}
        {selectedData.state && filteredData?.length ? (
          <LinePlot data={filteredData} lineChartData={filteredData} />
        ) : (
          <div className="flex mt-24 justify-center items-center">
            No data available
          </div>
        )}
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
