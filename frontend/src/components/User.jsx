import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


export const Users = () => {
    const [users, setUsers] = useState([
        {
            username:"dummy@gmail.com",
            lastname:"dummy user",
            firstname:"dummy",
            password:"8493013039",
            _id:"r832u9408732890u342ufrwv"

        }
    ]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-2xl px-4">
            Users
        </div>
        <div className="my-2 px-4">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full  p-2 border rounded border-slate-600"></input>
        </div>
        <div className="px-4">
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0].toUpperCase() }
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful mb-4">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="bg-cyan-700 text-white font-semibold text-lg p-2 m-4 rounded-lg">
            <button className="w-[100px]" onClick={(e)=>{navigate("/send?id=" + user._id + "&name=" + user.firstname);}}>
               ₹ Pay
            </button>
        </div>
    </div>
}