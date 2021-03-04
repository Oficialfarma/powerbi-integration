import { FileSystem } from "../src/repositories/implementations/FileSystem";

describe('FileSystem functions', () => {

    const fs = new FileSystem();

    it("Throw an Error if cannot write / read a file", async () => {
        
        const result = await fs.writeFile('../../lastRequestStatus.json').catch(err => {
            return err;
        });

        expect(result).toEqual(new Error("Unexpected error"));
    });
});