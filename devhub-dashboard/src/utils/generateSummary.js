
export const generateSummary = ({ readme, commit, repos, languageStats, entityType }) => {

    const repoNodes = repos?.repositories?.nodes || repos?.nodes || [];
    const readmeNodes = readme?.repositories?.nodes || [];

    const repoData = repoNodes.map((repo, index) => {
        return (`Repositorie ${index + 1} -
            Name: ${repo.name}
        - Stars: ${repo.stargazerCount}
        - Forks: ${repo.forkCount}
        - Watchers: ${repo.watchers.totalCount}
        `)
    }).join('\n\n');

    const readmeData = readmeNodes.map((repo, index) => {

        const readmeSnippet = repo.readme?.text ? repo.readme.text.slice(0, 800).replace(/\n/g, " ") : "NO README available";

        return (`Repositorie ${index + 1} -
            - README Snippet: ${readmeSnippet}
        `)
    });


    const commitsData = commit.map((repo) => {

        const frequency = {};
        const frequencyHitmap = {}

        const commits = repo?.defaultBranchRef?.target?.history?.edges || [];

        commits.forEach((edge) => {
            const date = new Date(edge.node.committedDate);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const keyHitmap = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDay() + 1).padStart(2, '0')}`;

            frequency[key] = (frequency[key] || 0) + 1;
            frequencyHitmap[keyHitmap] = (frequencyHitmap[keyHitmap] || 0) + 1;

        })

        return frequency;

    })


    return (
        `
You are an expert GitHub code analyst. Your job is to generate a helpful, honest, and human-readable summary about this ${entityType.toLowerCase()} based on their GitHub activity.

Analyze the following data:
==========================
📦 Repositories:
${repoData}

📘 README Insights:
${readmeData}

📊 Commit Frequency:
${commitsData}

Language Stats:
${languageStats}

==========================
Using the above, write a summary of 200-250 words that highlights:
- The main tech stack
- Project focus and quality
- Popularity indicators (stars/forks)
- Coding habits and frequency
- Anything notable from READMEs

Write naturally and helpfully.
`
    )
}