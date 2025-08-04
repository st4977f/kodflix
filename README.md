# Kodflix

![Kodflix Screenshot](public/kodflix.png)

This is a rebuild of the **Kodflix** project from the Kodiri Bootcamp.

Kodflix is a full-stack React-based web application for browsing and viewing TV shows, designed to help master modern front-end and back-end development concepts.

---

## Features

- Responsive gallery of TV show covers
- Hover overlays with animated show titles
- Details page for each show (cover, title, synopsis)
- Routing and navigation (React Router v6+)
- 404 Not Found page for invalid show URLs
- Component-based architecture (Gallery, Show, Menu, etc.)
- Data fetched from a backend API (Express.js + MongoDB)
- Loading indicators while fetching data
- Production-ready build and deployment scripts (Docker, Render)
- Analytics integration (Google Analytics 4 via react-ga4)
- Modern CSS styling
- Mobile-ready via Capacitor (Android/iOS support)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB for development)
- (Optional) Android Studio or Xcode for mobile builds

### Installation

```sh
git clone https://github.com/st4977f/kodflix.git
cd kodflix
npm install
```

### Running Locally

#### Start the backend and frontend (development mode):

```sh
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/rest/shows

#### Environment Variables

Create a `.env` file in the root with your MongoDB connection strings:

```
DB_URL_DEV=mongodb://127.0.0.1:27017/kodflix
DB_URL_PRD=mongodb+srv://<user>:<password>@<cluster-url>/<dbname>
NODE_ENV=development
```

---

## Docker

Build and run the app in Docker:

```sh
docker-compose up --build
```

---

## Mobile (Capacitor)

Build for Android/iOS:

```sh
npm run build
npx cap sync
npx cap open android   # or npx cap open ios
```

Update `capacitor.config.ts` with your local IP for live reload during development.

---

## Deployment

- Deploy to Render, Vercel, or your preferred cloud platform.
- Set environment variables (`DB_URL_PRD`, `NODE_ENV`) in your cloud dashboard.

---

## License