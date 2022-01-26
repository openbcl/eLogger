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

export const icons = [
    { class: 'pi pi-code', style: 'opacity: 0;' },
    { class: 'pi pi-arrow-left' },
    { class: 'pi pi-arrow-right' },
    { class: 'pi pi-arrow-down' },
    { class: 'pi pi-arrow-up' },
    { class: 'pi pi-arrow-up-left' },
    { class: 'pi pi-arrow-up-right' },
    { class: 'pi pi-arrow-down-left' },
    { class: 'pi pi-arrow-down-right' },
    { class: 'pi pi-arrows-h' },
    { class: 'pi pi-arrows-v' },
    { class: 'pi pi-ban' },
    { class: 'pi pi-bell' },
    { class: 'pi pi-bolt' },
    { class: 'pi pi-home' },
    { class: 'pi pi-building' },
    { class: 'pi pi-car' },
    { class: 'fas fa-bicycle', style: 'width: 16px' },
    { class: 'fas fa-running', style: 'width: 16px' },
    { class: 'fas fa-male', style: 'width: 16px' },
    { class: 'fas fa-female', style: 'width: 16px' },
    { class: 'fas fa-child', style: 'width: 16px' },
    { class: 'fas fa-mars', style: 'width: 16px' },
    { class: 'fas fa-venus', style: 'width: 16px' },
    { class: 'fas fa-transgender', style: 'width: 16px' },
    { class: 'pi pi-video' },
    { class: 'pi pi-image' },
    { class: 'pi pi-clock' },
    { class: 'pi pi-history' },
    { class: 'pi pi-sun' },
    { class: 'pi pi-cloud' },
    { class: 'pi pi-cloud-download' },
    { class: 'pi pi-cloud-upload' },
    { class: 'pi pi-download' },
    { class: 'pi pi-upload' },
    { class: 'pi pi-sign-in' },
    { class: 'pi pi-sign-out' },
    { class: 'pi pi-info-circle' },
    { class: 'pi pi-exclamation-triangle' },
    { class: 'pi pi-question' },
    { class: 'pi pi-eye' },
    { class: 'pi pi-eye-slash' },
    { class: 'pi pi-heart' },
    { class: 'pi pi-star' },
    { class: 'far fa-thumbs-up', style: 'width: 16px' },
    { class: 'far fa-thumbs-down', style: 'width: 16px' },
    { class: 'pi pi-times' },
    { class: 'pi pi-lock-open' },
    { class: 'pi pi-lock' },
    { class: 'pi pi-plus' },
    { class: 'pi pi-minus' },
    { class: 'pi pi-power-off' },
    { class: 'pi pi-refresh' },
    { class: 'pi pi-replay' },
    { class: 'pi pi-user' },
    { class: 'pi pi-user-plus' },
    { class: 'pi pi-user-minus' },
    { class: 'pi pi-volume-off' },
    { class: 'pi pi-volume-down' },
    { class: 'pi pi-volume-up' },
]