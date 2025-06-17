# Pokémon App

A comprehensive React application for exploring Pokémon data with interactive features.  
Browse Pokémon, view detailed stats, check evolution chains, and more.

## Features

- **Interactive Pokédex** – Browse and search through Pokémon.
- **Detailed Pokémon Information** – View stats, abilities, moves, and evolution chains.
- **Beautiful Animations** – Smooth transitions with Framer Motion.
- **Responsive Design** – Works on mobile, tablet, and desktop.
- **Loading Screen** – Custom Pokémon-themed progress bar.
- **Character Selection** – Choose Pokémon for battles.
- **Interactive UI Elements** – Hover effects, animated cards, and more.
- **Stats Visualization** – Pokémon stats with Chart.js.

## Tech Stack

- **React** (v19.1.0)
- **React Router** (v6.3) – Navigation
- **Tailwind CSS** (v4.1.8) – Styling
- **Framer Motion** (v12.16.0) – Animations
- **Chart.js** (v4.4.9) – Data visualization
- **Vite** (v6.3.5) – Fast development
- **PokeAPI** – Pokémon data
- **Context API** – State management

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prostecki/pokemon-app.git
   cd pokemon-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm run dev
   ```
4. **Open the application:**  
   Go to [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 Using the Application

- **Home Screen:** Explore the main menu.
- **Pokédex:** Browse the list of Pokémon.
- **Search:** Find Pokémon by name.
- **Filtering:** Filter by type using the side panel.
- **Details:** Click a Pokémon card for more info.
- **Evolutions:** View evolution chains from the details page.
- **Moves:** Explore movesets and move details.

## Known Limitations & Future Improvements

### Current Limitations

- Limited offline functionality
- No keyboard navigation for browsing Pokémon in the Pokémon Details component
- Missing list virtualization (could be implemented using React Window)
- Some Pokémon data may load slowly due to API response times
- Mobile optimization could be improved for smaller screens

### Planned Improvements

- Implement offline mode with local storage caching
- Add Pokémon comparison feature
- Create a team builder functionality
- Implement a card-based battle system with strategic gameplay elements
- Improve the design and content of the About component
- Enhance server-side data retrieval for better performance
- Add more interactive visualizations for Pokémon data
- Implement user accounts to save favorite Pokémon
- Add keyboard navigation for better accessibility
- Implement virtualized lists for improved performance with large data sets
