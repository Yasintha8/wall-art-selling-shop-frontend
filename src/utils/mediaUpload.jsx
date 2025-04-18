import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
    "https://jxbjfocsxvzbpiqpuyai.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Ympmb2NzeHZ6YnBpcXB1eWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTY5OTEsImV4cCI6MjA2MDQzMjk5MX0.bN1O--s3h0lP2DsSLmgfDw0PWaZKSzFy4TyLHk9e4KQ"
);

export default function mediaUpload(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if(file == null) {
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newfileName = timeStamp + file.name

            supabase.storage.from("cbcimages").upload(newfileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    const url = supabase.storage.from("cbcimages").getPublicUrl(newfileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                ()=>{
                    toast.error("File upload failed")
                }
            )
        }
    )

    return promise

}