import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToastService } from './services/toast.service';
import { LocalStorageService } from './services/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fyle';
  constructor(private localStorageService: LocalStorageService) {}
   ngOnInit(): void {
    this.localStorageService.initializeArray();
   }
}
