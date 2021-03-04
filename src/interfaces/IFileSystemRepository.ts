export interface IFileSystemRepository
{
    writeFile(fileName: string, content: string): Promise<string | object>;
    readFile(filePath: string): Promise<string | object>;
}