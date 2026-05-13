import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getUniverse } from "@/lib/universes";
import { ProgressBar } from "@/components/sultana/ProgressBar";
import { SpeechBubble } from "@/components/sultana/SpeechBubble";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { addXp, completeUniverse } from "@/lib/progress";

export const Route = createFileRoute("/univers/$id")({
  component: UniversePage,
  notFoundComponent: () => (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center">
      <div>
        <p className="text-lg font-semibold">Univers introuvable</p>
        <Link to="/univers" className="text-primary underline mt-2 inline-block">Retour</Link>
      </div>
    </div>
  ),
});

const ENCOURAGE = [
  "Bravo, tu brilles ✨",
  "Magnifique réponse !",
  "Tu es sur la bonne voie 🌟",
  "Continue comme ça !",
];

function UniversePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const universe = getUniverse(id);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!universe) return null;

  const total = universe.questions.length;
  const q = universe.questions[step];
  const options = q.type === "tf" ? ["Vrai", "Faux"] : q.options;

  const isCorrect = useMemo(() => {
    if (selected == null) return false;
    if (q.type === "tf") return (selected === "Vrai") === q.correct;
    return selected === q.correct;
  }, [selected, q]);

  const encourage = ENCOURAGE[step % ENCOURAGE.length];

  function pick(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
  }

  function next() {
    if (isCorrect) {
      addXp(10);
      setScore((s) => s + 1);
    } else {
      addXp(3); // still reward attempts
    }
    if (step + 1 >= total) {
      completeUniverse(universe.id);
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      {/* atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <img src={universe.image} alt="" className="h-full w-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
      </div>

      <div className="mx-auto max-w-md px-5 pt-6 pb-10 min-h-[100dvh] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Link to="/univers" className="text-sm text-muted-foreground hover:text-foreground">← Univers</Link>
          <span className="text-2xl">{universe.badge}</span>
        </div>

        <div className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">{universe.subtitle}</p>
          <h1 className="font-display text-2xl font-bold leading-tight">{universe.title}</h1>
        </div>

        {!done && <ProgressBar value={step + 1} total={total} />}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="mt-6 flex-1 flex flex-col"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-card border border-border/60 p-5 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Question {step + 1}
                </p>
                <p className="font-display text-lg font-semibold leading-snug text-balance">
                  {q.prompt}
                </p>
              </motion.div>

              <div className="mt-4 space-y-2.5">
                {options.map((opt) => {
                  const isPicked = selected === opt;
                  const showCorrect = revealed && (
                    q.type === "tf"
                      ? (opt === "Vrai") === q.correct
                      : opt === q.correct
                  );
                  const showWrong = revealed && isPicked && !showCorrect;
                  return (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(opt)}
                      disabled={revealed}
                      className={[
                        "w-full text-left rounded-2xl px-4 py-3.5 border-2 transition-all font-semibold text-sm",
                        showCorrect
                          ? "bg-success/15 border-success text-success-foreground"
                          : showWrong
                            ? "bg-destructive/10 border-destructive/60 text-foreground"
                            : isPicked
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-card border-border hover:border-primary/40",
                      ].join(" ")}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{opt}</span>
                        {showCorrect && <span>✨</span>}
                        {showWrong && <span>💭</span>}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-end gap-3"
                  >
                    <div className="-mb-2 shrink-0">
                      <SultanaAvatar size={80} float={false} />
                    </div>
                    <SpeechBubble delay={0.05}>
                      {isCorrect ? (
                        <>
                          <strong className="text-success-foreground">{encourage}</strong>{" "}
                          {q.explanation}
                        </>
                      ) : (
                        <>
                          <strong>Pas exactement…</strong> {q.explanation}
                        </>
                      )}
                    </SpeechBubble>
                  </motion.div>
                )}
              </AnimatePresence>

              {revealed && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={next}
                  className="mt-6 w-full rounded-2xl bg-gradient-warm py-4 text-center text-base font-bold text-primary-foreground shadow-soft active:scale-[0.98]"
                >
                  {step + 1 >= total ? "Recevoir mon badge ✦" : "Continuer →"}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex-1 flex flex-col items-center justify-center text-center gap-5"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gold/40 blur-3xl rounded-full" />
                <div className="relative h-32 w-32 rounded-full bg-gradient-warm flex items-center justify-center text-6xl shadow-glow">
                  {universe.badge}
                </div>
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Badge débloqué</p>
                <h2 className="font-display text-2xl font-bold mt-1">{universe.badgeName}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Tu as répondu à <strong className="text-foreground">{score}/{total}</strong> questions correctement.
                </p>
              </div>

              {/* En savoir plus */}
              <div className="w-full text-left rounded-3xl bg-card border border-border/60 p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">📖 En savoir plus</p>
                <div className="space-y-3">
                  {universe.resources.map((r) => (
                    <div key={r.title}>
                      <p className="font-display font-bold text-sm">{r.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full space-y-2.5">
                <button
                  onClick={() => navigate({ to: "/univers" })}
                  className="w-full rounded-2xl bg-gradient-warm py-4 font-bold text-primary-foreground shadow-soft active:scale-[0.98]"
                >
                  Continuer l'aventure
                </button>
                <button
                  onClick={() => navigate({ to: "/final" })}
                  className="w-full rounded-2xl bg-card border border-border py-3 font-semibold text-sm"
                >
                  Voir mon parcours
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
