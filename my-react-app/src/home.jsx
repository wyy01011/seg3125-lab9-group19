import { Link } from "react-router-dom";
import "./Home.css";
import HPImg from "./assets/homepagesinger.jpg";

export default function Home() {
  return (
    <div className="home-container">

      {/*HomePage Section*/}
      <section className="singer-section">
        <img src={HPImg} alt="Singer" className="singer-image" />

        <div className="singer-box">
          <h2>Book a singer to elevate your wedding!</h2>
          <Link className="singer-button" to="/browse">Book Now</Link>
        </div>
      </section>

    </div>
  );
}
