import "./header.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../SearchInput/SearchInput";
import Button from "../Button/Button";

function Header() {
    return (
        <header>
            <Logo />
            <SearchInput />
            <Button>New Offer</Button>
        </header>
    );
};

export default Header;