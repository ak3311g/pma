import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { doc,setDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase";

export default function ProjectCard(props) {

    const gradient = [
        "linear-gradient(to top left, #ff5f6d, #ffc371)",
        "linear-gradient(to top left, #36D1DC, #5B86E5)",
        "linear-gradient(to top left, #D31027, #EA384D)",
        "linear-gradient(to top left, #F00000, #DC281E)",
        "linear-gradient(to top left, #833ab4, #fd1d1d, #fcb045)",
        "linear-gradient(to top left, #12c2e9, #c471ed, #f64f59)"
    ]

    const [selectedgradient, setGradient] = useState(gradient[Math.floor(Math.random() * gradient.length)]);

    const [project, setProjectData] = useState(null);

    useEffect(() => {
        // Fetch data from Firestore here
        const fetchData = async () => {
          try {
            const uid = localStorage.getItem("uid");
            if (!uid) {
              console.error("UID is undefined");
              return;
            }
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              const projects = docSnap.data().projects;
              setProjectData(projects[props.project]);
              console.log(projects[props.project]);
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, [props.project]);

    const updateDB = async () => {
        try {
            const uid = localStorage.getItem("uid");
            if (!uid) {
                console.error('UID is undefined');
                return;
            }
            const docRef = doc(db, "users", uid);
            getDoc(docRef).then((docSnap) => {
                console.log(docSnap.data());
                const projects = docSnap.data().projects;
                projects.splice(props.project, 1);
                setDoc(doc(db, "users", uid), {
                    name: localStorage.getItem("username"),
                    email: localStorage.getItem("email"),
                    photo: localStorage.getItem("photo"),
                    projects: projects,
                });
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    if (project === null) {
        return (
            <div className="flex bg-white shadow-lg rounded-lg m-4">
                <div className="flex flex-col justify-center items-center p-4 w-1/3">
                    <p className="text-xl font-semibold text-gray-900">No Projects</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <div className="relative flex flex-col md:flex-row justify-between bg-white shadow-lg rounded-lg m-4 border-4 p-2 ">

                    <div className="absolute top-0 right-0 p-4 z-10">
                        <FontAwesomeIcon icon={faXmarkCircle} className="text-red-500 text-xl cursor-pointer border-black border-2 rounded-xl" onClick={updateDB} />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full md:w-1/3 text-center z-0" style={{ background: selectedgradient }}>
                        <div className="flex flex-col justify-center items-center w-full h-full backdrop-brightness-75 backdrop-blur-xl p-3 z-0">
                            <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-100">{project.appName}</p>
                            <p className="text-md sm:text-lg md:text-xl font-semibold text-gray-300">{project.appDescription}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:w-1/3 h-full">
                        <p className="text-3xl text-center font-semibold text-gray-900 p-4">Tech-Stack</p>
                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 place-items-center">
                            {project.techStack.map((tech, index) => (
                                (
                                    <div key={index} className="">
                                        <p className="text-sm sm:text-md font-semibold text-black uppercase ">{tech}</p>
                                    </div>
                                )
                            ))}
                        </div>
                        <p className="text-3xl text-center font-semibold text-gray-900 p-4">Upcoming Features</p>
                        <div className="flex flex-col items-center justify-center p-4">
                            {project.upcomingFeatures.map((feature, index) => (
                                (
                                    <div key={index} className="flex flex-row items-center justify-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-sm sm:text-md font-semibold text-center text-black uppercase ">{feature}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 text-black text-xl font-bold bg-green-400 cursor-pointer w-full">Link</a>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full md:w-1/3 text-center" style={{ background: selectedgradient }}>
                        <p className="text-3xl text-center font-bold text-gray-200 p-4">More Details</p>
                        <div className="flex items-center justify-center p-4">
                            <p className="text-sm sm:text-md font-semibold text-white">{project.appDetails.startDate}</p>
                            <p className="text-sm sm:text-md font-semibold text-white m-3">-</p>
                            <p className="text-sm sm:text-md font-semibold text-white">{project.appDetails.endDate}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4">
                            <p className="text-xl sm:text-md font-semibold text-white">Status</p>
                            {project.appDetails.finished ? (<p className="text-xl sm:text-md font-semibold text-white m-3">Finished</p>) : (<p className="text-xl sm:text-md font-semibold text-white m-3">In Progress</p>)}
                            {project.appDetails.deployed ? (<p className="text-xl sm:text-md font-semibold text-white m-3">and Deployed</p>) : (<></>)}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

ProjectCard.propTypes = {
    project: PropTypes.number,
};