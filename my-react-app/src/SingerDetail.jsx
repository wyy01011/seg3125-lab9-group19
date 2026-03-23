import React from "react";
import { useParams, Link } from "react-router-dom";
import { singersData } from "./BrowseSingers";
import "./SingerDetail.css";

export default function SingerDetail() {
  const { id } = useParams();
  const singer = singersData.find((s) => s.id === Number(id));

  if (!singer) {
    return (
      <div className="singer-detail-page">
        <h2>Singer not found.</h2>
        <Link to="/browse" className="detail-back-btn">
          Back to Browse
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
            <strong>Availability:</strong> {singer.availability.join(", ")}
          </p>

          <p>
            <strong>Genres:</strong> {singer.genres.join(", ")}
          </p>

          <p>
            <strong>Price:</strong> ${singer.price}/hour
          </p>

          <p>
            <strong>Location:</strong> {singer.location}
          </p>

          <p>
            <strong>Languages:</strong> {singer.languages.join(", ")}
          </p>

          <p>
            <strong>Experience:</strong> {singer.experience}
          </p>

          <p>
            <strong>Bio:</strong> {singer.bio}
          </p>

          <div className="detail-actions">
            <Link to="/browse" className="detail-back-btn">
              Back to Browse
            </Link>

            <Link to={`/booking/${singer.id}`} className="detail-book-btn">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}