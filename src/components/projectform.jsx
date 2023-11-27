import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { store } from "../services/appSlice";

export default function ProjectForm() {

    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [techStack, setTechStack] = useState([]);
    const [appDetails, setAppDetails] = useState({
        startDate: "",
        endDate: "",
        finished: false,
        deployed: false,
    });
    const [upcomingFeatures, setUpcomingFeatures] = useState([]);
    const [link, setLink] = useState("");
    const [feature, setFeature] = useState("");
    const [tech, setTech] = useState("");


    const submitdata = () => {
        const data = {
            appName: appName,
            appDescription: appDescription,
            techStack: techStack,
            appDetails: appDetails,
            upcomingFeatures: upcomingFeatures,
            link: link,
        }
        console.log(data);
        
        const uid = store.getState().id;
        const docRef = doc(db, "users", uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const projects = docSnap.data().projects;
                projects.push(data);
                setDoc(doc(db, "users", uid), {
                    email: docSnap.data().email,
                    photo: docSnap.data().photo,
                    projects: projects,
                    username: docSnap.data().username,
                });
            }
        })
    }

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="w-full md:w-3/4 h-3/4 border-2 border-white rounded-3xl p-4">
                    <p className="text-xl sm:text-4xl font-bold text-center text-white m-3">Add a Project</p>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full">
                            <p className="text-sm sm:text-md md:text-2xl m-1 font-bold text-center text-blue-400">App Name</p>
                            <input type="text" onChange={(e) => setAppName(e.target.value)} className="text-[10px] sm:text-md md:text-2xl m-1 font-bold text-center text-blue-400" required />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full">
                            <p className="text-sm sm:text-md md:text-2xl m-1 font-bold text-center text-blue-400">App Description</p>
                            <input type="text" onChange={(e) => setAppDescription(e.target.value)} className="text-[10px] sm:text-md md:text-2xl m-1 font-bold text-center text-blue-400" required />
                        </div>
                    </div>
                    <div className="flex flex-col w-full my-4">
                        <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Tech Stack</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center">
                            {
                                techStack.map((tech,index) => {
                                    return (
                                        <div key={index} className="flex gap-1 mx-1 w-fit justify-center">
                                            <p className="text-md md:text-2xl font-bold text-center text-green-400">{tech}</p>
                                            <button onClick={() => {
                                                const newTechStack = techStack.filter((techItem) => {
                                                    return techItem !== tech;
                                                })
                                                setTechStack(newTechStack);
                                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faXmark} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <input type="text" onChange={(e) => {
                                setTech(e.target.value)
                            }} className="text-md md:text-2xl font-bold text-center text-blue-400" />
                            <button onClick={() => {tech!=""?setTechStack([...techStack, tech]):(alert("Enter Tech"))}} className="text-md md:text-2xl m-1 bg-green-300 rounded-md font-bold text-center text-black">Add Tech</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="text-xl md:text-4xl m-1 font-bold text-center text-blue-400">App Details</p>
                        <div className="flex justify-between w-full">
                            <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Start Date</p>
                            <input type="date" onChange={(e) => {
                                setAppDetails({ ...appDetails, startDate: e.target.value })
                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400" />
                        </div>
                        <div className="flex justify-between w-full">
                            <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">End Date</p>
                            <input type="date" onChange={(e) => {
                                setAppDetails({ ...appDetails, endDate: e.target.value })
                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400" />
                        </div>
                        <div className="flex w-full">
                            <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Finished</p>
                            <input type="checkbox" onChange={(e) => {
                                setAppDetails({ ...appDetails, finished: e.target.checked })
                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400" />
                        </div>
                        <div className="flex  w-full">
                            <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Deployed</p>
                            <input type="checkbox" onChange={(e) => {
                                setAppDetails({ ...appDetails, deployed: e.target.checked })
                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full my-3">
                        <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Upcoming Features</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center">
                            {
                                upcomingFeatures.map((feature) => {
                                    return (
                                        <div key={feature} className="flex w-full">
                                            <p className="text-md md:text-2xl font-bold text-center text-blue-400">{feature}</p>
                                            <button onClick={() => {
                                                const newUpcomingFeatures = upcomingFeatures.filter((featureItem) => {
                                                    return featureItem !== feature;
                                                })
                                                setUpcomingFeatures(newUpcomingFeatures);
                                            }} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">
                                                <FontAwesomeIcon className="text-red-400" icon={faXmark} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <input type="text" onChange={(e) => {
                                setFeature(e.target.value)
                            }} className="text-md md:text-2xl font-bold text-center text-blue-400" />
                            <button onClick={() => {feature!=""?setUpcomingFeatures([...upcomingFeatures, feature]):alert("Enter Feature")}} className="text-md sm:text-2xl m-1 font-bold text-center text-blue-400">Add Feature</button>
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="text-md md:text-2xl m-1 font-bold text-center text-blue-400">Link</p>
                        <input type="text" onChange={(e) => setLink(e.target.value)} className="text-md md:text-2xl m-1 font-bold text-center text-blue-400" />
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={submitdata} className="text-md sm:text-2xl m-1 font-bold text-center bg-green-500 rounded-lg px-3 text-black">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}