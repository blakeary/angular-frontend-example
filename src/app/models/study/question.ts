import { Answer } from './answer';
import { Option } from './option';

export interface Question {
    id: string;
    topic: {
        id: string;
        name: string;
    };
    question_type: {
        id: string;
        type: string;
    };
    difficulty: string;
    question_text: string;
    options: Option[];
    answers: Answer[];
}
