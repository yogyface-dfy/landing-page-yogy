/** Étoiles carrées style Trustpilot (design only, pas de lien). */
const TP_GREEN = "#00B67A";

export default function TrustpilotStars({ size = 16, className = "" }) {
  return (
    <span className={`inline-flex gap-px ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill={TP_GREEN} />
          <path
            fill="#fff"
            d="M12 16.2l4.95 3-1.32-5.64L20 9.8l-5.76-.48L12 4 9.76 9.32 4 9.8l4.37 3.76L7.05 19.2z"
          />
        </svg>
      ))}
    </span>
  );
}
