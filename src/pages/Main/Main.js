import "./main.scss";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store-reducer";
import { useContext, useState, useEffect } from "react";
import { getOffersFromRPC } from "../../utils/rpc.js";
import { ReactComponent as ProfileImg } from "../../assets/images/UI/user.svg";

function Main() {
    const navigate = useNavigate();
    const { state } = useContext(Store);

    const [loadedCards, setLoadedCards] = useState([]);
    const [profilePage, setProfilePageState] = useState(false);

    function HeaderBtn() {
        if (state.config.allowPosts) {
            return (
                <div className="header-offers">
                    <div 
                        className={"ui__button " + (profilePage ? 'profile-page_selected' : '')} 
                        onMouseUp={() => setProfilePageState(!profilePage)}
                    >
                        <ProfileImg/>
                    </div>
                    <Button onMouseUp={() => navigate("/offer/add")}>New Offer</Button>
                </div>
            );
        }
        return <></>;
    }


    async function loadCards() {
        const result = await getOffersFromRPC({ 
            ...state.config?.filters,
            search: state.search
        });
        console.log(result);
        return [];
    }

    useEffect(() => {
        if (state.config?.filters?.offersPerPage) {
            loadCards(state.config?.filters?.offersPerPage)
        }
    }, [state.search]);

    return (
        <div className="main-page">
            <Header 
                Button={<HeaderBtn/>}
            />
            <main>
                <div className="main-page__marketplace">
                    {loadedCards}
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>
                    <Card allowAction={profilePage}/>    
                </div>
            </main>
        </div>
    );
}

export default Main;