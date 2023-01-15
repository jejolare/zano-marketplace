import "./main.scss";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();
    return (
        <div className="main-page">
            <Header Button={<Button onMouseUp={() => navigate("/offer/add")}>New Offer</Button>}/>
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