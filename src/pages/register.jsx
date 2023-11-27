import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addProjects, setID, store } from "../services/appSlice";
import { useDispatch } from "react-redux";
import { setUserName, setEmail, setPhoto } from "../services/appSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {

    /* {
                appName: "",
                appDescription: "",
                techStack: [],
                appDetails: {
                    startDate: "",
                    endDate: "",
                    finished: false,
                    deployed: false,
                },
                upcomingFeatures: [],
                link: "",
            } */

    const navigate = useNavigate();
    const username = store.getState().username;
    const dispatch = useDispatch();

    const authenticate = () => {
        try {
            if (username !== "") {
                navigate("/");
                return;
            }
            else {
                signInWithPopup(auth, provider).then(async (result) => {
                    const user = result.user;
                    console.log(user.uid);
                    const docRef = doc(db, "users", user.uid);
                    const docSnap =await getDoc(docRef);
                    if(docSnap.exists()){
                    //console.log(docSnap.data());
                    dispatch(setID(user.uid));
                    dispatch(setUserName(user.displayName));
                    dispatch(setEmail(user.email));
                    dispatch(setPhoto(user.photoURL));
                    dispatch(addProjects(docSnap.data().projects));
                    }
                    else{
                        await setDoc(doc(db, "users", user.uid), {
                            email: user.email,
                            photo: user.photoURL,
                            projects: [],
                            username: user.displayName,
                        });
                    }
                    navigate("/");
                }).catch((error) => {
                    console.log(error);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen">
            <div className="h-full w-full flex flex-col justify-center items-center backdrop-filter">
                <div className="bg-white w-[300px] h-[200px] rounded-xl shadow-lg shadow-white flex flex-col justify-center items-center">
                    <p className="text-4xl text-center font-extrabold text-green-500 m-3">Register/Login</p>
                    <button onClick={authenticate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-3">Sign In with Google</button>
                </div>
            </div>
        </div>
    );
}