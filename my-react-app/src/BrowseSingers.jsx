import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./BrowseSingers.css";

import ianImg from "./assets/ian.jpg";
import sabrinaImg from "./assets/sabrina.jpg";
import shigaImg from "./assets/shiga.jpg";
import joeImg from "./assets/joe.jpg";
import teddyImg from "./assets/teddy.jpg";

export const singersData = [
  {
    id: 1,
    nameKey: "singers.ian.name",
    image: ianImg,
    availability: ["browse.weekdays"],
    genres: ["browse.pop", "browse.jazz", "browse.rnb"],
    price: 200,
    locationKey: "singers.ian.location",
    languages: ["languages.cantonese", "languages.english"],
    experienceKey: "singers.ian.experience",
    bioKey: "singers.ian.bio",
  },
  {
    id: 2,
    nameKey: "singers.sabrina.name",
    image: sabrinaImg,
    availability: ["browse.weekends"],
    genres: ["browse.rnb", "browse.pop"],
    price: 85,
    locationKey: "singers.sabrina.location",
    languages: ["languages.english"],
    experienceKey: "singers.sabrina.experience",
    bioKey: "singers.sabrina.bio",
  },
  {
    id: 3,
    nameKey: "singers.shiga.name",
    image: shigaImg,
    availability: ["browse.weekdays", "browse.weekends"],
    genres: ["browse.pop", "browse.jazz"],
    price: 95,
    locationKey: "singers.shiga.location",
    languages: ["languages.cantonese", "languages.mandarin", "languages.english"],
    experienceKey: "singers.shiga.experience",
    bioKey: "singers.shiga.bio",
  },
  {
    id: 4,
    nameKey: "singers.joe.name",
    image: joeImg,
    availability: ["browse.weekdays"],
    genres: ["browse.jazz", "browse.rnb"],
    price: 75,
    locationKey: "singers.joe.location",
    languages: ["languages.english"],
    experienceKey: "singers.joe.experience",
    bioKey: "singers.joe.bio",
  },
  {
    id: 5,
    nameKey: "singers.teddy.name",
    image: teddyImg,
    availability: ["browse.weekdays", "browse.weekends"],
    genres: ["browse.pop"],
    price: 80,
    locationKey: "singers.teddy.location",
    languages: ["languages.cantonese", "languages.english"],
    experienceKey: "singers.teddy.experience",
    bioKey: "singers.teddy.bio",
  },
];

export default function BrowseSingers() {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [weekdaysChecked, setWeekdaysChecked] = useState(false);
  const [weekendsChecked, setWeekendsChecked] = useState(false);
  const [rnbChecked, setRnbChecked] = useState(false);
  const [jazzChecked, setJazzChecked] = useState(false);
  const [popChecked, setPopChecked] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);

  function clearFilters() {
    setSearchTerm("");
    setWeekdaysChecked(false);
    setWeekendsChecked(false);
    setRnbChecked(false);
    setJazzChecked(false);
    setPopChecked(false);
    setMaxPrice(200);
  }

  const filteredSingers = singersData.filter((singer) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch = t(singer.nameKey).includes(lowerSearch);

    const matchesAvailability =
      (!weekdaysChecked && !weekendsChecked) ||
      (weekdaysChecked && singer.availability.includes("browse.weekdays")) ||
      (weekendsChecked && singer.availability.includes("browse.weekends"));

    const matchesGenre =
      (!rnbChecked && !jazzChecked && !popChecked) ||
      (rnbChecked && singer.genres.includes("browse.rnb")) ||
      (jazzChecked && singer.genres.includes("browse.jazz")) ||
      (popChecked && singer.genres.includes("browse.pop"));

    const matchesPrice = singer.price <= maxPrice;

    return matchesSearch && matchesAvailability && matchesGenre && matchesPrice;
  });

  return (
    <div className="browse-page">
      <div className="browse-content">

        {/* FILTER PANEL */}
        <aside className="filter-panel">
          <div className="filter-header">
            <h2>{t("browse.filter")}</h2>
            <button className="clear-btn" onClick={clearFilters}>
              {t("browse.removeAll")}
            </button>
          </div>

          <div className="filter-group">
            <h3>{t("browse.availability")}</h3>

            <label>
              <input
                type="checkbox"
                checked={weekdaysChecked}
                onChange={() => setWeekdaysChecked(!weekdaysChecked)}
              />
              {t("browse.weekdays")}
            </label>

            <label>
              <input
                type="checkbox"
                checked={weekendsChecked}
                onChange={() => setWeekendsChecked(!weekendsChecked)}
              />
              {t("browse.weekends")}
            </label>
          </div>

          <div className="filter-group">
            <h3>{t("browse.price")}</h3>
            <p>0 - {maxPrice}</p>

            <input
              type="range"
              min="0"
              max="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <h3>{t("browse.musicType")}</h3>

            <label>
              <input
                type="checkbox"
                checked={rnbChecked}
                onChange={() => setRnbChecked(!rnbChecked)}
              />
              {t("browse.rnb")}
            </label>

            <label>
              <input
                type="checkbox"
                checked={jazzChecked}
                onChange={() => setJazzChecked(!jazzChecked)}
              />
              {t("browse.jazz")}
            </label>

            <label>
              <input
                type="checkbox"
                checked={popChecked}
                onChange={() => setPopChecked(!popChecked)}
              />
              {t("browse.pop")}
            </label>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main-section">

          <input
            type="text"
            placeholder={t("browse.searchPlaceholder")}
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="card-grid">
            {filteredSingers.length > 0 ? (
              filteredSingers.map((singer) => (
                <div className="singer-card" key={singer.id}>
                  <img src={singer.image} alt={singer.name} className="singer-image-browse"/>

                  <h4>{t(singer.nameKey)}</h4>

                  <ul>
                    <li>
                      {t("browse.available")}{" "}
                      {singer.availability.map((item) => t(item)).join(", ")}
                    </li>

                    <li>{singer.genres.map((genre) => t(genre)).join(", ")}</li>

                    <li>${singer.price}{t("detail.perHour")}</li>
                  </ul>
                                    

                  <Link to={`/singer/${singer.id}`} className="learn-btn">
                    {t("browse.learnMore")}
                  </Link>

                  <Link to={`/booking/${singer.id}`} className="learn-btn">
                    {t("browse.bookNow")}
                  </Link>
                </div>
              ))
            ) : (
              <p>{t("browse.noResults")}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}