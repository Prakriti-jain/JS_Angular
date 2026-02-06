import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";
import { CounterService } from './CounterService';
import { LocalCounterService } from './LocalCounterService';

@Component ({
    selector: 'child-comp',
    standalone: true,
    templateUrl: './layouts/child.html',
    styleUrl: './layouts/child.css',
    providers: [LocalCounterService]
})

export class ChildComponent {
    @Input() name = ''; //input
    @Output() notify = new EventEmitter<string>(); //output

    sendBack() {
        this.notify.emit('Hello PARENT!');
    }

    // clicking the button will add the counter element
    @Output() clicked = new EventEmitter<number>();

    counter = 0;
    increment() {
        this.counter += 1;
        this.clicked.emit(this.counter);
    }




    // // ---------------- Using CounterService ---------------------------
    
    // // 1. Make a constructor to use CounterService
    // constructor(public itemCounter : CounterService) { }


    
    //----------------- Using LocalCounterService [ISOLATED] -----------------
      
    constructor(public itemCounter : LocalCounterService) {}

}