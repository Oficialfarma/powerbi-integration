import { IDatabaseRepository } from "../interfaces/IDatabaseRepository";
import * as sql from 'mssql';

type InsertValues = {
    columnName: string;
    value: any;
}

export class Database implements IDatabaseRepository
{
    private connPool: sql.ConnectionPool;
    private selectColumns = '';
    private tableName: string;
    private insertInto: string;
    private insertValues: object[] = [];
    private queriesToExecute: string[] = [];

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
    }

    insertIntoTable(tableName: string)
    {
        this.insertInto = tableName;

        return this;
    }

    values(values: object | object[])
    {
        if(Array.isArray(values))
        {
            this.insertValues.concat(values);
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
        let columNames = Object.keys(this.insertValues[0]);
        let query = `INSERT INTO ${this.insertInto} (${columNames}) VALUES `;

        this.insertValues.forEach((value: any) => {
            let actualValue = [];

            for(const key in value)
            {
                actualValue.push(value[key])
            }

            query+= `(${actualValue.join(',')})`;
        });

        this.queriesToExecute.push(query);
    }

    async build()
    {
        if(!this.tableName)
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
                    throw new Error(err);
                });
    
                const request = new sql.Request(transaction);
    
                let result:object[] = [];

                for(const query of this.queriesToExecute)
                {
                    const { recordset } = await request.query(query);
                    result = result.concat(recordset);
                }
    
                await transaction.commit()
                    .catch(err => {
                        result = err;
                    });

                this.connPool.close();

                return result;
            }
            catch(err)
            {
                transaction.rollback(() => {
                    this.connPool.close();
                })
    
                return err;
            }   
        }
        catch(err)
        {
            return err;
        }
    }
}