const path = require('path')

// Configuration - easily adjustable for different apps or paths
const CONFIG = {
  clientAppPath: 'applications/next-boilerplate-client',
  eslintMaxWarnings: 0,
}

module.exports = {
  // Prettier runs first to format code
  '**/*': 'prettier --write --ignore-unknown',
  // Then ESLint fixes imports and other issues
  [`${CONFIG.clientAppPath}/src/**/*.{ts,tsx,js,jsx}`]: (filenames) => {
    const files = filenames
      .map((file) => {
        // Convert to relative path from client app root
        const relativePath = path.relative(
          path.join(process.cwd(), CONFIG.clientAppPath),
          file,
        )
        // Escape spaces and special characters in file paths
        return relativePath.includes(' ') ? `"${relativePath}"` : relativePath
      })
      .join(' ')

    // Use sh -c for better cross-platform compatibility (works on Unix, Git Bash on Windows, and most CI/CD)
    // The '|| exit 1' ensures the exit code is properly propagated
    // This is more portable than bash -c and works in most environments including CI/CD
    // --fix automatically sorts imports and fixes other auto-fixable issues
    return `sh -c 'cd ${CONFIG.clientAppPath} && npx eslint --fix --max-warnings=${CONFIG.eslintMaxWarnings} ${files} || exit 1'`
  },
}
