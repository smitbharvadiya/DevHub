import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import pageLoading from "../assets/animations/pageLoading.json";
import folderIcon from "../assets/folderIcon.png";

export default function FolderList() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const fetchFolders = async (userId) => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "folders"),
                where("userId", "==", userId)
            );

            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setFolders(filteredData)
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchFolders(user.uid);
            } else {
                console.log("User not logged in");
            }
        });

        return () => unsubscribe();
    }, []);




    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center max-h-[300px] w-full h-full bg-white">
                    <Lottie animationData={pageLoading} loop={true} className="w-40 h-40" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">


                    {folders.map((folder) => (
                        <div
                            onClick={() => navigate(`/bookmark/${folder.id}`)}
                            key={folder.id}
                            className="p-5 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <img src={folderIcon} alt="folder" className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {folder.name}
                                </h3>
                            </div>

                        </div>
                    ))}

                </div>



            )
            }
        </>
    )
}