const Btn = ({title, name, onClick, style}) => {
    return(
        <button type="submit" style={style} className={name} onClick={onClick}>{title}</button>
    )
}

export default Btn;