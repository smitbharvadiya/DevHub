import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import Profile from "../components/profile";
import RepoList from "../components/RepoList";
import LangDonut from "../components/LanguageDonutChart";
import { detectGitHubEntityType, fetchCommitData, fetchGitHubUser, fetchReadmeData } from "../api/githubGraphQL";
import { generateSummary } from "../utils/generateSummary";
import { summaryOfOpenAI } from "../utils/summarizeWithOpenAI";
import AISummaryBox from "../components/AISummary";
import Lottie from "lottie-react";
import pageLoading from "../assets/animations/pageLoading.json"
import CommitHeatmap from "../components/CommitHeatmap";

export default function Dashboard() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [repos, setRepos] = useState([]);
    const [languageStats, setLanguageStats] = useState({});
    const [readme, setReadme] = useState([]);
    const [commit, setCommit] = useState([]);
    const [aiSummary, setAISummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [commitHeatmap, setCommitheatmap] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchGitHubUser(username)

                if (!userData) {
                    throw new Error("User not found");
                }
                setUser(userData);

                const repoData = userData.repositories.nodes;
                setRepos(repoData)

                const languageData = {};

                repoData.forEach(repo => {

                    repo.languages.edges.forEach(edge => {
                        const lang = edge.node.name;
                        const size = edge.size;

                        languageData[lang] = (languageData[lang] || 0) + size;
                    })

                })

                setLanguageStats(languageData);

                setError("");
            }
            catch (err) {
                setUser(null);
                setRepos([]);
                setLanguageStats({})
                setError(err.message);
            }
        }
        loadData()

    }, [username]);


    const chartData = (() => {
        const entries = Object.entries(languageStats);

        const sorted = entries.sort((a, b) => b[1] - a[1]);

        const topFive = sorted.slice(0, 5);
        const others = sorted.slice(5);

        const othersTotal = others.reduce((sum, [, val]) => sum + val, 0);

        const data = topFive.map(([key, val]) => ({ name: key, value: val }));

        if (othersTotal > 0) {
            data.push({ name: 'Other', value: othersTotal });
        }

        return data;
    })();

    useEffect(() => {
        const loadSummaryData = async () => {
            try {
                const readmeData = await fetchReadmeData(username);
                setReadme(readmeData);

                const commitData = await fetchCommitData(username);
                setCommit(commitData);

                const frequencyHitmap = {};

                commitData.forEach((repo) => {

                    const commits = repo?.defaultBranchRef?.target?.history?.edges || [];

                    commits.forEach((edge) => {
                        const date = new Date(edge.node.committedDate);
                        const keyHitmap = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate() + 1).padStart(2, '0')}`;

                        frequencyHitmap[keyHitmap] = (frequencyHitmap[keyHitmap] || 0) + 1;


                    })

                })

                const commitHeatmapArray = Object.entries(frequencyHitmap).map(([date, count]) => ({
                    date,
                    count
                }));

                setCommitheatmap(commitHeatmapArray);
                console.log(commitHeatmap);

                setError("")
            }
            catch (err) {
                setReadme([]);
                setCommit([]);
                setError(err.message);
            }
        }
        loadSummaryData();
    }, [username]);

    useEffect(() => {
        const getAISummary = async () => {
            if (repos.length > 0) {

                setLoadingSummary(true);
                try {
                    const entity = await detectGitHubEntityType(username);
                    const prompt = generateSummary({ readme, commit, repos, languageStats, entityType: entity });
                    const summaryData = await summaryOfOpenAI(prompt);

                    setAISummary(summaryData);
                }
                catch (err) {
                    console.error("Summary fetch failed", err);
                }
                finally {
                    setLoadingSummary(false);
                }


            }
        }
        getAISummary();

    }, [readme, repos, commit]);


    if (!user) return <div className="flex justify-center items-center max-h-[300px] w-full h-full bg-white">
        <Lottie animationData={pageLoading} loop={true} className="w-40 h-40" />
    </div>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;



    return (
        <div className="bg-myWhite pb-6">
            <Navbar />
            {user && <Profile user={user} />}
            <div className="flex box-border">
                <LangDonut chartData={chartData} />
                <AISummaryBox summary={aiSummary} loadingStatus={loadingSummary} />
            </div>
            <RepoList repos={repos} />
            <CommitHeatmap commitdata={commitHeatmap} />
        </div>

    )
}