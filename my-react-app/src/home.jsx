import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";
import HPImg from "./assets/homepagesinger.jpg";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <section className="singer-section">
        <img src={HPImg} alt="Singer" className="singer-image" />

        <div className="singer-box">
          <h2>{t("home.headline")}</h2>
          <Link className="singer-button" to="/browse">
            {t("home.bookNow")}
          </Link>
        </div>
      </section>
    </div>
  );
}