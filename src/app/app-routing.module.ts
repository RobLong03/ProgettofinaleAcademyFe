import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/Products/product/product.component';
import { HomeComponent } from './Components/HomePage/home/home.component';
import { CaseComponent } from './Components/Products/case/case.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'product',component:ProductComponent},
  {path:'case',component:CaseComponent},

  //da cambiare
  {path:'home',component:AppComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
