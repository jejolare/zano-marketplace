import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../utils/utils";
import { useEffect } from "react";

function Admin() {

    const navigate = useNavigate();

    useEffect(() => {
        checkAuth()
        .then((res) => {
            if (!res) navigate('/auth')
        });
    }, []);

    return (
        <div>
            <Header
                Button={<Button onMouseUp={() => navigate('/')}>Main page</Button>}
            />
        </div>
    );
}

export default Admin;