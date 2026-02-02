import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/*
Templates are the HTML that a component renders.
- A component is a class that controls a view (its template).
- Each component has a selector (e.g., app-root) that you place in HTML (index.html)
- The root component renders inside index.html's <app-root>.


*/





bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
