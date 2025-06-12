import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleBackToMenu = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-yellow-100 gap-10">
      <h1>404 - Page is not found</h1>
      <button onClick={handleBackToMenu} className="menu-buttons">
        Back to menu
      </button>
    </div>
  );
}
