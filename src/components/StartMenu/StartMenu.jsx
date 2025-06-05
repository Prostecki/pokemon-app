import "./StartMenu.css";
import MenuButton from "./MenuButton";
export default function StartMenu({ onKnowledgeBase }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to the Game!
        </h1>
        <p className="m-auto mb-6">
          Click the button below to start your adventure.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <MenuButton onClick={onKnowledgeBase}>Knowledge Base</MenuButton>
          <MenuButton>About</MenuButton>
          <MenuButton>Music</MenuButton>
        </div>
      </div>
    </div>
  );
}
