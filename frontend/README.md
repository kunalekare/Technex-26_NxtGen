# 🚀 Goal-Based Investment Calculator
**Hackathon 2026 Submission** *A High-Precision, Accessible Financial Planning Tool.*

## 🛠 Tech Stack
- **Frontend:** Next.js 15.5.9 (Node.js 22.11.0, NPM 10.9.0)
- **CMS/Backend:** Drupal 10.5.6 (PHP 8.1)
- **Database:** MySQL 8.0
- **Styling:** Tailwind CSS (Montserrat/Arial/Verdana)
- **Compliance:** WCAG 2.1 AA Standards

---

## 📐 The Math (Deterministic Engine)
The calculator operates on a two-step deterministic model to ensure consistent results:

1.  **Inflation Adjustment:** $$FV = \text{Present Cost} \times (1 + \text{Inflation rate})^{\text{Years}}$$
2.  **Monthly SIP (Annuity Due):** $$\text{Monthly SIP} = \frac{FV \times r}{((1 + r)^n - 1) \times (1 + r)}$$  
    *Where $r = \text{Annual Return} / 12$ and $n = \text{Years} \times 12$.*

---

## ♿ Accessibility (WCAG 2.1 AA)
Built with inclusivity as a core requirement:
- **Color Palette:** High-contrast Blue (`#224c87`) and Grey (`#919090`).
- **Focus States:** High-visibility Red (`#da3832`) focus rings for keyboard users.
- **Screen Readers:** Semantic HTML5 and `aria-live="polite"` for real-time result updates.
- **Typography:** Montserrat for headings, fallback to Arial/Verdana for maximum legibility.

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
Ensure you have **Docker** and **Docker Compose** installed.

### 2. Launch the Stack
Run the following command in the root directory to spin up the Frontend, Drupal CMS, and MySQL Database:
```bash
docker-compose up -d