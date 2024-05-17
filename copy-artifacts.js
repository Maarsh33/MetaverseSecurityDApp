const fs = require("fs-extra");
const path = require("path");

// Path to the artifacts directory in the Hardhat project
const artifactsDir = path.resolve(__dirname, "./artifacts/contracts");

// Path to the target directory in the React project
const targetDir = path.resolve(__dirname, "./frontend/src/artifacts/contracts");

fs.copySync(artifactsDir, targetDir, { overwrite: true });
console.log("Artifacts copied to frontend/src/artifacts/contracts");
