"use client";

import React, { useMemo } from "react";
import type { MunicipalityRecord, AxisKey } from "@/lib/types";
import { AXIS_LABEL } from "@/lib/labels";

import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

function clamp20(v: number) {
    return Math.max(0, Math.min(20, v));
}

function mean(values: number[]) {
    if (!values.length) return 0;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(avg);
}

export function RadarAxisAverages({
  data,
  axes,
}: {
  data: MunicipalityRecord;
  axes: AxisKey[];
}) {
  const { indicators, values } = useMemo(() => {
    const indicators = axes.map((axis) => ({
      name: AXIS_LABEL[axis],
      max: 20,
    }));

    const values = axes.map((axis) => {
      const v = mean(data.axes[axis].map((x) => x.value_0_20));
      return Math.round(clamp20(v) * 10) / 10;
    });

    return { indicators, values };
  }, [data, axes]);

  const option = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
      },
      radar: {
        indicator: indicators,
        radius: "65%",
        splitNumber: 4,
        axisName: { color: "#d4d4d8", fontSize: 12 }, // zinc-300
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.18)" } },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.12)" } },
        splitArea: {
          areaStyle: {
            color: ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.00)"],
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: values,
              name: data.name,
            },
          ],
          symbol: "circle",
          symbolSize: 5,
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.15 },
        },
      ],
    }),
    [indicators, values, data.name]
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">
          Capacidades médias por eixo
        </h3>
      </div>

      <div className="mt-3 h-[280px]">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>

    </div>
  );
}