import { useState } from "react"

export function NavBar(props){
    return <nav className="row-start-1 row-end-2
        w-screen h-16 flex-row flex justify-between text-center px-4 items-center bg-primary text-green-500">
        {props.children}
    </nav>
}

export function DropDownNavItem(props){
    const [open, setOpen] = useState(false);
    return(
        <div>
            <a onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </div>
    )
}


