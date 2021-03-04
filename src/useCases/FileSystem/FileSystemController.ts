import { FileSystemUseCase } from "./FileSystemUseCase";

/**
 * @classdesc Handle the FileSystemUseCase methods' execution
 */
export class FileSystemController
{
    constructor(
        private createFileSystemUseCase: FileSystemUseCase
    ) {}

    async handle(): Promise<void>
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
            this.handle()
        }
    }
}