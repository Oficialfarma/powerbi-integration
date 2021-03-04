import createFileSystemController from "./useCases/FileSystem";

async function initOrdersGenerator()
{
    const fs = await createFileSystemController.handle().then(resp => console.log(resp));
}

initOrdersGenerator();