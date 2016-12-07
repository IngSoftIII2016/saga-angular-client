/**
 * Created by juan on 06/12/16.
 */
declare var moment: any;

export function parseMySQLDate(date: string): Date {
    return moment(date).toDate();
}

export function parseMySQLTime(time: string): Date {
    return moment(time, 'HH:mm:ss').toDate();
}

export function parseMySQLDateTime(date: string, time:string): Date {
    return moment(date + ' ' + time).toDate()
}

export function toMySQLDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
}

export function toMySQLTime(date: Date): string {
    return moment(date).format('HH:mm:ss');
}