import { Routes } from '@angular/router';
import { IntroExplanationComponent } from './features/lessons/lesson0/explanation.component';
import { lesson1ExplanationComponent } from './features/lessons/lesson1//explanation/explanation.component';
import { lesson1ExamplesComponent } from './features/lessons/lesson1/examples/examples.component';
import { lesson2ExplanationComponent } from './features/lessons/lesson2/explanation/explanation.component';
import { lesson2ExamplesComponent } from './features/lessons/lesson2/examples/examples.component';
import { lesson2ProblemsComponent } from './features/lessons/lesson2/problems/problems.component';
import { lesson3ExplanationComponent } from './features/lessons/lesson3/explanation/explanation.component';
import { lesson3ProblemsComponent } from './features/lessons/lesson3/problems/problems.component';
import { lesson3ExamplesComponent } from './features/lessons/lesson3/examples/examples.component';
import { lesson4ExplanationComponent } from './features/lessons/lesson4/explanation/explanation.component';
import { lesson4ExamplesComponent } from './features/lessons/lesson4/examples/examples.component';
import { lesson4ProblemsComponent } from './features/lessons/lesson4/problems/problems.component';
import { lesson5ExamplesComponent } from './features/lessons/lesson5/examples/examples.component';
import { lesson5ExplanationComponent } from './features/lessons/lesson5/explanation/explanation.component';
import { lesson6ExplanationComponent } from './features/lessons/lesson6/explanation/explanation.component';
import { lesson6ExamplesComponent } from './features/lessons/lesson6/examples/examples.component';
import { lesson7ExamplesComponent } from './features/lessons/lesson7/examples/examples.component';
import { lesson7ExplanationComponent } from './features/lessons/lesson7/explanation/explanation.component';
import { lesson8ExplanationComponent } from './features/lessons/lesson8/explanation/explanation.component';
import { lesson8ExampleComponent } from './features/lessons/lesson8/example/example.component';
import { lesson9ExplanationComponent } from './features/lessons/lesson9/explanation/explanation.component';
import { lesson9ExampleComponent } from './features/lessons/lesson9/example/example.component';
import { lesson5ProblemsComponent } from './features/lessons/lesson5/problems/problems.component';
import { lesson6ProblemsComponent } from './features/lessons/lesson6/problems/problems.component';
import { lesson7ProblemsComponent } from './features/lessons/lesson7/problems/problems.component';
import { lesson8ProblemComponent } from './features/lessons/lesson8/problem/problem.component';
import { lesson9ProblemComponent } from './features/lessons/lesson9/problem/problem.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { lesson1ProblemComponent } from './features/lessons/lesson1/problem/problem.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'intro', pathMatch: 'full' },
            { path: 'intro', component: IntroExplanationComponent },
            { path: 'les1-exp', component: lesson1ExplanationComponent },
            { path: 'les1-exam', component: lesson1ExamplesComponent },
            { path: 'les1-prob', component: lesson1ProblemComponent },
            { path: 'les2-exp', component: lesson2ExplanationComponent },
            { path: 'les2-exam', component: lesson2ExamplesComponent },
            { path: 'les2-prob', component: lesson2ProblemsComponent },
            { path: 'les3-exp', component: lesson3ExplanationComponent },
            { path: 'les3-exam', component: lesson3ExamplesComponent },
            { path: 'les3-prob', component: lesson3ProblemsComponent },
            { path: 'les4-exp', component: lesson4ExplanationComponent },
            { path: 'les4-exam', component: lesson4ExamplesComponent },
            { path: 'les4-prob', component: lesson4ProblemsComponent },
            { path: 'les5-exam', component: lesson5ExamplesComponent },
            { path: 'les5-exp', component: lesson5ExplanationComponent },
            { path: 'les5-prob', component: lesson5ProblemsComponent },
            { path: 'les6-exp', component: lesson6ExplanationComponent },
            { path: 'les6-prob', component: lesson6ProblemsComponent },
            { path: 'les6-exam', component: lesson6ExamplesComponent },
            { path: 'les7-exam', component: lesson7ExamplesComponent },
            { path: 'les7-exp', component: lesson7ExplanationComponent },
            { path: 'les7-prob', component: lesson7ProblemsComponent },
            { path: 'les8-exp', component: lesson8ExplanationComponent },
            { path: 'les8-exam', component: lesson8ExampleComponent },
            { path: 'les8-prob', component: lesson8ProblemComponent },
            { path: 'les9-exp', component: lesson9ExplanationComponent },
            { path: 'les9-exam', component: lesson9ExampleComponent },
            { path: 'les9-prob', component: lesson9ProblemComponent },
            { path: 'quiz/:lessonId', component: QuizComponent },
        ]
    }
];
