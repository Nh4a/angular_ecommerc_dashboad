import { Routes } from '@angular/router';
import { App } from './app';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { ProductPage } from './pages/product-page/product-page';
import { CategoryPage } from './pages/category-page/category-page';
import { UserPage } from './pages/user-page/user-page';
import { OrderPage } from './pages/order-page/order-page';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: 'products',
        component: ProductPage,
      },
      {
        path: 'categories',
        component: CategoryPage,
      },
      {
        path: 'users',
        component: UserPage,
      },
      {
        path: 'orders',
        component: OrderPage,
      },
    ],
  }
];
