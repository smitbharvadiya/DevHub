import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function FolderList() {
    const [folders, setFolders] = useState([]);
    const [folderRepos, setFolderRepos] = useState({});
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [showRepos, setShowRepo] = useState(false);


    const fetchFolders = async (userId) => {
        try {
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

    const fetchRepos = async (folderId) => {
        try {
            const q = query(collection(db, "folders", folderId, "repos"), where("folderId", "==", folderId));
            const snapshot = await getDocs(q);
            const repos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            setFolderRepos((prev) => ({ ...prev, [folderId]: repos }));
            setSelectedFolderId(folderId);
            setShowRepo(true);

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <>
            {!showRepos ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
                    {folders.map((folder) => (
                        <div
                            onClick={() => fetchRepos(folder.id)}
                            key={folder.id}
                            className="p-5 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 text-blue-600 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    📁
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {folder.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )

                :
                (<div className="p-6">
                    <button
                        onClick={() => { setSelectedFolderId(null); setShowRepo(false); }}
                        className="mb-4 text-sm text-blue-600 cursor-pointer"
                    >
                        ← Back to Folders
                    </button>
                    <div className="grid grid-cols-9 gap-6 bg-gray-100 rounded-t-md font-semibold border-b pb-2 font-poppins px-6 py-4">
                        <span className="col-span-2">Name</span>
                        <span className="col-span-3">Description</span>
                        <span>Owner</span>
                        <span>Star</span>
                        <span>Forks</span>
                        <span>Last Updated</span>
                    </div>
                    {folderRepos[selectedFolderId]?.length === 0 && (
                        <p className="text-gray-500 text-center py-6">No repositories found in this folder.</p>
                    )}

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
                </div>)
            }
        </>
    )
}