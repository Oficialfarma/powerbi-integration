import { IDatabaseRepository } from "../interfaces/IDatabaseRepository";
import * as sql from 'mssql';

export class Database implements IDatabaseRepository
{
    private connPool: sql.ConnectionPool;
    private selectColumns: string[] = [];
    private tableName: string;

    static for()
    {
        return new Database();
    }

    createConnection()
    {
        const config = {
            user: process.env.DB_USERID_DEV,
            password: process.env.DB_PASS_DEV,
            server: process.env.DB_SERVER_DEV,
            database: process.env.DB_NAME_DEV,
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
    
        this.connPool = new sql.ConnectionPool(config);

        return this;
    }

    select(columns: string)
    {
        this.selectColumns.push(columns);

        return this;
    }

    from(tableName: string)
    {
        this.tableName = tableName;

        return this;
    }

    async build()
    {
        if(!this.tableName)
        {
            return {};
        }

        try
        {
            if(this.tableName && !this.selectColumns.length)
            {
                this.selectColumns.push('*');
            }

            const stmt = `SELECT ${this.selectColumns.join(',')} FROM ${this.tableName}`;
            await this.connPool.connect();
            const { recordset } = await this.connPool.query(stmt);

            this.connPool.close();

            return recordset;
        }
        catch(err)
        {
            return Promise.reject(err);
        }   
    }
}