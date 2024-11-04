import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryGenderComponent } from './pages/category-gender/category-gender.component';
import { CategoryClothingComponent } from './pages/category-clothing/category-clothing.component';
import { ProductRankingComponent } from './pages/product-ranking/product-ranking.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ranking',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignUpComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'ranking',
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'category',
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        component: CategoryGenderComponent
                    },
                    {
                        path: 'clothing/:gender',
                        children: [
                            {
                                path: '',
                                component: CategoryClothingComponent
                            },
                            {
                                path: ':product',
                                component: ProductRankingComponent
                            }
                        ]
                    }

                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'ranking'
    }
];
