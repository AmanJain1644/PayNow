function Appbar({username}){
    return(
        <div className="flex justify-between p-4 border-b-2 border-slate-300 bg-gradient-to-r from bg-cyan-500 to to-blue-500 ">
        <div className="text-2xl cursor-pointer font-bold">PayNow</div>
        <div className="flex">
        <div className="text-lg font-medium">

        {username}
        </div>
            <div className="p-4 border-2 rounded-[50%] ml-2 cursor-pointer bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtbXklMjBwcm9maWxlfGVufDB8fDB8fHww')] bg-cover">
                
            </div>
        </div>
        </div>
    )
}

export default Appbar;