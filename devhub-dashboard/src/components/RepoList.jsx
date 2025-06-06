

export default function RepoList({ repos }) {

    return (
        <div className="bg-white mx-6 my-3 px-6 rounded-xl shadow-md">
            <h2 className="font-bold text-2xl mx-4 pt-2 text-gray-800 my-4">Public Repositories</h2>
            <div className="grid grid-cols-7 gap-6 bg-gray-100 rounded-t-md font-semibold border-b pb-2 font-poppins px-6 py-4">
                <span className="col-span-2">Name</span>
                <span className="col-span-2">Description</span>
                <span>Star</span>
                <span>Forks</span>
                <span>Last Updated</span>
            </div>

            <div className="pb-6 h-100 overflow-y-auto">
                {repos.map((repo) => (

                    <div key={repo.id} className=" grid grid-cols-7 gap-6  border-b last:border-none hover:bg-gray-50 p-6 ">
                        <a
                            href={repo.url}
                            className="col-span-2 hover:underline text-blue-600 font-medium truncate"
                            target="_blank"
                            rel="noopener noreferrer" >
                            {repo.name}
                        </a>
                        <p className="col-span-2 text-sm text-gray-700 truncate line-clamp-1">{repo.description || "No Description Provided"}</p>
                        <span className="text-sm text-gray-600">{repo.stargazerCount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">{repo.forkCount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">{new Date(repo.updatedAt).toLocaleString()}</span>

                    </div>

                ))}

            </div>
        </div>
    )
}