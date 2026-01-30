import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
*/

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = 'Angular';
  protected readonly title = signal('PrakritiFirstProject');

  //image url here 
  // url = 'https://images.squarespace-cdn.com/content/v1/54a4656fe4b037e9babd6ec9/1525669925757-IR2EG4NQ7B7SCU776P1W/ke17ZwdGBToddI8pDm48kHH9S2ID7_bpupQnTdrPcoF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0nQwvinDXPV4EYh2MRzm-RRB5rUELEv7EY2n0AZOrEupxpSyqbqKSgmzcCPWV5WMiQ/Blog+images-17.jpg'
  url = 'https://this-url-will-never-work-123456.com/image.jpg';
  onImageError() {
    console.log('Image failed to load');
  }
}
