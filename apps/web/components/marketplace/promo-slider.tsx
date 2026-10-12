"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "Promoción de temporada",
    title: "Hasta 35% OFF en autopartes",
    description: "Aprovecha la temporada de descuentos en frenos, baterías y piezas seleccionadas para tu vehículo.",
    action: "Ver promociones",
    href: "/search",
    accent: "from-[#16191f] via-[#252a31] to-[#f45112]",
    glow: "bg-orange-500/30",
  },
  {
    eyebrow: "Compra con confianza",
    title: "Autopartes que sí encajan",
    description: "Encuentra piezas por marca, modelo y año con vendedores verificados.",
    action: "Buscar piezas",
    href: "/search",
    accent: "from-[#f45112] via-[#f97316] to-[#ffb11b]",
    glow: "bg-yellow-300/30",
  },
  {
    eyebrow: "Vende en Autiko",
    title: "Convierte tu inventario en oportunidades",
    description: "Publica tus productos, recibe solicitudes y cotiza en un solo lugar.",
    action: "Ir al panel vendedor",
    href: "/seller/dashboard",
    accent: "from-[#101317] via-[#20252c] to-[#414951]",
    glow: "bg-orange-500/25",
  },
];

export function PromoSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <section
      aria-label="Promociones destacadas"
      className={`relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br ${slide.accent} shadow-[0_24px_70px_-28px_rgba(17,24,39,0.6)] transition-colors duration-700`}
    >
      <div className={`absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl ${slide.glow}`} />
      <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full border border-white/10" />
      <Image
        src="/autiko-symbol.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -bottom-32 -right-16 w-72 opacity-20 brightness-0 invert sm:-bottom-40 sm:right-8 sm:w-96"
        priority
      />

      <div className="relative z-10 h-[310px] p-7 text-white sm:h-[350px] sm:p-10 lg:h-[390px] lg:p-10">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-100 backdrop-blur">
            {slide.eyebrow}
          </span>
          <h1 className="mt-4 max-w-lg text-3xl font-black leading-[0.98] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-5 text-white/75 sm:text-base">
            {slide.description}
          </p>
          <Link
            href={slide.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-50"
          >
            {slide.action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="absolute bottom-7 left-7 flex gap-2 sm:bottom-10 sm:left-12 lg:bottom-12 lg:left-14">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Ver promoción ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-white" : "w-5 bg-white/35 hover:bg-white/60"}`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-10 sm:right-12 lg:bottom-12 lg:right-14">
          <button
            type="button"
            aria-label="Promoción anterior"
            onClick={() => setActive((active - 1 + slides.length) % slides.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/10 text-lg backdrop-blur transition hover:bg-white/15"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Siguiente promoción"
            onClick={() => setActive((active + 1) % slides.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/10 text-lg backdrop-blur transition hover:bg-white/15"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
