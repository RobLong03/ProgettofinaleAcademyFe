import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FloatLabelType } from '@angular/material/form-field';



import { LoginComponent } from './Components/Authtentication/login/login.component';
import { RegisterComponent } from './Components/Authtentication/register/register.component';
import { CartComponent } from './Components/Customer/cart/cart.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { CaseComponent } from './Components/Products/Case/case/case.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { AboutComponent } from './Components/about/about.component';
import { CustomerComponent } from './Components/Customer/customer/customer.component';
import { CpuComponent } from './Components/Products/cpu/cpu/cpu.component';
import { GpuComponent } from './Components/Products/Gpu/gpu/gpu.component';
import { MotherboardComponent } from './Components/Products/Motherboard/motherboard/motherboard.component';
import { PsuComponent } from './Components/Products/Psu/psu/psu.component';
import { RamComponent } from './Components/Products/Ram/ram/ram.component';
import { StorageComponent } from './Components/Products/Storage/storage/storage.component';
import { CheckoutComponent } from './Components/Customer/checkout/checkout.component';
import { WishlistComponent } from './Components/Customer/wishlist/wishlist.component';
import { AdminComponent } from './Components/Administration/admin/admin.component';
import { OrdersComponent } from './Components/Administration/orders/orders.component';
import { ErrorComponent } from './Components/error/error.component';
import { SpecificRamComponent } from './Components/Products/Ram/specific-ram/specific-ram.component';
import { SpecificCaseComponent } from './Components/Products/Case/specific-case/specific-case.component';
import { SpecificGpuComponent } from './Components/Products/Gpu/specific-gpu/specific-gpu.component';
import { SpecificMotherboardComponent } from './Components/Products/Motherboard/specific-motherboard/specific-motherboard.component';
import { SpecificPsuComponent } from './Components/Products/Psu/specific-psu/specific-psu.component';
import { SpecificStorageComponent } from './Components/Products/Storage/specific-storage/specific-storage.component';
import { SpecificProductComponent } from './Components/Products/specific-product/specific-product.component';
import { ProductsListComponent } from './Components/Products/products-list/products-list.component';
import { SpecificCpuComponent } from './Components/Products/cpu/specific-cpu/specific-cpu.component';
import { OrderHistoryComponent } from './Components/Customer/order-history/order-history.component';

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
    ErrorComponent,
    SpecificRamComponent,
    SpecificCaseComponent,
    SpecificGpuComponent,
    SpecificMotherboardComponent,
    SpecificPsuComponent,
    SpecificStorageComponent,
    SpecificProductComponent,
    ProductsListComponent,
    SpecificCpuComponent,
    OrderHistoryComponent,
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
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule ,
    MatExpansionModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
