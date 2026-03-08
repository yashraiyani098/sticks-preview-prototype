import { defineConfig } from "vite";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  // Use "/<repo>/" only for GitHub Actions Pages builds.
  base: isGitHubActions && repoName ? `/${repoName}/` : "/",
});
