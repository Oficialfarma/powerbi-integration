import { describe, test, expect } from '@jest/globals';

import { FileSystem } from "../src/repositories/implementations/FileSystem";

describe('FileSystem suite', () => {

    const fs = new FileSystem();

    test("Throw an Error if cannot write / read a file", async () => {
        
        const result = await fs.writeFile('../../lastRequestStatus.json', "teste").catch(err => {
            return err;
        });

        expect(result).toEqual(new Error('Error saving'));
    });

    test.todo("#Write File - should successfully write a file");
    test.todo("#Read File - Should returns datas from file")
});