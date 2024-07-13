import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addProjects} from "../services/appSlice";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();

    const authenticate = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                const uid = user.uid;
                //console.log(user);
                localStorage.setItem("username", user.displayName);
                localStorage.setItem("email", user.email);
                localStorage.setItem("photo", user.photoURL);
                localStorage.setItem("uid", uid);
                const docRef =doc(db, "users", uid);
                const docSnap =await getDoc(docRef);
                if (docSnap.exists()) {
                    dispatch(addProjects(docSnap.data().projects));
                    navigate("/");
                }
                else{
                    const mailId = user.email.split("@")[0];
                    setDoc(doc(db, "users", mailId), {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        projects: [],
                    });
                }
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
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