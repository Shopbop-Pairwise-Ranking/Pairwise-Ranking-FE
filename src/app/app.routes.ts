import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RankingComponent } from './pages/ranking/ranking.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'ranking',
        component: RankingComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
