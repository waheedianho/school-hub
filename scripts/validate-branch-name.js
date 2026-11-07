const { execSync } = require('child_process');

const branchName = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

const allowedBranches = ['main', 'master', 'develop', 'staging'];

const branchPattern =
    /^(feature|fix|hotfix|chore|refactor|docs|test|ci|release)\/(shell|student|teacher|parent|admin|super-admin|shared|api|ui|auth|nx|config|github)\/[a-z0-9]+(-[a-z0-9]+)*$/;

if (allowedBranches.includes(branchName)) {
    process.exit(0);
}

if (!branchPattern.test(branchName)) {
    console.error(`
Invalid branch name: ${branchName}

Expected format:
  <type>/<scope>/<description>

Example:
  feature/student/add-result-dashboard
  fix/api/resolve-auth-token-refresh
  chore/nx/configure-husky
`);
    process.exit(1);
}