import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";
import { CounterService } from './CounterService';

@Component ({
    selector: 'child-comp',
    standalone: true,
    templateUrl: './child.html',
    styleUrl: './child.css'
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




    // ---------------- Using CounterService ---------------------------
    
    // 1. Make a constructor to use CounterService
    constructor(public itemCounter : CounterService) { }


}