import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { doc,setDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

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


    useEffect(() => {
        const projectData = props.project;
        setProjectData(projectData);
        console.log(props.project);
    }, [props.project]);

    return (
        <div className="w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] h-40 w-full flex items-center justify-center">
                    <h1 className="text-4xl text-white font-bold">{project?.title}</h1>
                </div>
                <div className="p-4">
                    <p className="text-gray-800">{project?.description}</p>
                    <div className="flex items-center justify-between mt-4">
                        <a href={project?.links?.repository} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Repository</a>
                        {
                            project?.links?.live &&
                            <a href={project?.links?.live} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Live</a>
                        }
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Link to={`/project/${project?.id}`} className="text-blue-500 hover:underline">View</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
