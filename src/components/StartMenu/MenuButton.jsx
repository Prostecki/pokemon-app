export default function MenuButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="menu-buttons">
      {children}
    </button>
  );
}
