import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StudyRoutingModule } from './study-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

@NgModule({
    declarations: [QuizComponent, QuizResultComponent],
    imports: [CommonModule, FormsModule, StudyRoutingModule],
})
export class StudyModule {}
