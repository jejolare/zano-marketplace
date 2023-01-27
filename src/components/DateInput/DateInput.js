function DateInput(props) {
    return (
        <div className="ui__input ui__date-input">
            <input 
                type="date"     
                onChange={(e) => props.setValue(e.target.value)}
                value={props.value}
                min={props.min}
                max={props.max}
            />
        </div>
    );
}

export default DateInput;