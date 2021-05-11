import { Database } from "../repositories/Database";

export interface IDatabaseRepository
{
    createConnection(): Database;
    select(columns: string): Database;
    from(tableName: string): Database;
    insertInto(tableName: string): Database;
    values(values: object | object[]): Database;
    update(tablename: string): Database;
    set(datas: object): Database;
    where(filter: string): Database;
    build(): Promise<object[] | string[]>;
}