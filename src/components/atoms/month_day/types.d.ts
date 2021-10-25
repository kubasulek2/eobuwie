export type MonthDayProps = {
    monthDay: number;
    dateString: string;
    timeStamp: number;
    available: boolean;
    today: boolean;
    column: number;
    selected: boolean;
    firstSelected: boolean;
    lastSelected: boolean;
    onClick: (timeStamp: number) => void;
}