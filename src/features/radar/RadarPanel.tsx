"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { AxisKey, MunicipalityRecord } from "@/lib/types";
import { AXIS_LABEL } from "@/lib/labels";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

function clamp20(v: number) {
  return Math.max(0, Math.min(20, v));
}
function mean(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function axisAverages(m: MunicipalityRecord, axes: AxisKey[]) {
  return axes.map((axis) => {
    const v = mean((m.axes[axis] ?? []).map((x) => x.value_0_20));
    return Math.round(clamp20(v) * 10) / 10;
  });
}

export function RadarAxisAverages({
  data,
  axes,
  secondary,
}: {
  data: MunicipalityRecord;
  axes: AxisKey[];
  secondary?: MunicipalityRecord;
}) {
  const option = useMemo(() => {
    const indicator = axes.map((axis) => ({ name: AXIS_LABEL[axis] ?? axis, max: 20 }));

    const v1 = axisAverages(data, axes);
    const v2 = secondary ? axisAverages(secondary, axes) : null;

    return {
      tooltip: { trigger: "item" },
      radar: {
        indicator,
        radius: "65%",
        splitNumber: 4,
        axisName: { color: "#d4d4d8", fontSize: 12 },
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.18)" } },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.12)" } },
        splitArea: { areaStyle: { color: ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.00)"] } },
      },
      legend: secondary
        ? {
            bottom: 0,
            textStyle: { color: "#a1a1aa" },
            data: [data.name, secondary.name],
          }
        : undefined,
      series: [
        {
          type: "radar",
          data: [
            {
              value: v1,
              name: data.name,
              lineStyle: { width: 2, color: "#38bdf8" }, // sky-400
              itemStyle: { color: "#38bdf8" },
              areaStyle: { opacity: 0.12, color: "#38bdf8" },
            },
            ...(secondary
              ? [
                  {
                    value: v2!,
                    name: secondary.name,
                    lineStyle: { width: 2, color: "#fbbf24" }, // amber-400
                    itemStyle: { color: "#fbbf24" },
                    areaStyle: { opacity: 0.10, color: "#fbbf24" },
                  },
                ]
              : []),
          ],
        },
      ],
    };
  }, [data, secondary, axes]);

  // Altura “manda” no layout (lista segue o radar)
  return (
    <div className="h-[420px] md:h-[460px] rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">Capacidades médias por eixo</h3>
      </div>

      <div className="flex-1 min-h-0">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
}
