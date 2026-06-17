import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  quizzes: any[] = [];
  selectedAnswers: { [key: number]: number } = {};
  submitted = false;
  lessonId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lessonId = +params['lessonId'];
      this.submitted = false;
      this.selectedAnswers = {};
      this.loadQuizzes(this.lessonId);
    });
  }

  loadQuizzes(lessonId: number): void {
    const url = `./lesson${lessonId}.json`;
    this.http.get<any[]>(url).subscribe({
      next: data => { this.quizzes = data; },
      error: err => { console.error('Error loading quiz data:', err); }
    });
  }

  selectOption(quizId: number, optionIndex: number): void {
    if (!this.submitted) {
      this.selectedAnswers[quizId] = optionIndex;
    }
  }

  submitAnswers(): void {
    this.submitted = true;
  }

  /**
   * Handles both numeric index answers (e.g. answer: 2)
   * and string-literal answers (e.g. answer: "Some option text")
   */
  isCorrectOption(quiz: any, optionIndex: number): boolean {
    if (typeof quiz.answer === 'number') {
      return quiz.answer === optionIndex;
    }
    // string-match: compare answer text to the option at this index
    return quiz.options[optionIndex - 1] === quiz.answer;
  }

  getScore(): number {
    let score = 0;
    for (const quiz of this.quizzes) {
      const selected = this.selectedAnswers[quiz.id];
      if (selected !== undefined && this.isCorrectOption(quiz, selected)) {
        score++;
      }
    }
    return score;
  }
}
