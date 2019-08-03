import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HomeworksPage } from './homeworks.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeworksPage]
})
export class HomeworksPageModule {}
