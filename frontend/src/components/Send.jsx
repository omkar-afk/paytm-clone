import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { to } from './../assets/recoilstate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../config';
export function Send(){
    const navigate = useNavigate();
    const touser = useRecoilValue(to);
    const [amount, setAmount] = useState(0);
    function handleClick(){
        
        const jwt = Cookies.get('jwt');
        console.log(touser.id);
        axios.post(`${backendUrl}/account/transfer`,{to:touser.toId,amount}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res)=>{
            console.log(res.data);
            if(res.data.mssg == "Transfer successful" ) {alert("transfer complete")}
            else(alert("internal server error occured"))   
            navigate('/dashboard')         
    })
        .catch((e)=>{console.log(e);alert("axios error occured")})
    }
    return <div>
        <h1>Send Money</h1>
         <h3>{touser.fname} {touser.lname}</h3>
         <input type="number" placeholder='enter amount' onChange={(e)=>{setAmount(e.target.value)}}/>
         <button onClick={handleClick}>Initiate transfer</button>
    </div>
}