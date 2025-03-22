import { Routes } from '@angular/router';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';

export const countryRoutes: Routes = 
[
    {
        path:'',
        component: ByCapitalComponent
    },
];

export default countryRoutes; // me ahorra el then en el load children del app.route
