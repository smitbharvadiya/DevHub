
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
`You are a senior GitHub code analyst and technical writer. Your task is to generate a concise, human-readable summary about this ${entityType.toLowerCase()}, based on their GitHub activity data.

Use the structured information below to craft your response:

==========================
📦 Repositories:
${repoData}

📘 README Highlights:
${readmeData}

📊 Commit Frequency:
${commitsData}

🈯 Language Usage:
${languageStats}
==========================

Please write a summary of **200–250 words** that clearly covers the following:

- ✅ The main technology stack they use (languages, tools, frameworks)
- 🧠 The type and focus of their projects (e.g., full-stack apps, machine learning, libraries, etc.)
- ⭐ Indicators of popularity or engagement (stars, forks, watchers)
- ⏱️ Coding habits and activity patterns (based on commit history)
- 📘 Noteworthy insights from project README files (tone, professionalism, documentation quality)

Your summary should:
- Sound like a human wrote it — friendly, informative, and objective
- Be free of code, technical jargon (unless necessary), or bullet points
- Avoid making assumptions not supported by the data
- Help a recruiter, collaborator, or curious dev understand the profile at a glance
`
    )
}