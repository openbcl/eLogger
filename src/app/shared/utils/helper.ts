import { Log } from "../models";

export const reorderLogs = (values: Log[]) => values.map<Log>((value, index, array) => ({
    ...value,
    prev: index === 0 ? null : array[index - 1].id
}));

export const orderedLogs = (values: Log[]) => {
    try {
        const orderedValeus = [ values.find(log => log.prev === null) ];
        while (orderedValeus.length < values.length) {
            orderedValeus.push(values.find(value => value.prev === orderedValeus[orderedValeus.length - 1].id)!)
        }
        return orderedValeus;
    } catch (err) {
        console.error(err);
        return reorderLogs(values);
    }
}