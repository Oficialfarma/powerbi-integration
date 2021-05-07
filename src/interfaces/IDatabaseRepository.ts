import { Database } from "../repositories/Database";

export interface IDatabaseRepository
{
    createConnection(): Database;
    select(columns: string): Database;
    from(tableName: string): Database;
    build(): Promise<object[] | string[]>;
}