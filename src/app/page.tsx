import Link from "next/link";

import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100 flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold">Capacidades municipais</h1>
        <p className="mt-1 text-zinc-400">Escolha uma visualização.</p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/cidades"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-700 border border-zinc-700 px-6 py-1.5"
          >
            Cidades
          </Link>
          <Link
            href="/vps"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-700 border border-zinc-700 px-6 py-1.5"
          >
            VPs
          </Link>
          <Link
            href="/indicadores"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-1.5"
          >
            Indicadores
          </Link>
        </div>

        <Image
          src="/logo_dark.png"
          alt="Imagem de rodapé"
          width={350}
          height={200}
          className="max-w-full h-auto rounded-xl opacity-90 mt-2"
          priority={false}
        />
      </div>
    </main>
  );
}
