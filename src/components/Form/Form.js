import "./form.scss";

function Form(props) {
    return (
        <form className="ui__form" action="/">
            {props.children}
        </form>
    );
}

export default Form;