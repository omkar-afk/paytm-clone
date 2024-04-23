import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import axios from "axios";
import { backendUrl } from "../../config";
import { Link } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { to } from "../assets/recoilstate";
export function Dashboard(){
    const [balance , setBalance] = useState(0);
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const setTo = useSetRecoilState(to);

    useEffect(()=>{
        const jwt = Cookies.get('jwt');
        axios.get(`${backendUrl}/account/getbalance`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res)=>{setBalance(res.data.balance)})
    },[])

    useEffect(()=>{
        const jwt = Cookies.get('jwt');
        axios.get(`${backendUrl}/users/bulk?filter=${filter}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res)=>{setUsers(res.data)})
    },[filter])

    return <div>
        <h1>Payments App</h1>
        <h3>Your Balance {balance}</h3>
        <hr />
        <h3>Users</h3>
        <input type="text" placeholder="search users..." onChange={(e)=>{setFilter(e.target.value)}}/>
        {users.map((user =><div>
            <h3>{user.fname} {user.lname}</h3>
            <Link to='/send'><button onClick={()=>{setTo({toId:user.id,fname:user.fname, lname:user.lname})}}>Send Money</button></Link>
        </div>))}
    </div>
}