import cardImg from "../../assets/images/temp/Bitcoin.svg.png";
import currencyImg from "../../assets/images/UI/zano_1.svg";
import "./card.scss";

function Card() {
    return (
        <div className="ui__card">
            <div className="ui__card__background">
                <div className="ui__card__img">
                    <img src={cardImg} alt="Card" />
                </div>
            </div>
            <div className="ui__card__info">

                <div className="ui__card__main-info">
                    <div>
                        <h5>Test</h5>
                        <p>test cat</p>
                    </div>
                    <div className="ui__card__exp-data">
                        <h6>Expires in</h6>
                        <p>28 days</p>
                    </div>
                </div>

                <div className="ui__card__main-info">
                    <div>
                        <p>test</p>
                        <div className="ui__card__price">
                            <img src={currencyImg} alt="Zano" />
                            <p>1000</p>
                            <p className="ui__card__currency">ZANO</p>
                        </div>
                    </div>
                    <div className="ui__card__author">
                        <a href="/">@jejolare</a>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Card;