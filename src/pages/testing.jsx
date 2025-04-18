import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import toast from "react-hot-toast";
//
//
export function Testing() {

    const [file, setFile] = useState(null)
    const supabase = createClient("https://jxbjfocsxvzbpiqpuyai.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Ympmb2NzeHZ6YnBpcXB1eWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTY5OTEsImV4cCI6MjA2MDQzMjk5MX0.bN1O--s3h0lP2DsSLmgfDw0PWaZKSzFy4TyLHk9e4KQ")

    function handleUpload() {
        const fileName = file.name
        const newFileName = new Date().getTime()+fileName

        supabase.storage.from("cbcimages").upload(newFileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(
            ()=>{
                toast.success("File uploaded successfully")
                const url = supabase.storage.from("cbcimages").getPublicUrl(newFileName).data.publicUrl
                console.log(url);
            }
        ).catch(
            ()=>{
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