import { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { backendUrl } from "../../config"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export function Signup(){
    const navigate = useNavigate();
    const [fname , setFname] = useState("")
    const [lname , setLname] = useState("")
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")

    async function handleClick(){
        try{
            const res = await axios.post(`${backendUrl}/users/save`,{fname, lname, username:email, password:pass})
            if(res.data.mssg == "user inserted"){
                const jwt = res.data.jwt
                Cookies.set('jwt', jwt, { expires: 7 });
                navigate('/dashboard');
            }else{
                alert("enter user data in correct format");
                setFname("");
                setEmail("");
                setPass("");
                setLname("");
            }
        }catch(e){
            console.log("error occured", e)
            alert("server is down")
        }
    }

    return <div>
        <input type="text"  value={fname}placeholder="John" onChange={(e)=>{setFname(e.target.value)}} />
        <input type="text" value={lname} placeholder="Doe" onChange={(e)=>{setLname(e.target.value)}}/>
        <input type="email" value={email}placeholder="johndoe@example.com" onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password"value={pass} placeholder="*******" onChange={(e)=>{setPass(e.target.value)}}/>
        <button onClick={handleClick}>Signup</button>
        <p>Already have an account</p>
        <Link to='/signin'>Signin</Link>
    </div>
}