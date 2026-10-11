"use client";

export function Filters({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {["all", "Motor", "Frenos", "Suspension", "Electrico"].map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`rounded-full px-3 py-1 text-sm ${
            category === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
