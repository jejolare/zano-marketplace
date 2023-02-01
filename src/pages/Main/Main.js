import "./main.scss";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store-reducer";
import { useContext, useState, useEffect } from "react";
import { getOffersFromRPC } from "../../utils/rpc.js";
import { ReactComponent as ProfileImg } from "../../assets/images/UI/user.svg";
import { nanoid } from "nanoid";
import sha256 from "sha256";
import { getOwnerOffers } from "../../utils/utils";

function Main() {
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const [loadedCards, setLoadedCards] = useState([]);
    const [profilePage, setProfilePageState] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const [allowActions, setAllowActions] = useState(false);

    function HeaderBtn() {
        if (state.config.allowPosts || state.isAdmin) {
            return (
                <div className="header-offers">
                    <div 
                        className={"ui__button " + (profilePage || allowActions ? 'profile-page_selected' : '')} 
                        onMouseUp={() => state.isAdmin ? setAllowActions(!allowActions) : setProfilePageState(!profilePage)}
                    >
                        <ProfileImg/>
                    </div>
                    <Button onMouseUp={() => navigate("/offer/add")}>New Offer</Button>
                </div>
            );
        }
        return <></>;
    }

    async function loadOffers(params) {

        const { offset, search, profile } = params;

        if (!state.config?.filters?.offersPerPage) return;

        if (allLoaded && !search) {
            return console.log('all loaded');
        }

        function getOrder(sort) {
            switch (sort) {
                case 'Amount of Zano':
                    return 1;
            
                case 'Publication date':
                    return 0;

                case 'Location':
                    return 6;

                default:
                    return 0;
            }
        }
        
        const config = { 
            ...state.config?.filters,
            search: state.search,
            offset: search ? 0 : offset,
            offersPerPage: search || profile ? 100000 : state.config?.filters.offersPerPage,
            order_by: getOrder(state.config?.filters?.sort)
        };

        const result = !state.config?.allowPosts ?  (await getOwnerOffers(config)) : (await getOffersFromRPC(config));

        const cardsList = result.offers.map(e => ({
            title: decodeURI(e.t),
            description: decodeURI(e.do),
            price: decodeURI(e.ap), 
            category: decodeURI(e.cat),
            image: decodeURI(e.url),
            contact: decodeURI(e.cnt),
            comment: decodeURI(e.com),
            tx: e.tx_hash
        }))
        .map(e => {
            if (!profile) return e;

            const paramsString = [
                e.title,
                e.category,
                e.description,
                e.contact,
                e.image,
                e.comment
            ].join(', ');
            const storage = JSON.parse(localStorage.getItem('my-offers') || '[]');
            if (storage.includes(sha256(paramsString))) {
                return e;
            }

            return;
        })
        .filter(e => e);

        const filteredData = cardsList.filter(e => loadedCards.every(card => card.tx !== e.tx))

        if (search) {
            setLoadedCards(cardsList);
        } else {
            setLoadedCards([...loadedCards, ...filteredData]);
        }

        if (cardsList.length < state.config?.filters?.offersPerPage) {
            setAllLoaded(true);
        }
    }

    const offset = loadedCards.length === 0 ? 0 : (loadedCards.length + (state.config?.filters?.offersPerPage - 1));

    useEffect(() => {
        if (state.search) {
            loadOffers({
                offset,
                search: true
            });
        } else {
            setAllLoaded(false);
            setLoadedCards([]);
        }
    }, [state.search]);

    useEffect(() => {
        if (!loadedCards[0]) {
            loadOffers({ offset, profile: profilePage });
        }
    }, [loadedCards])

    useEffect(() => {   
        if (!state.search) {
            loadOffers({ offset });
        }
    }, [state.config?.filters]);
    

    useEffect(() => {
        setAllLoaded(false);
        setLoadedCards([]);
    }, [profilePage])

    return (
        <div className="main-page">
            <Header 
                Button={<HeaderBtn/>}
            />
            <main>
                <div className="main-page__marketplace">
                    {loadedCards.map(e => <Card key={e.tx_hash + nanoid()} allowAction={allowActions} {...e}/>)}
                </div>
                <div 
                    className={
                        "main-page__loader " + 
                        (allLoaded && loadedCards.length === 0 ? 'main-page__loader_centered' : '')
                    }
                >
                    {!allLoaded && !state.search && !profilePage &&
                        <Button onMouseUp={() => loadOffers({ offset })}>Load more</Button> 
                    }
                    {allLoaded && loadedCards.length === 0 &&
                        <>
                            {state.search && <h2>Nothing found for your search</h2>}
                            {!state.search && <h2>There are no offers here yet</h2>}
                        </>
                    }
                    {/* {allLoaded && loadedCards.length !== 0 &&
                        <h2>There are no more offers</h2>
                    } */}
                </div>
            </main>
        </div>
    );
}

export default Main;