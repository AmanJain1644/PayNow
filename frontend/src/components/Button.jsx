function Button({label,onclick}){
    return(
        <div className="m-2 p-2">
            <button onClick={onclick} className="text-white bg-black p-3 text-xl w-full rounded-md">{label}</button>
        </div>
    )
}

export default Button;