import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoComponent } from './crypto/crypto.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "register", component: RegisterComponent, pathMatch: "full"},
  {path: "crypto/:crypto", component: CryptoComponent, pathMatch: "full"},
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
