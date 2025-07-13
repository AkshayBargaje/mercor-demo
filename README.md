# Mercor Hiring App

A full-stack React + Node.js application for candidate management, evaluation, and team selection.

## Features
- Candidate data ingestion and management
- Advanced filtering (skills, education, experience, required skills, CGPA, score, rating, salary, work availability)
- Candidate evaluation (notes, ratings, auto-score)
- Remove/restore candidates
- Budget tracking and salary management
- Beautiful, customizable UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Setup

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd Mercor Application
   ```

2. **Install dependencies**
   - Backend:
     ```sh
     cd mercor-backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../mercor-project
     npm install
     ```

### Running the App

1. **Start the backend server**
   ```sh
   cd mercor-backend
   npm start
   ```
   The backend runs on [http://localhost:4000](http://localhost:4000).

2. **Start the frontend React app**
   ```sh
   cd ../mercor-project
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

### Stopping the App
- Press `Ctrl+C` in the terminal where each server is running to stop it.

## Project Structure
- `mercor-backend/` - Node.js/Express backend
- `mercor-project/` - React frontend

## Customization
- Candidate data: `mercor-backend/data/form-submission.json`
- Removed candidates: `mercor-backend/data/removed.json`
- UI components: `mercor-project/src/components/`

## License
MIT
