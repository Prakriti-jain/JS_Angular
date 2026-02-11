import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor , AsyncPipe, CommonModule} from '@angular/common';
import { Component, inject, ChangeDetectorRef, PipeTransform, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, from, interval, throwError, fromEvent, distinctUntilChanged, debounceTime, switchMap, catchError, map, delay, Subject, finalize} from 'rxjs';

/*
--------------------------------- RXJS ------------------------------------------------
RxJs - Reactive Extensions for JavaScript - Library jo asynchronous data streams ko handle karne ke liye use hoti hai.

RxJS	                  Meaning
of(x)	                  emit x
from(promise)	          promise → observable
throwError()	          emit error
interval()	            repeatedly emit

Core concept of Rxjs - Observables
- Observables - stream of values
- Observer - jo listen karta hai
- Subscription - observable chalana start karta hai
- Operator - data pipeline - arrays jaise functions
- Subject - Special observable: khud emit bhi karta, multiple listeners ko bhejta
- Scheduler - Control karta hai: kab run hoga, async kaise handle hoga

Normal JS:
    document.addEventListener('click', fn);

RxJS:
    fromEvent(document, 'click').subscribe(fn);

Jab data aaye, tab react karo

Execution Flow:
  Angular start
  ↓
  constructor()
  ↓
  ngOnInit()
  ↓
  HTML render
  ↓
  ngAfterViewInit()
  ↓
  screen pe show

fromEvent() - write it in ngAfterViewInit() to ensure DOM is ready, otherwise it may not find the element and throw an error.

DIFFERENCE BETWEEN CONSTRUCTOR AND NGONINIT AND NGAFTERVIEWINIT
Hook	                  Kab run hota	         Use
constructor	            object create	         DI, setup
ngOnInit	              component ready	       API calls, data load, timer start
ngAfterViewInit	        HTML ready	           DOM access

Other rxjs functions 
- debounceTime(X) - rapid events ko ignore karta hai
---> Xms tak wait karta hai jab tak new input na aaye.
---> Agar us duration me user fir type karta hai - purana timer cancel, naya 500ms timer start

- switchMap() - ek observable se dusre observable me switch karta hai
---> pehla observable cancel kar deta hai jab naya emit hota hai

- map() - data transform karne ke liye
---> jaise array map function
---> Observable<Observable> - cancel nahi karta, nested observables banata hai

- pipe() - multiple operators ko chain karne ke liye
---> observable.pipe(operator1, operator2, ...)


------------------------------- Async Pipe --------------------------------

Async pipe template me observable ko subscribe karta hai aur latest value UI me render karta hai.Aur jab component destroy hota hai: automatically unsubscribe bhi kar deta hai.

Syntax
{{ observable$ | async }}

$ convention hai → variable observable hai
| async → subscribe + latest value render

------------------------------ Custom Pipe ---------------------------------

Pipe = data ko display karne se pehle format karna
Custom pipe = apna formatting logic bana sakte hai

syntax
@Pipe({ name: 'titlecase2', standalone: true })
export class TitleCase2Pipe implements PipeTransform { }
every pipe has a function transform() which takes the input, does the formatting and return 
*/

// --------------------------- It is a Custom Pipe -------------------------------
@Pipe({name : 'titlecase2', standalone : true})
export class TitleCase2Pipe implements PipeTransform {
  transform(value: string) : string {
    if(!value) return "";
    return value.split(/\s+/) //regex express [ \s means space(blank, tab, newline), + means ek se zyada, so overall it splits by multiple spaces]
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ');
  }
}


@Component({
  selector: 'app-next',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, AsyncPipe, CommonModule, TitleCase2Pipe],
  template: `
  <main style  = "margin-left:20px">

    <h2> Reactive Programming (RXJS) </h2>
    <h3>Simple RxJS Examples</h3>

    <button id="btn">Click me</button>

    <p>Open console to see RxJS outputs</p>

    <h2> Live Search Bar using Rxjs </h2>
    <input
      type = "text"
      placeholder = "Search..."
      [(ngModel)] = "searchTerm"
      (ngModelChange) = "onSearchTermChange($event)"
    />

    <p *ngIf = "loadingg">Loading...</p>
    <p *ngIf = "error" style="color:red">{{ error }}</p>

    <ul>
      <li *ngFor = "let u of result"> {{ u.firstName }} {{ u.lastName}} {{ u.maidenName}} </li>
    </ul>


    <!-- Async Pipe -->
    <h2> Async Pipe Example </h2>
    <ul>
      <li *ngFor = "let u of users$ | async "> {{ u.firstName }} {{ u.lastName }}</li>
    </ul>

    <h3>Current Time: {{ time$ | async | date:'mediumTime'}}</h3>

    <h3>Loading List:</h3>
    <ng-container *ngIf = "list$ | async as data; else loading" >
      <ul>
        <li *ngFor = "let item of data"> {{ item.name }} </li>
      </ul>
    </ng-container>

    <ng-template #loading>
      <p> Wait... Loading Data </p>
    </ng-template>

    <!-- Custom Pipes -->
    <h3>Custom Pipe</h3>
    <label>
      Text: <input [(ngModel)] = "text" placeholder="type here" />
    </label> 
    <p>Original: {{ text }}</p>
    <p>TitleCase2: {{ text | titlecase2 }}</p>
  </main>
  `
})


export class RxjsComponent {

    /*
    constructor ka main use -
    - dependency inject karna (jaise httpclient, ya services)
    - initial setup
    - Observables start karna

    constructor = object create hone pe
    ngOnInit = component ready hone pe

    constructor	                            ngOnInit
    class create hote hi	                component ready hone ke baad
    DI ke liye use	                        logic ke liye use
    Angular lifecycle ka part nahi	        lifecycle hook hai

    */
    constructor() {

      // 1. of() → simple value emit
      of('Hello RxJS!').subscribe(x => console.log('of() : ', x))

      // 2. from() → promise ko observable me convert, array ko stream me convert
      from([10, 20, 30]).subscribe(x => console.log('from() : ', x))

      // 3. interval() → har 1 second me emit, always 0 se start
      // interval(2000).subscribe(x => console.log('interval() : ', x))

      // 4. throwError() → error emit karta hai
      throwError(() => new Error('Something went wrong!')).subscribe({
        // next: x => console.log(x),
        error: err => console.error('throwError() : ', err.message)
      })
      
    }

    ngAfterViewInit() {
      // 5. fromEvent() → DOM events ko observable me convert karta hai
      const btn = document.getElementById('btn');

      // btn! - non-null assertion operator, Angular ko batata hai ki btn null nahi hoga
      fromEvent(btn!, 'click').subscribe(() => console.log('Button clicked!'))
    }

    



    // -------------------------- Live Search Bar using RxJS --------------------------
    
    http1 = inject(HttpClient); // Dependency Injection for HttpClient
    loadingg = false;
    result : any[] = [];
    error = '';
    cd = inject(ChangeDetectorRef);

    // Live search ke liye, hum input events ko RxJS se handle karenge
    // debounceTime() - rapid input ko ignore karta hai, user ke typing ke baad 500ms wait karega
    // switchMap() - pehle observable ko cancel kar dega jab naya input aayega, aur naya HTTP
    // request karega
    // catchError() - agar HTTP request me error aata hai, to usko handle karega aur user ko error message dikhayega

    searchTerm = '';

    onSearchTermChange(term: string) {
      // this.searchTerm = term;
      // console.log('Search Term:', this.searchTerm);

      this.error = '';
      this.loadingg = true;
      this.searchSubject.next(term);
    }

    searchSubject = new Subject<string>();

    ngOnInit() {
      this.searchSubject.pipe(
        debounceTime(1000), 
        distinctUntilChanged(),
        switchMap(text => {
          if(!text) return of({ users: [] }); // agar input empty hai to empty array return karo
          return this.http1.get<any>(`https://dummyjson.com/users/search?q=${text}`);
        }),
        catchError(err => {
          this.error = 'Error fetching data';
          return of({users : []}); // Return empty array on error
        })
      ).subscribe(res => {
        console.log('Search Results:', res);
        this.result = res.users; // Handle both array and object responses
        this.loadingg = false;
        console.log(this.loadingg)
        // this.cd.detectChanges();
      });
    }


    // --------------------------- Async Pipe Example ---------------------------
    
    /*
    Internally kya hota hai (real flow)
    - tumne likha : users$ | async
    - Angular internally karta hai:
      let sub = users$.subscribe(value => {
        render(value);
      });
    - Aur jab component destroy hota hai: sub.unsubscribe();
    - Tumhe likhne ki zarurat hi nahi.
    */

    // ----------- example 1 
    users$ = this.http1.get<any>('https://dummyjson.com/users').pipe(
      map(res => res.users), // Extract users array from response
      catchError(err => {
        this.error = 'Error fetching users';
        return of({ users: [] }); // Return empty users array on error
      })
    )


    // ----------- example 2 
    time$ = interval(1000).pipe(map(() => new Date()));

    // ------------ example 3
    list$ = of([{
      name : 'Prakriti'
    }, {
      name : 'Angular'
    }, {
      name : 'RxJS'
    }]).pipe(delay(20000)); //delay of 20 seconds to simulate loading


    // ---------------------------- Custom Pipe ---------------------------------------
    text = ""


}