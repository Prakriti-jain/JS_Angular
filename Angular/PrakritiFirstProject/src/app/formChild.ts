import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <h3>Child Component</h3>
    <p style = "font-weight : bold"> Demo of ngOnChanges </p>
    <!-- This is for showing parent se child input change -->
    <p>Input value: {{ text }}</p>

    <!-- This is just for showing interval wali cheez -->
    <p style = "font-weight : bold"> Demo of View Child </p>
    <input #box placeholder = "Child input">
    <p> Timer running... check console </p>
  `
})

export class FormChildComponent implements OnChanges {
    @Input() text!: string;

    //parent se value change
    ngOnChanges(changes : SimpleChanges) {
        console.log('ngOnChanges called!');

        if(changes['text']) {
            console.log('Previous : ', changes['text'].previousValue);
            console.log('Current : ' , changes['text'].currentValue);
        }
    }

    constructor() {
        console.log("constructor called!");
    }
    // ---------------------- View Child demo ----------------------------
    @ViewChild('box') box! : ElementRef;
    intervalID : any;


    //Component create
    ngOnInit() {
        console.log('ngOnInit called!');
        this.intervalID = setInterval(() => {
            console.log('Timer running...');
        }, 2000);
    }

    //DOM Ready
    ngAfterViewInit() {
        console.log('ngAfterViewInit called!');
        this.box.nativeElement.focus();
        
    }

    //Destroy
    ngOnDestroy() {
        console.log('ngOnDestroy called!');
        clearInterval(this.intervalID);
    }

}