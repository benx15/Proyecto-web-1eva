import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { register } from 'module';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('trabajo');
}
