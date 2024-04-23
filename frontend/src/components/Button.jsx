export function Button({handleClick,text}){
    return <div className="w-full px-3">
    <button onClick = {handleClick} className="bg-black text-white p-1.5 my-3 w-full border-2 border-black rounded-md hover:bg-white hover:text-black ">
        {text}
    </button>
    </div>
}