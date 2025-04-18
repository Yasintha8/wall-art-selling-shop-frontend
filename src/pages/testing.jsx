import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";
//
//
export function Testing() {

    const [file, setFile] = useState(null)

    function handleUpload() {
       mediaUpload(file).then(
            (url) => {
                console.log(url);
                toast.success("File uploaded successfully")
            }
       ). catch(
            (error) => {
                console.log(error);
                toast.error("File upload failed")
            }
       )
    }

    
    // const[number, setNumber] = useState(0)
    // const[status, setStatus] = useState("pending")
    
    // function increment() {
    //     let newValue = number+1;
    //     setNumber(newValue)
    // }

    // function decrement() {
    //     let newValue = number-1;
    //     setNumber(newValue)
    // }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            {/* <span className="text-3xl font-bold">{number}</span>
            <div className="w-full flex justify-center">
                <button onClick={increment} className="bg-blue-500  text-white p-2 rounded-lg w-[60px] mr-2 cursor-pointer ">+</button>
                <button onClick={decrement} className="bg-blue-500  text-white p-2 rounded-lg w-[60px] mr-2 cursor-pointer">-</button>
            </div>

            <span className="text-3xl font-bold">{status}</span>
            <div className="w-full flex justify-center">
                <button onClick=
                {()=>
                    setStatus("Passed")
                }
                className="bg-blue-500  text-white p-2 rounded-lg w-[60px] mr-2 cursor-pointer ">Pass</button>
                <button onClick=
                {()=>{
                    setStatus("Failed")
                }}
                className="bg-blue-500  text-white p-2 rounded-lg w-[60px] mr-2 cursor-pointer">Fail</button>
            </div> */}

            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0]);
                }
            } />
            <button onClick={handleUpload} className="bg-blue-500  text-white p-2 rounded-lg cursor-pointer">Upload</button>
        </div>
    )
}