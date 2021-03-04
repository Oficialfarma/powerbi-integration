import { FileSystemUseCase } from "./FileSystemUseCase";

interface IHandleErrorMessage
{
    lastRequest: string;
    status: string;
}

/**
 * @classdesc Handle the FileSystemUseCase methods' execution
 */
export class FileSystemController
{
    constructor(
        private createFileSystemUseCase: FileSystemUseCase
    ) {}

    async handle(errorMessage?: IHandleErrorMessage): Promise<void>
    {
        try
        {
            await this.createFileSystemUseCase.execute({
                methodName: 'write',
                filePath: "lastRequestStatus.json",
                content: JSON.stringify(errorMessage)
            });

            process.exit(0);
        }
        catch(err)
        {
            process.exit(0);
        }
    }
}