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
          alt={t(singer.nameKey)}
          className="singer-detail-image"
        />

        <div className="singer-detail-info">
          <p className="singerName">{t(singer.nameKey)}</p>

          <p>
            <strong>{t("detail.availability")}:</strong>{" "}
            {singer.availability.map((item) => t(item)).join(", ")}
          </p>

          <p>
            <strong>{t("detail.genres")}:</strong>{" "}
            {singer.genres.map((genre) => t(genre)).join(", ")}
          </p>

          <p>
            <strong>{t("detail.price")}:</strong> ${singer.price}
            {t("detail.perHour")}
          </p>

          <p>
            <strong>{t("detail.location")}:</strong> {t(singer.locationKey)}
          </p>

          <p>
            <strong>{t("detail.languages")}:</strong>{" "}
            {singer.languages.map((lang) => t(lang)).join(", ")}
          </p>

          <p>
            <strong>{t("detail.experience")}:</strong>{" "}
            {t(singer.experienceKey)}
          </p>

          <p>
            <strong>{t("detail.bio")}:</strong> {t(singer.bioKey)}
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