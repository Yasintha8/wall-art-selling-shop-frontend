import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
    "https://dapgqgtzhedndpiathtm.supabase.co",
    "sb_publishable_P61UXCL0wg33lXCNmEzqWw_AEctRRJo"
);

export default function mediaUpload(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newfileName = timeStamp + file.name

            supabase.storage.from("cbcimages").upload(newfileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                () => {
                    const url = supabase.storage.from("cbcimages").getPublicUrl(newfileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                () => {
                    toast.error("File upload failed")
                }
            )
        }
    )

    return promise

}