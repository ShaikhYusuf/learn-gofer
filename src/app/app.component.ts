import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from './shared/quiz.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gofer';
  isSidebarActive = false;
  selectedLessonId: string = 'intro';
  siteTitle = 'Gofer Functional Programming';

  menuItems = [
    { id: 'intro', name: 'Introduction', link: '/intro', submenu: [] },
    {
      id: '1',
      name: '1. Simple Data Types',
      link: '/les1-exp',
      submenu: [
        { name: 'Explanation', link: '/les1-exp', icon: 'description' },
        { name: 'Example', link: '/les1-exam', icon: 'code' },
        { name: 'Problem', link: '/les1-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/1', icon: 'quiz' }
      ]
    },
    {
      id: '2',
      name: '2. Compound Data Types, Tuples & Lists',
      link: '/les2-exp',
      submenu: [
        { name: 'Explanation', link: '/les2-exp', icon: 'description' },
        { name: 'Example', link: '/les2-exam', icon: 'code' },
        { name: 'Problem', link: '/les2-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/2', icon: 'quiz' }
      ]
    },
    {
      id: '3',
      name: '3. Compound Data Types, Functions',
      link: '/les3-exp',
      submenu: [
        { name: 'Explanation', link: '/les3-exp', icon: 'description' },
        { name: 'Example', link: '/les3-exam', icon: 'code' },
        { name: 'Problem', link: '/les3-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/3', icon: 'quiz' }
      ]
    },
    {
      id: '4',
      name: '4. Writing And Loading a Gofer Script',
      link: '/les4-exp',
      submenu: [
        { name: 'Explanation', link: '/les4-exp', icon: 'description' },
        { name: 'Example', link: '/les4-exam', icon: 'code' },
        { name: 'Problem', link: '/les4-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/4', icon: 'quiz' }
      ]
    },
    {
      id: '5',
      name: '5. Rewriting Computational Model',
      link: '/les5-exp',
      submenu: [
        { name: 'Explanation', link: '/les5-exp', icon: 'description' },
        { name: 'Example', link: '/les5-exam', icon: 'code' },
        { name: 'Problem', link: '/les5-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/5', icon: 'quiz' }
      ]
    },
    {
      id: '6',
      name: '6. Proof by Induction',
      link: '/les6-exp',
      submenu: [
        { name: 'Explanation', link: '/les6-exp', icon: 'description' },
        { name: 'Example', link: '/les6-exam', icon: 'code' },
        { name: 'Problem', link: '/les6-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/6', icon: 'quiz' }
      ]
    },
    {
      id: '7',
      name: '7. Function Definition & Application',
      link: '/les7-exp',
      submenu: [
        { name: 'Explanation', link: '/les7-exp', icon: 'description' },
        { name: 'Example', link: '/les7-exam', icon: 'code' },
        { name: 'Problem', link: '/les7-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/7', icon: 'quiz' }
      ]
    },
    {
      id: '8',
      name: '8. Lists',
      link: '/les8-exp',
      submenu: [
        { name: 'Explanation', link: '/les8-exp', icon: 'description' },
        { name: 'Example', link: '/les8-exam', icon: 'code' },
        { name: 'Problem', link: '/les8-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/8', icon: 'quiz' }
      ]
    },
    {
      id: '9',
      name: '9. Functions with Multiple Arguments',
      link: '/les9-exp',
      submenu: [
        { name: 'Explanation', link: '/les9-exp', icon: 'description' },
        { name: 'Example', link: '/les9-exam', icon: 'code' },
        { name: 'Problem', link: '/les9-prob', icon: 'assignment' },
        { name: 'Quiz', link: '/quiz/9', icon: 'quiz' }
      ]
    },
  ];

  // Sequential step order for navigation (intro + 9 lessons × 4 sub-pages)
  private readonly stepSequence: string[] = [
    'intro',
    'les1-exp', 'les1-exam', 'les1-prob', 'quiz/1',
    'les2-exp', 'les2-exam', 'les2-prob', 'quiz/2',
    'les3-exp', 'les3-exam', 'les3-prob', 'quiz/3',
    'les4-exp', 'les4-exam', 'les4-prob', 'quiz/4',
    'les5-exp', 'les5-exam', 'les5-prob', 'quiz/5',
    'les6-exp', 'les6-exam', 'les6-prob', 'quiz/6',
    'les7-exp', 'les7-exam', 'les7-prob', 'quiz/7',
    'les8-exp', 'les8-exam', 'les8-prob', 'quiz/8',
    'les9-exp', 'les9-exam', 'les9-prob', 'quiz/9',
  ];

  constructor(private router: Router, public quizService: QuizService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url: string = event.urlAfterRedirects || event.url;
      // Sync sidebar lesson selection from URL
      const lessonMatch = url.match(/\/les(\d+)-/);
      const quizMatch = url.match(/\/quiz\/(\d+)/);
      if (lessonMatch) this.selectedLessonId = lessonMatch[1];
      else if (quizMatch) this.selectedLessonId = quizMatch[1];
      else if (url.includes('/intro')) this.selectedLessonId = 'intro';
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('participant') != null;
  }

  getUserName(): string {
    return this.quizService.getParticipantName();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/register']);
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }

  selectLesson(id: string, url: string): void {
    this.selectedLessonId = id;
    this.router.navigate([url]);
    if (window.innerWidth <= 992) {
      this.isSidebarActive = false;
    }
  }

  navigate(url: string): void {
    this.router.navigate([url]);
    if (window.innerWidth <= 992) {
      this.isSidebarActive = false;
    }
  }

  private getCurrentPageKey(): string {
    const url = this.router.url.replace(/^\//, '');
    // normalize quiz/1 style
    return url.split('?')[0];
  }

  getCurrentStepIndex(): number {
    const key = this.getCurrentPageKey();
    return this.stepSequence.indexOf(key);
  }

  hasPreviousStep(): boolean {
    return this.getCurrentStepIndex() > 0;
  }

  hasNextStep(): boolean {
    const idx = this.getCurrentStepIndex();
    return idx >= 0 && idx < this.stepSequence.length - 1;
  }

  goToPreviousStep(): void {
    const idx = this.getCurrentStepIndex();
    if (idx > 0) {
      const prevPath = this.stepSequence[idx - 1];
      // update sidebar selection
      const m = prevPath.match(/les(\d+)-/) || prevPath.match(/quiz\/(\d+)/);
      if (m) this.selectedLessonId = m[1];
      else if (prevPath === 'intro') this.selectedLessonId = 'intro';
      this.router.navigate([`/${prevPath}`]);
    }
  }

  goToNextStep(): void {
    const idx = this.getCurrentStepIndex();
    if (idx >= 0 && idx < this.stepSequence.length - 1) {
      const nextPath = this.stepSequence[idx + 1];
      const m = nextPath.match(/les(\d+)-/) || nextPath.match(/quiz\/(\d+)/);
      if (m) this.selectedLessonId = m[1];
      else if (nextPath === 'intro') this.selectedLessonId = 'intro';
      this.router.navigate([`/${nextPath}`]);
    }
  }

  getPreviousButtonText(): string {
    const idx = this.getCurrentStepIndex();
    if (idx <= 0) return 'Previous';
    const prev = this.stepSequence[idx - 1];
    if (prev === 'intro') return 'Back to Intro';
    if (prev.endsWith('-exp')) return 'Back to Explanation';
    if (prev.endsWith('-exam')) return 'Back to Example';
    if (prev.endsWith('-prob')) return 'Back to Problem';
    if (prev.startsWith('quiz/')) return 'Back to Quiz';
    return 'Previous';
  }

  getNextButtonText(): string {
    const idx = this.getCurrentStepIndex();
    if (idx < 0 || idx >= this.stepSequence.length - 1) return 'Next';
    const next = this.stepSequence[idx + 1];
    if (next === 'intro') return 'Go to Intro';
    if (next.endsWith('-exp')) return 'Go to Explanation';
    if (next.endsWith('-exam')) return 'Go to Example';
    if (next.endsWith('-prob')) return 'Go to Problem';
    if (next.startsWith('quiz/')) return 'Go to Quiz';
    return 'Next';
  }

  getStepIndicatorText(): string {
    const key = this.getCurrentPageKey();
    if (key === 'intro') return 'Introduction';
    const lessonMatch = key.match(/les(\d+)-(\w+)/);
    const quizMatch = key.match(/quiz\/(\d+)/);
    if (lessonMatch) {
      const num = lessonMatch[1];
      const sub = lessonMatch[2];
      const label = sub === 'exp' ? 'Explanation' : sub === 'exam' ? 'Example' : 'Problem';
      return `Lesson ${num} of 9: ${label}`;
    }
    if (quizMatch) return `Lesson ${quizMatch[1]} of 9: Quiz`;
    return '';
  }
}
