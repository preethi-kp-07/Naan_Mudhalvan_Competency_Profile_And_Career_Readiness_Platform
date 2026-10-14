# Naan Mudhalvan Competency Profile and Career Readiness Platform

An educational, responsive, and data-driven platform built to connect higher education students and faculty across Tamil Nadu through competency profiling, diagnostic assessments, targeted remedial interventions, and transparent career readiness matching.

> **Academic Project Note:** This application is inspired by the skill ecosystem and guidelines of the Tamil Nadu Skill Development Corporation (TNSDC) and the Naan Mudhalvan initiative. It is an independent college mini project and is not an official government portal.

---

## 🚀 Key Features

### 1. Student Portal (`/student/*`)
- **Student Dashboard:** Personalized greeting (*"Welcome back, Preethi!"*), daily date-stable motivational quote card with 32 curated quotes and instant refresh, 6 real-time KPI stat cards, Recharts Radar & Bar visualizations, and flagged priority skill gaps.
- **My Profile & Learning Records:** Multi-tab student portfolio managing personal details, academic metrics (CGPA, semester), manual Naan Mudhalvan training course logs, skills, certifications, and project repositories.
- **Competency Assessment:** Diagnostic evaluation testing programming, databases, web systems, and communication with step-by-step navigation, difficulty indicators, and instant score computation.
- **My Competency Profile:** Multidimensional radar maps and bar comparisons contrasting verified student vectors with target industry benchmarks.
- **Career Matching & Readiness:** Distinguishes **Career Fit %** (cosine vector similarity) from **Career Readiness %** (transparent threshold compliance) across software engineering roles.
- **Skill Gap & 4-Week Learning Roadmap:** Actionable technical gaps with severity tags and interactive milestone checkboxes for week-by-week progress.
- **Learning Materials:** Repository of faculty-assigned PDF lecture notes, video masterclasses, and practice labs with one-click *"Mark Completed"* toggles.
- **Progress History:** Longitudinal assessment score evolution chart, score breakdowns, and milestone activity timeline.
- **My Skill Passport & QR Sharing (`/passport/:shareId`):** Shareable student profile with granular section privacy toggles and SVG QR code rendering.
- **Settings:** Role-based access control notice, password change UI, and notification alert toggles.

### 2. Faculty / Admin Portal (`/admin/*`)
- **Faculty Dashboard & Analytics:** Cohort KPIs (142 students, 88% assessment rate, average score: 68.4%), high-prevalence technical gaps, department readiness comparisons, and recent assessment benchmarks.
- **Student Competency Overview:** Searchable directory with department filters, score rankings, and student inspection drawer with enforced data minimization (private phone numbers and passwords protected).
- **Assessment & Question Bank Management:** Manage questions, configure competency categories, answer options, and difficulty levels.
- **Learning Material Management:** Upload learning materials and assign them directly to individual students (e.g. Preethi S.) or whole batches.
- **Skill Gap & Intervention Management:** Inspect cohort deficiencies and deploy targeted remedial packages.
- **Career & Competency Criteria:** Manage career roles, target scores, and competency weights.
- **Reports & Cohort Analytics:** Score tier distribution, department comparisons, and instant **Cohort CSV Export** generation.
- **Settings & Access Control:** Governance policies and administrative audit log.

### 3. Connected Student–Faculty Workflow
1. Student **Preethi S.** takes an assessment or views her dashboard, identifying an urgent **Relational Databases & SQL** skill gap (52% score vs 80% target).
2. Faculty **Dr. S. Sundaram** navigates to **Learning Materials / Interventions**, sees the gap, and assigns a curated SQL guide or creates an intervention for Preethi S.
3. Preethi's Student Dashboard and **Learning Materials** page instantly reflect the assigned material.
4. Preethi marks the module as completed, updating her learning progress and reducing her pending tasks in real-time.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | React 19 with Vite 8 & TypeScript |
| **Styling** | Tailwind CSS v4 (Tamil Nadu Skill Development color theme) |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Visualizations** | Recharts (Radar, Bar, Line) |
| **State & API** | Centralized mock adapter layer (`apiClient`, `studentService`, `learningMaterialService`, `adminService`) ready for Express + PostgreSQL backend in Stage 2 |

---

## 🎨 Design Theme & Colors

Inspired by [Tamil Nadu Skill Development Corporation (TNSDC)](https://skilldevelopment.tn.gov.in/):
- **Deep Navy Blue (`#0B2545` / `#07192F`):** Sidebar, navigation headings, and primary visual anchors.
- **Professional Blue (`#1D4ED8` / `#2563EB`):** Primary action buttons, active navigation states, and vector highlights.
- **Subtle Teal & Green (`#0D9488` / `#059669`):** Growth indicators, completed learning modules, and verified competencies.
- **Crisp Neutral Backgrounds (`#F8FAFC` / `#FFFFFF`):** High-readability card surfaces and rounded borders.

---

## 🏃 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build & Type Check
```bash
npm run build
```

---

## 🔑 Demo Access & Evaluation Credentials

For seamless evaluation and presentation:

| Role | Name | Email | Password | Quick Login |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Preethi S. (3rd Yr CSE) | `preethi@college.edu` | `demo123` | 1-Click button on `/login` |
| **Faculty / Admin** | Dr. S. Sundaram | `faculty.admin@college.edu` | `demo123` | 1-Click button on `/login` |

> **Top Navigation Quick Switch:** You can also click the **"Switch to Faculty" / "Switch to Student"** button located in the top navbar on any authenticated screen to test both perspectives instantly without re-logging in.

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── charts/               # Recharts components (Radar, Bar, Line)
│   │   └── common/               # Navbar, Sidebar, MotivationalQuoteCard, StatCard, Badge, Modal, Footer
│   ├── context/                  # AuthContext (reactive session and role switching)
│   ├── data/
│   │   ├── mockData.ts           # Centralized mock cohort, competencies, questions, careers
│   │   └── mockQuotes.ts         # 32 date-stable motivational quotes
│   ├── layouts/
│   │   ├── PublicLayout.tsx      # Landing, Login, Register, Public Passport
│   │   ├── StudentLayout.tsx     # Student portal container & responsive sidebar
│   │   └── AdminLayout.tsx       # Faculty portal container & responsive sidebar
│   ├── pages/
│   │   ├── public/               # LandingPage, LoginPage, RegisterPage, PublicSkillPassportPage, NotFoundPage
│   │   ├── student/              # Dashboard, Profile, Assessment, Competencies, Careers, Roadmap, Materials, Progress, Passport, Settings
│   │   └── admin/                # Dashboard, StudentOverview, Assessments, Materials, Interventions, Careers, Reports, Settings
│   ├── routes/
│   │   └── AppRoutes.tsx         # Complete route definitions
│   ├── services/
│   │   ├── apiClient.ts          # Centralized fetch client (ready for Stage 2 backend)
│   │   ├── authService.ts        # Authentication & role manager
│   │   ├── studentService.ts     # Profile, skills, learning records, roadmap
│   │   ├── assessmentService.ts  # Adaptive test flow & score calculation
│   │   ├── learningMaterialService.ts # Student-Faculty material assignment & completion
│   │   └── adminService.ts       # Cohort analytics, interventions, CSV export
│   ├── types/                    # Shared TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind v4 import & theme variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔮 Backend Integration (Stage 2 Preparation)

All service layers (`apiClient.ts`, `studentService.ts`, `learningMaterialService.ts`, `adminService.ts`) use clean asynchronous interfaces with a configurable base URL (`VITE_API_BASE_URL`). 

In Stage 2:
1. Connect the Express.js REST API with PostgreSQL and Prisma ORM.
2. Replace local mock storage with real JWT cookie authentication and database transactions.
3. Activate the scikit-learn / Python K-Means clustering algorithm for aggregate cohort vector modeling.
