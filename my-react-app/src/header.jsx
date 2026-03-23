import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-background"> {/* This spans the whole screen */}
      <header className="nav-content"> {/* This stays centered at 900px */}
        <Link className="logo" to="/">NoteMyWords</Link>
      </header>
    </div>
  );
}