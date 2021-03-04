import { IFileSystemRepository } from "../../interfaces/IFileSystemRepository";
import { IFileSystemDTO } from "./IFileSystemDTO";

/**
 * @classdesc implements the logic about how to write / read files
 */
export class FileSystemUseCase
{
    constructor(
        private FileSystemRepository: IFileSystemRepository
    ) {}

    async execute(datas: IFileSystemDTO)
    {
        if(datas.methodName === "write")
        {
            return this.FileSystemRepository.writeFile("lastRequestStatus.json");
        }
        else
        {
            return this.FileSystemRepository.readFile(datas.filePath);
        }
    }
}