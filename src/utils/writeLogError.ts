import createFileSystemController from "../useCases/FileSystem";

export default async function writeLogError(errorMessage: string)
{
    let retryWriteLogLimit = 5;

    const datas = await createFileSystemController.handle({
        filePath: 'error.log',
        methodName: 'read'
    })
    .then(resp => resp)
    .catch(err => err);
    
    let message;

    if(datas instanceof Error)
    {
        message = errorMessage + " " + new Date();
    }
    else
    {
        message = datas + '\r\n \r\n' + errorMessage + " " + new Date();
    }
    
    await createFileSystemController.handle({
        filePath: 'error.log',
        methodName: 'write',
        errorMessage: message
    }).then(() => {
        process.exit(0);
    }).catch((err) => {
        if(retryWriteLogLimit > 0)
        {
            retryWriteLogLimit-=1;
            setTimeout(() => {
                writeLogError(errorMessage)
            }, 2000);
        }
        else
        {
            process.exit(0);
        }
    }); 
}