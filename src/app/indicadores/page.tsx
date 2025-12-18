import { Link } from "next-view-transitions";

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
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white/90 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
