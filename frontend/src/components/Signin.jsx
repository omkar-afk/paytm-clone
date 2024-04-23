
import { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { backendUrl } from "../../config"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                alert("enter user data in correct format");
                setEmail("");
                setPass("");
            }
        }catch(e){
            console.log("error occured", e)
            alert("server is down")
        }
    }

    return <div>
        <input type="email" value={email}placeholder="johndoe@example.com" onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password"value={pass} placeholder="*******" onChange={(e)=>{setPass(e.target.value)}}/>
        <button onClick={handleClick}>Signup</button>
        <p>Dont have an account</p>
        <Link to='/signup'>Signup</Link>
    </div>
}