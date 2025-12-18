import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Indicadores</h1>
        <p className="mt-3 text-zinc-400">
          Página de indicadores em construção. Em breve você poderá explorar
          os indicadores em detalhes.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2"
          >
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
