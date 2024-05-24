/** @format */

import { execSync } from "child_process";
import { mkdir } from "fs";
import * as fs from "fs-extra";
import * as path from "path";
export class DeployEnkei {
	execute() {
		try {
			console.log("Deploying package Enkei \n");
			// Assuming your private package is in the same directory as this script
			const privatePackagePath = path.join(__dirname, "../../../");
			const packageJsonPath = path.join(privatePackagePath, "package.json");

			if (!fs.existsSync(packageJsonPath)) {
				console.error(
					`Error: Unable to find package.json in ${privatePackagePath}`
				);
				process.exit(1);
			}

			// Read package.json of the private package
			const packageJson = require(packageJsonPath);

			// Check if the package has peerDependencies
			if (packageJson.peerDependencies) {
				const peerDependencies = Object.keys(packageJson.peerDependencies);

				if (peerDependencies.length > 0) {
					console.log(
						`Installing dependencies: ${peerDependencies.join(", ")}`
					);

					// Install dependencies using pnpm
					execSync(`pnpm install ${peerDependencies.join(" ")}`, {
						stdio: "inherit",
					});
					createFolder('./src/database/entities');
					createFolder('./src/database/migrations');
					createFolder('./src/database/seeders');
					createFolder('./src/database/factories');
					createFolder('./src/config');
				} else {
					console.log("No dependencies found.");
				}
			} else {
				console.log("No dependencies found.");
			}
		} catch (error) {
			console.log("Failed Deploy " + error);
			process.exit(1);
		}
	}
}
function createFolder(folderPath) {
	try {
	  fs.mkdirSync(folderPath, { recursive: true });
	  console.log('Folder created successfully:', folderPath);
	} catch (error) {
	  console.error('Error creating folder:', error);
	  process.exit(1);
	}
  }
  