import { Formik } from "formik"
import { useState } from "react";

export default function ProjectForm2(){

    const [projectDetails, setProjectDetails] = useState({
        appName: '',
        appDescription: '',
        techStack: [],
        appDetails: {
            startDate: '',
            endDate: '',
            finished: false,
            deployed: false,
        },
        upcomingFeatures: [],
        Link: '',
    })

    return (
        <>
            <Formik
       initialValues={{
        appName: '',
        appDescription: '',
        tech: '',
        appDetails: {
            startDate: '',
            endDate: '',
            finished: false,
            deployed: false,
        },
        features: '',
        Link: '',
       }}
       validate={values => {
         const errors = {};
         if(!values.appName){
             errors.appName = "Enter Name of the App"
         }
         else if(!values.appDescription){
             errors.appDescription = "Enter Description of the App"
            }
        else if(!values.techStack){
            errors.tech = "Enter Tech Stack"
        }
        else if(!values.appDetails.startDate){
            errors.appDetails.startDate = "Enter Start Date"
        }
        else if(!values.appDetails.endDate){
            errors.appDetails.endDate = "Enter End Date"
        }
        else if(!values.Link){
            errors.Link = "Enter Link"
        }
        return errors;
         }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setProjectDetails(values);
            setSubmitting(false);
         }, 400);
       }}
     >
       {(
            {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            }
       ) => (
         <form onSubmit={handleSubmit}>
            <p className="text-2xl font-bold">Add Project</p>
            <p className="text-xl font-bold">Project Details</p>
            <label htmlFor="appName">App Name</label>
              <input
                 type="text"
                 name="appName"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.appName}
              />
              {errors.appName && touched.appName && errors.appName}
              <label htmlFor="appDescription">App Description</label>
              <input
                 type="text"
                 name="appDescription"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.appDescription}
              />
                {errors.appDescription && touched.appDescription && errors.appDescription}
                <label htmlFor="techStack">Tech Stack</label>
                {
                    projectDetails.techStack.map((tech, index) => {
                        return (
                            <div key={index}>
                                <p>{tech}</p>
                            </div>
                        )
                    })
                }
                <input
                    type="text"
                    name="techStack"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tech}
                />
                <button type="button"
                    onClick={() => {
                        setProjectDetails(projectDetails.techStack.unshift(values.tech));
                        values.tech = '';
                    }}
                >Add Tech Stack</button>
                {errors.tech && touched.tech && errors.tech}
                <p className="text-xl font-bold">App Details</p>
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.appDetails.startDate}
                />
                {errors.appDetails?.startDate && touched.appDetails.startDate && errors.appDetails.startDate}
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.appDetails.endDate}
                />
                {errors.appDetails?.endDate && touched.appDetails.endDate && errors.appDetails.endDate}
                <label htmlFor="finished">Finished</label>
                <input
                    type="checkbox"
                    name="finished"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.appDetails.finished}
                />
                <label htmlFor="deployed">Deployed</label>
                <input
                    type="checkbox"
                    name="deployed"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.appDetails.deployed}
                />

                <label htmlFor="upcomingFeatures">Upcoming Features</label>
                <input
                    type="text"
                    name="upcomingFeatures"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.features}
                />
                {
                    projectDetails.upcomingFeatures.map((feature, index) => {
                        return (
                            <div key={index}>
                                <p>{feature}</p>
                            </div>
                        )
                    })
                }
                <button type="button"
                    onClick={() => {
                        setProjectDetails(projectDetails.upcomingFeatures.unshift(values.features));
                        values.features = '';
                    }}
                >Add Feature</button>
                {errors.features && touched.features && errors.features}
                <label htmlFor="Link">Link</label>
                <input
                    type="text"
                    name="Link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Link}
                />
                {errors.Link && touched.Link && errors.Link}
                <button type="submit" disabled={isSubmitting}>Submit</button>
         </form>
       )}
     </Formik>
        </>
    )
}