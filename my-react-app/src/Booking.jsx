import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { singersData } from "./BrowseSingers";
import { useTranslation } from "react-i18next";
import "./Contact.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isDateAvailable(dateValue, availability) {
  if (!dateValue) return false;

  const chosenDate =
    dateValue instanceof Date
      ? dateValue
      : new Date(dateValue + "T00:00:00");

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
    eventDate: null,
    eventTime: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    eventDate: "",
    eventTime: "",
    firstName: "",
    lastName: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardName: "",
  });

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

  function getSingleFieldError(name, value) {
    if (name === "eventDate") {
      if (!value) return "";
      if (!isDateAvailable(value, singer.availability)) {
        if (singer.availability.includes("browse.weekdays") && !singer.availability.includes("browse.weekends")) {
          return t("booking.weekdaysOnly", { name: t(singer.nameKey) });
        }
        if (singer.availability.includes("browse.weekends") && !singer.availability.includes("browse.weekdays")) {
          return t("booking.weekendsOnly", { name: t(singer.nameKey) });
        }
        return t("booking.errorNotAvailable");
      }
      return "";
    }
    if (name === "phone") {
      if (!value) return "";
      if (!/^\d{10}$/.test(value)) return t("booking.errorPhone");
      return "";
    }
    if (name === "cardNumber") {
      if (!value) return "";
      if (!/^\d{16}$/.test(value)) return t("booking.errorCard");
      return "";
    }
    if (name === "expiryDate") {
      if (!value) return "";
      if (!isFutureExpiry(value)) return t("booking.errorExpiry");
      return "";
    }
    if (name === "cvc") {
      if (!value) return "";
      if (!/^\d{3}$/.test(value)) return t("booking.errorCvc");
      return "";
    }
    return "";
  }

  function filterSingerDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return false;

    return isDateAvailable(date, singer.availability);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const nextForm = {
      ...formData,
      [name]: value,
    };

    setFormData(nextForm);

    setFieldErrors((prev) => ({
      ...prev,
      [name]: getSingleFieldError(name, value),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {
      eventDate: "",
      eventTime: "",
      firstName: "",
      lastName: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardName: "",
    };

    if (!formData.eventDate) {
      nextErrors.eventDate = t("booking.errorChooseDate");
    } else if (!isDateAvailable(formData.eventDate, singer.availability)) {
      nextErrors.eventDate = t("booking.errorNotAvailable");
    }

    if (!formData.eventTime) nextErrors.eventTime = t("booking.errorTime");
    if (!formData.firstName) nextErrors.firstName = t("booking.required");
    if (!formData.lastName) nextErrors.lastName = t("booking.required");
    
    if (!formData.phone) {
      nextErrors.phone = t("booking.required");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      nextErrors.phone = t("booking.errorPhone");
    }

    if (!formData.cardNumber) {
      nextErrors.cardNumber = t("booking.required");
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      nextErrors.cardNumber = t("booking.errorCard");
    }

    if (!formData.expiryDate) {
      nextErrors.expiryDate = t("booking.required");
    } else if (!isFutureExpiry(formData.expiryDate)) {
      nextErrors.expiryDate = t("booking.errorExpiry");
    }

    if (!formData.cvc) {
      nextErrors.cvc = t("booking.required");
    } else if (!/^\d{3}$/.test(formData.cvc)) {
      nextErrors.cvc = t("booking.errorCvc");
    }

    if (!formData.cardName) nextErrors.cardName = t("booking.required");

    setFieldErrors(nextErrors);
    const hasErrors = Object.values(nextErrors).some((msg) => msg !== "");
    if (hasErrors) return;

    const bookingPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      eventDate: formData.eventDate,
      singerName: t(singer.nameKey),
      pricePerHour: singer.price
    };

    try {
      const response = await fetch("http://localhost:5000/api/book-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Could not connect to server.");
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="contact-page booking-page">
      <div className="booking-wrapper">
        <div className="booking-top-card">
          <h1>{t("booking.pickDateTime")}</h1>
          <p className="booking-singer-name">{t(singer.nameKey)}</p>

          <label>
            {t("booking.selectDate")}
            <DatePicker
              selected={formData.eventDate}
              onChange={(date) => {
                const nextForm = {
                  ...formData,
                  eventDate: date,
                };

                setFormData(nextForm);

                setFieldErrors((prev) => ({
                  ...prev,
                  eventDate: getSingleFieldError("eventDate", date),
                }));
              }}
              filterDate={filterSingerDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText={t("booking.selectDate")}
              className="contact-input"
              required
            />
            {fieldErrors.eventDate && (
              <span className="field-error">{fieldErrors.eventDate}</span>
            )}
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
              <option value="7:00 AM - 11:00 AM">{t("booking.time1")}</option>
              <option value="1:00 PM - 5:00 PM">{t("booking.time2")}</option>
              <option value="6:00 PM - 10:00 PM">{t("booking.time3")}</option>
            </select>
            {fieldErrors.eventTime && (
              <span className="field-error">{fieldErrors.eventTime}</span>
            )}
          </label>
        </div>

        <form className="booking-main-card" onSubmit={handleSubmit}>
          <h1>{t("booking.formTitle")}</h1>
          <h2>{t("booking.yourInfo")}</h2>

          <label>
            {t("booking.firstName")}
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {fieldErrors.firstName && <span className="field-error">{fieldErrors.firstName}</span>}
          </label>

          <label>
            {t("booking.lastName")}
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {fieldErrors.lastName && <span className="field-error">{fieldErrors.lastName}</span>}
          </label>

          <label>
            {t("booking.phone")}
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} inputMode="numeric" required />
            {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
          </label>

          <p className="booking-small-note">{t("booking.phoneNote")}</p>
          <h2>{t("booking.paymentInfo")}</h2>

          <label>
            {t("booking.cardNumber")}
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} inputMode="numeric" required />
            {fieldErrors.cardNumber && <span className="field-error">{fieldErrors.cardNumber}</span>}
          </label>

          <label>
            {t("booking.expiryDate")}
            <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
            {fieldErrors.expiryDate && <span className="field-error">{fieldErrors.expiryDate}</span>}
          </label>

          <label>
            {t("booking.cvc")}
            <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} inputMode="numeric" required />
            {fieldErrors.cvc && <span className="field-error">{fieldErrors.cvc}</span>}
          </label>

          <label>
            {t("booking.cardName")}
            <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} required />
            {fieldErrors.cardName && <span className="field-error">{fieldErrors.cardName}</span>}
          </label>

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
            <p style={{ fontWeight: "bold", color: "#2e7d32", marginBottom: "16px" }}>
              {t("booking.bookedSuccess")}
            </p>
            <p><strong>{t("booking.singer")}</strong> {t(singer.nameKey)}</p>
            <p><strong>{t("booking.name")}</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>{t("booking.phoneLabel")}</strong> {formData.phone}</p>
            <p>
              <strong>{t("booking.date")}</strong>{" "}
              {formData.eventDate
                ? formData.eventDate.toISOString().split("T")[0]
                : ""}
            </p>
            <p><strong>{t("booking.time")}</strong> {formData.eventTime}</p>
            <div className="booking-modal-actions">
              <button type="button" className="detail-back-btn" onClick={closeModal}>
                {t("booking.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
