# Juspay SaaS Dashboard

## 🚀 Live Demo

[View Live Demo](https://juspay-assignment-snowy.vercel.app/) *(Deployment URL will be updated)*

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4.x, CSS3
- **UI Components**: Radix UI, Lucide React Icons , Shadcn UI
- **Charts**: Recharts
- **Table Management**: TanStack React Table
- **Routing**: React Router DOM
- **Package Manager**: Bun


## Key Features Implemented:
- Pixel-perfect dashboard with responsive design
- Interactive charts and data visualization
- Dual sidebar layout (navigation + activities)
- Order management with advanced filtering
- Theme toggle (light/dark mode)

## ⚡ Quick Start

### Prerequisites
- Node.js (v20 or higher)
- Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Yashasewi/juspay-assignment.git
cd juspay-assignment
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## �️ Application Routes

The application includes the following routes:

- **`/`** - Dashboard (Home page with analytics and charts)
- **`/orders`** - Orders management page with data table and filtering

Navigation between these routes is handled through the left sidebar menu.

## �📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/       # Dashboard-specific components
│   ├── Layout/          # Layout wrapper components
│   ├── Navigation/      # Navigation and breadcrumb
│   ├── Sidebar/         # Left and right sidebar components
│   ├── Theme/           # Theme provider and toggle
│   └── ui/              # Base UI components (shadcn/ui style)
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── pages/               # Main page components
```

## 🚧 Challenges & Solutions

### 1. Graph Color Consistency
**Challenge**: Ensuring consistent color schemes across different chart types while maintaining readability in both light and dark themes.

**Solution**: 
- Implemented a centralized color palette system using CSS custom properties
- Created theme-aware color variables that automatically adjust based on the selected theme
- Used consistent color mapping for different data series across all charts

### 2. Dual Sidebar Implementation
**Challenge**: Creating a flexible dual sidebar layout that works responsively across different screen sizes while maintaining proper content flow.

**Solution**:
- Designed a flexible grid-based layout system
- Implemented collapsible sidebars for mobile responsiveness
- Used Radix UI's Collapsible component for smooth animations
- Created a context system to manage sidebar states globally
- Added proper z-index management to prevent overlay issues

### 3. Mobile Responsiveness
**Challenge**: Adapting complex dashboard layouts for mobile devices without losing functionality.

## 🎨 Design Decisions

- **Component Architecture**: Followed atomic design principles with reusable components
- **Styling Approach**: Utilized Tailwind CSS for rapid development and consistent design
- **State Management**: Used React Context for global state (theme, sidebar state)
- **Data Flow**: Implemented props-down, events-up pattern for clean data flow
- **Animation Strategy**: Subtle micro-interactions using CSS transitions and Tailwind animations

## 🔧 Configuration

The project uses modern tooling with minimal configuration:
- **Vite**: Fast development server and build tool
- **ESLint**: Code linting with React-specific rules
- **Tailwind CSS**: Utility-first styling with custom configuration
- **Bun**: Fast package manager and runtime
- **ShadCN/UI**: Component library for consistent design
