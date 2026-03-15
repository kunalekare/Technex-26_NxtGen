# Goal-Based Investment Calculator [Preview](https://technex-26-nxt-gen.vercel.app/) 

**Technex-26 Hackathon Submission | Team NxtGen**

A high-precision, fully responsive, WCAG 2.1 AA compliant financial planning tool that helps users estimate the monthly SIP (Systematic Investment Plan) required to achieve future financial goals — adjusted for inflation, market returns, step-up contributions, retirement decumulation, and tax impact.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Mathematical Engine](#mathematical-engine)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features

- **5 Goal Strategies** — Custom, Education (10% inflation), Medical (12%), Lifestyle (6%), and Retirement with full decumulation modeling
- **Step-Up SIP** — Annual contribution increase (0-20%) using numerical summation to model real-world salary growth
- **Retirement Decumulation** — Present Value of Annuity calculation for post-retirement withdrawal corpus
- **LTCG Tax Impact** — Toggle to adjust the target corpus by 12.5% to account for Long-Term Capital Gains tax
- **Real-Time Computation** — All calculations run client-side via React `useMemo` with zero API latency
- **Calculation History** — Save, load, and refresh past calculations stored in MySQL via REST API
- **Fully Responsive** — Optimized layouts for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **WCAG 2.1 AA Compliant** — Skip navigation, focus-visible outlines, semantic HTML, `aria-live` regions, and prefers-reduced-motion support

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.9 |
| Runtime | Node.js | 22.11.0 |
| UI Library | React | 19.1.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Bundler | Turbopack | (via Next.js) |
| Database | MySQL | 8.0 |
| DB Client | mysql2 | 3.19.x |
| CMS | Drupal | 10.5.6 (PHP 8.1) |
| Orchestration | Docker Compose | - |
| Linting | ESLint | 9.x |
| Font | Montserrat | Google Fonts |

---

## Architecture

```
Browser (Client)
  |
  |-- React Components (InvestmentForm, Slider, Input, CalculationHistory)
  |     |
  |     |-- useCalculator hook (client-side math engine via useMemo)
  |     |-- useCalculationHistory hook (API client for CRUD)
  |
  |-- Next.js API Routes (/api/calculations)
        |
        |-- MySQL 8.0 (mysql2 connection pool)
              |
              |-- calculations table (inputs + computed results + timestamps)
```

The application follows a **client-heavy architecture**:
- All financial math executes on the client via `useMemo` for instant feedback
- The server (Next.js API routes) is only used for persisting/retrieving calculation history
- Docker Compose orchestrates the full stack: Next.js frontend, Drupal CMS, and MySQL database

---

## Mathematical Engine

All formulas are implemented in `src/hooks/useCalculator.ts` using a deterministic, multi-step pipeline:

### Step 1: Inflation Adjustment (Future Value)

```
FV = PV x (1 + i)^n
```

Where inflation rate `i` is determined by goal type:

| Goal Type | Inflation Rate |
|---|---|
| Custom | User-defined |
| Education | 10% |
| Medical | 12% |
| Lifestyle | 6% |
| Retirement | 6% |

### Step 2: Retirement Corpus (Present Value of Annuity)

For Retirement goals, the target is not just the inflated cost — it is the corpus required to fund monthly withdrawals for the entire withdrawal period:

```
Monthly Withdrawal = FV / 12
Corpus = WD x [(1 - (1 + r_post)^(-m)) / r_post]
```

Where `r_post` is the monthly post-retirement return and `m` is withdrawal months.

### Step 3: Tax Impact (LTCG 12.5%)

When enabled, the target corpus is grossed up to ensure the net amount meets the goal:

```
Adjusted Target = Base Target x 1.125
```

### Step 4: Monthly SIP Calculation

**Without Step-Up (Standard Annuity Due):**

```
SIP = (Target x r) / [(1 + r)^n - 1) x (1 + r)]
```

**With Step-Up (Numerical Summation):**

```
P = Target / SUM[ (1 + g)^y x (1 + r)^(t - m) ]
```

Where `g` is the annual step-up rate, `y` is the year index, `t` is total months, and `m` is the current month — computed via a nested loop over years and months.

---

## Responsive Design

The UI is fully responsive across all device sizes using Tailwind CSS breakpoint prefixes (`sm:`, `md:`, `lg:`):

### Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, stacked cards, 3-column goal grid, compact padding |
| Small tablet | 640px+ | Expanded buttons, larger typography, wider spacing |
| Tablet | 768px+ | 2-column form grids, side-by-side inputs |
| Desktop | 1024px+ | 12-column grid (7/5 split), sticky results panel |

### Key Mobile Optimizations

- **Touch targets**: Slider thumbs enlarged to 28px with `touch-action: manipulation`
- **iOS zoom prevention**: Inputs enforce `font-size: 16px` on mobile to prevent auto-zoom
- **Currency overflow**: Large numbers use `break-all` to prevent horizontal overflow
- **Stacked history cards**: Calculation history cards stack vertically with full-width Load buttons
- **Compact results card**: Reduced padding and border-radius on mobile for more content visibility
- **Viewport meta**: Next.js 15 `Viewport` export with `device-width` and `maximumScale: 5`
- **Formula scrollability**: Math formula section has `overflow-x-auto` for narrow screens

---

## Accessibility

Built to WCAG 2.1 AA standards:

| Feature | Implementation |
|---|---|
| Skip Navigation | `<a href="#main-content">` link, visually hidden until focused |
| Focus States | 3px solid `#da3832` outline on `:focus-visible` for all interactive elements |
| Color Contrast | High-contrast Blue `#224c87` on white, Grey `#919090` for secondary text |
| Reduced Motion | `@media (prefers-reduced-motion: reduce)` disables all animations |
| Semantic HTML | `<section>`, `<header>`, `<footer>`, `<main>`, proper heading hierarchy |
| Screen Readers | `aria-labelledby`, `aria-describedby`, `aria-live` regions |
| Font Fallbacks | Montserrat -> Arial -> Verdana -> sans-serif |

---

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed, OR
- **Node.js 22+** and **MySQL 8.0** for local development

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/kunalekare/Technex-26_NxtGen.git
cd Technex-26_NxtGen

# Start all services (frontend, CMS, database)
docker-compose up -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Drupal CMS | http://localhost:8888 |
| MySQL | localhost:3306 |

### Option 2: Local Development

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (create .env.local)
# MYSQL_HOST=localhost
# MYSQL_PORT=3306
# MYSQL_USER=root
# MYSQL_PASSWORD=root_password
# MYSQL_DATABASE=sip_calculator

# Run the database init script on your MySQL instance
mysql -u root -p < src/db/init.sql

# Start development server with Turbopack
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
Technex-26_NxtGen/
  docker-compose.yml              # Orchestrates frontend + CMS + MySQL
  README.md                       # This file

  frontend/                       # Next.js 15 Application
    src/
      app/
        layout.tsx                # Root layout (Montserrat font, viewport, skip link)
        page.tsx                  # Home page (header, main content, footer)
        globals.css               # Global styles (Tailwind v4, slider thumbs, iOS fix)
        api/
          calculations/
            route.ts              # REST API: GET (list) + POST (save) calculations

      components/
        InvestmentForm.tsx        # Main form + results panel (~460 lines)
        CalculationHistory.tsx    # Saved calculation list with load/refresh
        ui/
          Input.tsx               # Reusable number input with suffix
          Slider.tsx              # Reusable range slider with label + min/max

      hooks/
        useCalculator.ts          # Financial math engine (inflation, SIP, step-up, retirement, tax)
        useCalculationHistory.ts  # API client for calculation CRUD

      types/
        calculation.ts            # CalculationPayload + CalculationRecord interfaces

      utils/
        formatters.ts             # formatCurrency, formatNumber, formatPercent

      db/
        connection.ts             # MySQL connection pool (mysql2/promise)
        init.sql                  # Database schema

  cms/                            # Drupal CMS (secondary backend)
    scripts/
      init_db.sql                 # calc_logs table for Drupal
    web/
      modules/custom/
        calc_api.info.yml         # Drupal module definition
      themes/custom/calc_api/
        src/Plugin/rest/resource/
          GoalCalculationResource.php  # REST resource
```

---

## Database Schema

```sql
CREATE TABLE calculations (
    id                     INT AUTO_INCREMENT PRIMARY KEY,

    -- Inputs
    present_cost           DECIMAL(15, 2)  NOT NULL,
    years                  INT             NOT NULL,
    inflation_rate         DECIMAL(5, 2)   NOT NULL,
    annual_return          DECIMAL(5, 2)   NOT NULL,
    step_up_rate           DECIMAL(5, 2)   NOT NULL DEFAULT 0,
    goal_type              ENUM('Custom','Education','Medical','Lifestyle','Retirement'),
    retirement_years       INT             NOT NULL DEFAULT 0,
    post_retirement_return DECIMAL(5, 2)   NOT NULL DEFAULT 0,
    is_tax_enabled         TINYINT(1)      NOT NULL DEFAULT 0,

    -- Computed Results
    future_value           DECIMAL(15, 2)  NOT NULL,
    monthly_sip            DECIMAL(15, 2)  NOT NULL,
    total_investment       DECIMAL(15, 2)  NOT NULL,
    total_earnings         DECIMAL(15, 2)  NOT NULL,
    adjusted_inflation     DECIMAL(5, 2)   NOT NULL,

    -- Metadata
    created_at             TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_created_at (created_at),
    INDEX idx_goal_type (goal_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/calculations` | Retrieve all saved calculations (ordered by `created_at DESC`) |
| `POST` | `/api/calculations` | Save a new calculation (accepts `CalculationPayload` JSON body) |

### Example POST Body

```json
{
  "presentCost": 100000,
  "years": 10,
  "inflationRate": 6,
  "annualReturn": 12,
  "stepUpRate": 5,
  "goalType": "Custom",
  "retirementYears": 0,
  "postRetirementReturn": 0,
  "isTaxEnabled": false,
  "futureValue": 179085,
  "monthlySIP": 7821,
  "totalInvestment": 755038,
  "totalEarnings": -575953,
  "adjustedInflation": 6
}
```

---

## License

This project was built for the **Technex-26 Hackathon**. All rights reserved by Team NxtGen.
