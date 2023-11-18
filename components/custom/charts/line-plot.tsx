//@ts-nocheck

import { LinePlotPropType } from "@/lib/types";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function LinePlot({
  data,
  lineChartData,
  width = 440,
  height = 240,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 50,
  marginLeft = 50,
}: LinePlotPropType) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height, 0]);
    // const y3 = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, (d) => d.date));
    // y.domain([0, d3.max(data, (d) => d.confirmed)]);
    y.domain([
      0,
      // d3.max(data, (d) => d.deceased),

      Math.max(
        d3.max(data, (d) => d.confirmed),
        d3.max(data, (d) => d.recovered)
      ),
    ]);
    y2.domain([
      d3.min(data, (d) => d.deceased),
      d3.max(data, (d) => d.deceased),
    ]);

    // y3.domain([0, d3.max(data, (d) => d.valueB)])  ;

    svg.select(".x-axis").call(
      d3
        .axisBottom(x)
        // .ticks(d3.timeDay)
        .tickFormat(d3.timeFormat("%d %b"))
    );

    svg.select(".y-axis").call(d3.axisLeft(y));
    svg
      .select(".yA-axis")
      .call(d3.axisRight(y2))
      .attr("transform", `translate(${width}, 0)`);
    // svg.select(".yB-axis").call(d3.axisLeft(y3));

    const valueLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.confirmed));

    const valueLineA = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.recovered));

    const valueLineB = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y2(d.deceased));

    svg.select(".line").datum(data).attr("d", valueLine);
    svg.select(".lineA").datum(data).attr("d", valueLineA);
    svg.select(".lineB").datum(data).attr("d", valueLineB);

    // const gradient = svg
    //   .append("defs")
    //   .append("linearGradient")
    //   .attr("id", "axisGradient")
    //   .attr("x1", "0%")
    //   .attr("y1", "0%")
    //   .attr("x2", "0%")
    //   .attr("y2", "100%");

    // gradient.append("stop").attr("offset", "0%").style("stop-color", "green");

    // gradient.append("stop").attr("offset", "100%").style("stop-color", "red");

    // svg.select(".y-axis").style("fill", "url(#axisGradient)");
  }, [data, height, width]);

  return (
    <svg
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
      ref={svgRef}
    >
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <g
          className="x-axis multi-axis-line"
          transform={`translate(0, ${height})`}
        />
        <g className="y-axis multi-axis-line" />
        <g className="yA-axis multi-axis-line" />
        {/* fill="steelblue" */}
        <path className="line" fill="none" stroke="red" strokeWidth="1.5" />
        <path className="lineA" fill="none" stroke="green" strokeWidth="1.5" />
        <path
          className="lineB"
          fill="none"
          stroke="steelblue"
          strokeWidth="1.5"
        />
        <Legend
          x={width}
          colorScale={["red", "green"]}
          labels={["Confirmed", "Recovered"]}
        />
        <LegendRight
          x={width}
          colorScale={["steelblue"]}
          labels={["Deceased"]}
        />
      </g>
    </svg>
  );
  return (
    <div className="px-4">
      <svg width={width - marginBottom} height={height}>
        <g
          ref={gx}
          fontSize={10}
          transform={`translate(0,${height - marginBottom + 10})`}
          color="transparent"
          className="axis-line"
        />
        <g
          ref={gy}
          transform={`translate(${marginLeft},0)`}
          color="transparent"
          className="axis-line"
        />
        <path
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          d={line(data)?.toString()}
        />
      </svg>
    </div>
  );
}

const Legend = ({ x, colorScale, labels }) => {
  const legendRef = useRef();

  useEffect(() => {
    const svg = d3.select(legendRef.current);

    const legend = svg
      .selectAll("g.legend")
      .data(colorScale)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => colorScale[i]);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "10px")
      .text((d, i) => labels[i]);
  }, [colorScale, labels]);

  return <g ref={legendRef} transform={`translate(6, 0)`} />;
};
const LegendRight = ({ x, colorScale, labels }) => {
  const legendRef = useRef();

  useEffect(() => {
    const svg = d3.select(legendRef.current);

    const legend = svg
      .selectAll("g.legend")
      .data(colorScale)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => colorScale[i]);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "10px")
      .text((d, i) => labels[i]);
  }, [colorScale, labels]);

  return <g ref={legendRef} transform={`translate(${x - 80}, 0)`} />;
};
