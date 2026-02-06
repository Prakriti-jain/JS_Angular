import { Component, signal, Directive, HostBinding, HostListener, Input, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf, NgFor , NgTemplateOutlet} from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChildComponent } from "./child";
import { FormsModule } from '@angular/forms';

type Item = { id : number; name : string};

/*Part of Attribute Directive
- Jab bhi kisi element pe [w3Highlight] mile is class ko attach kar dena”
- selector : '[w3Highlight]' means the below 
--- <div w3Highlight></div>      
--- <div [w3Highlight]></div> 
*/

@Directive({
  selector: '[w3Highlight]',
  standalone: true
})


export class HighlightDirective {
  @Input('w3Highlight') highlightColor = '';
  @HostBinding('style.transition') transition = 'background-color 150ms ease-in-out';
  @HostBinding('style.backgroundColor') bg = '';

  @HostListener('mouseenter') onEnter() { this.bg = this.highlightColor; }
  @HostListener('mouseleave') onLeave() { this.bg = ''; }
  @HostListener('click') onMouse() { this.bg = 'green';}
  @HostListener('dblclick') onDouble() {
    this.bg = 'purple';
  }
}

// -------------------------------------------------------------------------------------------------

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NgIf, NgFor, NgTemplateOutlet, CommonModule, ChildComponent, FormsModule, HighlightDirective],
  templateUrl: './layouts/home.html',
  styleUrl: './layouts/home.css'
})


export class HomeComponent {
  private router = inject(Router);
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
  
  hasAccess = true;

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

  //Angular Events
  countplus = 0;
  lastKey = '';
  value = '';
  upperVal = '';

  inc() {
    this.countplus++
  } 

  onInput(e : Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  upper() {
    this.upperVal = this.value.toUpperCase();
  }


  //Debounced input 
  immediate = ''
  debounced = ''
  private handle : any

  onInputDebounced(e : Event) {
    const val = (e.target as HTMLInputElement)?.value ?? '';

    //turant update
    this.immediate=val;

    //clear timer
    clearTimeout(this.handle);

    //set new timer
    this.handle = setTimeout(() => this.debounced = val, 400);
  }

  //move to next page
  goNext() {
    this.router.navigate(['/next']);
  }
}