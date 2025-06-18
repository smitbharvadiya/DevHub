import { graphql } from "@octokit/graphql";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const detectGitHubEntityType = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    if (data.message === "Not Found") {
      throw new Error(`GitHub user/org "${username}" does not exist.`);
    }

    return data.type; // 'User' or 'Organization'
  } catch (err) {
    console.error("GitHub user/org type detection failed:", err);
    throw err;
  }
};


export const fetchGitHubUser = async (username) => {
  const type = await detectGitHubEntityType(username);
  const entity = type.toLowerCase();
  const isUser = type === "User";

  const query = isUser
    ? `query($login: String!) {
        user(login: $login) {
          name
          login
          email
          location
          websiteUrl
          url
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
            totalCount
            nodes {
              id
              name
              description
              stargazerCount
              url
              updatedAt
              forkCount
              owner {
                 login
               }
              issues(states: OPEN) {
                    totalCount
                }
              watchers {
                totalCount
              }
              languages(first: 10) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    `
    : `
      query($login: String!) {
        organization(login: $login) {
          name
          login
          email
          location
          websiteUrl
          url
          membersWithRole {
            totalCount
            }
          avatarUrl
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
            totalCount
            nodes {
              id
              name
              description
              stargazerCount
              url
              updatedAt
              forkCount
              watchers {
                totalCount
              }
              languages(first: 10) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await graphql(query, {
      login: username,
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    return response[entity];
  } catch (error) {
    console.error("GitHub GraphQL Error", error);
    throw error;
  }
};

export const fetchReadmeData = async (username) => {
  const type = await detectGitHubEntityType(username);
  const entity = type.toLowerCase();

  const query = `
    query($login: String!) {
      ${entity}(login: $login) {
        repositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            id
            name
            url
            readme: object(expression: "HEAD:README.md") {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphql(query, {
      login: username,
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    return response[entity];
  } catch (error) {
    console.error("GitHub GraphQL Error (README)", error);
    throw error;
  }
};

export const fetchCommitData = async (username) => {
  const type = await detectGitHubEntityType(username);
  const entity = type.toLowerCase();

  const query = `
    query($login: String!) {
      ${entity}(login: $login) {
        repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            id
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 100) {
                    edges {
                      node {
                        committedDate
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphql(query, {
      login: username,
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    return response[entity].repositories.nodes;
  } catch (error) {
    console.error("GitHub GraphQL Error (Commits)", error);
    throw error;
  }
};

