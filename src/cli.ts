import { Command } from "commander";
import { DeployEnkei } from "./config/commands/deploy";

const program = new Command();

// deploy
program.
command('deploy')
.description('deploy package')
.action(()=>{
    const deployCommand = new DeployEnkei();
    deployCommand.execute();
});

program.parse(process.argv);