import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  styles: [`
    header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      padding: 1rem;
      transition: all 0.5s ease;
    
    }
    .scrolled {
      background-color: #f0f0f0;
      display: flex;
      justify-content: start;
      height: 7rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  isBrowser: boolean;
  currentRoute: string = '';
  isNotTrackDataPath :boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router,private localStorage : LocalStorageService) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Calculate the current scroll position
    const scrollPosition = window.pageYOffset ||
                           document.documentElement.scrollTop ||
                           document.body.scrollTop || 0;

    // Set 'scrolled' to true if scroll position is greater than 100 pixels
    this.scrolled = scrollPosition > 100;
  }
  ngOnInit() {
    if (this.isBrowser) {
          this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects;
          this.isNotTrackDataPath =  this.currentRoute.split("/")[1] == 'trackData'
          console.log('Current Route:', this.currentRoute.split("/"));
        }
      });
    }
  
    
   } isActive(path : string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to use window here
      return window.location.pathname === path;
    }
    return false;
  }
  getTotalUsers(){
    return this.localStorage.getArray().length
  }
  getTotalMinutsToday(){
    let sum = 0
     this.localStorage.getArray().map(item=>{ 
      item.workoutTime.map((a)=> sum+=a)
    })
    return sum;
  }


}
