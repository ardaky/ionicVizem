import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyeComponent } from './components/uye/uye.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'kategoriler',component:KategoriComponent,canActivate: [AuthGuard]},
  {path:'uyeler',component:UyeComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
