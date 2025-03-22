import { Routes } from '@angular/router';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';
import { ByPaisComponent } from './pages/by-pais/by-pais.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

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
                path:'by-pais',
                component: ByPaisComponent
            },
            {
                path:'by-region',
                component: ByRegionComponent
            },
            {
                path:'by/:code',
                component: CountryPageComponent
            },
            {
                path:'**',
                redirectTo: 'by-capital'
            }
        ]
    },
];

export default countryRoutes; // me ahorra el then en el load children del app.route
