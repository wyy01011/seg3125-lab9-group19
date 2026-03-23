import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { singersData } from "./BrowseSingers";
import "./Contact.css";

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isDateAvailable(dateString, availability) {
  if (!dateString) return false;

  const chosenDate = new Date(dateString + "T00:00:00");
  const day = chosenDate.getDay(); // 0 Sunday, 6 Saturday

  const isWeekend = day === 0 || day === 6;
  const isWeekday = day >= 1 && day <= 5;

  const hasWeekdays = availability.includes("Weekdays");
  const hasWeekends = availability.includes("Weekends");

  if (hasWeekdays && hasWeekends) return true;
  if (hasWeekdays && isWeekday) return true;
  if (hasWeekends && isWeekend) return true;

  return false;
}

function isFutureExpiry(expiryValue) {
  if (!expiryValue) return false;

  const match = expiryValue.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(match[2]);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  if (year > currentYear) return true;
  if (year === currentYear && month >= currentMonth) return true;

  return false;
}

export default function Booking() {
  const { id } = useParams();
  const singer = singersData.find((s) => s.id === Number(id));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardName: "",
    eventDate: "",
    eventTime: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (!singer) {
    return (
      <div className="contact-page">
        <h2>Singer not found.</h2>
        <div className="booking-page-actions">
          <Link to="/browse" className="detail-back-btn">
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "eventDate") {
      if (value && !isDateAvailable(value, singer.availability)) {
        if (
          singer.availability.includes("Weekdays") &&
          !singer.availability.includes("Weekends")
        ) {
          setErrorMessage(`${singer.name} is only available on weekdays.`);
        } else if (
          singer.availability.includes("Weekends") &&
          !singer.availability.includes("Weekdays")
        ) {
          setErrorMessage(`${singer.name} is only available on weekends.`);
        } else {
          setErrorMessage("");
        }
      } else {
        setErrorMessage("");
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.eventDate) {
      setErrorMessage("Please choose an event date.");
      return;
    }

    if (!isDateAvailable(formData.eventDate, singer.availability)) {
      if (
        singer.availability.includes("Weekdays") &&
        !singer.availability.includes("Weekends")
      ) {
        setErrorMessage(`${singer.name} is only available on weekdays.`);
      } else if (
        singer.availability.includes("Weekends") &&
        !singer.availability.includes("Weekdays")
      ) {
        setErrorMessage(`${singer.name} is only available on weekends.`);
      } else {
        setErrorMessage("The selected date is not available.");
      }
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage("Phone number must be exactly 10 digits with no spaces.");
      return;
    }

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      setErrorMessage("Card number must be exactly 16 digits.");
      return;
    }

    if (!/^\d{3}$/.test(formData.cvc)) {
      setErrorMessage("CVV must be exactly 3 digits.");
      return;
    }

    if (!isFutureExpiry(formData.expiryDate)) {
      setErrorMessage(
        "Expiry date must be in MM/YY format and later than the current date."
      );
      return;
    }

    if (!formData.eventTime) {
      setErrorMessage("Please select a time slot.");
      return;
    }

    setErrorMessage("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="contact-page booking-page">
      <div className="booking-wrapper">
        <div className="booking-top-card">
          <h1>Pick a Date and Time</h1>

          <label>
            Select a Date:
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={getTodayString()}
              required
            />
          </label>

          <label>
            Select a Time:
            <select
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
            >
              <option value="">Select a time slot</option>
              <option value="1:00 PM - 5:00 PM">1:00 PM - 5:00 PM</option>
              <option value="6:00 PM - 10:00 PM">6:00 PM - 10:00 PM</option>
            </select>
          </label>
        </div>

        <form className="booking-main-card" onSubmit={handleSubmit}>
          <h1>Booking Form</h1>

          <h2>Your Information</h2>

          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number (no space):
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </label>

          <p className="booking-small-note">10-digit number only.</p>

          <h2>Your Payment Information</h2>

          <label>
            Card Number (16 digits, no spaces):
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </label>

          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            CVV:
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </label>

          <label>
            Name on Card:
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </label>

          {errorMessage && <p className="booking-error">{errorMessage}</p>}

          <button type="submit" className="booking-confirm-btn">
            Confirm Booking
          </button>
        </form>

        <div className="booking-page-actions">
          <Link to="/browse" className="detail-back-btn">
            Back to Browse
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <h2>Booking Confirmation</h2>

            <p
              style={{
                fontWeight: "bold",
                color: "#2e7d32",
                marginBottom: "16px",
              }}
            >
              You've booked successfully!
            </p>

            <p>
              <strong>Singer:</strong> {singer.name}
            </p>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Date:</strong> {formData.eventDate}
            </p>
            <p>
              <strong>Time:</strong> {formData.eventTime}
            </p>
            <p>
              <strong>Location:</strong> {singer.location}
            </p>

            <div className="booking-modal-actions">
              <button type="button" className="detail-back-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}