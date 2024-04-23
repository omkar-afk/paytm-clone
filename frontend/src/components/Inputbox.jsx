
    export function InputBox({label, placeholder,type,id,setState}){
        return<div className="flex flex-col w-full px-3 py-2 ">
        <label htmlFor={id} className="font-medium">{label}</label>
        <input type={type} className="border-2 p-1 rounded-md  mt-2 pl-2" id={id}placeholder={placeholder} onChange={(e)=>{setState(e.target.value)}}/>
    </div>
    }