import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor , NgTemplateOutlet} from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChildComponent } from "./child";
import { FormsModule } from '@angular/forms';
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


Attribute Binding
- Attributes - HTML tag ke upar likhi hui extra information (metadata) jo user ko dikhai nahi deti, par browser / screen reader / table layout use karta hai.
- Use [attr.name] to set HTML attributes.
- For attributes that do not map to DOM properties (e.g., ARIA, colspan).
- Distinct from property binding.


FORMAT TO DEFINE TABLE IN HTML

<table>
  <tr>table row
    <th> heading </th>
    <td> data </td>
  <tr/> 
</table>

colspan -- Ye cell ek se zyada columns ki jagah le lo
colspan ='2' means a cell took 2 column width

--------------------------------------------------------------------------------------------------

COMPONENT

- INPUT - Pass data from parent to child with @Input().
---> Child CLASS me @Input define karo
---> Child HTML me input use karo
---> Parent CLASS me data banao
---> Parent HTML se data bhejo 

- OUTPUT - Notify the parent of events with @Output()
---> Child CLASS me @Output define karo
---> Child CLASS me emit() karo
---> Child HTML me event trigger karo
---> Parent HTML me event suno
---> Parent CLASS me handler likho

- CONTENT PROJECTION - Parent apna HTML child ke andar daal deta hai using <ng-content>
---> Child component banao
---> Parent component me use karo

*/

type Item = { id : number; name : string};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, NgTemplateOutlet, CommonModule, ChildComponent, FormsModule],
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

  //Attribute Binding
  wide = true;

  get label() {
    if(this.wide) return 'Table is wide';
    return 'Table is narror';
  }

  switchLabel() {
    this.wide = !this.wide;
  }

/*
*ngFor ... trackBy
- Enables DOM node reuse when items move, insert, or remove.
- trackById: Uses trackById to give each item a stable identity so Angular can reuse DOM nodes when the list order changes.
- trackById(index, item): Returns the unique key for an item. Here, it returns item.id regardless of index.
- shuffle(): Reverses the array to demonstrate that with trackBy, Angular moves existing DOM nodes instead of destroying and recreating them.
*/

  items : Item[] = [
    {id : 1, name : 'Alpha'},
    {id : 2, name : 'Gamma'},
    {id : 3, name : 'Beta'}
  ]

  Shuffle() {
    this.items = [...this.items].reverse();
  }

  trackByID(index:number, item:Item) {
    return item.id;
  }

  //Parent Component
  //input
  userName = 'Prakriti jain';

  //output
  message = '';
  onNotify(msg : string) {
    this.message = msg;
  }

  counter = 0;
  onClicked(num : number) {
    this.counter = num;
  }

  //Two way Binding
  inputName = "";
}
