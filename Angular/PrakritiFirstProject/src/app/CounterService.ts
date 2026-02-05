/*
Service - Service ek jagah hai jahan data/logic rakha hota hai jo multiple components use karte.
- What: A service holds reusable logic/state. DI (dependency injection) supplies instances where needed.
- Scope: Provide in root for a shared singleton, or provide in a component for isolated instances.
- Use cases: Data fetching, caching, business rules, cross-component state.
- Decorator: Use @Injectable() on classes that inject other services.

@Injectable({ providedIn: 'root' })
- providedIn: 'root' --> poori app me ek hi service instance

@Component({
  providers: [CounterService]  
})
- provided in component --> uss component ke liy separate instance 

providedIn root
App
 ├── A
 ├── B
 └── C

Sab → same service instance

providers in component
App
 ├── PanelA → service instance #1
 └── PanelB → service instance #2





In this example, This service is used by lets say Next Component and Child Component
*/

import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class CounterService {
    itemCount = 0;

    addItems() {
        this.itemCount++;
    }

    decItems() {
        this.itemCount--;
    }

    resetItems(){
        this.itemCount=0;
    }
}