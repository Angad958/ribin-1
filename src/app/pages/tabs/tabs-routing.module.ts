import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'all-categories',
        loadChildren: () => import('../all-categories/all-categories.module').then(m => m.AllCategoriesPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'user-vouchers',
        loadChildren: () => import('../user-vouchers/user-vouchers.module').then(m => m.UserVouchersPageModule)
      },
      {
        path: 'vendor-vouchers',
        loadChildren: () => import('../vendor/vendor-vouchers/vendor-vouchers.module').then(m => m.VendorVouchersPageModule)
      },
      {
        path: 'vendor-transactions',
        loadChildren: () => import('../vendor/transactions/transactions.module').then(m => m.TransactionsPageModule)
      },
      {
        path: 'user-orders',
        loadChildren: () => import('../user-orders/user-orders.module').then(m => m.UserOrdersPageModule)
      },
      {
        path: 'admin-vouchers',
        loadChildren: () => import('../admin/admin-vouchers/admin-vouchers.module').then(m => m.AdminVouchersPageModule)
      },
      {
        path: 'admin-transactions',
        loadChildren: () => import('../admin/admin-transactions/admin-transactions.module').then(m => m.AdminTransactionsPageModule)
      },
      {
        path: 'admin-vendors',
        loadChildren: () => import('../admin/vendors/vendors.module').then(m => m.VendorsPageModule)
      },
      {
        path: 'vendor-send-voucher',
        loadChildren: () => import('../vendor/vendor-send-voucher/vendor-send-voucher.module').then(m => m.VendorSendVoucherPageModule  )
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
