import { IFileSystemDTO } from "../../interfaces/IFileSystemDTO";
import { IFileSystemRepository } from "../../interfaces/IFileSystemRepository";

/**
 * @classdesc implements the logic about how to write / read files
 */
export class FileSystemUseCase
{
    constructor(
        private FileSystemRepository: IFileSystemRepository
    ) {}

    async execute(datas: IFileSystemDTO): Promise<string | object>
    {
        if(datas.methodName === "write")
        {
            return await this.FileSystemRepository.writeFile(datas.filePath, datas.content);
        }
        else
        {
            return await this.FileSystemRepository.readFile(datas.filePath);
        }
    }
}