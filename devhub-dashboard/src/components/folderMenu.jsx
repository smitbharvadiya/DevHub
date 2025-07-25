import { faXmark, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp, query, where } from "firebase/firestore";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

export default function FolderMenu({ onClose, selectedRepos }) {
    const [folders, setFolders] = useState([]);
    const [newFolder, setNewFolder] = useState("");
    const [showInput, setShowInput] = useState(false);

    const [updateFolderName, setUpdateFolderName] = useState("");
    const [updateFolderId, setUpdateFolderId] = useState(null);
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [loading, setLoading] = useState(true);


    const createFolder = async () => {
        const trimmed = newFolder.trim();

        if (!trimmed) {
            alert("Folder name can't be empty.");
            return;
        }

        if (folders.some(folder => folder.name === trimmed)) {
            alert("Folder already exists.");
            return;
        }


        // adding Folder To Firestore
        try {
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User not authenticated");
            }

            const docRef = await addDoc(collection(db, "folders"), {
                name: trimmed,
                userId: user.uid,
                createdAt: serverTimestamp(),
            })
            fetchFolders(user.uid);
        } catch (e) {
            console.error("Error creating folder:", e);

        }

        setNewFolder("");
        setShowInput(false);

    };


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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchFolders(user.uid);
        }

    }, []);

    const deleteFolder = async (id) => {
        const folderDoc = doc(db, "folders", id);
        await deleteDoc(folderDoc);

        const user = auth.currentUser;
        if (user) {
            fetchFolders(user.uid);
        }
    };

    const updateFolder = async (id) => {
        const trimmed = updateFolderName.trim();

        if (!trimmed) {
            alert("Folder name can't be empty.");
            return;
        }

        if (folders.some(folder => folder.name === trimmed)) {
            alert("Folder already exists.");
            return;
        }
        try {
            const folderDoc = doc(db, "folders", updateFolderId);
            await updateDoc(folderDoc, { name: trimmed });

            setShowUpdateInput(false)


            const user = auth.currentUser;
            if (user) {
                fetchFolders(user.uid);
            }

            setUpdateFolderId(null);
            setUpdateFolderName("");
        } catch (e) {
            console.error("Error updating folder:", e);
        }

    }

    const saveReposToFolder = async (folderId, selectedRepos) => {
        try {
            const folderRef = collection(db, "folders", folderId, "repos");

            if (selectedRepos.length == 0) {
                alert("Please select repo to bookmark");
                return;
            }

            let isSaved = false;

            for (const repo of selectedRepos) {

                const q = query(folderRef, where("id", "==", repo.id));
                const duplicate = await getDocs(q);

                if (duplicate.empty) {
                    await addDoc(folderRef, {
                        ...repo,
                        folderId: folderId,
                        savedAt: new Date(),
                    });
                    isSaved = true;
                } else {
                    alert(`Repo ${repo.name} already exists in folder.`);
                }
            }
            if (isSaved) {
                alert("Repos saved successfully!");
            }

            onClose();
        } catch (err) {
            console.error("Error saving repos:", err);
        }
    };



    return (
        <div className="fixed inset-0 m-auto mt-10 bg-white z-0 h-100 w-100 border-2 rounded-lg flex flex-col "  >
            <div className="flex justify-between border-b mb-2">
                <h2 className="m-2 font-semibold">Select Folder</h2>
                <button
                    onClick={onClose}
                    className="text-lg text-gray-700 underline hover:text-red-500 mr-4">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="space-y-2 mb-4 mx-4 h-70 overflow-y-auto">
                {loading ?
                    (
                        <div className="flex justify-center items-center h-20">
                            <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) :

                    (folders.length === 0 ?
                        (
                            <p className="text-center text-gray-500 mb-2">No folders yet.</p>
                        ) :
                        (folders.map((folder) => (
                            <div key={folder.id} onClick={() => saveReposToFolder(folder.id, selectedRepos)} className="flex justify-between bg-gray-100 hover:bg-gray-50 hover:shadow hover:border cursor-pointer p-2 rounded-md text-gray-800">
                                {folder.name}
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setUpdateFolderId(folder.id)
                                            setShowUpdateInput(true);
                                            setShowInput(false);
                                        }}
                                        className="px-3 hover:text-gray-600 cursor-pointer">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm("Are you sure you want to delete this folder?")) {
                                                deleteFolder(folder.id);
                                            }
                                        }}
                                        className="px-2 hover:text-gray-600 cursor-pointer">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        )))
                    )}
            </div>
            <div>
                {showInput ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createFolder();
                        }}
                        className="flex space-x-2 mx-4 mb-4">
                        <input
                            type="text"
                            value={newFolder}
                            onChange={(e) => setNewFolder(e.target.value)}
                            placeholder="Enter folder name"
                            className="border p-2 rounded-md w-full"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-1 rounded-md">
                            Save
                        </button>
                    </form>

                ) : (
                    <div className="flex justify-end">
                        <button
                            onClick={() => { setShowInput(true); setShowUpdateInput(false) }}
                            className="px-4 py-1 mx-4 my-4 border bg-blue-600 text-white rounded-md hover:bg-blue-500">
                            Add New Folder
                        </button>
                    </div>

                )}
                {showUpdateInput &&
                    <div className="flex space-x-2 mx-4 mb-4">
                        <input
                            type="text"
                            value={updateFolderName}
                            onChange={(e) => setUpdateFolderName(e.target.value)}
                            placeholder="Enter new name"
                            className="border p-2 rounded-md w-full"
                        />
                        <button onClick={() => updateFolder()} className="bg-blue-600 text-white px-4 py-1 rounded-md">
                            Update
                        </button>
                    </div>
                }
            </div>
        </div >
    )
};
