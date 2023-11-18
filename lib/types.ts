import { ScaleBand, ScaleLinear } from "d3";
import { MouseEvent } from "react";

export interface StackBarChartProps {
    data: StackBarChartData[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}
export interface TooltipMultiType {
    x: number;
    y: number;
    value: Record<string, number>;
}
export interface LinePlotPropType {
    data: number[];
    lineChartData?:any,
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}

export interface TooltipType {
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

export interface BarChartProps {
    data: BarChartData[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}
export interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

export interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

export interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
    onMouseEnter: (e: MouseEvent<SVGPathElement>, idx: number) => void;
    onMouseLeave: () => void;
}