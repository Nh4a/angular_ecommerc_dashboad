import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      import('./layouts/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      {
        path: '',
        loadComponent: async () =>
          import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
      },
      {
        path: 'products',
        loadComponent: async () =>
          import('./pages/product-page/product-page').then((m) => m.ProductPage),
      },
      {
        path: 'categories',
        loadComponent: async () =>
          import('./pages/category-page/category-page').then((m) => m.CategoryPage),
      },
      {
        path: 'users',
        loadComponent: async () => import('./pages/user-page/user-page').then((m) => m.UserPage),
      },
      {
        path: 'orders',
        loadComponent: async () => import('./pages/order-page/order-page').then((m) => m.OrderPage),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: async () =>
      import('./pages/auths/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'unauthorize',
    loadComponent: async () =>
      import('./pages/un-authorized-page/un-authorized-page').then((m) => m.UnAuthorizedPage),
  },
];
