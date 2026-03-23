import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BrowseSingers.css";

import ianImg from "./assets/ian.jpg";
import sabrinaImg from "./assets/sabrina.jpg";
import shigaImg from "./assets/shiga.jpg";
import joeImg from "./assets/joe.jpg";
import teddyImg from "./assets/teddy.jpg";

export const singersData = [
  {
  id: 1,
  name: "Ian Chan",
  image: ianImg,
  availability: ["Weekdays"],
  genres: ["Pop", "Jazz", "R&B"],
  price: 200,
  location: "Hong Kong",
  languages: ["Cantonese", "English"],
  experience: "5 years",
  bio: "Ian Chan is a versatile singer known for pop, jazz, and R&B performances. He is suitable for live stages, school events, and formal performances."
  },
  {
  id: 2,
  name: "Sabrina Carpenter",
  image: sabrinaImg,
  availability: ["Weekends"],
  genres: ["R&B", "Pop"],
  price: 85,
  location: "Los Angeles",
  languages: ["English"],
  experience: "6 years",
  bio: "Sabrina Carpenter is a pop and R&B singer who performs well in energetic and youth-oriented events."
  },
  {
  id: 3,
  name: "Shiga Lin",
  image: shigaImg,
  availability: ["Weekdays", "Weekends"],
  genres: ["Pop", "Jazz"],
  price: 95,
  location: "Hong Kong",
  languages: ["Cantonese", "Mandarin", "English"],
  experience: "7 years",
  bio: "Shiga Lin is known for elegant stage presence and strong vocal delivery, suitable for both casual and formal event settings."
  },
  {
  id: 4,
  name: "Joe Jonas",
  image: joeImg,
  availability: ["Weekdays"],
  genres: ["Jazz", "R&B"],
  price: 75,
  location: "New York",
  languages: ["English"],
  experience: "8 years",
  bio: "Joe Jonas is an experienced performer with a strong background in live shows and audience interaction."
  },
  {
  id: 5,
  name: "Teddy Fan",
  image: teddyImg,
  availability: ["Weekdays", "Weekends"],
  genres: ["Pop"],
  price: 80,
  location: "Hong Kong",
  languages: ["Cantonese", "English"],
  experience: "4 years",
  bio: "Teddy Fan is a pop singer suitable for private parties, school events, and community performances."
  },
];

export default function BrowseSingers() {
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

  const filteredSingers = singersData.filter(function (singer) {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch = singer.name.toLowerCase().includes(lowerSearch)

    const matchesAvailability =
      (!weekdaysChecked && !weekendsChecked) ||
      (weekdaysChecked && singer.availability.includes("Weekdays")) ||
      (weekendsChecked && singer.availability.includes("Weekends"));

    const matchesGenre =
      (!rnbChecked && !jazzChecked && !popChecked) ||
      (rnbChecked && singer.genres.includes("R&B")) ||
      (jazzChecked && singer.genres.includes("Jazz")) ||
      (popChecked && singer.genres.includes("Pop"));

    const matchesPrice = singer.price <= maxPrice;

    return (
      matchesSearch && matchesAvailability && matchesGenre && matchesPrice
    );
  });

  return (
    <div className="browse-page">

      <div className="browse-content">
        <aside className="filter-panel">
        <div className="filter-header">
          <h2>Filter</h2>
          <div className="card-actions">
            <button className="clear-btn" onClick={clearFilters}>Remove all</button>
        </div>
        </div>
          
          <div className="filter-group">
            <h3>Availability</h3>

            <label>
              <input
                type="checkbox"
                checked={weekdaysChecked}
                onChange={() => setWeekdaysChecked(!weekdaysChecked)}
              />
              Weekdays
            </label>

            <label>
              <input
                type="checkbox"
                checked={weekendsChecked}
                onChange={() => setWeekendsChecked(!weekendsChecked)}
              />
              Weekends
            </label>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <p>0 - {maxPrice}</p>
            <input
              type="range"
              min="0"
              max="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-group">
            <h3>Type of Music</h3>

            <label>
              <input
                type="checkbox"
                checked={rnbChecked}
                onChange={() => setRnbChecked(!rnbChecked)}
              />
              R&B
            </label>

            <label>
              <input
                type="checkbox"
                checked={jazzChecked}
                onChange={() => setJazzChecked(!jazzChecked)}
              />
              Jazz
            </label>

            <label>
              <input
                type="checkbox"
                checked={popChecked}
                onChange={() => setPopChecked(!popChecked)}
              />
              Pop
            </label>
          </div>
        </aside>

        <main className="main-section">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Enter singer name"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="card-grid">
            {filteredSingers.length > 0 ? (
              filteredSingers.map(function (singer) {
                return (
                  <div className="singer-card" key={singer.id}>
                    <img
                      src={singer.image}
                      alt={singer.name}
                      className="singer-image-browse"
                    />

                    <div className="singer-info">
                      <h4>{singer.name}</h4>
                      <ul>
                        <li>Available {singer.availability.join(", ").toLowerCase()}</li>
                        <li>{singer.genres.join(", ")}</li>
                        <li>${singer.price}/hour</li>
                      </ul>
                    </div>

                    <div className="card-actions">
                      <Link to={`/singer/${singer.id}`} className="learn-btn">
                        Learn More
                      </Link>

                      <Link to={`/booking/${singer.id}`} className="learn-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (

              // If no singers match the filters, show a message
              <p className="no-results">No singers match your filters.</p>
            )}
          </div>
        </main>
      </div>

      
    </div>
  );
}  