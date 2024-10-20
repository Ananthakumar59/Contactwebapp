import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListuserComponent } from './components/listuser/listuser.component';
import { UserformComponent } from './components/userform/userform.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListuserComponent,UserformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contacts App';
}
