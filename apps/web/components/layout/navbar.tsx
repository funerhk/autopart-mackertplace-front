import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">
          AutoPartes Market
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/search">Buscar</Link>
          <Link href="/buyer/requests">Solicitudes</Link>
          <Link href="/seller/dashboard">Vendedor</Link>
          <Link href="/profile">Perfil</Link>
        </nav>
      </div>
    </header>
  );
}
