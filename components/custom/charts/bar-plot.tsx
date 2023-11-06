import { useEffect, useRef, useState, MouseEvent } from "react";
import {
  axisBottom,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select,
} from "d3";

interface TooltipType {
  x: number;
  y: number;
  value: number;
}
export interface BarChartData {
  label: string;
  value: number;
}
export interface StackBarChartData {
  label: string;
  valueA: number;
  valueB: number;
}

interface BarChartProps {
  data: BarChartData[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}
interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
  onMouseEnter: (e: MouseEvent<SVGPathElement>, idx: number) => void;
  onMouseLeave: () => void;
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return (
    <g
      ref={ref}
      transform={transform}
      color="transparent"
      className="axis-line"
    />
  );
}

function Bars({
  data,
  height,
  scaleX,
  scaleY,
  onMouseEnter,
  onMouseLeave,
}: BarsProps) {
  return (
    <>
      {data.map(({ value, label }, idx) => {
        return (
          <rect
            key={`bar-${label}`}
            x={scaleX(label)}
            y={scaleY(value)}
            width={scaleX.bandwidth()}
            height={height - scaleY(value)}
            fill="#16a34a"
            rx="7"
            ry="7"
            onMouseEnter={(event) => onMouseEnter(event, idx)}
            onMouseLeave={(event) => onMouseLeave()}
          />
        );
      })}
    </>
  );
}

export function BarChart({
  data,
  width = 500,
  height = 230,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 50,
  marginLeft = 40,
}: BarChartProps) {
  const [tooltip, setTooltip] = useState<TooltipType | null>();
  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.8);

  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    <>
      <svg
        width={width + marginLeft + marginRight}
        height={height + marginTop + marginBottom}
      >
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />

          <Bars
            data={data}
            height={height}
            scaleX={scaleX}
            scaleY={scaleY}
            onMouseEnter={(event, idx) => {
              setTooltip({
                x: event.clientX,
                y: event.clientY,
                value: data[idx].value,
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
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
          {tooltip.value}
        </div>
      )}
    </>
  );
}
