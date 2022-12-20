import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { EmptyLayoutComponent } from './layout/empty/empty.component';
import { ModernLayoutComponent } from './layout/modern/modern.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/overview' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard/overview' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [],
    canActivateChild: [],

    children: [
      { path: 'account', loadChildren: () => import('../app/account/account.module').then(m => m.AccountModule) },

    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
