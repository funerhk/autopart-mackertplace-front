"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CartLink } from "@/components/cart/cart-link";
import { useAuthStore } from "@/store/auth-store";
import { VehiclePicker } from "@/components/marketplace/vehicle-picker";
import { NotificationBell } from "@/components/notifications/notification-bell";

const links = [{ href: "/requests", label: "Solicitudes" }];

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    void signOut({ callbackUrl: "/" });
  };

  return (
    <header className="relative sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Ir al inicio de Autiko" className="flex shrink-0 items-center">
          <span className="relative block h-10 w-40 overflow-hidden sm:h-12 sm:w-48">
            <Image
              src="/autiko-lockup.png"
              alt="Autiko Marketplace de autopartes"
              width={1024}
              height={512}
              className="absolute left-0 top-[-43px] h-auto w-full max-w-none sm:top-[-52px]"
              priority
            />
          </span>
        </Link>
        <div className="hidden items-center gap-3 sm:flex sm:gap-4">
          <VehiclePicker />
          <form action="/search" method="get" className="hidden w-[min(34vw,330px)] min-w-[190px] sm:block">
            <label className="relative block">
              <span className="sr-only">Buscar autopartes</span>
              <input
                name="query"
                type="search"
                placeholder="Encuentra refacciones y accesorios"
                className="h-10 w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-4 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-orange-500 text-sm text-white transition hover:bg-orange-600"
              >
                <span aria-hidden="true">⌕</span>
              </button>
            </label>
          </form>
          <nav className="flex items-center gap-1 text-xs font-semibold text-slate-600 sm:gap-3 sm:text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-2 py-2 transition hover:bg-orange-50 hover:text-orange-700 sm:px-3"
              >
                {link.label}
              </Link>
            ))}
            {user && (user.role === "BUYER" || user.role === "SELLER") && (
              <Link
                href="/profile"
                className="rounded-full px-2 py-2 transition hover:bg-orange-50 hover:text-orange-700 sm:px-3"
              >
                Perfil
              </Link>
            )}
            {user && (user.role === "SELLER" || user.role === "ADMIN") && (
              <Link
                href="/seller/dashboard"
                className="rounded-full px-2 py-2 text-orange-700 transition hover:bg-orange-50 sm:px-3"
              >
                Panel vendedor
              </Link>
            )}
            {user && <NotificationBell />}
            <CartLink />
            {user ? (
              <>
                <span className="hidden max-w-28 truncate px-2 text-xs font-bold text-slate-700 lg:inline">
                  {user.firstName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 sm:px-4"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-slate-950 px-3 py-2 text-white shadow-sm transition hover:bg-orange-500 sm:px-4"
              >
                <span className="hidden sm:inline">Iniciar sesión / </span>Registrarse
              </Link>
            )}
          </nav>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm sm:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
            {mobileMenuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 shadow-lg sm:hidden">
          <div className="space-y-3">
            <VehiclePicker mobileLabel />
            <form action="/search" method="get" className="relative block">
              <label>
                <span className="sr-only">Buscar autopartes</span>
                <input
                  name="query"
                  type="search"
                  placeholder="Encuentra refacciones y accesorios"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </label>
              <button type="submit" aria-label="Buscar" className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-white">
                ⌕
              </button>
            </form>
            <nav className="grid gap-1 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-700">
              <Link href="/requests" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-orange-50 hover:text-orange-700">Solicitudes</Link>
              {user && (user.role === "BUYER" || user.role === "SELLER") && <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-orange-50 hover:text-orange-700">Perfil</Link>}
              {user && (user.role === "SELLER" || user.role === "ADMIN") && <Link href="/seller/dashboard" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 text-orange-700 hover:bg-orange-50">Panel vendedor</Link>}
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-orange-50 hover:text-orange-700">Carrito de compra</Link>
              {user ? (
                <button type="button" onClick={handleLogout} className="rounded-xl px-3 py-3 text-left text-red-600 hover:bg-red-50">Cerrar sesión</button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="rounded-xl bg-slate-950 px-3 py-3 text-white">Iniciar sesión / Registrarse</Link>
              )}
            </nav>
            {user && <div className="flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-xs font-semibold text-slate-400">Notificaciones</span><NotificationBell /></div>}
          </div>
        </div>
      )}
    </header>
  );
}
