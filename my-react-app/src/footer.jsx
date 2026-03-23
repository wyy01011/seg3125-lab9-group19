import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <h2 className="footer-brand">NoteMyWords</h2>
                <p className="footer-tagline">Musical Entertainment for Happy Marriages.</p>
                <p className="footer-copy">© 2026 NoteMyWords. All rights reserved.</p>
            </div>

            <div className="footer-right">
                <h3 className="footer-heading">Have any Concerns?</h3>
                <br></br>
                <Link className="singer-button" to="/contact">
                    Contact Us
                </Link>
            </div>
        </footer>
    );
}