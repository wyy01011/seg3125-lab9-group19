import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { singersData } from "./BrowseSingers";
import { useTranslation } from "react-i18next";
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
  const day = chosenDate.getDay();

  const isWeekend = day === 0 || day === 6;
  const isWeekday = day >= 1 && day <= 5;

  const hasWeekdays = availability.includes("browse.weekdays");
  const hasWeekends = availability.includes("browse.weekends");

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
  const { t } = useTranslation();

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
        <h2>{t("booking.notFound")}</h2>
        <div className="booking-page-actions">
          <Link to="/browse" className="detail-back-btn">
            {t("booking.backToBrowse")}
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
          singer.availability.includes("browse.weekdays") &&
          !singer.availability.includes("browse.weekends")
        ) {
          setErrorMessage(
            t("booking.weekdaysOnly", { name: t(singer.nameKey) })
          );
        } else if (
          singer.availability.includes("browse.weekends") &&
          !singer.availability.includes("browse.weekdays")
        ) {
          setErrorMessage(
            t("booking.weekendsOnly", { name: t(singer.nameKey) })
          );
        } else {
          setErrorMessage(t("booking.errorNotAvailable"));
        }
      } else {
        setErrorMessage("");
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.eventDate) {
      setErrorMessage(t("booking.errorChooseDate"));
      return;
    }

    if (!isDateAvailable(formData.eventDate, singer.availability)) {
      if (
        singer.availability.includes("browse.weekdays") &&
        !singer.availability.includes("browse.weekends")
      ) {
        setErrorMessage(
          t("booking.weekdaysOnly", { name: t(singer.nameKey) })
        );
      } else if (
        singer.availability.includes("browse.weekends") &&
        !singer.availability.includes("browse.weekdays")
      ) {
        setErrorMessage(
          t("booking.weekendsOnly", { name: t(singer.nameKey) })
        );
      } else {
        setErrorMessage(t("booking.errorNotAvailable"));
      }
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage(t("booking.errorPhone"));
      return;
    }

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      setErrorMessage(t("booking.errorCard"));
      return;
    }

    if (!/^\d{3}$/.test(formData.cvc)) {
      setErrorMessage(t("booking.errorCvc"));
      return;
    }

    if (!isFutureExpiry(formData.expiryDate)) {
      setErrorMessage(t("booking.errorExpiry"));
      return;
    }

    if (!formData.eventTime) {
      setErrorMessage(t("booking.errorTime"));
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
          <h1>{t("booking.pickDateTime")}</h1>

          <label>
            {t("booking.selectDate")}
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
            {t("booking.selectTime")}
            <select
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
            >
              <option value="">{t("booking.selectTimeSlot")}</option>
              <option value="1:00 PM - 5:00 PM">{t("booking.time1")}</option>
              <option value="6:00 PM - 10:00 PM">{t("booking.time2")}</option>
            </select>
          </label>
        </div>

        <form className="booking-main-card" onSubmit={handleSubmit}>
          <h1>{t("booking.formTitle")}</h1>

          <h2>{t("booking.yourInfo")}</h2>

          <label>
            {t("booking.firstName")}
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {t("booking.lastName")}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {t("booking.phone")}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              required
            />
          </label>

          <p className="booking-small-note">{t("booking.phoneNote")}</p>

          <h2>{t("booking.paymentInfo")}</h2>

          <label>
            {t("booking.cardNumber")}
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
            {t("booking.expiryDate")}
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
            {t("booking.cvc")}
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
            {t("booking.cardName")}
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
            {t("booking.confirmBooking")}
          </button>
        </form>

        <div className="booking-page-actions">
          <Link to="/browse" className="detail-back-btn">
            {t("booking.backToBrowse")}
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <h2>{t("booking.confirmation")}</h2>

            <p
              style={{
                fontWeight: "bold",
                color: "#2e7d32",
                marginBottom: "16px",
              }}
            >
              {t("booking.bookedSuccess")}
            </p>

            <p>
              <strong>{t("booking.singer")}</strong> {t(singer.nameKey)}
            </p>
            <p>
              <strong>{t("booking.name")}</strong> {formData.firstName}{" "}
              {formData.lastName}
            </p>
            <p>
              <strong>{t("booking.phoneLabel")}</strong> {formData.phone}
            </p>
            <p>
              <strong>{t("booking.date")}</strong> {formData.eventDate}
            </p>
            <p>
              <strong>{t("booking.time")}</strong> {formData.eventTime}
            </p>
            <p>
              <strong>{t("booking.location")}</strong> {t(singer.locationKey)}
            </p>

            <div className="booking-modal-actions">
              <button
                type="button"
                className="detail-back-btn"
                onClick={closeModal}
              >
                {t("booking.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}