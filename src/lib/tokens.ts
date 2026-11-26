export const themes = ["dark","light"] as const;
export type Theme = (typeof themes)[number];
export const primitiveTokens = {
  "n-0": "oklch(1 0 0)",
  "n-25": "oklch(0.978 0.005 248)",
  "n-50": "oklch(0.955 0.008 248)",
  "n-100": "oklch(0.92 0.011 250)",
  "n-150": "oklch(0.885 0.013 252)",
  "n-200": "oklch(0.83 0.018 253)",
  "n-300": "oklch(0.72 0.022 255)",
  "n-400": "oklch(0.62 0.024 255)",
  "n-500": "oklch(0.5 0.024 254)",
  "n-600": "oklch(0.41 0.022 256)",
  "n-700": "oklch(0.33 0.019 255)",
  "n-750": "oklch(0.29 0.017 256)",
  "n-800": "oklch(0.25 0.015 257)",
  "n-850": "oklch(0.222 0.013 258)",
  "n-900": "oklch(0.196 0.011 262)",
  "n-925": "oklch(0.18 0.01 256)",
  "n-950": "oklch(0.22 0.022 255)",
  "n-1000": "oklch(0.134 0.005 262)",
  "glacier-100": "oklch(0.948 0.028 238)",
  "glacier-300": "oklch(0.817 0.087 237)",
  "glacier-500": "oklch(0.637 0.134 245)",
  "glacier-700": "oklch(0.49 0.11 240)",
  "glacier-900": "oklch(0.259 0.045 244)",
  "green-300": "oklch(0.781 0.123 156)",
  "green-700": "oklch(0.48 0.12 156)",
  "amber-300": "oklch(0.816 0.128 76)",
  "amber-700": "oklch(0.5 0.12 68)",
  "red-300": "oklch(0.72 0.16 25)",
  "red-700": "oklch(0.5 0.17 26)",
  "red-900": "oklch(0.36 0.14 26)",
  "violet-300": "oklch(0.763 0.111 297)",
  "violet-700": "oklch(0.48 0.14 295)",
  "teal-300": "oklch(0.816 0.094 179)",
  "teal-700": "oklch(0.52 0.1 180)",
  "rose-300": "oklch(0.791 0.099 0)",
  "rose-700": "oklch(0.55 0.15 5)",
  "sand-300": "oklch(0.812 0.046 86)",
  "sand-700": "oklch(0.52 0.06 80)",
  "gold-300": "oklch(0.839 0.104 78)",
  "gold-700": "oklch(0.56 0.12 72)"
} as const;
export const colorTokens = {
  "surface-sunken": {
    "dark": "{n-925}",
    "light": "{n-50}"
  },
  "surface-base": {
    "dark": "{n-900}",
    "light": "{n-25}"
  },
  "surface-raised": {
    "dark": "{n-850}",
    "light": "{n-0}"
  },
  "surface-overlay": {
    "dark": "{n-800}",
    "light": "{n-0}"
  },
  "surface-control": {
    "dark": "{n-800}",
    "light": "{n-50}"
  },
  "surface-control-hover": {
    "dark": "{n-750}",
    "light": "{n-100}"
  },
  "surface-control-active": {
    "dark": "{n-700}",
    "light": "{n-150}"
  },
  "surface-nav": {
    "dark": "{n-925}",
    "light": "{n-50}"
  },
  "fg-primary": {
    "dark": "{n-25}",
    "light": "{n-950}"
  },
  "fg-secondary": {
    "dark": "{n-200}",
    "light": "{n-600}"
  },
  "fg-tertiary": {
    "dark": "{n-300}",
    "light": "{n-500}"
  },
  "fg-disabled": {
    "dark": "{n-500}",
    "light": "{n-400}"
  },
  "fg-inverse": {
    "dark": "{n-950}",
    "light": "{n-25}"
  },
  "line-subtle": {
    "dark": "oklch(0.955 0.008 248 / 0.08)",
    "light": "{n-100}"
  },
  "line-default": {
    "dark": "oklch(0.955 0.008 248 / 0.14)",
    "light": "{n-150}"
  },
  "line-strong": {
    "dark": "oklch(0.955 0.008 248 / 0.26)",
    "light": "{n-400}"
  },
  "line-control": {
    "dark": "oklch(0.955 0.008 248 / 0.18)",
    "light": "{n-300}"
  },
  "action-primary": {
    "dark": "{n-25}",
    "light": "{n-950}"
  },
  "action-primary-hover": {
    "dark": "{n-50}",
    "light": "{n-700}"
  },
  "action-primary-active": {
    "dark": "{n-100}",
    "light": "{n-600}"
  },
  "action-primary-fg": {
    "dark": "{n-950}",
    "light": "{n-25}"
  },
  "accent": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "accent-subtle": {
    "dark": "oklch(0.817 0.087 237 / 0.14)",
    "light": "{glacier-100}"
  },
  "accent-fg": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "focus-ring": {
    "dark": "{n-25}",
    "light": "{n-950}"
  },
  "selection": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "scrim": {
    "dark": "oklch(0.134 0.005 262 / 0.64)",
    "light": "oklch(0.22 0.022 255 / 0.4)"
  },
  "success": {
    "dark": "{green-300}",
    "light": "{green-700}"
  },
  "success-subtle": {
    "dark": "oklch(0.781 0.123 156 / 0.14)",
    "light": "oklch(0.95 0.04 156)"
  },
  "success-fg": {
    "dark": "{green-300}",
    "light": "{green-700}"
  },
  "warning": {
    "dark": "{amber-300}",
    "light": "{amber-700}"
  },
  "warning-subtle": {
    "dark": "oklch(0.816 0.128 76 / 0.14)",
    "light": "oklch(0.96 0.05 80)"
  },
  "warning-fg": {
    "dark": "{amber-300}",
    "light": "{amber-700}"
  },
  "danger": {
    "dark": "{red-300}",
    "light": "{red-700}"
  },
  "danger-subtle": {
    "dark": "oklch(0.72 0.16 25 / 0.14)",
    "light": "oklch(0.95 0.035 25)"
  },
  "danger-fg": {
    "dark": "{red-300}",
    "light": "{red-700}"
  },
  "info": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "info-subtle": {
    "dark": "oklch(0.817 0.087 237 / 0.14)",
    "light": "{glacier-100}"
  },
  "info-fg": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "severity-debug": {
    "dark": "{n-300}",
    "light": "{n-500}"
  },
  "severity-info": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "severity-warn": {
    "dark": "{amber-300}",
    "light": "{amber-700}"
  },
  "severity-error": {
    "dark": "{red-300}",
    "light": "{red-700}"
  },
  "severity-fatal": {
    "dark": "oklch(0.69 0.2 25)",
    "light": "{red-900}"
  },
  "intelligence": {
    "dark": "{violet-300}",
    "light": "{violet-700}"
  },
  "intelligence-subtle": {
    "dark": "oklch(0.763 0.111 297 / 0.14)",
    "light": "oklch(0.95 0.035 297)"
  },
  "intelligence-fg": {
    "dark": "{violet-300}",
    "light": "{violet-700}"
  },
  "chart-1": {
    "dark": "{glacier-300}",
    "light": "{glacier-500}"
  },
  "chart-2": {
    "dark": "{violet-300}",
    "light": "{violet-700}"
  },
  "chart-3": {
    "dark": "{gold-300}",
    "light": "{gold-700}"
  },
  "chart-4": {
    "dark": "{teal-300}",
    "light": "{teal-700}"
  },
  "chart-5": {
    "dark": "{rose-300}",
    "light": "{rose-700}"
  },
  "chart-6": {
    "dark": "{sand-300}",
    "light": "{sand-700}"
  },
  "chart-grid": {
    "dark": "oklch(0.955 0.008 248 / 0.07)",
    "light": "{n-100}"
  },
  "chart-axis": {
    "dark": "{n-400}",
    "light": "{n-500}"
  },
  "syntax-comment": {
    "dark": "{fg-tertiary}",
    "light": "{fg-tertiary}"
  },
  "syntax-string": {
    "dark": "{teal-300}",
    "light": "{teal-700}"
  },
  "syntax-number": {
    "dark": "{gold-300}",
    "light": "{gold-700}"
  },
  "syntax-keyword": {
    "dark": "{violet-300}",
    "light": "{violet-700}"
  },
  "syntax-name": {
    "dark": "{glacier-300}",
    "light": "{glacier-700}"
  },
  "syntax-attr": {
    "dark": "{rose-300}",
    "light": "{rose-700}"
  },
  "syntax-punct": {
    "dark": "{fg-secondary}",
    "light": "{fg-secondary}"
  }
} as const;
export type ColorToken = keyof typeof colorTokens;
export const tokens = {
  "radius": {
    "radius-xs": "0.25rem",
    "radius-sm": "0.375rem",
    "radius-md": "0.5rem",
    "radius-lg": "0.75rem",
    "radius-xl": "1rem",
    "radius-full": "9999px"
  },
  "shadow": {
    "shadow-raised": {
      "dark": "0 1px 2px oklch(0 0 0 / 0.35)",
      "light": "0 1px 2px oklch(0.22 0.022 255 / 0.06)"
    },
    "shadow-overlay": {
      "dark": "0 1px 2px oklch(0 0 0 / 0.4), 0 12px 32px -12px oklch(0 0 0 / 0.6)",
      "light": "0 1px 2px oklch(0.22 0.022 255 / 0.06), 0 12px 32px -12px oklch(0.22 0.022 255 / 0.18)"
    },
    "shadow-modal": {
      "dark": "0 2px 4px oklch(0 0 0 / 0.4), 0 24px 64px -16px oklch(0 0 0 / 0.7)",
      "light": "0 2px 4px oklch(0.22 0.022 255 / 0.08), 0 24px 64px -16px oklch(0.22 0.022 255 / 0.24)"
    }
  },
  "size": {
    "control-sm": "2rem",
    "control-md": "2.25rem",
    "control-lg": "2.5rem",
    "control-xl": "3rem",
    "icon-sm": "1rem",
    "icon-md": "1.25rem",
    "icon-lg": "1.5rem",
    "border-hairline": "1px",
    "border-focus": "2px",
    "row-compact": "2rem",
    "row-default": "2.5rem",
    "row-comfortable": "3rem",
    "sidebar-width": "16rem",
    "sidebar-width-collapsed": "3.5rem"
  },
  "duration": {
    "duration-fast": "120ms",
    "duration-base": "180ms",
    "duration-slow": "260ms"
  },
  "easing": {
    "ease-standard": "cubic-bezier(0.2, 0, 0, 1)",
    "ease-enter": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-exit": "cubic-bezier(0.4, 0, 1, 1)"
  },
  "opacity": {
    "opacity-disabled": "0.5"
  },
  "zIndex": {
    "z-sticky": "20",
    "z-nav": "30",
    "z-overlay": "40",
    "z-modal": "50",
    "z-toast": "60",
    "z-tooltip": "70"
  }
} as const;
export const textStyles = ["t-display","t-title","t-heading","t-subheading","t-lead","t-body","t-body-strong","t-label","t-caption","t-code","t-figure","t-figure-lg"] as const;
export type TextStyle = (typeof textStyles)[number];
export const cssVar = (name: ColorToken | (string & {})) => `var(--${name})`;
