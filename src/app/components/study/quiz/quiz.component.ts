import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../../models/study/question';
import { StudyService } from '../../../services/study.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
    // An array to hold the shuffled questions fetched from the service.
    private questions: Question[] = [];

    // Tracks the index of the current question in the questions array.
    currentIndex = 0;

    // The number of the current question being displayed.
    currentQuestionNumber: number = 1;

    // The question object currently displayed in the quiz.
    currentQuestion: Question | null = null;

    // Total number of questions in the quiz.
    totalQuestions: number = 0;

    // The ID of the selected option for the current question.
    selectedOptionId: string | null = null;

    // The text of the answer for the current question.
    answerText: string = '';

    // An object to store user responses.
    responses: { [questionId: string]: string } = {};

    constructor(private router: Router, private studyService: StudyService) {}

    // Fetches questions from the service and shuffles them.
    ngOnInit(): void {
        this.studyService.getQuestions().subscribe({
            next: (questions) => {
                this.questions = this.shuffleQuestions(questions);
                this.totalQuestions = this.questions.length;
                this.loadResponses();
                this.setCurrentQuestion();
            },
            error: (error) => {
                console.error('Error fetching questions', error);
            },
            complete: () => {},
        });
    }

    // Shuffles the fetched questions using the Fisher-Yates algorithm to randomize their order.
    private shuffleQuestions(questions: Question[]): Question[] {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions;
    }

    // A helper method to call updateCurrentQuestion.
    private setCurrentQuestion(): void {
        this.updateCurrentQuestion();
    }

    // Updates the current question and selected option ID.
    private updateCurrentQuestion(): void {
        this.currentQuestion = this.questions[this.currentIndex];
        this.currentQuestionNumber = this.currentIndex + 1;
        this.selectedOptionId = this.responses[this.currentQuestion.id] || null;
    }

    // Loads saved responses from local storage, if available
    private loadResponses(): void {
        const storedResponses = localStorage.getItem('quizResponses');
        if (storedResponses) {
            this.responses = JSON.parse(storedResponses);
        }
    }

    // Updates selectedOptionId when a user selects an option.
    selectOption(optionId: string): void {
        this.selectedOptionId = optionId;
    }

    // Navigate to the next question if there is one.
    nextQuestion(): void {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.updateCurrentQuestion();
        }
    }

    // Navigate to the previous question if there is one.
    previousQuestion(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCurrentQuestion();
        }
    }

    // Saves the selected option ID to local storage.
    saveResponse(): void {
        if (!this.currentQuestion || !this.selectedOptionId) return;

        this.responses[this.currentQuestion.id] = this.selectedOptionId;
        localStorage.setItem('quizResponses', JSON.stringify(this.responses));

        console.log('Response saved:', this.selectedOptionId);
    }

    // Navigates to quiz-result with the count of correct answers after evaluating all responses.
    submitQuiz(): void {
        const questionResults = this.questions.map((question) => {
            const userResponse = this.responses[question.id];
            const selectedOption = question.options.find((option) => option.id === userResponse);
            const isCorrect = selectedOption ? selectedOption.is_correct : false;
            const answerText = question.answers.length > 0 ? question.answers[0].answer_text : 'No detailed answer available';

            return {
                questionId: question.id,
                questionText: question.question_text,
                selectedOptionText: selectedOption ? selectedOption.option_text : 'No response',
                isCorrect: isCorrect,
                answerText: answerText,
            };
        });

        const correctAnswers = questionResults.filter((result) => result.isCorrect).length;

        // Store the detailed quiz results in localStorage
        localStorage.setItem(
            'quizResults',
            JSON.stringify({
                totalQuestions: this.questions.length,
                correctAnswers: correctAnswers,
                questionResults: questionResults,
            })
        );

        // Navigate to the quiz-result component
        this.router.navigate(['/study/quiz-result']);
    }

    // Returns true if the number of responses equals the total number of questions.
    allQuestionsAnswered(): boolean {
        return Object.keys(this.responses).length === this.totalQuestions;
    }
}
