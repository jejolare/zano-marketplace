import './preloader.scss';

function Preloader(props) {
    function Loader() {
        return (
            <div className="ui__preloader__content">
                <div></div><div></div><div></div><div></div>
            </div>
        );
    }
    if (props.fullPage) {
        return (
            <div className="preloader">
                <Loader/>
            </div>
        );
    }


    return <Loader/>;
}

export default Preloader;