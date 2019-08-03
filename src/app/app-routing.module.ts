import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';






const routes: Routes = [

  { path: '', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'videos', loadChildren: './videos/videos.module#VideosPageModule' },
  { path: 'homeworks', loadChildren: './homeworks/homeworks.module#HomeworksPageModule' },
  { path: 'tables', loadChildren: './tables/tables.module#TablesPageModule' },
  { path: 'absent', loadChildren: './absent/absent.module#AbsentPageModule' },
  { path: 'marks', loadChildren: './marks/marks.module#MarksPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'money', loadChildren: './money/money.module#MoneyPageModule' },
  { path: 'bus', loadChildren: './bus/bus.module#BusPageModule' },
  { path: 'penalty', loadChildren: './penalty/penalty.module#PenaltyPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
