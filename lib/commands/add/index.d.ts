import { Command } from '@oclif/command';
export default class Add extends Command {
    static description: string;
    static args: {
        name: string;
        options: string[];
    }[];
    static usage: string[];
    validateProjectSupported: (projectType: string) => void;
    validateCommand: (entityType: string, projectType: string) => void;
    run(): Promise<void>;
}
