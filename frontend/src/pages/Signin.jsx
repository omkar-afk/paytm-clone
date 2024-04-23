
import { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { backendUrl } from "../../config"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/Subheading';
import { InputBox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomBar } from '../components/BottomBar';
export function Signin(){
    const navigate = useNavigate();
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")

    async function handleClick(){
        try{
            const res = await axios.post(`${backendUrl}/users/check`,{username:email, password:pass})
            if(res.data.mssg == "user found"){
                const jwt = res.data.jwt
                Cookies.set('jwt', jwt, { expires: 7 });
                navigate('/dashboard');
            }else{
                alert("enter user data in correct format or signup first");
                setEmail("");
                setPass("");
            }
        }catch(e){
            console.log("error occured", e)
            alert("server is down")
        }
    }

    return <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex flex-col items-center h-fit w-80 bg-white p-3 rounded-lg shadow-md">
                <Heading title="Sign in"/>
                <SubHeading desc="Enter your information to login into account"/>
                <InputBox label="Email" placeholder="johndoe@example.com" id="email" type="email" setState={setEmail}/>
                <InputBox label="password" placeholder="*********" id="pass" type="password" setState={setPass} />
                <Button handleClick = {handleClick} text="Signin"/>
                <BottomBar link="/signup" label="Signup" />
        </div>
    </div>
}