# Design Tokens & Styling Architecture

DataQuery Web uses a calm, data-tool design system inspired by modern IDEs, Linear, and Bloomberg Terminal sensibilities, combining generous whitespace, sleek dark and light variants, and a signature analytical cyan/indigo accent color.

---

## 🎨 Color Palette

| Token | Light Theme | Dark Theme (Default Workspace) | Role |
| :--- | :--- | :--- | :--- |
| **`--bg-canvas`** | `#F8FAFC` (Slate 50) | `#0B0F17` (Deep Void) | Main page backdrop |
| **`--bg-surface`** | `#FFFFFF` | `#111827` (Charcoal Slate) | Cards, panels, modals |
| **`--bg-subtle`** | `#F1F5F9` | `#1E293B` (Elevated Panel) | Input backgrounds, active rows |
| **`--border`** | `#E2E8F0` | `#1F2937` | Subtle structural dividers |
| **`--border-focus`** | `#3B82F6` | `#38BDF8` | Interactive focus rings |
| **`--primary`** | `#2563EB` (Royal Blue) | `#38BDF8` (Cyan Neon) | Primary actions, run buttons |
| **`--primary-hover`**| `#1D4ED8` | `#0284C7` | Button hover state |
| **`--accent-purple`**| `#7C3AED` | `#A855F7` | DAX & Power BI indicators |
| **`--accent-emerald`**| `#059669` | `#10B981` | Quality scores, success states |
| **`--accent-amber`** | `#D97706` | `#F59E0B` | Warnings, usage limit alerts |
| **`--accent-rose`**  | `#DC2626` | `#EF4444` | Errors, null flags, deletions |
| **`--text-primary`** | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Main headings, data values |
| **`--text-secondary`**| `#475569` (Slate 600) | `#94A3B8` (Slate 400) | Labels, subheadings, hints |
| **`--text-muted`**   | `#94A3B8` | `#64748B` | Disabled items, timestamp meta |

---

## 🔤 Typography & Font Scales

- **Primary Sans**: `Inter`, system-ui, -apple-system, sans-serif
- **Monospace (Code & Queries)**: `JetBrains Mono`, `Fira Code`, monospace

| Class | Font Size | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-xs` | 0.75rem (12px) | 1rem (16px) | +0.02em | Badges, status pills, table headers |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) | normal | Body default, inputs, menu items |
| `text-base` | 1rem (16px) | 1.5rem (24px) | normal | Lead paragraphs, cards |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) | -0.01em | Section subtitles |
| `text-xl` | 1.25rem (20px) | 1.75rem (28px) | -0.02em | Modal titles, card headers |
| `text-2xl` | 1.5rem (24px) | 2rem (32px) | -0.02em | Page titles, KPI card stats |
| `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | -0.03em | Hero headlines |

---

## 📐 Spacing & Radius

- **Radius Tokens**:
  - `rounded-sm`: 4px (inputs, badges)
  - `rounded-md`: 6px (buttons, tabs)
  - `rounded-lg`: 8px (cards, dropdowns)
  - `rounded-xl`: 12px (modals, playground panels)
  - `rounded-2xl`: 16px (hero callouts, marketing containers)

- **Shadow Tokens**:
  - `shadow-sm`: Subtle border lift
  - `shadow-md`: Floating panels, tooltips
  - `shadow-lg`: Modals, drawer overlays
  - `shadow-cyan`: `0 0 20px -3px rgba(56, 189, 248, 0.25)` (active glowing run button)
