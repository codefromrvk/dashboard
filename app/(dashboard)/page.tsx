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
import {
  generateBarData,
  generateDataTableData,
  generateStackBarData,
  randomNumber,
} from "@/lib/utils";
import { BarChartData, StackBarChartData } from "@/lib/types";

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<Record<string, string>>();
  const [selectedData, setSelectedData] = useState({
    from: "2020-03-26",
    to: "2020-04-26",
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
    async function getData() {
      const url = process.env.NEXT_PUBLIC_URL;
      const res = await fetch(url!);
      const data = await res.json();
      setLineChartData(data);
    }
    getData();
  }, []);
  const changeData = (type: string, val: string) => {
    setSelectedData((prev) => {
      const dateStr = "2023-01-01";
      const originalDate = new Date(dateStr);

      // Adding 5 days to the original date
      const newDate = new Date(originalDate);
      newDate.setDate(originalDate.getDate() + 5);

      if (type === "state") {
        return {
          state: val,
          from: Object.keys(lineChartData[val].dates)[0],
          to: Object.keys(lineChartData[val].dates)[15],
        };
      }
      return { ...prev, [type]: val };
    });
    // setData((prev) => {
    //   return {
    //     ...prev,
    //     line: d3.ticks(-2, randomNumber(1, 10), 4).map(Math.cos),
    //     bar: generateBarData(),
    //     stackBar: generateStackBarData(),
    //     dataTable: generateDataTableData(),
    //   };
    // });
  };

  const dates = useMemo(() => {
    if (lineChartData) {
      // console.log("d", Object.keys(lineChartData));
      // const data ={
      //   dates:Object.keys(lineChartData[selectedData.state]?.dates),
      //   states:Object.keys(lineChartData)
      // }
      return Object.keys(lineChartData[selectedData.state]?.dates);
    }
  }, [lineChartData, selectedData]);

  const filteredData = useMemo(() => {
    if (
      lineChartData &&
      selectedData &&
      selectedData.state &&
      lineChartData[selectedData.state]
    ) {
      const dates = lineChartData[selectedData.state].dates;

      if (dates) {
        return Object.keys(dates)
          .filter(
            (date) =>
              new Date(date) > new Date(selectedData.from) &&
              new Date(date) < new Date(selectedData.to)
          )
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

        // Object.values(dates).forEach((d) => {
        //   const confirmedVal = d.delta?.confirmed || 0;
        //   const recoveredVal = d.delta?.recovered || 0;
        //   const deceasedVal = d.delta?.desceased || 0;
        //   _filteredData.confirmed.push(confirmedVal);
        //   _filteredData.recovered.push(recoveredVal);
        //   _filteredData.desceased.push(deceasedVal);
        // });
      }
    }

    // return _filteredData;
  }, [lineChartData, selectedData]);


  return (
    <div className="xl:grid hidden lg:grid-cols-2 gap-5 ">
      <div className="rounded-lg bg-white">
        <p className="font-semibold my-2 p-3">Line - Chart</p>
        <div className="flex justify-between items-center p-3  ">
          <div className="flex  items-center gap-2">
            <Select
              value={selectedData.state}
              onValueChange={(val) => changeData("state", val)}
            >
              <SelectTrigger className="w-[150px]">
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
            <Select
              value={selectedData.from}
              onValueChange={(val) => changeData("from", val)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent className="max-h-44">
                {dates?.map((date, i) => {
                  return (
                    <SelectItem key={i} value={date}>
                      {date}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select
              value={selectedData.to}
              onValueChange={(val) => changeData("to", val)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent className="max-h-44">
                {dates?.map((date, i) => {
                  return (
                    <SelectItem key={i} value={date}>
                      {date}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {/* <Select onValueChange={changeData}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <Separator className="h-[2px]" />
        {selectedData.state && filteredData?.length ? (
          <LinePlot data={filteredData} lineChartData={filteredData} />
        ) : (
          <div className="text-3xl flex justify-center items-center h-full">
            Loading...
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
