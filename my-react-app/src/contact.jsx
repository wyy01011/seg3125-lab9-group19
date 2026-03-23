import { Link } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">

      {/* Contact Form Section */}
      <section className="contact-box">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">Leave us a comment or question</p>

        <form className="contact-form">
          <label>Name</label>
          <input type="text" className="contact-input" />

          <label>Email</label>
          <input type="email" className="contact-input" />

          <label>Comments/Questions</label>
          <textarea className="contact-textarea" rows="5"></textarea>

          <button type="submit" className="contact-submit">Submit</button>
        </form>
      </section>

    </div>
  );
}