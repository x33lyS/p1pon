import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoredSquaresComponent } from './components/colored-squares/colored-squares.component';
import { FireDeploymentComponent } from './components/fire-deployment/fire-deployment.component';

const routes: Routes = [
  { path: '', component: ColoredSquaresComponent },
  { path: 'map', component: ColoredSquaresComponent },
  { path: 'fire', component: FireDeploymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
