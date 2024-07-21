import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import ProjectForm from "../components/projectForm/projectform";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  
  const uri = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userRef = doc(db, "users", uri.username);
    const user = getDoc(userRef).then(
        (doc) => {
            if (doc.exists()) {
                const project = doc.data().projects;
                setProjects(project);
            } else {
                console.log("No such document!");
            }
        }
    ).catch((error) => {
        console.log("Error getting document:", error);

    });
    }
    , [uri.username]);

    /* const deleteProject = (id) => {
        const userRef = doc(db, "users", uri.username);
        getDoc(userRef).then((docSnap) => {
            const projects = docSnap.data().projects;
            projects.splice(id, 1);
            setDoc(doc(db, "users", uri.username), {
                name: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                photo: localStorage.getItem("photo"),
                projects: projects,
            });
        })
    } */

        const toProject = (id) => {
            navigate(`/project/${id}`); // Add the project id here
        }


  return (
    <>
        <div className="flex flex-col items-center justify-center md:grid grid-cols-2 lg:grid-cols-3 w-full">
            {
                projects.map((project, index) => {
                    return (
                        <div key={index} className="w-full p-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] h-40 w-full flex items-center justify-center">
                                    <h1 className="text-4xl text-white font-bold">{project.title}</h1>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600 text-sm">{project.description}</p>
                                </div>
                                <div className="flex justify-between items-center p-4">
                                    <button onClick={()=>toProject(project.id)} className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded">View</button>
                                    {/* <FontAwesomeIcon icon={faXmarkCircle} className="text-red-500 text-2xl cursor-pointer" /> */}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
      <div className="flex justify-center items-center w-screen p-3">
        {showForm ? (
          <div className="flex flex-col w-full">
            <div className="relative top-5 z-10 flex justify-center items-center">
              <FontAwesomeIcon
                onClick={() => setShowForm(false)}
                icon={faXmarkCircle}
                className="text-white font-semibold text-3xl cursor-pointer relative top-4"
              />
            </div>
            <ProjectForm setShowForm={setShowForm} />
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-md font-bold py-2 m-2 px-4 rounded"
          >
            Add Project
          </button>
        )}
      </div>
    </>
  );
}
