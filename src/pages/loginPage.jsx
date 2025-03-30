export default function LoginPage() {
    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">
                
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <input 
                        type="email" 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        placeholder="Email"/>
                    <input 
                        type="password" 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        placeholder="Password"/>

                    <button className="w-[400px] h-[50px] bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-xl mt-[20px]">Login</button>
                </div>
            </div>
        </div>
    )
}