import MenuButton from "../common/MenuButton";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      {/* Custom Card */}
      <div className="w-full max-w-md shadow-lg border-0 bg-white rounded-lg overflow-hidden">
        {/* Custom CardHeader */}
        <div className="text-center pb-4 p-6 border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* Custom Zap icon */}
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-yellow-800"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {/* Custom CardTitle */}
            <h3 className="text-xl font-semibold text-gray-800">PokéDex</h3>
          </div>
          {/* Custom Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 w-fit mx-auto">
            v1.0.0
          </span>
        </div>
        {/* Custom CardContent */}
        <div className="text-center space-y-4 p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            A simple app to explore and discover Pokémon. Find, learn, and
            discover more about your favorite Pokémon.
          </p>
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Made with ❤️ for Pokémon trainers
            </p>
          </div>
          <MenuButton onClick={() => navigate("/")}>Back to menu</MenuButton>
        </div>
      </div>
    </div>
  );
}
