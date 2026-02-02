import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor , NgTemplateOutlet} from '@angular/common';
import { CommonModule } from '@angular/common';
/*

{{ }}     → show data
[ ]       → set property
( )       → handle event
#ref      → element reference
*ngFor    → repeat DOM
*ngIf     → show/hide DOM


Signal = Angular ka reactive variable
Jab signal ki value change hoti hai → UI automatically update ho jaata hai


Interpolation
- Displays component values in the DOM with double curly braces.
- Read it as: "take this value and print it as text".
- One-way only: data → view.

{{ name }}: Interpolation reads the name field and inserts it as text.
(click): Event binding updates the component state when the button is clicked.


Template Reference Variable
- #box sirf HTML element ka ek naam hai jisse hum uski value ya methods template ke andar use kar sakte hain
- Sirf usi HTML template ke andar use kar sakte hai


Null Safe Navigation
- ? --> moves right only when the left value is not null, prevents crashing when an element is null

- Use || when:
--- Tumhe falsy values bhi reject karni hain
--- Example: empty input not allowed

- Use ?? when:
--- 0, '', false valid values hain


Structural Directive - angular ka vo feature jo DOM ko add/remove/repeat karta hai
* is shorthand that expands to an underlying <ng-template>.
- *ngIf - Angular ka if hai jo html element ko hide/remove karta hai
- *ngFor - Angular ka loop hai jo ek HTML element ko array ke har item ke liye repeat karta hai


ngTemplate Outlet 
- <ng-template> defines a reusable chunk of template (a "recipe").
- Render it with [ngTemplateOutlet].
- Pass values via [ngTemplateOutletContext] and read with let- variables.


Template Statements 
- jo code HTML template ke andar likhte hai ya jo kisi event pe run hota hai.
- $event = browser ka original (native) event object
- $event.target is of type - EventTarget | null, but we know it is HTMLInputElement for sure so we use $any($event.target).value
- [value]="text" - Jo bhi text me value hai, input box me dikhao


Pipes
- transform values for display using | operator
- accept optional arguments (e.g. formats, locales)
- multiple pipes can be chained
- need to import CommonModule 
- percent:'1.0-2' --> isme 1.0-2 ka matlab hai decimal point se phele min 1 digit, decimal point ke baad min 0 and max 2 digit, this format can be changed accordingly
*/

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, NgTemplateOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = 'Angular';
  protected readonly title = signal('PrakritiFirstProject');


  //? prevents crashing of app when user is null or undefined
  user?:{
    name? : string,
    email? : string,
    skills? : string[]
  }

  profilePic = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';
  status = '';

  toggleUser() {
    //if user is present, mark it as absent
    if(this.user) {
      this.user = undefined;
    }

    //if user is not present, mark it as present by assigning it value
    else {
      this.user={
        name: 'Prakriti',
        email: 'prakriti@ciena.com',
        // skills : undefined
        skills : ['Angular', 'Typescript', 'SpringBoot', 'Java']
      };
    }
  }

  // image error handling
  onImageError() {
    this.profilePic = 'https://via.placeholder.com/120/ff0000/ffffff?text=No+Image';
  }

  saveStatus(value : string) {
    this.status = value;
  }

  isLoggedIn = true; // if true then print Welcome, if false then it does not
  switch() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  
  // NgTemplateOutlet
  currentTemplate : 'info' | 'warning' | null = null;
  msg ='';

  showInfo() {
    this.currentTemplate = 'info';
    this.msg = 'this is info message';
  }

  showWarning() {
    this.currentTemplate = 'warning';
    this.msg = 'this is warning message';
  }

  // statements and $event
  count = 0;
  text = '';

  //Pipes
  today = new Date();
}
