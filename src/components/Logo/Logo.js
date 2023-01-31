import logoImg from "../../assets/images/UI/logo.png";
import "./logo.scss"
import { Link } from "react-router-dom";
import { getLogo } from "../../utils/utils";
import { useEffect } from "react";

function Logo(props) {

    const config = props.config;
    return (
        <Link to={'/'}>
            <div className="ui__logo">
                <div className="ui__logo__img">
                    <img src={config.customLogo ? getLogo() : logoImg} alt="Logo" />
                </div>
                <div className="ui__logo__title">
                    <h4>{config.title}</h4>
                    <p>{config.subtitle}</p>
                </div>
            </div>
        </Link>
    );
};

export default Logo;