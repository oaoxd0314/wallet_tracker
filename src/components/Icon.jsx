const Icon = ({icon , text=""}) =>{
    return <div className="icon group">
        {icon}

        {text 
            ? <span className="icon-tooltip group-hover:scale-100">{text}</span> 
            : null
        }
    </div>
}

export default Icon