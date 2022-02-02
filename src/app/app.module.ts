import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";




import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

// import { DashboardComponent }       from './pages/dashboard/dashboard.component';
// // import { UserComponent }            from './pages/user/user.component';
// // import { TableComponent }           from './pages/table/table.component';


import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { componentFactoryName } from "@angular/compiler";
import { PackageService } from "package.service";




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  // { path: 'task-list', component: TaskListComponent},
  // { path: 'navbar', component: NavbarComponent},
  { path: 'adminlayout', component: AdminLayoutComponent, 
  children: [
    { path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)}
 ],
 canActivate: [AuthGuard]
},
  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'user',           component: UserComponent },
  
  { path: '', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgbModule,
    HttpClientModule ,
    ReactiveFormsModule,


    
  ],
  providers: [AuthService, AuthGuard,PackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
