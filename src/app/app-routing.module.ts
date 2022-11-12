import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },

  // {
  //   path: '',
  //   redirectTo: 'test',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'sidemenu',
    loadChildren: () => import('./pages/sidemenu/sidemenu.module').then( m => m.SidemenuPageModule)
  },
  {
    path: 'select-voucher-design',
    loadChildren: () => import('./pages/select-voucher-design/select-voucher-design.module').then( m => m.SelectVoucherDesignPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'share-voucher/:id',
    loadChildren: () => import('./pages/share-voucher/share-voucher.module').then( m => m.ShareVoucherPageModule)
  },
  {
    path: 'pay-with-voucher/:id',
    loadChildren: () => import('./pages/pay-with-voucher/pay-with-voucher.module').then( m => m.PayWithVoucherPageModule)
  },
  {
    path: 'pay-with-voucher-confirm-modal',
    loadChildren: () => import('./pages/pay-with-voucher-confirm-modal/pay-with-voucher-confirm-modal.module').then( m => m.PayWithVoucherConfirmModalPageModule)
  },
  {
    path: 'gift-card/:id',
    loadChildren: () => import('./pages/gift-card/gift-card.module').then( m => m.GiftCardPageModule)
  },
  {
    path: 'buy-vendor-voucher/:id',
    loadChildren: () => import('./pages/buy-vendor-voucher/buy-vendor-voucher.module').then( m => m.BuyVendorVoucherPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./pages/vendor/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'vendor-transactions',
    loadChildren: () => import('./pages/vendor/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./pages/all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'user-vouchers',
    loadChildren: () => import('./pages/user-vouchers/user-vouchers.module').then( m => m.UserVouchersPageModule)
  },
  {
    path: 'user-orders',
    loadChildren: () => import('./pages/user-orders/user-orders.module').then( m => m.UserOrdersPageModule)
  },
  {
    path: 'user-order-details/:id',
    loadChildren: () => import('./pages/user-order-details/user-order-details.module').then( m => m.UserOrderDetailsPageModule)
  },
  {
    path: 'transaction-status',
    loadChildren: () => import('./pages/transaction-status/transaction-status.module').then( m => m.TransactionStatusPageModule)
  },
  {
    path: 'user-transactions',
    loadChildren: () => import('./pages/user-transactions/user-transactions.module').then( m => m.UserTransactionsPageModule)
  },
  {
    path: 'vendor-vouchers',
    loadChildren: () => import('./pages/vendor/vendor-vouchers/vendor-vouchers.module').then( m => m.VendorVouchersPageModule)
  },
  {
    path: 'admin-vouchers',
    loadChildren: () => import('./pages/admin/admin-vouchers/admin-vouchers.module').then( m => m.AdminVouchersPageModule)
  },
  {
    path: 'admin-transactions',
    loadChildren: () => import('./pages/admin/admin-transactions/admin-transactions.module').then( m => m.AdminTransactionsPageModule)
  },
  {
    path: 'vendors',
    loadChildren: () => import('./pages/admin/vendors/vendors.module').then( m => m.VendorsPageModule)
  },
  {
    path: 'create-vendor',
    loadChildren: () => import('./pages/admin/create-vendor/create-vendor.module').then( m => m.CreateVendorPageModule)
  },
  {
    path: 'create-vendor/:id',
    loadChildren: () => import('./pages/admin/create-vendor/create-vendor.module').then( m => m.CreateVendorPageModule)
  },
  {
    path: 'vendor-profile',
    loadChildren: () => import('./pages/vendor/vendor-profile/vendor-profile.module').then( m => m.VendorProfilePageModule)
  },
  {
    path: 'categories-list',
    loadChildren: () => import('./pages/admin/categories-list/categories-list.module').then( m => m.CategoriesListPageModule)
  },
  {
    path: 'edit-category/:id',
    loadChildren: () => import('./pages/admin/edit-category/edit-category.module').then( m => m.EditCategoryPageModule)
  },
  {
    path: 'edit-category',
    loadChildren: () => import('./pages/admin/edit-category/edit-category.module').then( m => m.EditCategoryPageModule)
  },
  {
    path: 'cities-list',
    loadChildren: () => import('./pages/admin/cities-list/cities-list.module').then( m => m.CitiesListPageModule)
  },
  {
    path: 'search-page',
    loadChildren: () => import('./pages/search-page/search-page.module').then( m => m.SearchPagePageModule)
  },
  {
    path: 'search-page/:text',
    loadChildren: () => import('./pages/search-page/search-page.module').then( m => m.SearchPagePageModule)
  },
  {
    path: 'vendor-send-voucher',
    loadChildren: () => import('./pages/vendor/vendor-send-voucher/vendor-send-voucher.module').then( m => m.VendorSendVoucherPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
