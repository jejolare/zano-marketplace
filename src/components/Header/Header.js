import "./header.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../SearchInput/SearchInput";
import { Store } from "../../store/store-reducer";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function Header(props) {
    const { state } = useContext(Store);
    const location = useLocation();

    return (
        <header className={state.config.noSearch && !location.pathname.includes('admin')  ? 'header_no-search' : ''}>
            <Logo config={state.config} />
            {props.children || <>{!state.config.noSearch && <SearchInput />}</>}
            {props.Button}
        </header>
    );
};

export default Header;