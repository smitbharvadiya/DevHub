import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/navbar";
import Lottie from "lottie-react";
import pageLoading from "../assets/animations/pageLoading.json";

export default function FolderRepoList() {
    const [folderRepos, setFolderRepos] = useState({});
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { folderId } = useParams();

    const fetchRepos = async (folderId) => {
        try {
            setLoading(true);
            const q = query(collection(db, "folders", folderId, "repos"), where("folderId", "==", folderId));
            const snapshot = await getDocs(q);
            const repos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            setFolderRepos((prev) => ({ ...prev, [folderId]: repos }));
            setSelectedFolderId(folderId);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchRepos(folderId);
            } else {
                console.log("Login to see your Bookmarked Repositories");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="mb-4 text-sm text-blue-600 cursor-pointer" >
                    <a
                        href="/bookmark">← Back to Folders
                    </a>
                </div>


                <div className="grid grid-cols-9 gap-6 bg-gray-100 rounded-t-md font-semibold border-b pb-2 font-poppins px-6 py-4">
                    <span className="col-span-2">Name</span>
                    <span className="col-span-3">Description</span>
                    <span>Owner</span>
                    <span>Star</span>
                    <span>Forks</span>
                    <span>Last Updated</span>
                </div>
                {loading ?
                    (
                        <div className="flex justify-center items-center h-20">
                            <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) :
                    <>

                        {folderRepos[selectedFolderId]?.length === 0 ? (
                            <div className="pb-6 h-100 overflow-y-auto border-1 rounded-b-md">
                                <p className="text-gray-500 text-center py-6">No repositories found in this folder.</p>
                            </div>
                        ) :

                            <div className="pb-6 h-100 overflow-y-auto border-1 rounded-b-md">

                                {(folderRepos[selectedFolderId] || []).map((repo) => (
                                    <div key={repo.id} className=" grid grid-cols-9 gap-6  border-b last:border-none hover:bg-gray-50 p-6 ">
                                        <a
                                            href={repo.url}
                                            className="col-span-2 hover:underline text-blue-600 font-medium truncate"
                                            target="_blank"
                                            rel="noopener noreferrer" >
                                            {repo.name}
                                        </a>
                                        <p className="col-span-3 text-sm text-gray-700 truncate line-clamp-1">{repo.description || "No Description Provided"}</p>
                                        <p className="text-sm text-gray-600">{repo.owner}</p>
                                        <span className="text-sm text-gray-600 pl-4">{repo.stargazerCount.toLocaleString()}</span>
                                        <span className="text-sm text-gray-600 pl-4">{repo.forkCount.toLocaleString()}</span>
                                        <span className="text-sm text-gray-600 pl-6">{new Date(repo.updatedAt).toLocaleDateString()}</span>

                                    </div>
                                ))}

                            </div>
                        }
                    </>
                }
            </div>
        </>
    )
}