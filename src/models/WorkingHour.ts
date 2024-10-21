export interface WorkingHourResponse {
    id: number;
    day: DayInWeek;
    startTime: string;  // Assuming `LocalTime` is formatted as a string
    endTime: string;
}

export enum DayInWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}
