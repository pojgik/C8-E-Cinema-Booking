import "./Style/Footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer">
            <ul>
            <li><Link to = "/contact-us"><a href="#">Contact Us</a></Link></li>
            </ul>
        </div>
    )
}

export default Footer;