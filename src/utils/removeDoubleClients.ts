/**
 * @description Removes double elements from an Array recursively 
 * until all items in the array have been checked
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