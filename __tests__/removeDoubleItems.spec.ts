import { describe, test, expect } from "@jest/globals";
import removeDoubleItems from "../src/utils/removeDoubleItems";

describe("Remove double clients", () => {
    test("Should remove double itens from an object Array", () => {
        const doubleItems = [
            {
                Client: {
                    id: 123456,
                    name: "Joe Richard",
                    addressInformations: [
                        {
                            street: "Rua Estados Unidos",
                            number: 1264
                        }
                    ]
                }
            },
            {
                Client: {
                    id: 123456,
                    name: "Joe Richard",
                    addressInformations: [
                        {
                            street: "Rua Estados Unidos",
                            number: 1264
                        }
                    ]
                }
            },
            {
                Client: {
                    id: 34569,
                    name: "Clayton Pinheiro",
                    addressInformations: [
                        {
                            street: "Rua João da Silva",
                            number: 365
                        }
                    ]
                }
            }
        ];

        const expected = [
            {
                Client: {
                    id: 123456,
                    name: "Joe Richard",
                    addressInformations: [
                        {
                            street: "Rua Estados Unidos",
                            number: 1264
                        }
                    ]
                }
            },
            {
                Client: {
                    id: 34569,
                    name: "Clayton Pinheiro",
                    addressInformations: [
                        {
                            street: "Rua João da Silva",
                            number: 365
                        }
                    ]
                }
            }
        ];

        const removedDoubleItems = removeDoubleItems(doubleItems);

        expect(removedDoubleItems).toHaveLength(2);
        expect(removedDoubleItems).toStrictEqual(expected);
    });

    test("Shouldn't remove any item from Array", () => {
        const withoutDoubleItems = [
            {
                Client: {
                    id: 123456,
                    name: "Joe Richard",
                    addressInformations: [
                        {
                            street: "Rua Estados Unidos",
                            number: 1264
                        }
                    ]
                }
            },
            {
                Client: {
                    id: 34569,
                    name: "Clayton Pinheiro",
                    addressInformations: [
                        {
                            street: "Rua João da Silva",
                            number: 365
                        }
                    ]
                }
            }
        ];

        expect(withoutDoubleItems).toHaveLength(2);
        expect(withoutDoubleItems).toStrictEqual(withoutDoubleItems);
    })
})