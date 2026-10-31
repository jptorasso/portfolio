// Íconos SVG inline: sin librerías externas y heredan el color con `currentColor`.
// Son decorativos (aria-hidden): el texto accesible lo pone el enlace o botón que los contiene.

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
};

const strokeProps = {
  ...baseProps,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function GitHubIcon({ size = 20, ...props }) {
  return (
    <svg {...baseProps} viewBox="0 0 16 16" width={size} height={size} fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20, ...props }) {
  return (
    <svg {...baseProps} viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
    </svg>
  );
}

export function DatabaseIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

export function ZapIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function CodeIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function ServerIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </svg>
  );
}

export function LayoutIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

export function WrenchIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 22, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function SearchIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function CloseIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function CheckIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ExpandIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function GraduationCapIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}

export function AwardIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </svg>
  );
}

export function CopyIcon({ size = 16, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function SendIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function AlertCircleIcon({ size = 14, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 16, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function LockIcon({ size = 14, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function MailIcon({ size = 18, ...props }) {
  return (
    <svg {...strokeProps} width={size} height={size} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
