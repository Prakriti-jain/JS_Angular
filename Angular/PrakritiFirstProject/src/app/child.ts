import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component ({
    selector: 'child-comp',
    standalone: true,
    imports: [ɵEmptyOutletComponent],
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
}