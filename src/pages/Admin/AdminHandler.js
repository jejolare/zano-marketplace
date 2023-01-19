import { useContext, } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { Store } from "../../store/store-reducer";
import Button from "../../components/Button/Button";
import Popup from "../../components/Popup/Popup";
import './admin.scss';

function AdminHandler() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useContext(Store);

    function AdminBtn() {
        return (
            <Button className="admin-page__handler" onMouseUp={() => navigate('/admin')}>Admin settings</Button>
        );
    }

    if (state.isAdmin && state.isPrepared && !location.pathname.includes('admin')) return (
        <Popup
            noPointer={true}
            Content={AdminBtn}
        />
    );

    return (<></>);
}

export default AdminHandler;