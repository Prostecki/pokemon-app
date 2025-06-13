export default function Header({ fixed = false }) {
  return (
    <header
      className={`${
        fixed ? "fixed" : "relative"
      } w-full bg-blue-600 text-white p-4 flex items-center justify-between shadow-md`}
    >
      <h1 className="header-title">Pokémon Knowledge Base</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/knowledge-base">Knowledge Base</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
