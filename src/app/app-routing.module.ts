import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AccessibilityStatementComponent } from './components/accessibility-statement/accessibility-statement.component';
import { CompletedComponent } from './components/completed/completed.component';
import { HomeComponent } from './components/home/home.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'a11y', component: AccessibilityStatementComponent },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
