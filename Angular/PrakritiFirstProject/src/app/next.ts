import { Component, inject, OnInit, ChangeDetectorRef, signal, computed} from '@angular/core';
import { NgIf , NgFor, CurrencyPipe} from '@angular/common';
import { ActivatedRoute, RouterLinkActive, RouterOutlet, RouterLink, Router } from '@angular/router';
import { CounterService } from './CounterService';
import { LocalCounterService } from './LocalCounterService';
import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

/*
HTTPClient
- HttpClient lets your app fetch and send data over HTTP.
- Client: Use HttpClient to fetch and send JSON

- GET request -Server se data lana.
---> Call: this.http.get('https://jsonplaceholder.typicode.com/users')
---> data instantly nahi milta, Internet me time lagta.
---> To Angular deta hai: Observable - future me data milega.
---> For that use .subscribe(...)
---> Read data with http.get<T>().
---> Track loading and error state for UX.
---> Update component state in the subscription.

SUBSCRIBE (in detail)
structure -
  .subscribe({
    next: ...,
    error: ...
  })
this means - data aaye -> next run , error aaye -> error run

next structure
  next: (data) => {
    this.users = data;
    this.loading = false;
  }
- server sent the data and html is updated and loading is set to false

error structure
  error: () => {
    this.error = 'Failed to load users';
    this.loading = false;
  }
- API got failed - error message display, aand loading is set to false

- POST Requests
---> Create data with http.post<T>().
---> Disable the button while sending to prevent duplicates.
---> Render the returned result or an error message.

- Error Handling
---> err - error object
---> err?.status ?? 'unknown' - gives the status otherwise give unknown

Interceptor - middleware between Angular app and server
Meaning - 
---> request jaate time intercept hoti hai
---> response aate time bhi intercept hoti hai
Here we can add -
---> request modify kar sakte h
---> headers add kar sakte h
---> error handle kar sakte h
---> retry laga sakte h
---> logging kar sakte h

Structure
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cloned = req.clone({
    setHeaders: {
      Authorization: 'Bearer TOKEN'
    }
  });

  return next(cloned);
};

- req - original http request
- clone() - request is immutable and cannot be modified directly
- next() - sends the request to the next step - next interceptor or server

There are also errorInterceptor , retryInterceptor

- Interceptor functions have to added in providers
providers: [provideHttpClient(withInterceptors([authInterceptor]))]

-------------------------------- Lists -----------------------------------------------

- Loop: Use @for with track for stable identity and @empty for empty states.
- Signals: Store list state in a signal (e.g., items = signal([...])) and update immutably with    set()/update().
- Identity: Track by a stable key (e.g., it.id) to avoid unnecessary DOM work.
- Derived views: Filter/sort copies of your data for the UI; keep the source list intact (use computed() for derived state).
- On list changes, Angular reconciles DOM rows with data items.
- track provides a stable identity (e.g., an id) to minimize DOM churn and preserve focus/inputs.

items = original list
view = screen par dikhne wali list

when users types anything for filtering, the filtered list shown on the UI is - view

view = computed(() => {
  return items()
    .filter(...)
    .sort(...);
});

computed() - automatic function 
- whenever there is change in items (original list), or change in query, or sort change 
- then view is calculated again
- no need to manually call the function again and again

*/



// -------------------------------- This is part of the Http client -----------------------------

// Fake HTTP interceptor so the demo works without external network calls
export function mockHTTP( req : HttpRequest<any> , next : HttpHandlerFn) {
  if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/usersx')) {
    return throwError(() => new HttpErrorResponse({status : 404, statusText : 'Not Found', url: req.url}));
  }

  // if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/users')) {
  //   const body = [
  //     { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
  //     { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' }
  //   ];

  //   //of() Ye value ko Observable bana do. 
  //   //ek fake HTTP response banaya -> usko Observable me wrap kiya -> HttpClient ko return kar diya
  //   //Angular HttpClient Observable return karta hai -> Isliye interceptor bhi Observable hi return karega.
  //   return of(new HttpResponse({status:200, body}));
  // }

  return next(req);
  
}

// -------------------------------- This was part of Router - Auth Guard -------------------------

let loggedIn = true;

export const authGuard = () => {
  if (loggedIn) return true;
  const router = inject(Router);
  return router.createUrlTree(['/']);
};

// --------------------------------- This is the Component --------------------------------------

@Component({
  selector: 'app-next',
  standalone: true,
  template: `
  <main style = "margin-left: 20px;">
    <h2>Next Page</h2>
    <p>You are now on the next component 🎉</p>
    <p> ID - {{ id}} </p>
    <h2> Route Guard Demo </h2>
    <button (click) = "onClick()" > Toggle Log</button>
    <p> Status : {{ loggedIn ? 'Logged In' : 'Logged Out'}} </p>
    
    <nav>
      <a routerLink="/" routerLinkActive="active">Home </a>
      <a routerLink = '/about' routerLinkActive="active"> About</a>
    </nav>

    <!-- <h2> Service Demo Shared </h2>
    <p> Item Count : {{ itemCounter.itemCount }} </p>
    <button (click) = "itemCounter.addItems()" > Increment </button>
    <button (click) = "itemCounter.decItems()" > Decrement </button>
    <button (click) = "itemCounter.resetItems()" > Reset </button> -->

    
    <h2> Service Demo Isolated </h2>
    <p> Value Count : {{ itemCounter.value }}</p>
    <button (click) = "itemCounter.inc()" > Increment </button>


    <!-- HTTP CLIENT - GET/POST REQUEST DEMO -->
    <h3> HTTP CLIENT - GET/POST REQUEST DEMO </h3>
    <button (click) = 'get()'> Load Users </button>
    <p *ngIf = 'loading'> Loading... </p>
    <p *ngIf = "error"  style = "color:crimson"> {{ error }}</p>
    <ul>
      <li *ngFor = "let u of users" > 
        {{ u.name}} - {{ u.email}}
      </li>
    </ul>

    <button (click) = "post()" >Create Post</button>
    <p *ngIf = "loading" >Sending...</p>
    <p *ngIf = "error" style = "color:crimson">{{ error }}</p>
    <div *ngIf = "result">
      <p>Created Post ID: {{ result.id }}</p>
      <p>Title: {{ result.title }}</p>
    </div>

    <h3>HTTP Error Handling</h3>

    <div>
      <button (click) = "loadOk()" [disabled]="loading">Load OK</button>
      <button (click) = "loadFail()" [disabled]="loading">Load Fail</button>
      <button (click) = "retry()" [disabled]="!lastAction || loading">Retry</button>
    </div>

    <p *ngIf = "loading">Loading...</p>
    <p *ngIf = "error" style = "color:crimson">{{ error }}</p>
    <p *ngIf = "!error && data" style = "color:seagreen">Loaded {{ isArray(data) ? data.length + ' items' : '1 item' }}</p>

    <ul *ngIf = "isArray (data)">
      <li *ngFor = "let u of data">{{  u.name }} ({{ u.email }})</li>
    </ul>


    <!-- Lists -->
    <h2> Lists </h2>

    <!-- Basic Lists -->
    <h3> Basic Lists </h3>
    <ul>
      @for (item of items() ; let i = $index; track item) {
        <li> {{ item }}</li>
      } @empty { 
        <li> No items </li>
      }
      
    </ul>

    <button (click) = "add()">Add Item</button>
    <button (click) = "clear()">Clear</button>
    <button (click) = "reset()">Reset</button>

    <!-- List -->
    <h3>Lists with track</h3>
    <ul>
      @for (it of itemsDic(); let i = $index; track it.id) {
        <li>{{ i + 1 }}. {{ it.name }} (id: {{ it.id }})</li>
      }
    </ul>
    <button (click) = "renameFirst()">Rename first</button>
    <button (click) = "shuffle()">Shuffle</button>
    <button (click) = "addDic()">Add item</button>

    <!-- List with Filter and Sort -->
    <h3> List Filter and Sort </h3>
    <label>Search: <input #q (input) = "query.set(q.value)" placeholder="Type to filter..." /></label>
    <button (click) = "setSort('name')" > Sort by Name </button>
    <button (click) = "setSort('price')" > Sort by Price</button>
    <button (click) = "toggleDirection()"> {{ sortDir() === 1 ? 'Asc' : 'Desc'}} </button>

    <table style = "padding : 8px">
      <thead>
        <tr>
          <th style="border:1px solid #ddd ; padding:8px ; background:#f7f7f7;">Name</th>
          <th style="border:1px solid #ddd ; padding:8px ; background:#f7f7f7 ;">Price</th>
        </tr>
      </thead>
      <tbody>
        @for (p of view(); track p.name) {
          <tr>
            <td style="border:1px solid #ddd ; padding:8px;">{{ p.name }}</td>
            <td style="border:1px solid #ddd ; padding:8px;">{{ p.price | currency:'INR' }}</td>
          </tr>
        }
      </tbody>
    </table>

    <router-outlet/>
</main>
  `,
  imports: [RouterLinkActive, RouterOutlet, RouterLink, NgIf, NgFor, CurrencyPipe],
  providers: [LocalCounterService]
})


export class NextComponent implements OnInit {

  // --------------------- ROUTING ---------------------------------------
  id ='';
  routes = inject(ActivatedRoute);

  get loggedIn() {
    return loggedIn;   // guard wala same variable use
  }


  ngOnInit() {
    // with snapshot
    // this.id = this.routes.snapshot.paramMap.get('id') ?? ' ';

    // with subscribe
    this.routes.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      console.log("NEW ID:", this.id);
    });
  }

  
  onClick() {
    loggedIn = !loggedIn;
  }



  // ---------------- Using CounterService [SHARED]------------------------
      
  // 1. Make a constructor to use CounterService
  // constructor(public itemCounter : CounterService) { }


  //----------------- Using LocalCounterService [ISOLATED] -----------------
  
  constructor(public itemCounter : LocalCounterService) {}




  //---------------------- HTTP Client ----------------------------
  
  //GET REQUEST
  http = inject(HttpClient);
  loading = false;
  error = '';
  users : any[] = [];
  cd = inject(ChangeDetectorRef);

  get() {
    this.loading = true;
    this.error = '';

    //example API
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        console.log("DATA AAYA");
        this.cd.detectChanges(); //this is taaki data aaya uska change ek dum se detect hojaaye
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  //POST REQUEST
  result : any = null;

  post() {
    this.loading = true;
    this.error = '';

    //this.http.post<T>(url, body)
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', {
      title : 'Rohiiii',
      body : 'I work in Cybersec as Intern',
      userId : 1
    }).subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
        console.log('changes done')
        // setTimeout(() => {
        //   this.cd.detectChanges();
        // });
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Failed to create post';
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  //ERROR HANDLING

  /*
  Error message: Build a helpful message from err.status; keep the UI responsive with loading.
  Retry: Store the lastAction and wire a retry() button to re-run the last request.
  OK vs Fail: Separate methods help demonstrate success and failure flows.
  */

  lastAction = '';
  data : any[] | null = null;

  //Just to check if the value is array or not so that ngFor can iterate and show the results
  isArray(value: unknown): value is any[] { 
    return Array.isArray(value as any); 
  }

  fetch(url: string): void {
    this.loading = true;
    this.error = '';
    this.data = null;
    this.http.get<any[]>(url).subscribe({
      next: (res) => { 
        this.data = res; 
        this.loading = false; 
      this.cd.detectChanges();},
      error: (err) => {
        const status = err?.status ?? 'unknown';
        this.error = `Request failed (status ${status}). Please try again.`;
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  loadOk() {
    this.lastAction = 'ok';
    this.fetch('https://jsonplaceholder.typicode.com/users');
  }

  loadFail() {
    this.lastAction = 'fail';
    this.fetch('https://jsonplaceholder.typicode.com/usersx');
  }

  retry() {
    if (this.lastAction === 'ok') this.loadOk();
    else if (this.lastAction === 'fail') this.loadFail();
  }




  // ----------------------- Lists -------------------------------
  
  //Normal iteration using @for and track id
  items = signal(['Angular', 'React', 'Vue']);

  add() { this.items.update(arr => [...arr, 'Svelte']); }
  clear() { this.items.set([]); }
  reset() { this.items.set(['Angular', 'React', 'Vue']); }

  // List with Track

  itemsDic = signal([
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' }
  ]);
  nextId = 4;
  
  addDic() {
    this.itemsDic.update(arr => [...arr, { id: this.nextId++, name: 'New' + Date.now()}]);
  }

  renameFirst() {
    this.itemsDic.update(arr => 
      arr.map((item, ind) => ind === 0 ? {... item , name: item.name + '!!!!'} : item));
  }

  shuffle() {
    this.itemsDic.update(arr => {
      const copy = [...arr];
      for (let i=0 ; i<copy.length; i++) {
        const ran = Math.floor(Math.random() * (copy.length - i)) + i;
        [copy[i], copy[ran]] = [copy[ran], copy[i]];
      }
      return copy;
    });
  }


  //List with filter and sort

  itemsAgain = signal([{ name: 'Angular', price: 20 }, { name: 'React', price: 10 }, { name: 'Vue', price: 39 }]);
  query = signal('');

  //signal<type>('initialValue')
  sortKey = signal<'name' | 'price'>('name');
  sortDir = signal<1 | -1>(1);

  view = computed(() => {
    const q = this.query().toLowerCase();
    const direction = this.sortDir();
    const key = this.sortKey();
    return this.itemsAgain()
      .filter(item => item.name.toLocaleLowerCase().includes(q))
      .sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        return (av < bv) ? (-1 * direction) : (av > bv) ? (1 * direction) : 0;
      });
  });

  setSort(key : 'name' | 'price') {
    if(this.sortKey() === key) { //in this direction toggle hojayega asc -> desc or vice versa 
      this.toggleDirection();
    } else {
      this.sortKey.set(key);
    }
  }

  toggleDirection(){
    this.sortDir.set(this.sortDir() === 1 ? -1 : 1);
  }
}
