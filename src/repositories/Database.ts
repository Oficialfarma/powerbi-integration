import { IDatabaseRepository } from "../interfaces/IDatabaseRepository";
import * as sql from 'mssql';

export class Database implements IDatabaseRepository
{
    private connPool: sql.ConnectionPool;
    private selectColumns = '';
    private tableName: string;
    private insertIntoTableName: string;
    private insertValues: object[] = [];
    private updateTable = '';
    private setFields = {};
    private whereFilter = '';
    private deleteTable: string;
    private queriesToExecute: string[] = [];

    /**
     * @description Creates a new connection pool using the
     * bank information based on the current NODE_ENV
     */
    createConnection()
    {
        let envToUse = process.env.NODE_ENV.toUpperCase().trimEnd();

        const config = {
            user: process.env[`DB_USERID_${envToUse}`],
            password: process.env[`DB_PASS_${envToUse}`],
            server: process.env[`DB_SERVER_${envToUse}`],
            database: process.env[`DB_NAME_${envToUse}`],
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
        this.connPool = new sql.ConnectionPool(config);

        return this;
    }

    /**
     * @description Clears the name of the existing columns in the class,
     * so that a chained select can be made and configures new columns
     * to mount the select query
     * @param columns Name of the columns to be selected in the bank
     * @returns Class instance
     */
    select(columns: string)
    {
        this.selectColumns = columns;

        return this;
    }

    from(tableName: string)
    {
        this.tableName = tableName;

        this.performSelect();

        return this;
    }

    private performSelect()
    {
        if(this.tableName && this.selectColumns === '')
        {
            this.selectColumns = '*';
        }

        const query = `SELECT ${this.selectColumns} FROM ${this.tableName}`;

        this.queriesToExecute.push(query);
        this.selectColumns = '';
        this.tableName = '';
    }

    insertInto(tableName: string)
    {
        this.insertIntoTableName = '';
        this.insertIntoTableName = tableName;

        return this;
    }

    values(values: object | object[])
    {
        if(Array.isArray(values))
        {
            this.insertValues = this.insertValues.concat(values);
        }
        else
        {
            this.insertValues.push(values);
        }

        this.performInsert();
        
        return this;
    }

    private performInsert()
    {
        let columNames = '';
        let queryValues:string[] = [];
        
        this.insertValues.forEach((value: any, index:number) => {
            let actualValue = [];
            columNames = Object.keys(this.insertValues[index]).join(',');

            for(const key in value)
            {
                actualValue.push(value[key]);
            }

            queryValues.push(`(${actualValue.join(',')})`)
        });

        let query = `INSERT INTO ${this.insertIntoTableName} (${columNames}) VALUES `;

        query += queryValues.join(',');

        this.queriesToExecute.push(query);
        this.insertValues = [];
    }

    update(tableName: string)
    {
        this.updateTable = tableName;

        return this;
    }

    set(datas: object)
    {
        Object.assign(this.setFields, datas);
        return this;
    }
    where(filter: string)
    {
        this.whereFilter = filter;

        if(this.updateTable)
        {
            this.performUpdate();
        }
        
        if(this.deleteTable)
        {
            this.performDelete();
        }

        this.whereFilter = '';

        return this;
    }

    private performUpdate()
    {
        let columnValue = Object.entries(this.setFields);
        let fields = '';
        let actualField:string[] = []

        for(const [ column, value ] of columnValue)
        {
            actualField.push(`${column}=${value}`);
        }
        
        fields+= actualField.join(',');
        let query = `UPDATE [${this.updateTable}] SET ${fields} WHERE ${this.whereFilter}`;

        this.queriesToExecute.push(query);
    }

    deleteFrom(tableName: string)
    {
        this.deleteTable = ''
        this.deleteTable = tableName;

        return this;
    }

    private performDelete()
    {
        let query = `DELETE FROM ${this.deleteTable} WHERE ${this.whereFilter}`;

        this.queriesToExecute.push(query);
    }

    async build()
    {
        if(!this.queriesToExecute.length)
        {
            return [{}];
        }
        try
        {
            await this.connPool.connect();
            const transaction = new sql.Transaction(this.connPool);
            
            try
            {
                await transaction.begin().catch(err => {
                    this.connPool.close();
                    throw err;
                });
    
                const request = new sql.Request(transaction);
    
                let result:object[] = [];
                
                for(const query of this.queriesToExecute)
                {
                    if(query.match(/(update)|(insert)|(delete)/i))
                    {
                        const { rowsAffected } = await request.query(query);
                        result = result.concat(rowsAffected);
                    }
                    else
                    {   
                        const { recordset } = await request.query(query);
                        result = result.concat(recordset);
                    }
                }
    
                await transaction.commit()
                    .catch(err => {
                        throw err;
                    });

                this.connPool.close();
                this.clearDatas();

                return result;
            }
            catch(err)
            {
                transaction.rollback(async () => {
                    await this.connPool.close();
                    this.clearDatas();
                });
    
                return err;
            }   
        }
        catch(err)
        {
            this.clearDatas();
            return err;
        }
    }

    private clearDatas()
    {
        this.insertIntoTableName = '';
        this.insertValues = [];
        this.queriesToExecute = [];
        this.selectColumns = '';
        this.tableName = '';
        this.updateTable = '';
        this.setFields = {};
        this.whereFilter = '';
    }
}