import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit {
    correctAnswers: number = 0;
    totalQuestions: number = 0;
    questionResults: Array<{
        questionId: string;
        questionText: string;
        answerText: string;
        selectedOptionText: string;
        isCorrect: boolean;
    }> = [];

    ngOnInit(): void {
        const results = localStorage.getItem('quizResults');
        if (results) {
            const quizResults = JSON.parse(results);
            this.correctAnswers = quizResults.correctAnswers;
            this.totalQuestions = quizResults.totalQuestions;
            this.questionResults = quizResults.questionResults;
        }
    }
}
