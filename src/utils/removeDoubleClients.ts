/**
 * @description Removes double elements from an Array recursively 
 * until all items in the array have been checked.
 * Ps.: For now, it should be a not very large amount of information to avoid stack overflow
 * @param items Original array with double elements
 * @param itemsToBeReturned new array with no double elements.
 * Array passed during recursive call
 * @returns New array with no double informations
 */
export default function removeDoubleClients(items: Array<any>, itemsToBeReturned: Array<any> = []): Array<any>
{
    if(items.length > 0)
    {
        const actualItem = items.splice(0, 1)[0];

        if(itemsToBeReturned.length !== 0)
        {
            let hasDoubleClient = false;

            for(let i = 0; i < itemsToBeReturned.length; i++)
            {
                const actualKey: any = Object.keys(itemsToBeReturned[i])[0];
                const objId = Object.keys(itemsToBeReturned[i][actualKey])[0];
                const objIdValue = itemsToBeReturned[i][actualKey][objId];
                const objName = Object.getOwnPropertyNames(actualItem)[0];
                
                if(objName === actualKey)
                {
                    if(objIdValue === actualItem[actualKey][objId])
                    {
                        hasDoubleClient = true;
                        break;
                    }
                }
                
                if(JSON.stringify(itemsToBeReturned[i]) === JSON.stringify(actualItem))
                {
                    hasDoubleClient = true;
                    break;
                }
            }

            if(!hasDoubleClient)
            {
                itemsToBeReturned.push(actualItem);
            }
        }
        else
        {
            itemsToBeReturned.push(actualItem);
        }

        removeDoubleClients(items, itemsToBeReturned);
    }

    return itemsToBeReturned;
}