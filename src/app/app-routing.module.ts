import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { CaseComponent } from './Components/Products/Case/case/case.component';
import { LoginComponent } from './Components/Authtentication/login/login.component';
import { RegisterComponent } from './Components/Authtentication/register/register.component';
import { AboutComponent } from './Components/about/about.component';
import { CpuComponent } from './Components/Products/cpu/cpu.component';
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
import { CustomerComponent as CustomerAdministrationComponent} from './Components/Administration/customer/customer.component';
import { OrdersComponent } from './Components/Administration/orders/orders.component';
import { ErrorComponent } from './Components/error/error.component';
import { SpecificCaseComponent } from './Components/Products/Case/specific-case/specific-case.component';
import { SpecificGpuComponent } from './Components/Products/Gpu/specific-gpu/specific-gpu.component';
import { SpecificMotherboardComponent } from './Components/Products/Motherboard/specific-motherboard/specific-motherboard.component';
import { SpecificPsuComponent } from './Components/Products/Psu/specific-psu/specific-psu.component';
import { SpecificRamComponent } from './Components/Products/Ram/specific-ram/specific-ram.component';
import { SpecificStorageComponent } from './Components/Products/Storage/specific-storage/specific-storage.component';

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
    {path:'case/:id',component:SpecificCaseComponent},
    {path:'cpu', component:CpuComponent},
    {path:'cpu/:id', component:CpuComponent},
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
