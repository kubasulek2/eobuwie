export type MonthDayProps = {
    monthDay: number;
    dateString: string;
    timeStamp: number;
    available: boolean;
    column: number;
    selected: boolean;
    first: boolean;
    last: boolean;
    onClick: (timeStamp: number) => void;
}