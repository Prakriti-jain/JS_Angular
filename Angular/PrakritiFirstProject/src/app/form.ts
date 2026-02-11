import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormChildComponent } from './formChild';

/*

Forms in Angular

---------------------------------- HTML Forms ---------------------------------

- Model - model ek object hota hai jisme form ka data store hota hai.
    model = {
    name: '',
    email: '',
    agree: false
    }
---> model.agree - checkbox ka value
---> checkbox tick → model.agree = true
---> untick → model.agree = false

- Touched - User ne input ko click kiya → touched = true
- Dirty - User ne type kiya → dirty = true
- Invalid - Agar validation fail ho jaye. Example: <input required>
---> User blank chhodta hai → invalid = true

                                ngForm vs ngModel

ngForm	                                                            ngModel
Poore form ko represent karta hai	                                Ek single input field ko represent karta hai
Form-level directive	                                            Control-level directive
<form> tag par lagta hai	                                        <input>, <select>, <textarea> par lagta hai
Form ka state track karta hai (valid, invalid, submitted)	        Ek field ka state track karta hai (dirty, touched, errors)
Multiple controls ko group karta hai	                            Sirf ek value ko bind karta hai
#f="ngForm" se reference milta hai	                                #n="ngModel" se reference milta hai


Two types of forms in angular:
- Template-Driven Forms - HTML-based approach (easy & beginner friendly)
---> Logic zyada HTML me hota hai
---> [(ngModel)] se data bind hota hai
---> Simple forms ke liye best

- Reactive Forms
---> TypeScript/code-based approach (advanced)
---> Form ka structure TS file me define hota hai
---> FormGroup (single input field ko track karta hai), FormControl(multiple FormControl ko ek group me rakhta hai) use hota hai
---> Complex validation, dynamic fields ke liye best


-------------------------- HTML FORM ELEMENTS IN ANGULAR

- Text / Email / Number input
---> Bind using [(ngModel)] or formControlName
---> Value type → mostly string
<input name="email" type="email" [(ngModel)]="model.email">

- Textarea
---> Same as text input
<textarea name="bio" [(ngModel)]="model.bio"></textarea>

- Checkbox
---> Value → boolean (true / false)
<input type="checkbox" name="agree" [(ngModel)]="model.agree">

- Radio buttons
---> Same name required , Ek hi option select hoga
---> Value → string (default)
<input type="radio" name="color" value="red" [(ngModel)]="model.color">
<input type="radio" name="color" value="blue" [(ngModel)]="model.color">

- Radio with numbers/objects
---> Use [ngValue]
<input type="radio" name="size" [ngValue]="1" [(ngModel)]="model.size">

- Select dropdown
---> Selected value bind hota hai
<select name="pet" [(ngModel)]="model.pet">
  <option value="cat">Cat</option>
</select>

- Select with objects
---> Use [ngValue]
<option [ngValue]="{ id: 1, name: 'Cat' }">

- Select multiple
---> Bind to array
<select name="tags" [(ngModel)]="model.tags" multiple>
Value → ["news","tech"]

- File input
---> Two-way binding nahi use karte
---> (change) event use karte
<input type="file" (change)="onFiles($event)">

- Number input issue
Template-driven me number string ban jata hai
Fix: (ngModelChange)="age = $any($event)"

- compareWith (objects select)
---> Jab options re-create ho jaye
<select [compareWith]="byId">

------------------------------------- Validation in HTML Form 

Common validation attributes
- required
- minlength
- maxlength
- email
- pattern
<input required minlength="3">

ngModel reference - #name="ngModel"
Access:
- name.valid
- name.invalid
- name.touched
- name.dirty
- name.errors

Error show condition 
- invalid && (dirty || touched || submitted)
Reason:
- page load pe error na aaye
- user interaction ke baad aaye

errors object
- name.errors['required']
- name.errors['minlength']
- name.errors['email']

form reference - #f="ngForm"
Access:
- f.valid
- f.invalid

Disable submit
<button [disabled]="f.invalid">

ngSubmit
<form (ngSubmit)="onSubmit()">
Form submit → function call

ngModelChange
- value change event
- (ngModelChange)="onChange($event)"


Types summary
Field	              Type
text	              string
email	              string
checkbox	          boolean
radio	              string
select	              string
select multiple	      array
ngValue	              object


------------------------------- Reactive Forms --------------------------------------

Template-driven me:
- HTML form banata hai
- TS sirf data hold karta hai

Reactive forms me:
- Form TS me banta hai
- HTML sirf display karta hai

- syntax 
form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  newsletter: [false],
});

---> name - control name
---> ''	 - initial value
---> Validators.required	- validation rule

- HTML me bind
---> <form [formGroup]="form">
---> ye HTML form TS wale form object se connected hai.

- Input connect
---> <input formControlName="name">
---> ye input TS ke form.controls.name se bind hai.


setValue vs patchValue

- setValue - Sab fields dene padte hain
this.form.setValue({
  name: 'Prakriti',
  email: 'abc@gmail.com',
  newsletter: true
});

- patchValue - Kuch fields update kar sakte ho
this.form.patchValue({
  name: 'Prakriti'
});

------------------------------------ Angular Lifecycle Hooks ----------------------------------

Jab bhi koi Angular component banta, update hota, ya destroy hota hai — Angular automatically kuch methods call karta hai. Inhi ko lifecycle hooks bolte hain.
Ye hooks help karte hain:
- setup karne me
- input changes handle karne me
- DOM access karne me
- cleanup karne me

Life Flow of Component
1. Constructor
2. ngOnChanges (agar @Input ho)
3. ngOnInit (after inputs are set)
4. ngAfterViewInit (dom ready hojata hai)
5. (multiple updates - ngOnChanges repeatedly)
6. ngOnDestroy

ngOnChanges()
- jab bhi @Input value change hoti hai
- parent → child data change detect karta hai

ngOnDestroy()
- component remove hone se pehle run hota hai
- Use: subscriptions unsubscribe, timers clear, event listeners remove

Toggle lifecycle: Showing a component (e.g., with *ngIf) runs ngOnInit; hiding it runs ngOnDestroy.

@ViewChild() - HTML ke kisi element ya child component ko TypeScript file me access karna
- when this viewchild is used, angular does not directly give the html element, it gives ElementRef 
- ElementRef - it is an object jiske ander actual html element store hota hai
- to access that DOM element we use .nativeElement
box = ElementRef {
        nativeElement: <input>...</input>
      }
box.nativeElement = actual html input element

- SimpleChanges - Jab bhi parent se child me koi @Input() value change hoti hai, Angular ek object deta hai jisme change ka pura record hota hai.
- ngOnChanges(changes: SimpleChanges)
- changes object me har input ka record hota hai.
- changes = {
  text: {
    previousValue: "",
    currentValue: "Hello",
    firstChange: true
  }
}
*/


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormChildComponent],
  templateUrl: './layouts/forms.html',
  styleUrl: './layouts/forms.css'
})

export class FormDemoModule {

    // Basic Forms
    nam = '';
    submitted = false;

    onSubmit() {
        this.submitted = true;
    }

    // Forms Validation
    model = { name : '', email : ''};
    sub = false;
    onSub() {
        this.sub = true;
    }

    // Reactive Forms
    fb = new FormBuilder();
    subm =  false;
    forms = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        newsletter: [false],
    });

    onSubm() { this.subm = true; }

    // ----------------------------- Angular Lifecycle hook ------------------
    // involving parent and child ---------------- This is Parent

    message = "";
    showChild = true;

    toggleChild() {
      this.showChild = !this.showChild;
    }

    // ------------------------- Conditional Rendering -----------------------
    // with switch
    status = signal<"loading" | "success" | "error" | string>("loading");

    //using @if
    loading = signal(false);
    error = signal(false);
    private timer:any;

    startLoading() {
      this.loading.set(true);
      this.error.set(false);

      clearTimeout(this.timer);
      this.timer = setTimeout(() => { this.loading.set(false); }, 1000);
    }

    showError() {
      this.error.set(true);
      this.loading.set(false);
    }

    reset() {
      this.error.set(false);
      this.loading.set(false);
    }


}

