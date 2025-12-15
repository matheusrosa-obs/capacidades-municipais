"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { MunicipalityRecord } from "@/lib/types";

function clamp20(v: number) {
  return Math.max(0, Math.min(20, v));
}

export function MunicipalityHeader({ data }: { data: MunicipalityRecord }) {
  const [flagOk, setFlagOk] = useState(true);

  // padrão: /public/flags/<id>.png  ->  /flags/<id>.png
  const flagSrc = `/flags/${data.id}.png`;
  

  const overall = useMemo(() => {
    const vals: number[] = [];
    for (const axis of Object.keys(data.axes) as (keyof typeof data.axes)[]) {
      for (const it of data.axes[axis]) vals.push(it.value_0_20);
    } 
    if (!vals.length) return 0;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return clamp20(avg);
  }, [data]);

  const overallRounded = Math.round(overall * 10) / 10;

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-sky-700/80 to-blue-600/70 p-5 text-white shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* ESQUERDA: bandeira + infos */}
        <div className="flex items-start gap-4">
          {/* Bandeira */}
          <div className="h-32 w-48 rounded-xl overflow-hidden border border-white/15 bg-black/20 shrink-0">
            <Image
              key={data.id} // garante remount ao trocar município
              src={`/flags/${data.id}.png`}
              alt={`Bandeira de ${data.name}`}
              width={1000}
              height={1000}
              className="h-32 w-48 object-cover"
              onError={(e) => {
                const img = e.currentTarget as unknown as HTMLImageElement;
                img.src = "/public/flags/_placeholder.png";
              }}
            />
          </div>


          {/* Título + metadados */}
          <div>
            <div className="text-2xl font-semibold leading-tight">
              {data.name}
            </div>
            <div className="text-sm text-white/85 mt-1">
              {data.region ? data.region : "Santa Catarina"}
            </div>

            {!!(data.highlights?.length) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {data.highlights.slice(0, 6).map((b) => (
                  <span
                    key={b}
                    className="text-xs px-2 py-1 rounded-full bg-white/15 border border-white/15"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DIREITA: faixa/score */}
        <div className="min-w-[220px] rounded-xl bg-black/20 border border-white/10 px-4 py-3">
          <div className="text-xs text-white/70">Score de capacidade média</div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="text-3xl font-bold">{overallRounded.toFixed(0)}</div>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-white/70"
              style={{ width: `${(overall / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
