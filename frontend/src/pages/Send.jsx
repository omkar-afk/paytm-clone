import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { to } from '../assets/recoilstate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Heading } from '../components/Heading';
import { InputBox } from "../components/Inputbox";
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
    return <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex flex-col items-center h-fit w-80 bg-white p-3 rounded-lg shadow-   md">
                <Heading title="SendMoney"/>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 mr-3 flex items-center justify-center rounded-full">{touser.fname[0]+touser.lname[0]}</div>
                    <div className="font-bold">{touser.fname} {touser.lname}</div>
                </div>
                <InputBox label="Amount in $" placeholder="Enter Amount" id="amount" type="number" setState={setAmount} />
                <div className="w-full px-3">
                    <button onClick = {handleClick} className="bg-green-400 text-white p-1.5 my-3 w-full border-2 border-green-400 hover:border-black rounded-md hover:bg-white hover:text-black ">
                    Initiate Transfer
                    </button>
                </div>
        </div>
    </div>


}