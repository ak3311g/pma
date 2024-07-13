import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BasciInfo from "./basics";
import ExtraDetails from "./extraDetails";

export default function ProjectForm({setShowForm}) {
  const Status = {
    InProgress: "In Progress",
    Completed: "Completed",
    Paused: "Paused",
  };

  const [submitButton, setSubmitButton] = useState(false);

  const [projectDetails, setprojectDetails] = useState({
    title: "",
    description: "",
    technologies: [],
    roles: [],
    links: {
      live: "",
      repository: "",
    },
    private: false,
    dateStarted: "",
    dateCompleted: "",
    status: Status.InProgress,
    teamMembers: [],
    features: [],
    challenges: [],
    outcome: "",
    documentation: "",
    learningOutcomes: [],
  });

  /* Isko baad me add krunga 
  screenshots: [],
  feedback: [],
   */

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.technologies.length > 0 &&
      projectDetails.roles.length > 0 &&
      projectDetails.dateStarted &&
      projectDetails.status &&
      projectDetails.links.repository
    ) {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
  }, [projectDetails]);

  const submitProject = async () => {
    try {
      const mailId = localStorage.getItem("email").split("@")[0];
      const collRef = collection(db, "projects");
      
      const docRef = await addDoc(collRef, {...projectDetails, owner: mailId});

      const userRef = doc(db, "users", mailId);
      const userSnap = await getDoc(userRef);
      const userProjects = userSnap.data().projects;
      userProjects.push(docRef.id);
      await setDoc(userRef, { projects: userProjects }, { merge: true });
      console.log("Document written with ID: ", docRef.id);
      //setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex justify-center">
      <div className="flex flex-col justify-center items-start bg-[#A855F7] w-3/4 md:w-auto rounded-md p-4 md:p-5">
        <div className="my-5">
          <h1 className="text-3xl font-bold">Create a new project</h1>
          <p className="text-sm">
            Fill in the form below to create a new project
          </p>
        </div>
        <div className="w-full">
          {page === 1 && (
            <BasciInfo
              projectDetails={projectDetails}
              setprojectDetails={setprojectDetails}
            />
          )}
          {page === 2 && (
            <ExtraDetails
              projectDetails={projectDetails}
              setprojectDetails={setprojectDetails}
            />
          )}
        </div>

        <div className="w-full">
          {(page == 2 && submitButton) ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-md font-bold py-2 my-5 w-full px-4 rounded"
              onClick={() => submitProject()}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-600 hidden text-white text-sm sm:text-md font-bold py-2 my-5 w-full px-4 rounded"
              disabled
            >
              Submit
            </button>
          )}
        </div>

        <div className="flex justify-center items-center gap-5 w-full my-5">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-md font-bold py-2 m-2 px-4 rounded"
            onClick={() => setPage(1)}
          >
            1
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-md font-bold py-2 m-2 px-4 rounded"
            onClick={() => setPage(2)}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
}
