import * as d3 from "d3";
import { useRef, useEffect, RefObject, useState } from "react";
import "./lineplot.css";

interface LinePlotPropType {
  data: number[];
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
  value: number;
}
export default function LinePlot({
  data,
  width = 540,
  height = 280,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 50,
  marginLeft = 40,
}: LinePlotPropType) {
  const [tooltip, setTooltip] = useState<TooltipType>();
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(d3.extent(data) as [number, number], [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3.line((d, i) => x(i), y).curve(d3.curveBasis);
  useEffect(() => void d3.select(gx.current!).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current!).call(d3.axisLeft(y)), [gy, y]);
  return (
    <div className="px-4">
      <svg width={width-marginBottom} height={height}>
        <g
          ref={gx}
          fontSize={10}
          transform={`translate(0,${height - marginBottom + 10})`}
          color="transparent"
          className="line-plot-axis"
        ></g>
        <g ref={gy} transform={`translate(${marginLeft},0)`} color="transparent" className="line-plot-axis"/>
        <path
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          d={line(data)?.toString()}
        />

      </svg>
      {tooltip && (
        <div
          className="tooltip bg-white rounded-lg px-5 border"
          style={{
            position: "fixed",
            top: tooltip.y - 20,
            left: tooltip.x + 5,
          }}
        ></div>
      )}
    </div>
  );
}
