export default function ExtraDetails({projectDetails, setprojectDetails}){
    return (
        <>
            <form className="flex flex-col justify-center items-start bg-[#A855F7] rounded-md md:p-5 md:m-5 gap-5">
                {/* Features */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
                        <p className="text-sm">Features (Optional)</p>
                        <textarea
                            className="w-full lg:w-1/2 p-2 rounded-md bg-white text-black"
                            value={projectDetails.features}
                            onChange={(e) =>
                                setprojectDetails({
                                    ...projectDetails,
                                    features: e.target.value,
                                })
                            }
                        />
                </div>

                {/* Challenges */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
                        <p className="text-sm">Challenges (Optional)</p>
                        <textarea
                            className="w-full lg:w-1/2 p-2 rounded-md bg-white text-black"
                            value={projectDetails.challenges}
                            onChange={(e) =>
                                setprojectDetails({
                                    ...projectDetails,
                                    challenges: e.target.value,
                                })
                            }
                        />
                </div>

                {/* Outcome */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
                        <p className="text-sm">Outcome (Optional)</p>
                        <textarea
                            className="w-full lg:w-1/2 p-2 rounded-md bg-white text-black"
                            value={projectDetails.outcome}
                            onChange={(e) =>
                                setprojectDetails({
                                    ...projectDetails,
                                    outcome: e.target.value,
                                })
                            }
                        />
                </div>

                {/* Documentation */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
                        <p className="text-sm">Documentation (Optional)</p>
                        <textarea
                            className="w-full lg:w-1/2 p-2 rounded-md bg-white text-black"
                            value={projectDetails.documentation}
                            onChange={(e) =>
                                setprojectDetails({
                                    ...projectDetails,
                                    documentation: e.target.value,
                                })
                            }
                        />
                </div>

                {/* Learning Outcomes */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-5">
                        <p className="text-sm">Learning Outcomes (Optional)</p>
                        <textarea
                            className="w-full lg:w-1/2 p-2 rounded-md bg-white text-black"
                            value={projectDetails.learningOutcomes}
                            onChange={(e) =>
                                setprojectDetails({
                                    ...projectDetails,
                                    learningOutcomes: e.target.value,
                                })
                            }
                        />
                </div>
            </form>
        </>
    )
}