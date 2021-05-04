import { FileSystemUseCase } from "./FileSystemUseCase";

type IHandleErrorMessage = {
    lastRequest: string;
    status: string;
}

type IHandleDatas = {
    errorMessage?: IHandleErrorMessage;
    methodName: string;
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
                content: JSON.stringify(datas.errorMessage) ?? ""
            });
            
            return response.toString();
        }
        catch(err)
        {
            process.exit(0);
        }
    }
}