function Balance({value}){
    return(
        <div className="flex align-baseline">
            <div className="text-xl font-semibold mr-2 ">
                Your Balance
            </div>
            <div className="text-lg font-normal"> Rs {value}</div>
        </div>
    )
}

export default Balance;