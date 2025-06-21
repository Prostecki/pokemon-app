import { Link } from "react-router-dom";
import "./styles/notfoundpage.css";

export default function NotFound() {
  return (
    <div className="not-found-container pokemon-list-bg">
      <div className="not-found-content space-y-8">
        {/* Pokeball Animation */}
        <div className="pokeball-container">
          <div className="pokeball">
            <div className="pokeball-line"></div>
            <div className="pokeball-bottom"></div>
            <div className="pokeball-center">
              <div className="pokeball-center-dot"></div>
            </div>
          </div>
        </div>

        {/* 404 with Pokemon styling */}
        <div className="not-found-404">
          <h1>404</h1>
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        {/* Main content */}
        <div className="main-content space-y-6">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <span className="text-sm font-bold uppercase tracking-wider">
              Wild Feature Appeared!
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Oops! The page hasn't been created yet!
          </h2>

          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Our developers are still working hard to create this feature.
          </p>

          {/* Pokemon stats style bars */}
          <div className="progress-container space-y-3">
            <div className="progress-bar-container">
              <span className="progress-bar-label">Progress:</span>
              <div className="progress-bar-bg">
                <div className="progress-bar"></div>
              </div>
              <span className="text-sm text-gray-600">75%</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <button className="pokedex-button">
            <Link to="/base">Return to Pokédex</Link>
          </button>

          <button className="menu-button">
            <Link to="/">Start Menu</Link>
          </button>
        </div>

        {/* Footer message */}
        <div className="footer-message">
          <p className="text-sm text-gray-700 font-medium">
            🎮 <strong>Trainer Tip:</strong> New Pokémon and features are being
            discovered daily!
          </p>
        </div>

        {/* Floating Pokemon elements */}
        <div
          className="floating-element"
          style={{
            top: "2.5rem",
            left: "2.5rem",
            animationDelay: "0s",
            fontSize: "2.5rem",
          }}
        >
          ⚡
        </div>
        <div
          className="floating-element"
          style={{ top: "5rem", right: "5rem", animationDelay: "1s" }}
        >
          🔥
        </div>
        <div
          className="floating-element"
          style={{ bottom: "5rem", left: "5rem", animationDelay: "2s" }}
        >
          💧
        </div>
        <div
          className="floating-element"
          style={{
            bottom: "2.5rem",
            right: "2.5rem",
            animationDelay: "0.5s",
            fontSize: "2.5rem",
          }}
        >
          🍃
        </div>
      </div>
    </div>
  );
}
