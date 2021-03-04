export interface IFileSystemRepository
{
    writeFile(fileName: string): Promise<string | object>;
    readFile(filePath: string): Promise<string | object>;
}