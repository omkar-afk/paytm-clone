
export function AppBar({fname,lname}){
    return <div className="flex justify-between h-14 items-center">
        <div className="font-bold text-xl">Payments App</div>
        <div className="flex items-center"><div className="font-medium">hello, {fname} {lname}</div><div className="w-8 h-8 bg-gray-200 ml-3 flex items-center justify-center rounded-full">U</div></div>
    </div>
}