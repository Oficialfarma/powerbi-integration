import { IFileSystemRepository } from "../../interfaces/IFileSystemRepository";
import { IFileSystemDTO } from "./IFileSystemDTO";

export class FileSystemUseCase
{
    constructor(
        private FileSystemRepository: IFileSystemRepository
    ) {}

    async execute(datas: IFileSystemDTO)
    {
        if(datas.methodName === "write")
        {
            return this.FileSystemRepository.writeFile();
        }
        else
        {
            return this.FileSystemRepository.readFile(datas.filePath);
        }
    }
}