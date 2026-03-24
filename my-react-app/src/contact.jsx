import { useTranslation } from "react-i18next";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-container">

      <section className="contact-box">
        <h2 className="contact-title">
          {t("contact.title")}
        </h2>

        <p className="contact-subtitle">
          {t("contact.subtitle")}
        </p>

        <form className="contact-form">

          <label>{t("contact.name")}</label>
          <input type="text" className="contact-input" />

          <label>{t("contact.email")}</label>
          <input type="email" className="contact-input" />

          <label>{t("contact.comments")}</label>
          <textarea className="contact-textarea" rows="5"></textarea>

          <button type="submit" className="contact-submit">
            {t("contact.submit")}
          </button>

        </form>
      </section>

    </div>
  );
}