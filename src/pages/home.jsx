import { Link } from "react-router-dom";
import { store } from "../services/appSlice";
import { useDispatch } from "react-redux";
import { clearStore } from "../services/appSlice";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/project-card";
import { useState } from "react";
import ProjectForm from "../components/projectform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { doc,setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { addProjects} from "../services/appSlice";
import ProjectForm2 from "../components/projectForm2";

export default function Home() {

    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState(store.getState().projects);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = () => {
        try {
            dispatch(clearStore());
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("photo");
            localStorage.removeItem("uid");
            navigate("/register");
        }
        catch (error) {
            console.log(error);
        }
    }

    const showProjects = async () => {
        try{const uid = localStorage.getItem("uid");
        const docRef =doc(db, "users", uid);
        const docSnap =await getDoc(docRef);
        if (docSnap.exists()) {
            setProjects(docSnap.data().projects);
            dispatch(addProjects(docSnap.data().projects));
        }
        else{
            setDoc(doc(db, "users", uid), {
                name: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                photo: localStorage.getItem("photo"),
                projects: [],
            });
        }}
        catch(error){
            console.log(error);
        }
    }

    if (localStorage.getItem("username") === null) {
        return (
            <>
                <div className="w-screen h-[60vh] p-3">
                    <div className="bg-blue-300 flex flex-col sm:flex-row w-full h-full pt-10 rounded-se-[60%] rounded-bl-[20%] rounded-ss-[90%] rounded-br-[90%]">
                        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                            <h1 className="text-xl sm:text-4xl font-bold text-center text-white">Welcome to the <br /> <span className="text-4xl sm:text-4xl text-yellow-400">ProMA</span></h1>
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
    else {
        const username = localStorage.getItem("username");
        const img = localStorage.getItem("photo");
        showProjects();

        return (
            <>

                <div className="w-screen h-[60vh] p-3 flex flex-col gap-2 justify-center items-center">
                    <img src={img} alt="profile" className="rounded-full h-30 w-30" />
                    <p className="text-xl sm:text-4xl font-bold text-center text-white">{username}</p>
                    <button onClick={logout} className="bg-purple-500 hover:bg-blue-500 text-white text-sm sm:text-md font-bold py-2 m-2 px-4 rounded">Logout</button>
                </div>

                <div className="flex justify-center items-center w-screen p-3">
                    {
                        showForm ? (<div className="flex flex-col w-full">
                            <div className="relative">
                                <FontAwesomeIcon onClick={() => setShowForm(false)} icon={faXmarkCircle} className="absolute right-0 md:right-[13%] m-3 text-4xl text-red-500 hover:text-red-600 cursor-pointer" />
                            </div>
                            <ProjectForm />
                            {/* <ProjectForm2 /> */}
                        </div>) : <button onClick={() => setShowForm(true)} className="bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-md font-bold py-2 m-2 px-4 rounded">Add Project</button>
                    }
                </div>

                <div className="flex flex-col">
                    {
                        projects.map((pro, index) => {
                            return <ProjectCard key={index} project={index} />
                        }
                        )}
                </div>
            </>
        )
    }
}