import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pokemon-list-bg flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Pokeball Animation */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden shadow-2xl animate-bounce">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-black transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-100 to-white rounded-b-full"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full border-4 border-black transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
              <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* 404 with Pokemon styling */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-black/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        {/* Main content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl space-y-6">
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
          <div className="space-y-3 max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-20">
                Progress:
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <span className="text-sm text-gray-600">75%</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-red-600 py-2 px-4 rounded-2xl hover:bg-red-700 text-white shadow-lg">
            <Link to="/base">
              {/* <ArrowLeft className="mr-2 h-4 w-4" /> */}
              Return to Pokédex
            </Link>
          </button>

          <button className="bg-white/90 hover:bg-white border-2 border-blue-500 text-blue-600 py-2 px-4 rounded-2xl font-semibold">
            <Link to="/">Start Menu</Link>
          </button>
        </div>

        {/* Footer message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-gray-700 font-medium">
            🎮 <strong>Trainer Tip:</strong> New Pokémon and features are being
            discovered daily!
          </p>
        </div>

        {/* Floating Pokemon elements */}
        <div
          className="fixed top-10 left-10 text-4xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          ⚡
        </div>
        <div
          className="fixed top-20 right-20 text-3xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🔥
        </div>
        <div
          className="fixed bottom-20 left-20 text-3xl animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          💧
        </div>
        <div
          className="fixed bottom-10 right-10 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🍃
        </div>
      </div>
    </div>
  );
}
