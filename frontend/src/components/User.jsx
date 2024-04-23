import { to } from "../assets/recoilstate";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
export function User({fname , lname, id}){
    const setTo = useSetRecoilState(to);
    return <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 mr-3 flex items-center justify-center rounded-full">{fname[0]+lname[0]}</div>
                    <div className="font-bold">{fname} {lname}</div>
                </div>
                <Link to='/send'><button onClick={()=>{console.log(id);setTo({toId:id,fname,lname})}} className="bg-black text-white p-1.5 my-3 border-2 border-black rounded-md hover:bg-white hover:text-black ">Send Money</button></Link>
            </div>
}