import { FileSystem } from "../../repositories/implementations/FileSystem";
import { FileSystemUseCase } from "./FileSystemUseCase";

export class FileSystemController
{
    constructor(
        private createFileSystemUseCase: FileSystemUseCase
    ) {}

    async handle(): Promise<string | object>
    {
        try
        {
            await this.createFileSystemUseCase.execute({
                methodName: 'write',
                filePath: "lastRequestStatus.json"
            });

            process.exit(0);
        }
        catch(err)
        {
            return "erro";
        }
    }
}