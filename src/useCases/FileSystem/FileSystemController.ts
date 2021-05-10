import { FileSystemUseCase } from "./FileSystemUseCase";

type IHandleDatas = {
    errorMessage?: string;
    methodName: "write" | "read";
    filePath: string;
}

/**
 * @classdesc Handle the FileSystemUseCase methods' execution
 */
export class FileSystemController
{
    constructor(
        private createFileSystemUseCase: FileSystemUseCase
    ) {}

    async handle(datas: IHandleDatas): Promise<string>
    {
        try
        {
            let response = await this.createFileSystemUseCase.execute({
                methodName: datas.methodName,
                filePath: datas.filePath,
                content: datas.errorMessage
            });
            
            return response.toString();
        }
        catch(err)
        {
            return err;
        }
    }
}