import { Component } from '@angular/core';

/*
--------------------------------- RXJS ------------------------------------------------
RxJs - Reactive Extensions for JavaScript - Library jo asynchronous data streams ko handle karne ke liye use hoti hai.

RxJS	                  Meaning
of(x)	                  emit x
from(promise)	          promise → observable
throwError()	          emit error
interval()	              repeatedly emit

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

*/

@Component({
  selector: 'app-next',
  standalone: true,
  template: `
  <main style = "margin-left:20px">

    <h2> Reactive Programming (RXJS) </h2>


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

    }
    // interval(1000).subscribe(x=>console.log(x));
}