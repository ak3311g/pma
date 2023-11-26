import { Link } from "react-router-dom";
import { store } from "../services/appSlice";

export default function Home() {

    if(store.getState().username === ""){
    return (
    <>
        <div className="w-screen h-[60vh] p-3">
            <div className="bg-blue-300 flex flex-col sm:flex-row w-full h-full pt-10 rounded-se-[60%] rounded-bl-[20%] rounded-ss-[90%] rounded-br-[90%]">
                <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                    <h1 className="text-xl sm:text-4xl font-bold text-center text-white">Welcome to the <br/> <span className="text-4xl sm:text-4xl text-yellow-400">ProMA</span></h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                    <Link to="/register" className="bg-blue-400 hover:bg-blue-500 text-white text-sm sm:text-xl font-bold py-2 m-2 px-4 rounded">Get Started</Link>
                </div>
            </div>
        </div>
        <div className="w-screen h-[60vh] p-3">
            <div className="flex flex-col w-full h-full">
                <p className="text-xl sm:text-4xl font-bold text-center text-white">About</p>
                <p className="text-md sm:text-2xl m-4 font-bold text-center text-blue-400">A Place to manage your projects</p>
            </div>
        </div>
    </>
    );
    }
    else
    {
        const username = store.getState().username;
        const img = store.getState().photo;

        return (
            <>
                <div className="w-screen h-[60vh] p-3 flex justify-center items-center">
                    <img src={img} alt="profile" className="rounded-full h-30 w-30"/>
                    <p className="text-xl sm:text-4xl font-bold text-center text-white">{username}</p>
                </div>
            </>
        )
    }
}