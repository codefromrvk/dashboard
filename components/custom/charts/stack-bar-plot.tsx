import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { StackBarChartData } from "./bar-plot";
// import { IGroupedData } from "./types";

interface Props {
  data: StackBarChartData[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}
interface TooltipType {
  x: number;
  y: number;
  value: Record<string, number>;
  //  {
  //   valueA: number;
  //   valueB: number;
  // };
}

function sum(values: number[]) {
  return values.reduce((prev, value) => prev + value, 0);
}

export function StackBarChart({
  data,
  width = 500,
  height = 300,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 40,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipType | null>();
  // const data=[
  //   { label: "Apples", values: [60, 80, 100] },
  //   { label: "Bananas", values: [160, 200, 120] },
  //   { label: "Oranges", values: [60, 40, 10] }
  // ];
  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  // const margin = { top: 20, right: 40, bottom: 40, left: 40 };
  const derivedWidth = width - marginLeft - marginRight;
  const derivedHeight = height - marginTop - marginBottom;

  const subgroups = ["valueA", "valueB"];

  const labels = data.map((d) => d.label || "");
  console.log({ labels });

  const max = Math.max(
    ...data.map((d) => sum([d.valueB, d.valueB].map(Number)))
  );

  const scaleX = d3
    .scaleBand()
    .domain(labels)
    .range([0, derivedWidth])
    .padding(0.8);
  const scaleY = d3.scaleLinear().domain([0, max]).range([derivedHeight, 0]);
  const color = d3
    .scaleOrdinal<string>()
    .domain(subgroups)
    .range(["green", "#16a34a"]);

  //@ts-ignore
  const stacked = d3.stack().keys(subgroups)(data);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  return (
    <div>
      <svg width={width} height={height+10}>
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          <g
            ref={axisBottomRef}
            transform={`translate(0, ${derivedHeight})`}
            color="transparent"
            className="line-plot-axis"
          />
          {stacked.map((data, index) => {
            console.log({ data });
            return (
              <g key={`group-${index}`} fill={color(data.key)}>
                {data.map((d, index) => {
                  const label = d.data.label.toString();

                  const y0 = scaleY(d[0]);
                  const y1 = scaleY(d[1]);

                  return (
                    <rect
                      key={`rect-${index}`}
                      x={scaleX(label)}
                      y={y1}
                      width={scaleX.bandwidth()}
                      height={y0 - y1 || 0}
                      rx="2"
                      ry="1"
                      onMouseEnter={(event) => {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          value: d["data"],
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
      {tooltip && (
        <div
          className="tooltip bg-white rounded-lg px-5 border"
          style={{
            position: "fixed",
            top: tooltip.y - 20,
            left: tooltip.x + 5,
          }}
        >
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500"></span>
            {tooltip.value.valueA}
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#16a34a]"></span>
            {tooltip.value.valueB}
          </p>
        </div>
      )}
    </div>
  );
}
