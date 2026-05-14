import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { universes } from "@/lib/universes";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";

export const Route = createFileRoute("/univers/")({
  component: Universes,
  head: () => ({
    meta: [
      { title: "Choisis ton univers — Sultana" },
      { name: "description", content: "Quatre univers magiques pour explorer tes droits, ta santé, ton avenir et ta sécurité en ligne." },
    ],
  }),
});

function Universes() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => setCompleted(loadProgress().completed), []);

  return (
    <main className="min-h-[100dvh] bg-kid-sky relative overflow-hidden">
      {/* Animated colorful blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl animate-blob" style={{ animationDelay: "-8s" }} />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-200/40 blur-3xl animate-blob" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {[
          { l: "10%", t: "8%", d: "0s", s: "text-xl" },
          { l: "85%", t: "12%", d: "1.2s", s: "text-2xl" },
          { l: "75%", t: "45%", d: "0.6s", s: "text-lg" },
          { l: "15%", t: "60%", d: "2s", s: "text-xl" },
          { l: "92%", t: "78%", d: "0.3s", s: "text-2xl" },
          { l: "8%", t: "92%", d: "1.5s", s: "text-lg" },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute ${p.s} animate-twinkle`}
            style={{ left: p.l, top: p.t, animationDelay: p.d }}
          >
            ✨
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-md px-5 pt-8 pb-20">
        <Link to="/" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
          ← Retour
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-8 text-center"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-balance">
            Ton <span className="bg-gradient-warm bg-clip-text text-transparent">chemin magique</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            Suis le sentier d'étoiles. Chaque étape ouvre un nouvel univers.
          </p>
        </motion.div>

        {/* Animated winding path */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 320 1100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.15 25)" />
                <stop offset="50%" stopColor="oklch(0.82 0.14 80)" />
                <stop offset="100%" stopColor="oklch(0.78 0.13 155)" />
              </linearGradient>
            </defs>
            {/* base soft path */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="oklch(0.92 0.03 60)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* gradient draw */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-draw-path"
            />
            {/* flowing dashes overlay */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="white"
              strokeOpacity="0.7"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-path-flow"
            />
          </svg>

          <ul className="relative space-y-12 pb-8">
            {universes.map((u, i) => {
              const done = completed.includes(u.id);
              const alignRight = i % 2 === 1;
              return (
                <motion.li
                  key={u.id}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.2, type: "spring", stiffness: 140, damping: 14 }}
                  className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
                >
                  <Link
                    to="/univers/$id"
                    params={{ id: u.id }}
                    className="group relative block w-[78%]"
                  >
                    {/* Stage number bubble */}
                    <span className="absolute -top-3 -left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm text-sm font-black text-primary-foreground shadow-glow">
                      {i + 1}
                    </span>
                    {done && (
                      <span className="absolute -top-3 -right-3 z-10 rounded-full bg-success text-success-foreground text-[10px] font-bold px-2 py-1 shadow-soft">
                        ✓
                      </span>
                    )}

                    <div className="animate-bob" style={{ animationDelay: `${i * 0.4}s` }}>
                      <div className="overflow-hidden rounded-3xl border-2 border-white/70 bg-card/90 backdrop-blur shadow-soft group-hover:shadow-glow transition-all group-active:scale-[0.97]">
                        <div className="relative h-28 overflow-hidden">
                          <img
                            src={u.image}
                            alt={u.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${u.accent}`} />
                          <span className="absolute bottom-2 right-2 text-3xl drop-shadow-lg">{u.badge}</span>
                        </div>
                        <div className="px-3.5 py-2.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-primary/80">
                            Étape {i + 1}
                          </p>
                          <h2 className="font-display text-base font-bold leading-tight">{u.title}</h2>
                          <p className="mt-0.5 text-xs text-muted-foreground italic line-clamp-1">{u.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}

            {/* Treasure at end of path */}
            <motion.li
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="flex justify-center"
            >
              <Link
                to="/final"
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-5xl animate-float drop-shadow-lg">🏆</span>
                <span className="rounded-full bg-gradient-warm px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow">
                  Voir mes badges
                </span>
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </main>
  );
}
