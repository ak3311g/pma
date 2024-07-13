import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BasciInfo({ projectDetails, setprojectDetails }) {
  const Status = {
    InProgress: "In Progress",
    Completed: "Completed",
    Paused: "Paused",
  };

  return (
    <>
      <form className="flex flex-col justify-center items-start bg-[#A855F7] rounded-md md:p-5 md:m-5 gap-5">
        {/* Title and Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              value={projectDetails.title}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="">
            <label htmlFor="title">Description</label>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              value={projectDetails.description}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Public or Private */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="flex justify-center items-center gap-3">
            <input type="radio" id="title" value={projectDetails.private} onClick={() => setprojectDetails({...projectDetails, private: true})} />
            <label htmlFor="title">Private</label>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <p className="text-sm">Technologies</p>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setprojectDetails({
                    ...projectDetails,
                    technologies: [
                      ...projectDetails.technologies,
                      e.target.value,
                    ],
                  });
                  e.target.value = "";
                }
              }}
            />
          </div>
          <div className="w-full sm:w-96 md:w-64 lg:w-72 overflow-scroll">
            <div className="grid grid-flow-col gap-2">
              {projectDetails.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-white p-1 rounded-md text-black h-fit flex justify-between items-center gap-3"
                >
                  {tech}
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      const newTech = projectDetails.technologies.filter(
                        (t) => t !== tech
                      );
                      setprojectDetails({
                        ...projectDetails,
                        technologies: newTech,
                      });
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <label htmlFor="title">Roles</label>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setprojectDetails({
                    ...projectDetails,
                    roles: [...projectDetails.roles, e.target.value],
                  });
                  e.target.value = "";
                }
              }}
            />
          </div>
          <div className="w-full sm:w-96 md:w-64 lg:w-72 overflow-scroll">
            <div className="grid grid-flow-col gap-2 h-full">
              {projectDetails.roles.map((role, index) => (
                <span
                  key={index}
                  className="bg-white p-1 rounded-md text-black h-fit flex justify-between items-center gap-3"
                >
                  {role}
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      const newRoles = projectDetails.roles.filter(
                        (r) => r !== role
                      );
                      setprojectDetails({
                        ...projectDetails,
                        roles: newRoles,
                      });
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <p className="text-sm">Team Members</p>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setprojectDetails({
                    ...projectDetails,
                    teamMembers: [
                      ...projectDetails.teamMembers,
                      e.target.value,
                    ],
                  });
                  e.target.value = "";
                }
              }}
            />
          </div>
          <div className="w-1/2 overflow-y-auto">
            <div className="grid grid-flow-col gap-2 h-full">
              {projectDetails.teamMembers.map((member, index) => (
                <span
                  key={index}
                  className="bg-white p-1 rounded-md text-black h-fit flex justify-between items-center gap-3"
                >
                  {member}
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      const newMembers = projectDetails.teamMembers.filter(
                        (m) => m !== member
                      );
                      setprojectDetails({
                        ...projectDetails,
                        teamMembers: newMembers,
                      });
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <label htmlFor="title">Status</label>
            <select
              className="bg-transparent border-b-2 border-white w-full p-2"
              value={projectDetails.status}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  status: e.target.value,
                })
              }
            >
                <option value={Status.InProgress} className="bg-[#A855F7]">In Progress</option>
                <option value={Status.Completed} className="bg-[#A855F7]">Completed</option>
                <option value={Status.Paused} className="bg-[#A855F7]">Paused</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <label htmlFor="title">Date Started</label>
            <input
              type="date"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              value={projectDetails.dateStarted}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  dateStarted: e.target.value,
                })
              }
            />
          </div>
          {
            projectDetails.status === Status.Completed && (
              <div className="">
                <label htmlFor="title">Date Completed</label>
                <input
                  type="date"
                  id="title"
                  className="bg-transparent border-b-2 border-white w-full p-2 text-black"
                  value={projectDetails.dateCompleted}
                  onChange={(e) =>
                    setprojectDetails({
                      ...projectDetails,
                      dateCompleted: e.target.value,
                    })
                  }
                />
              </div>
            )
          }
        </div>

        {/* Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
          <div className="">
            <label htmlFor="title">Live link  (Optional)</label>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              value={projectDetails.links.live}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  links: { ...projectDetails.links, live: e.target.value },
                })
              }
            />
          </div>
          <div className="">
            <label htmlFor="title">Repository link</label>
            <input
              type="text"
              id="title"
              className="bg-transparent border-b-2 border-white w-full p-2 text-black"
              value={projectDetails.links.repository}
              onChange={(e) =>
                setprojectDetails({
                  ...projectDetails,
                  links: {
                    ...projectDetails.links,
                    repository: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </form>
    </>
  );
}
