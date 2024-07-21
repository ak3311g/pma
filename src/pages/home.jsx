import { Link } from "react-router-dom";
import { store } from "../services/appSlice";
import { useDispatch } from "react-redux";
import { clearStore } from "../services/appSlice";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/project-card";
import { useEffect, useState } from "react";
import ProjectForm from "../components/projectForm/projectform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { addProjects } from "../services/appSlice";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState(store.getState().projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      let projects = [];
      projectsSnapshot.forEach((doc) => {
        if(doc.data().private && doc.data().owner !== localStorage.getItem("email").split("@")[0]) return;
        projects.push({...doc.data() , id: doc.id });
      });

      console.log(projects);
      setProjects(projects);
      dispatch(addProjects(projects));
    }
    fetchProjects();
  }
  , [dispatch]);


  const logout = () => {
    try {
      dispatch(clearStore());
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("photo");
      localStorage.removeItem("uid");
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };


  if (localStorage.getItem("username") === null) {
    return (
      <>
        <div className="w-screen h-[60vh] p-3">
          <div className="bg-blue-300 flex flex-col sm:flex-row w-full h-full pt-10 rounded-se-[60%] rounded-bl-[20%] rounded-ss-[90%] rounded-br-[90%]">
            <div className="flex flex-col items-center justify-center w-full md:w-1/2">
              <h1 className="text-xl sm:text-4xl font-bold text-center text-white">
                Welcome to the <br />{" "}
                <span className="text-4xl sm:text-4xl text-yellow-400">
                  ProMA
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full md:w-1/2">
              <Link
                to="/register"
                className="bg-blue-400 hover:bg-blue-500 text-white text-sm sm:text-xl font-bold py-2 m-2 px-4 rounded"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="w-screen h-[60vh] p-3">
          <div className="flex flex-col w-full h-full">
            <p className="text-xl sm:text-4xl font-bold text-center text-white">
              About
            </p>
            <p className="text-md sm:text-2xl m-4 font-bold text-center text-blue-400">
              A Place to manage your projects
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center items-center gap-5">
            {projects.map((project,index) => (
              <ProjectCard
                key={index}
                project={project}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
