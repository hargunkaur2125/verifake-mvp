# VeriFake - AI-Powered Social Media Account Detection System

## Overview

VeriFake is a comprehensive web application designed to detect fake social media accounts using advanced AI algorithms. The system provides real-time analysis of social media profiles across platforms like Twitter, Instagram, and Facebook, delivering accuracy scores, risk assessments, and detailed behavioral insights. Built with a modern full-stack architecture, it offers both public analysis capabilities and administrative dashboard functionality for system monitoring and user management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom design tokens for a dark theme with electric blue/neon green accent colors
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Language**: TypeScript throughout for consistency and type safety
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for fast bundling and deployment

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Development Storage**: In-memory storage implementation for testing and development
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Database Schema Design
The application uses a comprehensive relational schema:
- **Users Table**: Authentication, roles (user/admin/analyst), and activity tracking
- **Accounts Table**: Social media profile storage with platform-specific data
- **Detections Table**: AI analysis results with risk scores and confidence levels
- **Analytics Table**: Aggregated statistics for dashboard reporting
- **System Metrics Table**: Performance monitoring and health tracking

### API Architecture
- **Endpoint Design**: RESTful API with `/api` prefix for clear separation
- **Analysis Endpoint**: POST `/api/analyze` for real-time account detection
- **Admin Endpoints**: System status, user management, and analytics retrieval
- **Mock AI Integration**: Simulated detection algorithm generating realistic results based on URL patterns
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Logging**: Detailed API request/response logging for monitoring

### Authentication and Authorization
- **Role-Based Access**: Three user roles with different permission levels
  - User: Basic analysis capabilities
  - Analyst: Enhanced analysis features
  - Admin: Full system administration
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Route Protection**: Middleware-based authorization for protected endpoints

### UI/UX Design Patterns
- **Design System**: Consistent component library with standardized spacing, colors, and typography
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Primary dark theme with glassmorphism effects and neon accents
- **Interactive Elements**: Hover states, loading animations, and micro-interactions
- **Accessibility**: ARIA compliance through Radix UI primitives

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React integration for Vite build system
- **express**: Web application framework for Node.js backend
- **typescript**: Type checking and compilation throughout the stack

### Database and ORM
- **drizzle-orm**: Type-safe SQL ORM for database operations
- **drizzle-kit**: Schema management and migration tooling
- **@neondatabase/serverless**: Serverless PostgreSQL connection driver
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives including dialogs, dropdowns, tooltips, and form controls
- **@tanstack/react-query**: Powerful data fetching and state management
- **framer-motion**: Animation library for page transitions and interactions
- **recharts**: Chart library for analytics visualization

### Utility Libraries
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe component variant handling
- **clsx**: Conditional CSS class composition
- **date-fns**: Date manipulation and formatting
- **zod**: Schema validation for API endpoints and forms
- **react-hook-form**: Form state management with validation
- **wouter**: Lightweight routing for single-page application navigation

### Development and Build Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundler for production builds
- **postcss**: CSS processing with autoprefixer
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit development integration

### Form Handling and Validation
- **@hookform/resolvers**: React Hook Form integration with validation libraries
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas

The architecture emphasizes type safety, developer experience, and scalability while maintaining clean separation of concerns between frontend presentation, backend logic, and data persistence layers.