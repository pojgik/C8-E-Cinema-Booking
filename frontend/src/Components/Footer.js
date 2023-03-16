import "./Style/Footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer">
            <ul>
            <li><Link to = "/contact-us">Contact Us</Link></li>
            </ul>
        </div>
    )
}

export default Footer;