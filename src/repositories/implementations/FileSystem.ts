import * as fs from 'fs';
import { IFileSystemRepository } from '../../interfaces/IFileSystemRepository';

/**
 * @classdesc Read and write the files and log errors. Contains complet implementation
 */
export class FileSystem implements IFileSystemRepository
{
    async writeFile(fileName: string): Promise<string>
    {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, "teste", 'utf8', err => {
                if(err) reject(new Error("Unexpected error"));
                else resolve('File has saved')
            });
        })
    }

    async readFile(filePath: string): Promise<string>
    {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                console.log("retorno");
            });
        });
    }
}