export interface Report {
    reportId: number;
    reportType: number;
    content: string;
    questioner : {
        userId: number;
        fullName: string;
    }
}
