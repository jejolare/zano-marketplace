import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Menu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Store } from "../../store/store-reducer";
import General from "./Routes/General";
import Filters from "./Routes/Filters";
import Styles from "./Routes/Styles";
import './admin.scss';

function Admin() {
    const { state } = useContext(Store);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!state.isAdmin || !state.isPrepared) {
            return navigate('/auth');
        } else {
            navigate('/admin/general'); 
        }
    }, []);

    return (
        <div className="admin-page">
            <Header
                Button={<Button onMouseUp={() => navigate('/')}>Main page</Button>}
            > 
                <Menu/>
            </Header>
            {params.type === 'general' && <General config={state.config}/> }
            {params.type === 'filters' && <Filters config={state.config}/> }
            {params.type === 'styles' && <Styles/> }
        </div>
    );
}

export default Admin;