import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
function Signin(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    return(
        <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="h-screen w-full bg-[url('https://plus.unsplash.com/premium_photo-1680792152173-42a4572e3377?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGF5fGVufDB8fDB8fHww')] bg-cover bg-center">
            </div>
            <div className=" h-screen w-full flex justify-center items-center bg-stone-100 p-4">
                <div className="w-full max-w-md p-4 md:p-8 rounded-lg"> 
                    <Heading label={"Sign in"}></Heading>
                    <SubHeading label={"welcome back !!"}></SubHeading>
                    <Inputbox label={"Email"} placeholder={"amanjain@gmail.com"} onchange={(e)=>{setEmail(e.target.value)}}></Inputbox>
                    <Inputbox label={"Password"} placeholder={"123455"} onchange={(e)=>{setPassword(e.target.value)}}></Inputbox>
                    <Button label={"Submit"} onclick={async()=>{
                       const response = await axios.post('http://127.0.0.1:3000/api/v1/user/signin',{
                            username:email,
                            password:password
                        });
                        localStorage.setItem("token",response.data.token);
                    }}></Button>
                    <BottomWarning label={"Don't have an account?"} linkText={" sign up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}

export default Signin;
