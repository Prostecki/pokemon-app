import "./../../index.css";
import { HoverLinks } from "./HoverLinks";

export default function StartMenu() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-yellow-100 pokemon-bg relative overflow-hidden">
      <HoverLinks />
    </div>
  );
}
