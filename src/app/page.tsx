import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Capacidades Municipais</h1>
        <p className="mt-3 text-zinc-400">Escolha uma visualização para começar.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/cidades"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-6 py-3"
          >
            Cidades
          </Link>
          <Link
            href="/indicadores"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3"
          >
            Indicadores
          </Link>
        </div>
      </div>
    </main>
  );
}
