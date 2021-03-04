import { FileSystem } from "../../repositories/implementations/FileSystem";
import { FileSystemController } from "./FileSystemController";
import { FileSystemUseCase } from "./FileSystemUseCase";

const fileSystem = new FileSystem();
const createFileSystemUseCase = new FileSystemUseCase(fileSystem);
const createFileSystemController = new FileSystemController(createFileSystemUseCase);

export default createFileSystemController;