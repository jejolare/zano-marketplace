import "./form.scss";

function Form(props) {
    return (
        <form className="ui__form" action="/" onSubmit={e => e.preventDefault()}>
            {props.children}
        </form>
    );
}

export default Form;