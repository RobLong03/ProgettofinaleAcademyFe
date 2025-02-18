import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { CaseComponent } from './Components/Products/case/case.component';
import { LoginComponent } from './Components/Authtentication/login/login.component';
import { RegisterComponent } from './Components/Authtentication/register/register.component';
import { AboutComponent } from './Components/about/about.component';
import { CpuComponent } from './Components/Products/cpu/cpu.component';
import { GpuComponent } from './Components/Products/gpu/gpu.component';
import { MotherboardComponent } from './Components/Products/motherboard/motherboard.component';
import { PsuComponent } from './Components/Products/psu/psu.component';
import { RamComponent } from './Components/Products/ram/ram.component';
import { StorageComponent } from './Components/Products/storage/storage.component';
import { CustomerComponent } from './Components/Customer/customer/customer.component';
import { CartComponent } from './Components/Customer/cart/cart.component';
import { CheckoutComponent } from './Components/Customer/checkout/checkout.component';
import { WishlistComponent } from './Components/Customer/wishlist/wishlist.component';
import { AdminComponent } from './Components/Administration/admin/admin.component';
import { ProductComponent as ProductAdministrationComponent} from './Components/Administration/product/product.component';
import { CustomerComponent as CustomerAdministrationComponent} from './Components/Administration/customer/customer.component';
import { OrdersComponent } from './Components/Administration/orders/orders.component';
import { ErrorComponent } from './Components/error/error.component';

const routes: Routes = [

  //da cambiare
  {path:'home', component:AppComponent},

  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'about', component:AboutComponent},

  {path:'product', component:ProductComponent, children:[
    {path:'case',component:CaseComponent},
    {path:'case/:id',component:CaseComponent},
    {path:'cpu', component:CpuComponent},
    {path:'cpu/:id', component:CpuComponent},
    {path:'gpu', component:GpuComponent},
    {path:'gpu/:id', component:GpuComponent},
    {path:'motherboard', component:MotherboardComponent},
    {path:'motherboard/:id', component:MotherboardComponent},
    {path:'psu', component:PsuComponent},
    {path:'psu/:id', component:PsuComponent},
    {path:'ram', component:RamComponent},
    {path:'ram/:id', component:RamComponent},
    {path:'storage', component:StorageComponent},
    {path:'storage/:id', component:StorageComponent}
  ]},

  {path:'customer/:id', component:CustomerComponent, children:[
    {path:'cart', component:CartComponent},
    {path:'checkout', component:CheckoutComponent},
    {path:'wishlist', component:WishlistComponent}
  ]},
  
  {path:'admin', component:AdminComponent, children:[
    {path:'product', component:ProductAdministrationComponent},
    {path:'customer', component:CustomerAdministrationComponent},
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
