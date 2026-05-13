import { motion } from "framer-motion";

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
        <span>Étape {Math.min(value, total)}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full bg-gradient-warm rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
