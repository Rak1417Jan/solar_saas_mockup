# Solar SaaS Workflow Mockup

A comprehensive, interactive prototype demonstrating the end-to-end solar installation journey for vendors and customers. This mockup allows you to pitch the "Solar SaaS" concept with a tangible, high-quality visual aid.

## Features

### 1. Customer Mobile App
- **End-to-End Workflow**: Simulation of Lead -> Quote -> Booking -> Dispatch -> Installation -> Closure.
- **Interactive Elements**:
    - Approve Quotations (PDF simulation)
    - Payment Gateway Mockup (UPI, Card, QR)
    - OTP Verification Logic (Simulated)
    - Installation Photo Gallery & Approval
- **Real-time Timeline**: Visual progress tracker with stage indicators.

### 2. Vendor Field App
- **Task Management**: Interactive checklist for installation teams.
- **Site Validation**: Simulated camera interface for photo uploads with GPS tagging.
- **Project Details**: Access to customer info and system specs on the go.

### 3. Vendor Dashboard (Web)
- **Analytics**: KPI cards for revenue, project counts, and approval times.
- **Pipeline Management**: Kanban-style board to track projects across stages.
- **Performance Charts**: Visualizations for sales trends and DISCOM processing times.

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 (Glassmorphism & Solar Theme)
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Walkthrough Script

1.  **Start at Landing Page**: Explain the three pillars (Customer, Field Team, Management).
2.  **Customer View**:
    - Click "Customer App".
    - Show the timeline.
    - Click "Approve" on Quote.
    - "Pay" the booking amount.
    - Explain the notification system.
3.  **Vendor View**:
    - Go back and open "Field Team".
    - Complete the checklist items.
    - "Upload" a photo to show GPS tagging.
4.  **Dashboard View**:
    - Open "Vendor Dashboard".
    - Highlight the KPI cards and real-time charts.
    - Show the drag-and-drop pipeline visualization.

## Customization
- **Theme**: Edit `app/globals.css` to adjust the solar color palette.
- **Data**: Modify `lib/mockData.ts` to change the project details or workflow steps.
