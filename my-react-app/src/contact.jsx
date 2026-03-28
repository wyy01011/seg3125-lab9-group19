import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ //Holds the form data.
    name: "",
    email: "",
    message: ""
  });

  const validateEmail = (email) => { //Validate an email.
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    //Error checking for the form.
    if (!formData.name || !formData.email || !formData.message) { 
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try { //Try copnencting to the database.
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Success! Your message was sent.");
        setFormData({ name: "", email: "", message: "" }); //Sets the information to be added to the database.
      } else {
        alert("Server error. Please try again later.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Could not connect to the server. Is Terminal 1 running?");
    }
  };

  //Add the UI elements for the contact us form.
  return ( 
    <div className="contact-container">
      <section className="contact-box">
        <h2 className="contact-title">
          {t("contact.title")}
        </h2>

        <p className="contact-subtitle">
          {t("contact.subtitle")}
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>

          <label>{t("contact.name")}</label>
          <input 
            type="text" 
            className="contact-input" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <label>{t("contact.email")}</label>
          <input 
            type="email" 
            className="contact-input" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <label>{t("contact.comments")}</label>
          <textarea 
            className="contact-textarea" 
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>

          <button type="submit" className="contact-submit">
            {t("contact.submit")}
          </button>

        </form>
      </section>
    </div>
  );
}