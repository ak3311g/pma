import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Project() {
  const params = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  const id = params.id;

  useEffect(() => {
    async function getDetails() {
      const projRef = doc(db, "projects", id);
      console.log(projRef);
      const projectDetails = await getDoc(projRef);
      console.log(projectDetails.data());
      setProjectDetails(projectDetails.data());
    }

    getDetails();
  }, [id]);

  return (
    <>
      {projectDetails ? (
        <div className="flex justify-around">
          <div className="flex flex-none flex-col items-center justify-center">
            {/* Basic Details */}
            <div className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] h-40 flex flex-col items-start justify-center p-5 rounded-md">
              <h1 className="text-3xl text-white font-bold">
                {projectDetails?.title}
              </h1>
              <p className="text-white text-sm">{projectDetails?.owner}</p>
              <p className="text-white text-sm">
                {projectDetails?.description}
              </p>
              {/* Roles */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Roles</h1>
                {projectDetails?.roles.map((role) => (
                  <p key={role} className="text-lg">
                    {role}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-5">
              {/* Technologies */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Technologies</h1>
                {projectDetails?.technologies.map((tech) => (
                  <span key={tech} className="text-lg">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Date Started */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Date Started</h1>
                <p className="text-lg">{projectDetails?.dateStarted}</p>
              </div>

              {/* Date Completed */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Date Completed</h1>
                <p className="text-lg">{projectDetails?.dateCompleted}</p>
              </div>

              {/* Team Members */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Team Members</h1>
                {projectDetails?.teamMembers.map((member) => (
                  <p key={member} className="text-lg">
                    {member}
                  </p>
                ))}
              </div>

              {/* Links isme live ko tabhi dikhana hai jb present ho */}
              <div className="flex flex-col items-center justify-center p-5">
                <h1 className="text-2xl font-bold">Links</h1>
                <p className="text-lg">
                  Repository:{" "}
                  <a
                    href={projectDetails?.links.repository}
                    className="text-blue-500"
                  >
                    {projectDetails?.links.repository}
                  </a>
                </p>
                <p className="text-lg">
                  Live:{" "}
                  <a
                    href={projectDetails?.links.live}
                    className="text-blue-500"
                  >
                    {projectDetails?.links.live}
                  </a>
                </p>
              </div>
            </div>

            {/* Status iski jagah ek toggle daalna hai taaki yhi se public kr ske ya private kr ske*/}
            <div className="flex flex-col items-center justify-center p-5">
              <h1 className="text-2xl font-bold">Status</h1>
              <p className="text-lg">{projectDetails?.status}</p>
            </div>
          </div>

            <div className="flex flex-1 flex-col items-center justify-center">
                {/* In sab ko bhi conditional kr dena hai */}
                {/* Features */}
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold">Features</h1>
                    {projectDetails?.features.map((feature) => (
                    <p key={feature} className="text-lg">
                        {feature}
                    </p>
                    ))}
                </div>
    
                {/* Challenges */}
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold">Challenges</h1>
                    {projectDetails?.challenges.map((challenge) => (
                    <p key={challenge} className="text-lg">
                        {challenge}
                    </p>
                    ))}
                </div>
    
                {/* Outcome */}
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold">Outcome</h1>
                    <p className="text-lg">{projectDetails?.outcome}</p>
                </div>
    
                {/* Documentation */}
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold">Documentation</h1>
                    <p className="text-lg">{projectDetails?.documentation}</p>
                </div>
    
                {/* Learning Outcomes */}
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold">Learning Outcomes</h1>
                    {projectDetails?.learningOutcomes.map((outcome) => (
                    <p key={outcome} className="text-lg">
                        {outcome}
                    </p>
                    ))}
                </div>
            </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
