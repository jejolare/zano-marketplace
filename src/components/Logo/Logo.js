import logoImg from "../../assets/images/UI/logo.png";
import "./logo.scss"
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to={'/'}>
            <div className="ui__logo">
                <div className="ui__logo__img">
                    <img src={logoImg} alt="Logo" />
                </div>
                <div className="ui__logo__title">
                    <h4>Zano</h4>
                    <p>Marketplace</p>
                </div>
            </div>
        </Link>
    );
};

export default Logo;