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
    <main className="min-h-[100dvh] bg-background pattern-zellige">
      <div className="mx-auto max-w-md px-5 pt-8 pb-16">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          ← Retour
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-6"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-balance">
            Choisis ton <span className="bg-gradient-warm bg-clip-text text-transparent">univers</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Chaque univers t'offre une aventure unique. Prends ton temps, il n'y a pas de mauvaise voie.
          </p>
        </motion.div>

        <div className="space-y-4">
          {universes.map((u, i) => {
            const done = completed.includes(u.id);
            return (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <Link
                  to="/univers/$id"
                  params={{ id: u.id }}
                  className="group block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft hover:shadow-glow transition-all active:scale-[0.99]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={u.image}
                      alt={u.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${u.accent}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {done && (
                        <span className="rounded-full bg-success/90 text-success-foreground text-xs font-bold px-2.5 py-1">
                          ✓ Terminé
                        </span>
                      )}
                      <span className="text-3xl drop-shadow">{u.badge}</span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                        Univers {i + 1}
                      </p>
                      <h2 className="font-display text-xl font-bold leading-tight">{u.title}</h2>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm text-muted-foreground italic">{u.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          to="/final"
          className="mt-8 block text-center text-sm font-semibold text-primary hover:underline"
        >
          Voir mon parcours et mes badges →
        </Link>
      </div>
    </main>
  );
}
