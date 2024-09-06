function Inputbox({label,placeholder,onchange}){
    return(
        <div className="p-2">
            <div className="text-xl font-medium text-amber-700 mb-2 cursor-default">{label}</div>
            <input placeholder={placeholder} onChange={onchange} className="font-medium text-black outline-none p-2 border-[1px] border-stone-400 rounded-lg w-full"/>
        </div>
    )
}

export default Inputbox;