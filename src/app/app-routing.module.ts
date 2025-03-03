import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { CaseComponent } from './Components/Products/Case/case/case.component';
import { LoginComponent } from './Components/Authtentication/login/login.component';
import { RegisterComponent } from './Components/Authtentication/register/register.component';
import { AboutComponent } from './Components/about/about.component';
import { CpuComponent } from './Components/Products/cpu/cpu/cpu.component';
import { GpuComponent } from './Components/Products/Gpu/gpu/gpu.component';
import { MotherboardComponent } from './Components/Products/Motherboard/motherboard/motherboard.component';
import { PsuComponent } from './Components/Products/Psu/psu/psu.component';
import { RamComponent } from './Components/Products/Ram/ram/ram.component';
import { StorageComponent } from './Components/Products/Storage/storage/storage.component';
import { CustomerComponent } from './Components/Customer/customer/customer.component';
import { CartComponent } from './Components/Customer/cart/cart.component';
import { CheckoutComponent } from './Components/Customer/checkout/checkout.component';
import { WishlistComponent } from './Components/Customer/wishlist/wishlist.component';
import { AdminComponent } from './Components/Administration/admin/admin.component';
import { ProductComponent as ProductAdministrationComponent} from './Components/Administration/product/product.component';
import { OrdersComponent } from './Components/Administration/orders/orders.component';
import { ErrorComponent } from './Components/error/error.component';
import { ProductsListComponent } from './Components/Products/products-list/products-list.component';
import { SpecificProductComponent } from './Components/Products/specific-product/specific-product.component';
import { OrderHistoryComponent } from './Components/Customer/order-history/order-history.component';
import { AdminLoginComponent } from './Components/Administration/admin-login/admin-login.component';
import { adminGuardPathGuard } from './Auth/Guards/admin-guard-path.guard';
import { adminrGuardChildGuard } from './Auth/Guards/adminr-guard-child.guard';
import { customerGuardPathGuard } from './Auth/Guards/customer-guard-path.guard';
import { customerGuardChildGuard } from './Auth/Guards/customer-guard-child.guard';
import { AnagraficaComponent } from './Components/Customer/anagrafica/anagrafica.component';
import { CustomerManagementComponent } from './Components/Administration/customer-management/customer-management.component';
import { AdminsListComponent } from './Components/Administration/admins-list/admins-list.component';

const routes: Routes = [



  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'about', component:AboutComponent},

  {
    path: 'products',
    component: ProductComponent,
    children: [
      { path: '', component: ProductsListComponent, pathMatch: 'full' }, // Mostra tutti i prodotti
      { path: ':category', component: ProductsListComponent },  // Filtra per categoria
    ]
  },
  { path: 'product/:category/:id', component: SpecificProductComponent }, // Dettaglio prodotto
    /*
    {path:'case',component:CaseComponent},
    {path:'case/:id',component:SpecificCaseComponent},
    {path:'cpu', component:CpuComponent}, //se vai su /product/cpu vengono caricate solo le cpu come lista di cpu's
    {path:'cpu/:id', component:SpecificCpuComponent},  // questo carica la pagina di una cpu specifica
    {path:'gpu', component:GpuComponent},
    {path:'gpu/:id', component:SpecificGpuComponent},
    {path:'motherboard', component:MotherboardComponent},
    {path:'motherboard/:id', component:SpecificMotherboardComponent},
    {path:'psu', component:PsuComponent},
    {path:'psu/:id', component:SpecificPsuComponent},
    {path:'ram', component:RamComponent},
    {path:'ram/:id', component:SpecificRamComponent},
    {path:'storage', component:StorageComponent},
    {path:'storage/:id', component:SpecificStorageComponent}
    */


  {path:'@me', component:CustomerComponent,canActivate:[customerGuardPathGuard], canActivateChild:[customerGuardChildGuard], children:[
    {path:'cart', component:CartComponent},
    {path:'checkout', component:CheckoutComponent},
    {path:'orders', component:OrderHistoryComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'', component:AnagraficaComponent}
  ]},
  //authguard da inserire
  {path:'admin/login', component:AdminLoginComponent},
  {path:'admin', component:AdminComponent,canActivate:[adminGuardPathGuard], canActivateChild:[adminrGuardChildGuard], children:[
    { path: '', redirectTo:"products", pathMatch: 'full' },
    {path:'list',component:AdminsListComponent},
    {path:'products', component:ProductAdministrationComponent},
    {path:'customer', component:CustomerManagementComponent},
    {path:'orders', component:OrdersComponent}
  ]},

  {path:'404', component:ErrorComponent},
 
  {path:'**', redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
