
/*

Templates are the HTML that a component renders.
- A component is a class that controls a view (its template).
- Each component has a selector (e.g., app-root) that you place in HTML (index.html)
- The root component renders inside index.html's <app-root>.

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
- event ke andar - type (input) , target (input element) , timeStamp (keyboard/mouse info) ye sab hota hai
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

Directives - add behaviour to existing elements and components
- Structural directives (*ngIf/*ngFor) - add/remove dom
- Attribute directives ([ngClass], custom [XXX]) - change the look/behaviour without creating/removing nodes
- star syntax (*) is sugar that expands to <ng-template>

Attribute Directive
-- @Directive define karo
-- decide to use custom directive or in built
-- @Input() (optional)
-- Host element ki property bind karo (@HostBinding)
-- Host element ke events ko suno (@HostListener)
-- use directive in html

Angular Events
-- events - lets template react to user actions
-- Bind with (event) to run a component method; $event is the native Event.
-- Use common DOM events like (click), (input), and key filters like (keyup.enter).

- Basic Events
--- Handle (click) to update component state.
--- Read input values from $event.target (cast or use $any when needed).
--- Track the last key pressed via (keyup).

Debounced Input
-- used when user types in really fast in input, so function calls at every key pressed -> ui lag
-- User jab tak type kar raha hai → kuch mat karo, Jab user ruk jaaye → tab kaam karo

----> FLOW
1️. User pehli baar kuch likhta hai
→ value temporary store hoti hai
→ timer start hota hai

2️. Agar timer ke beech user phir se kuch likh deta hai
→ final value abhi update nahi hoti
→ purana timer cancel ho jaata hai
→ naya timer start hota hai

3️. Ye process repeat hota rehta hai
→ jab tak user likhta rehta hai

4️. Jab user likhna band kar deta hai
→ aur poora timer complete ho jaata hai
→ tab FINAL value update hoti hai 

Sirf last wali value hi accept hoti hai
*/

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl : './app.css'
})
export class App {

}