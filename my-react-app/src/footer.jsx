import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-brand">
            {t("footer.brand")}
        </h2>

        <p className="footer-tagline">
          {t("footer.tagline")}
        </p>

        <p className="footer-copy">
          {t("footer.copyright")}
        </p>
      </div>

      <div className="footer-right">
        <h3 className="footer-heading">
          {t("footer.concerns")}
        </h3>

        <br />

        <Link className="singer-button" to="/contact">
          {t("footer.contactUs")}
        </Link>
      </div>
    </footer>
  );
}