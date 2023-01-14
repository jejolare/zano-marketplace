import logoImg from "../../assets/images/UI/logo.png";
import "./logo.scss"

function Logo() {
    return (
        <div className="ui__logo">
            <div className="ui__logo__img">
                <img src={logoImg} alt="Logo" />
            </div>
            <div className="ui__logo__title">
                <h4>Zano</h4>
                <p>Marketplace</p>
            </div>
        </div>
    );
};

export default Logo;