import { useEffect, useState } from "react";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Prochain minuit Europe/Paris (ms). Suffisant pour un countdown marketing. */
export function nextMidnightParisMs(now = Date.now()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(now))
      .map((p) => [p.type, p.value]),
  );
  const elapsed =
    ((Number(parts.hour) * 60 + Number(parts.minute)) * 60 +
      Number(parts.second)) *
    1000;
  return now + (DAY_MS - elapsed);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/** h / m / s jusqu'au prochain minuit Paris. */
export function useMidnightCountdown() {
  const [left, setLeft] = useState(() =>
    Math.max(0, nextMidnightParisMs() - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setLeft(Math.max(0, nextMidnightParisMs() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.floor(left / 1000);
  const h = pad(Math.floor(total / 3600));
  const m = pad(Math.floor((total % 3600) / 60));
  const s = pad(total % 60);
  return { h, m, s, label: `${h}:${m}:${s}` };
}
