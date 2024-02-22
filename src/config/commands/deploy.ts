import * as fs from "fs-extra";
import * as path from "path";
export class DeployEnkei{
    execute(){
        try {
            console.log("Deploying Package Enkei");
            // Determine source path in node_modules
			// const packageRoot = path.resolve(__dirname, "../../../");
			// const sourcePathInPackage = "src/database"; // Adjust this path
			// const sourcePath = path.join(packageRoot, sourcePathInPackage);

			// // Determine destination path in app
			// const destinationPathInApp = "./src/database";
			// const destinationPath = path.resolve(destinationPathInApp);

			// // // Copy folder to destination
			// fs.copySync(sourcePath, destinationPath);

			// console.log(
			// 	"Folder copied successfully",
			// 	sourcePath,
			// 	"\n" + destinationPath
			// );
        } catch (error) {
            console.log("Failed Deploy "+ error);
            process.exit(1);
        }
    }
}