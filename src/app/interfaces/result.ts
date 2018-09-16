import { Exam } from './exam';
import { Student } from './student';
export interface Result {
    id: number;
    examId: Exam;
    studentId: Student;
    biology: number;
    chemistry: number;
    cre: number;
    english: number;
    geography: number;
    history: number;
    kiswahili: number;
    math: number;
    physics: number;
}
