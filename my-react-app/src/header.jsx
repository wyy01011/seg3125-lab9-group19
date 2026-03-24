import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <div className="header-background">
      <header className="nav-content">
        <Link className="logo" to="/">
          {t("nav.brand")}
        </Link>

        <button className="lang-btn" onClick={() => i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")}>
          {t("nav.language")}
        </button>
      </header>
    </div>
  );
}