import { IDatabaseRepository } from "../interfaces/IDatabaseRepository";
import * as sql from 'mssql';

export class Database implements IDatabaseRepository
{
    protected connPool: sql.ConnectionPool;
    private selectColumns = '';
    private tableName: string;
    private insertIntoTableName: string;
    private insertValues: object[] = [];
    private updateTable = '';
    private setFields = {};
    private whereFilter = '';
    private deleteTable: string;
    protected queriesToExecute: string[] = [];

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
        if(this.selectColumns === '')
        {
            this.selectColumns = columns;
        }
        else
        {
            this.performSelect();
            this.selectColumns = columns;
        }

        return this;
    }

    /**
     * @description Sets the name of the table where the select
     * will be made and calls the method for creating the query
     * @param tableName Name of the table where the select will be made
     * @returns Class instance
     */
    from(tableName: string)
    {
        this.tableName = tableName;

        return this;
    }

    /**
     * @description Generates the select query with the information
     * configured in the select and from methods
     */
    private performSelect()
    {
        if(this.tableName && this.selectColumns === '')
        {
            this.selectColumns = '*';
        }

        let query = `SELECT ${this.selectColumns} FROM ${this.tableName}`;

        if(this.whereFilter !== '')
        {
            query += ` WHERE ${this.whereFilter}`;
            this.whereFilter = '';
        }

        this.queriesToExecute.push(query);
        this.selectColumns = '';
        this.tableName = '';
    }

    /**
     * @description sets the name of the table
     * where the insert will be made
     * @param tableName Name of the table where the insert will be made
     * @returns Class instance
     */
    insertInto(tableName: string)
    {
        this.insertIntoTableName = '';
        this.insertIntoTableName = tableName;

        return this;
    }

    /**
     * @description Sets the values ​​to be inserted in the table
     * @param values values ​​to be inserted in the table in object
     * format with the column name pair: value. E.g.: {column1: value1}
     * @returns Class instance
     */
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

    /**
     * @description go through the values ​​of the insert,
     * separating column and value by assembling the query for the insert
     */
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

    /**
     * @description Sets the name of the table where the update will be made
     * @param tableName Name of the table where the update will be made
     * @returns Class instance
     */
    update(tableName: string)
    {
        this.updateTable = tableName;

        return this;
    }

    /**
     * @description configure the columns and values ​​that will be used in the update
     * @param datas values ​​to be updated in the table in object
     * format with the column name pair: value. E.g.: {column1: value1}
     * @returns 
     */
    set(datas: object)
    {
        Object.assign(this.setFields, datas);
        return this;
    }
    /**
     * @description configure the filter used in the update
     * and delete and call the method that will build the corresponding query
     * @param filter
     * @returns Class instance
     */
    where(filter: string)
    {
        this.whereFilter = filter;

        if(this.updateTable)
        {
            this.performUpdate();
            this.setFields = {};
        }
        else if(this.deleteTable)
        {
            this.performDelete();
        }
        else
        {
            this.performSelect();
        }

        this.whereFilter = '';

        return this;
    }

    /**
     * @description Cycles through the values ​​defined in the set method,
     * separating in column and value and, at the end, assembles the query
     */
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

    /**
     * @description configure the name of the tables
     * @param tableName 
     * @returns Class instance
     */
    deleteFrom(tableName: string)
    {
        this.deleteTable = ''
        this.deleteTable = tableName;

        return this;
    }

    /**
     * @description assembles the delete query based
     * on the name of the passed table and filter
     */
    private performDelete()
    {
        let query = `DELETE FROM ${this.deleteTable} WHERE ${this.whereFilter}`;

        this.queriesToExecute.push(query);
    }

    /**
     * @description creates the connection with the
     * DB and initiates transactions
     * @returns query result or lines affected
     */
    async build()
    {
        if(this.selectColumns || this.tableName)
        {
            this.performSelect();
        }
    
        if(!this.queriesToExecute.length)
        {
            return [{}];
        }
        try
        {
            if(!this.connPool.connected && !this.connPool.connecting)
            {
                await this.connPool.connect();
            }
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

                await this.connPool.close();
                this.clearDatas();

                return result;
            }
            catch(err)
            {
                transaction.rollback(async () => {
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

    /**
     *  @description clear all class attributes
     */
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

    public async closeConnection()
    {
        await this.connPool.close();
    }
}