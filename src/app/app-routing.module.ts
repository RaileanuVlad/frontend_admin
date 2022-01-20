import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard' 
import { PreviewComponent } from './preview/preview.component';
import { MathComponent } from './math/math.component';
import { UnitatiComponent } from './unitati/unitati.component';
import { ScoringComponent } from './scoring/scoring.component';
import { ChestionarComponent } from './chestionar/chestionar.component';
import { OrganizareComponent } from './organizare/organizare.component';

const routes: Routes = [
  { path: 'preview', component: PreviewComponent, canActivate: [AuthGuard]  },
  { path: 'math', component: MathComponent, canActivate: [AuthGuard]  },
  { path: 'moderator', component: UnitatiComponent, canActivate: [AuthGuard]  },
  { path: 'scoring', component: ScoringComponent, canActivate: [AuthGuard]  },
  { path: 'chestionar', component: ChestionarComponent, canActivate: [AuthGuard]  },
  { path: 'organizare', component: OrganizareComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
