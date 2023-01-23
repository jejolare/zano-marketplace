import "./main.scss";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store-reducer";
import { useContext } from "react";

function Main() {
    const navigate = useNavigate();
    const { state } = useContext(Store);

    function HeaderBtn() {
        if (state.config.allowPosts) {
            return <Button onMouseUp={() => navigate("/offer/add")}>New Offer</Button>;
        }
        return <></>;
    }

    return (
        <div className="main-page">
            <Header 
                Button={<HeaderBtn/>}
            />
            <main>
                <div className="main-page__marketplace">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />    
                </div>
            </main>
        </div>
    );
}

export default Main;