import { Link } from "react-router-dom"
export function BottomBar({link, label}){
    return <div className="flex w-full justify-center px-3">
        <p className="mr-3">Dont have an account</p>
        <Link to ={link} className="underline hover:underline-offset-2">{label}</Link>
    </div>
}