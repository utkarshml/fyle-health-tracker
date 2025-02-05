import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrackComponent } from './pages/track/track.component';
import { TrackDataComponent } from './pages/track-data/track-data.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'track', component: TrackComponent},
    // {path : 'track/data' , component : TrackDataComponent   },
    { path: 'trackData/:id', component: TrackDataComponent, 
    
     },
    { path: '**', redirectTo: '' }
];
