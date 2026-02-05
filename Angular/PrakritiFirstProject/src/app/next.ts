import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterOutlet, RouterLink, Router } from '@angular/router';
import { CounterService } from './CounterService';

let loggedIn = true;

export const authGuard = () => {
  if (loggedIn) return true;
  const router = inject(Router);
  return router.createUrlTree(['/']);
};


@Component({
  selector: 'app-next',
  standalone: true,
  template: `
  <main style = "margin-left: 20px;" >
    <h2>Next Page</h2>
    <p>You are now on the next component 🎉</p>
    <p> ID - {{ id}} </p>
    <h2> Route Guard Demo </h2>
    <button (click) = "onClick()" > Toggle Log</button>
    <p> Status : {{ loggedIn ? 'Logged In' : 'Logged Out'}} </p>
    
    <nav>
      <a routerLink="/" routerLinkActive="active">Home</a>
      <a routerLink = '/about' routerLinkActive="active"> About</a>
    </nav>

    <h2> Service Demo </h2>
    <p> Item Count : {{ itemCounter.itemCount }}</p>
    <button (click) = "itemCounter.addItems()" > Increment </button>
    <button (click) = "itemCounter.decItems()" > Decrement </button>
    <button (click) = "itemCounter.resetItems()" > Reset </button>


    <router-outlet/>
</main>
  `,
  imports: [RouterLinkActive, RouterOutlet, RouterLink]
})


export class NextComponent implements OnInit {
  id ='';
  routes = inject(ActivatedRoute);

  get loggedIn() {
    return loggedIn;   // guard wala same variable use
  }


  ngOnInit() {
    // with snapshot
    // this.id = this.routes.snapshot.paramMap.get('id') ?? ' ';

    //with subscribe
    this.routes.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      console.log("NEW ID:", this.id);
    });
  }

  
  onClick() {
    loggedIn = !this.loggedIn;
  }





  // ---------------- Using CounterService ------------------------
      
  // 1. Make a constructor to use CounterService
  constructor(public itemCounter : CounterService) { }
}
