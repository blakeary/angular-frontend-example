import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

const routes: Routes = [
    { path: 'study/quiz', component: QuizComponent },
    { path: 'study/quiz-result', component: QuizResultComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudyRoutingModule {}
