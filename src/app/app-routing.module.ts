import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { Error404Component } from './components//error-pages/error404/error404.component';
import { LandingPageComponent } from './components/landing-page/landing-page/landing-page.component';
import { LoginComponent } from './components/landing-page/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    data: {
      title: 'Enhance',
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Enhance - Sign in',
    },
  },
  {
    path: '**',
    component: Error404Component,
    data: {
      title: 'Lost in 404 Galaxy',
    },
  },
  /*

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'restaurantProfile',
        loadChildren: () =>
          import('./views/restaurant-profile/restaurant-profile.module').then(
            (m) => m.RestaurantProfileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },

      {
        path: 'foodList',
        loadChildren: () =>
          import('./views/list-food/list-food.module').then(
            (m) => m.ListFoodModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'offer',
        loadChildren: () =>
          import('./views/offer/offer.module').then((m) => m.OfferModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./views/table/table.module').then((m) => m.TableModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./views/order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./views/reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/admins/admins.module').then((m) => m.AdminsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./views/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orderHistory',
        loadChildren: () =>
          import('./views/order-histroy/order-histroy.module').then(
            (m) => m.OrderHistroyModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('./views/provider/provider.module').then(
            (m) => m.ProviderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'items',
        loadChildren: () =>
          import('./views/items/items.module').then((m) => m.ItemsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
        canActivate: [AuthGuard],
      },

      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
        canActivate: [AuthGuard],
      },

      {
        path: 'sessions',
        loadChildren: () =>
          import('./views/session/session.module').then((m) => m.SessionModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'export-import',
        loadChildren: () =>
          import('./views/export-import/export-import.module').then(
            (m) => m.ExportImportModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'myprofile',
        loadChildren: () =>
          import('./views/account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'restaurantList',
        loadChildren: () =>
          import('./views/restaurant-list/restaurant-list.module').then(
            (m) => m.RestaurantListModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./views/notifications-tabs/notifications-tabs.module').then(
            (m) => m.NotificationsTabsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
