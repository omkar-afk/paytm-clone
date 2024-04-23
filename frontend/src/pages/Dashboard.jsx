import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import axios from "axios";
import { backendUrl } from "../../config";
import { AppBar } from "../components/AppBar";
import { User } from "../components/User";
export function Dashboard(){
    const [balance , setBalance] = useState(0);
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        const jwt = Cookies.get('jwt');

        axios.get(`${backendUrl}/users/getinfo`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res)=>{setCurrentUser(res.data.user)})

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

    return <div className="mx-4">
        <AppBar fname={currentUser.fname} lname={currentUser.lname}/>
        <hr />
        <div className="flex items-center my-5">
            <div className="font-bold text-lg mr-2">Your Balance</div><div className="font-semibold">  ${balance}</div>
        </div>
        <div className="font-bold text-lg">Users</div>
        <input type="text" className="border-2 p-1 rounded-md  mt-2 pl-2 w-full mb-5" placeholder="Search users ..." onChange={(e)=>{setFilter(e.target.value)}}/>
        {users.map(user => <User fname={user.fname} lname= {user.lname} id={user.id}/>)}
    </div> 
}