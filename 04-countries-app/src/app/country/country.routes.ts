import { Routes } from '@angular/router';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';

export const countryRoutes: Routes = 
[
    {
        path:'',
        component: CountryLayoutPageComponent,
        children:[
            {
                path:'by-capital',
                component: ByCapitalComponent
            },
            {
                path:'**',
                redirectTo: 'by-capital'
            }
        ]
    },
];

export default countryRoutes; // me ahorra el then en el load children del app.route
