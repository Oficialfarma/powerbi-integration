import * as fs from 'fs';
import { IFileSystemRepository } from '../interfaces/IFileSystemRepository';

/**
 * @classdesc Read and write the files and log errors. Contains complet implementation
 */
export class FileSystem implements IFileSystemRepository
{
    async writeFile(fileName: string, content: string): Promise<string>
    {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, content, 'utf8', err => {
                if(err) reject(new Error("Error saving"));
                else resolve('File has saved');
            });
        })
    }

    async readFile(filePath: string): Promise<string>
    {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8',(err, data) => {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(data);
                }
            });
        });
    }
}