export interface Student {
    id: number;
    name: string;
    lastName: String;
    students?: Student[]; // opcional
}