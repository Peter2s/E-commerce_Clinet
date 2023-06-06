const Btn = ({type, title, className, onClick}) => {
    return(
        <button type={type} className={className} onClick={onClick}>{title}</button>
    )
}

export default Btn;