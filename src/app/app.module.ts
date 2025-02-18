import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

// Removed FlexLayoutServerModule import as it does not exist
import { LoginComponent } from './Components/Authtentication/login/login.component';
import { RegisterComponent } from './Components/Authtentication/register/register.component';
import { CartComponent } from './Components/Customer/cart/cart.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { CaseComponent } from './Components/Products/case/case.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { AboutComponent } from './Components/about/about.component';
import { CustomerComponent } from './Components/Customer/customer/customer.component';
import { CpuComponent } from './Components/Products/cpu/cpu.component';
import { GpuComponent } from './Components/Products/gpu/gpu.component';
import { MotherboardComponent } from './Components/Products/motherboard/motherboard.component';
import { PsuComponent } from './Components/Products/psu/psu.component';
import { RamComponent } from './Components/Products/ram/ram.component';
import { StorageComponent } from './Components/Products/storage/storage.component';
import { CheckoutComponent } from './Components/Customer/checkout/checkout.component';
import { WishlistComponent } from './Components/Customer/wishlist/wishlist.component';
import { AdminComponent } from './Components/Administration/admin/admin.component';
import { OrdersComponent } from './Components/Administration/orders/orders.component';
import { ErrorComponent } from './Components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductComponent,
    CaseComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    CustomerComponent,
    CpuComponent,
    GpuComponent,
    MotherboardComponent,
    PsuComponent,
    RamComponent,
    StorageComponent,
    CheckoutComponent,
    WishlistComponent,
    AdminComponent,
    OrdersComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    //FlexLayoutModule,
    //FlexLayoutServerModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
