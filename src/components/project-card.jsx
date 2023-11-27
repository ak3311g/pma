import PropTypes from "prop-types";
import { store } from "../services/appSlice";

export default function ProjectCard(props) {

    const project = store.getState().projects[props.project];

    const projectData = project[props.project];

    console.log(projectData);

    if(projectData === undefined)
    {
        return (
            <div className="flex bg-white shadow-lg rounded-lg m-4">
                <div className="flex flex-col justify-center items-center p-4 w-1/3">
                    <p className="text-xl font-semibold text-gray-900">No Projects</p>
                </div>
            </div>
        );
    }
    else{
    return (
        <>
            <div className="flex bg-white shadow-lg rounded-lg m-4">
                <div className="flex flex-col justify-center items-center p-4 w-1/3">
                    <p className="text-xl font-semibold text-gray-900">{projectData.appName.toUpperCase()}</p>
                    <p className="mt-3 text-base text-gray-500">{projectData.appDescription}</p>
                </div>
                <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden m-4 w-3/4">
                <div className=" flex justify-around items-center">
                    <p className="text-xl font-semibold text-gray-900">
                        {projectData.appDetails.startDate}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                        {projectData.appDetails.endDate}
                    </p>
                </div>
                <div className="flex justify-around items-center">
                {
                    projectData.techStack.map((tech, index) => {
                        return (
                            <p key={index} className="text-xl font-semibold text-gray-900">
                                {tech}
                            </p>
                        );
                    })
                }
                </div>
                <div className="flex justify-around items-center">
                    {
                        projectData.appDetails.finished ? <p className="text-xl font-semibold text-gray-900">Finished</p> : <p className="text-xl font-semibold text-gray-900">Not Finished</p>
                    }
                    {
                        projectData.appDetails.deployed ? <p className="text-xl font-semibold text-gray-900">Deployed</p> : <p className="text-xl font-semibold text-gray-900">Not Deployed</p>
                    }
                </div>
                <div className="flex justify-around items-center">
                    <a href={projectData.link} className="bg-green-500 text-xl font-semibold text-gray-900 px-3 rounded-md">Link</a>
                </div>
                <div className="h-10 w-full rounded-b-lg">
                    {
                        projectData.upcomingFeatures.map((feature, index) => {
                            return (
                                <p key={index} className="text-center text-xl font-semibold text-gray-900">
                                    {feature}
                                </p>
                            );
                        })
                    }
                </div>
            </div>
            </div>
        </>
    )}
}

ProjectCard.propTypes = {
    project: PropTypes.number,
};