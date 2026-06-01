import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { mpcMprParameter, mpcStatusClass, mpcStatusLabel } from "@/lib/insight-display";
import type { MpcData, MpcPolicyParameter } from "@/types";

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

function ParameterCard({ param }: { param: MpcPolicyParameter }): ReactElement {
  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[var(--color-white)] p-6 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-h3 leading-tight text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {param.label}
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 font-body text-[11px] font-medium uppercase tracking-wide",
            mpcStatusClass(param.status),
          )}
        >
          {mpcStatusLabel(param.status)}
        </span>
      </div>

      {param.value ? (
        <p className="mt-3 font-mono text-h2 font-semibold text-[var(--color-gold)]">
          {param.value}
        </p>
      ) : null}

      {param.subParameters && param.subParameters.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {param.subParameters.map((sp, i) => (
            <span
              key={i}
              className="rounded-full border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)] px-3 py-1 font-body text-caption text-[var(--color-navy)] dark:text-[var(--color-silver)]"
            >
              {sp.label}:{" "}
              <span className="font-mono">{sp.value}</span>
            </span>
          ))}
        </div>
      ) : null}

      {param.corridorValues ? (
        <table className="mt-4 w-full border-collapse font-body text-caption">
          <tbody>
            {[
              ["Upper", param.corridorValues.upper],
              ["Lower", param.corridorValues.lower],
              [
                "Standing Lending Facility",
                param.corridorValues.standingLendingFacility,
              ],
              [
                "Standing Deposit Facility",
                param.corridorValues.standingDepositFacility,
              ],
            ].map(([label, val]) => (
              <tr
                key={label}
                className="border-t border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] dark:border-white/10"
              >
                <td className="py-1.5 pr-3 text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[var(--color-silver)]">
                  {label}
                </td>
                <td className="py-1.5 text-right font-mono text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                  {val}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

/**
 * Public MPC infographic: meeting header, policy-parameter grid, and the
 * verbatim decisions list. CSS-only (renders on the server).
 */
export function MpcReportBlock({ mpc }: { mpc: MpcData }): ReactElement {
  const mpr = mpcMprParameter(mpc);
  const heading = mpr
    ? `MPC ${mpcStatusLabel(mpr.status).toUpperCase()} AT ${mpr.value}`
    : "MPC POLICY DECISION";

  return (
    <div className="mx-auto mt-14 max-w-[900px] px-4">
      <header className="rounded-2xl border border-[color-mix(in_srgb,var(--color-gold)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-gold)_06%,transparent)] p-8 text-center">
        <p className="font-body text-label uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)] dark:text-[var(--color-silver)]">
          {mpc.meetingNumber > 0 ? `${ordinal(mpc.meetingNumber)} MPC Meeting` : "MPC Meeting"}
          {mpc.meetingDates ? `  |  ${mpc.meetingDates}` : ""}
        </p>
        <h2 className="mt-3 font-display text-h1 font-semibold text-[var(--color-gold)]">
          {heading}
        </h2>
      </header>

      {mpc.parameters.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {mpc.parameters.map((p, i) => (
            <ParameterCard key={i} param={p} />
          ))}
        </div>
      ) : null}

      {mpc.decisions.length > 0 ? (
        <section className="mt-12">
          <h3 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Official Decisions
          </h3>
          <ul className="mt-5 space-y-4">
            {mpc.decisions.map((d, i) => (
              <li
                key={i}
                className="relative pl-7 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] before:absolute before:left-0 before:top-[0.35em] before:text-[var(--color-gold)] before:content-['◆'] dark:text-[var(--color-silver)]"
              >
                {d}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
