import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { singersData } from "./BrowseSingers";
import "./SingerDetail.css";

export default function SingerDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const singer = singersData.find((s) => s.id === Number(id));

  if (!singer) {
    return (
      <div className="singer-detail-page">
        <h2>{t("detail.notFound")}</h2>

        <Link to="/browse" className="detail-back-btn">
          {t("detail.backToBrowse")}
        </Link>
      </div>
    );
  }

  return (
    <div className="singer-detail-page">
      <div className="singer-detail-card">
        <img
          src={singer.image}
          alt={singer.name}
          className="singer-detail-image"
        />

        <div className="singer-detail-info">
          <h1>{singer.name}</h1>

          <p>
            <strong>{t("detail.availability")}:</strong>{" "}
            {singer.availability.join(", ")}
          </p>

          <p>
            <strong>{t("detail.genres")}:</strong>{" "}
            {singer.genres.join(", ")}
          </p>

          <p>
            <strong>{t("detail.price")}:</strong> ${singer.price}
            {t("detail.perHour")}
          </p>

          <p>
            <strong>{t("detail.location")}:</strong> {singer.location}
          </p>

          <p>
            <strong>{t("detail.languages")}:</strong>{" "}
            {singer.languages.join(", ")}
          </p>

          <p>
            <strong>{t("detail.experience")}:</strong>{" "}
            {singer.experience}
          </p>

          <p>
            <strong>{t("detail.bio")}:</strong> {singer.bio}
          </p>

          <div className="detail-actions">
            <Link to="/browse" className="detail-back-btn">
              {t("detail.backToBrowse")}
            </Link>

            <Link to={`/booking/${singer.id}`} className="detail-book-btn">
              {t("detail.bookNow")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}