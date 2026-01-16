TaskPro

TaskPro is a modern, full-stack task and project management application inspired by Kanban workflows.
It is designed with performance, scalability, and real-world usability as first-class priorities.

🔗 Live Demo: https://taskpro-omega.vercel.app/
🔗 Backend: https://taskpro-backend-57d3.onrender.com/

Swagger docs: https://taskpro-backend-57d3.onrender.com/api-docs/
 


🚀 Features

Board / Column / Task based workflow

Drag & Drop task movement

Priority & deadline management

Responsive dashboard layout

Authentication with token refresh strategy

Optimized client–server data flow

Fully responsive (mobile, tablet, desktop)

🧱 Tech Stack
Frontend

React

TypeScript

MUI (Material UI)

Formik + Yup

Axios

Vite

Backend

Node.js

Express

MongoDB (Mongoose)

JWT (Access & Refresh tokens)

Tooling & Quality

ESLint & Prettier

Lighthouse

Modular architecture

Environment-based configuration

⚙️ Architecture Overview

TaskPro follows a clean separation of concerns:

Frontend

Component-driven UI

Lazy-loaded dialogs and heavy UI elements

Optimized state handling to minimize re-renders

Backend

RESTful API design

Centralized validation & error handling

Secure authentication flow

Data Flow

Minimal initial payload

Deferred data loading where possible

Optimistic UI updates for better UX

📱 Performance Strategy

Performance is treated as a core design concern, not an afterthought.

Key Principles

Mobile-first responsiveness

Reduced main-thread blocking

Controlled JavaScript bundle size

Stable layout to prevent visual shifts

Optimized image and asset delivery

Implementations

Route-based and component-level code splitting

Lazy loading for dialogs, drawers, and secondary UI

Skeleton loading instead of blocking spinners

Controlled MUI rendering behavior on mobile

Avoidance of heavy animations and GPU-intensive effects on small devices

📊 Lighthouse Performance Report

Performance was measured using Google Lighthouse 13.0.1 under real-world simulated conditions.

Mobile Results

Performance: 84

Accessibility: 86

Best Practices: 100

SEO: 92

Core Web Vitals

FCP: 3.2 s

LCP: 3.2 s

TBT: 10 ms

CLS: 0.013

Mobile performance is primarily constrained by device CPU limitations and initial render cost, which is expected for feature-rich dashboards.

Desktop Results

Performance: 99

Accessibility: 86

Best Practices: 100

SEO: 92

Core Web Vitals

FCP: 0.7 s

LCP: 0.9 s

TBT: 30 ms

CLS: 0

Desktop performance is near-perfect and exceeds common production benchmarks.

♿ Accessibility & SEO

Semantic HTML structure

Keyboard-navigable components

Screen reader-friendly layout

SEO-ready metadata structure

Minor accessibility improvements (e.g. image alt attributes) identified and tracked

🔐 Security & Best Practices

HTTP-only refresh tokens

Secure authentication flow

Input validation on all endpoints

XSS & clickjacking mitigations recommended via CSP

Clean separation between client and server responsibilities

📦 Installation 

```
# frontend
npm install
npm run dev

# backend
npm install
npm run start
```
🧭 Project Goals

TaskPro is built to demonstrate:

Real-world frontend architecture

Scalable backend design

Performance-aware UI engineering

Production-ready coding standards

It prioritizes maintainability, clarity, and user experience over artificial benchmark optimization.

📌 Status

Actively maintained

Performance optimizations ongoing

New features planned incrementally
