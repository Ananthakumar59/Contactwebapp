import { Routes } from '@angular/router';


export const routes: Routes = [

    

    { path: '', redirectTo: '/listuser', pathMatch: 'full' },
    {path:'listuser',loadComponent:()=>import('./components/listuser/listuser.component').then(c=>c.ListuserComponent)},
    {path:'userform', loadComponent:()=>import('./components/userform/userform.component').then(c=>c.UserformComponent)},

];
