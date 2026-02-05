import { Routes } from '@angular/router';
import { NextComponent } from './next';
import { HomeComponent } from './home';
import { ChildComponent } from './child';
import { authGuard } from './next';

/*
Routing - URL Change -> Component Change
Page don't reload, component change

FLOW ->
User click link/button
        ↓
routerLink / navigate()
        ↓
Router routes array check karta
        ↓
Kaunsa component match?
        ↓
router-outlet me render


3 steps for Routing -
1) Routes Define - Routes array me route define karo
2) provideRouter() - config.ts me routes provide karo, ye router ko activate karta hai
3) router-outlet - it is a placeholder jaha page show hota hai, jo route match hoga --> uska component yaha show hoga
4) routerLink(navigation) - Angular's navigation attribute - one page to another without reload , likhte html file me hi hai (different from href - isme page reload hota hai)

- routerLinkActive - current page highlight karne ke liy
<a routerLink="/about" routerLinkActive="active">About</a>

IMP
router-outlet ke bahar → permanent layout
router-outlet ke andar → changing pages

router-outlet is written in the html jaha UI change karna hai

provideRouter(routes): Registers the routes for the app.
RouterOutlet: Placeholder where the active route's component renders.
routerLink: Navigates without reloading the page.
withHashLocation(): Uses hash URLs so links work in sandboxes without server rewrites.

Dynamic URL
- capture variables in paths with :id (e.g., /product/42) - declare a path parameter "next/:id" in routes
- Component me id read karna
---> ActivatedRoute - ye class current route ki info deti
---> route = inject(ActivatedRoute); Ye Angular ka dependency injection hai. ActivatedRoute object mil gaya.
---> Is object me sab hai: params, query params, url, data
---> snapshot - current route ka data(at one point)
---> paramMap - saare params ka map
---> Params update within the same component: If navigating to the same route with different params, subscribe to paramMap (or params) instead of using a one-time snapshot

Lazy Loading
- Component/tab tabhi load hoga jab user us page par jaayega
- without lazy loading -> Home + About + sab components
---> ek saath download
---> heavy initial load
- Use Promise.resolve to simulate lazy loading without dynamic import
- Dynamic import promise return karta.
---> Matlab: file load hone me time lagega
---> Promise = future me value milegi.

syntax -
loadComponent: () => import('./about')
  .then(m => m.About)

FLOW -
User click about
↓
Angular: component lao
↓
import('./about') → file load start
↓
file load complete
↓
then → About component mil gaya
↓
screen pe show

*/

export const routes: Routes = [
    {path : '', component:HomeComponent},
    {path : 'next/:id', component: NextComponent},
    // {path : 'about', loadComponent : () => Promise.resolve(ChildComponent)}
    {path : 'about', component: ChildComponent, canActivate:[authGuard]}
];
 