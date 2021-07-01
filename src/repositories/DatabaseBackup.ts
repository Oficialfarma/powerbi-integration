import { Database } from "./Database"

type Params = {
    database: string;
    localToSave: string;
    backupFileName: string;
}

export default class DatabaseBackup extends Database
{
    private backupQuery: string;

    /**
     * @classdesc Creates the backup query
     * @param object containing databaseName, local to save (E.g: C:\\Users\\someUser)
     * withou slash at the end of the string and file name without extension (E.g: SqlBackup)
     * @returns Class instance
     */
    createBackup({ database, localToSave, backupFileName } : Params)
    {
        const fileName = `${backupFileName}-${new Date().toLocaleDateString()}.bak`;
        const query = `BACKUP DATABASE ${database} TO DISK='${localToSave}\\${fileName.replace(/(\/)+|(\s)+/g, "-")}'`;
        
        this.backupQuery = query;

        return this;
    }

    async build()
    {
        if(!this.connPool.connecting && !this.connPool.connected)
        {
            await this.connPool.connect();
        }
        
        try
        {
            await this.connPool.query(this.backupQuery);
            
            return true;
        }
        catch(err)
        {
            return err;
        }
    }
}