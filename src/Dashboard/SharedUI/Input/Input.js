const Input = ({type, name, value, id, handleChange , className , onBlur ,error}) => {
    return(
        <input type={type} name={name} value={value} id={id} onBlur={onBlur} onChange={handleChange}  error={error}/>
    )
}

export default Input;