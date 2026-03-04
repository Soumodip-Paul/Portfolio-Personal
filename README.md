# Personal Portfolio - Chemical Engineer Portfolio

A modern, minimal corporate multi-page React portfolio website for a Chemical Engineer working in Refinery Production.

## Tech Stack
- **React 18+** with **Vite**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Motion** for animations
- **Lucide React** for icons
- **Context API** for global state management (Data & Theme)

## Features
- **Dynamic Content**: All content is driven by a structured `data.json` file.
- **Admin Dashboard**: A protected admin page to edit portfolio data and save it to `localStorage`.
- **Dark/Light Mode**: Smooth theme transitions with persistence.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **JSON Export**: Ability to export the updated portfolio data as a JSON file.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   # This runs the Express server with Vite middleware
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Run Production Server**:
   ```bash
   # Set NODE_ENV to production and start the server
   NODE_ENV=production npm start
   ```

## Admin Access
- **URL**: `/admin`
- **Password**: `admin123` (Hardcoded for demo purposes)
- **Features**: 
  - Edit all portfolio sections (Personal, About, Skills, Experience, Projects, Awards).
  - **Save to File**: Submitting the form sends a `POST` request to the backend, which updates the `src/data/initialData.json` file directly.
  - **Export JSON**: Download a backup of your data at any time.

## Project Structure
- `/server.ts`: Express server that handles API requests and serves the frontend.
- `/src/context`: Global state management.
- `/src/pages`: Individual page components.
- `/src/components`: Reusable UI elements.
- `/src/data`: Initial portfolio data (updated by the admin panel).
- `/src/lib`: Utility functions.
