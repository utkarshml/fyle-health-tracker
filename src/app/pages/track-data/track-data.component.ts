import { Component, Input, OnInit } from '@angular/core';
import { ChartsComponent } from '../../components/charts/charts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, LocalStorageServiceType } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-data',
  imports: [ChartsComponent,CommonModule],
  templateUrl: './track-data.component.html',
  styleUrl: './track-data.component.css'
})
export class TrackDataComponent implements OnInit {
  userId: string | null = null;
  daysOfWeek :string[] = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  workoutType : string[]  = ["Cardio", "Strength Training", "Yoga", "Pilates", "Crossfit", "Zumba","Rest"]
  totalWorkoutInOneDay : number = 0 ;
  selectChart : boolean = false;
  currentUserData: LocalStorageServiceType | undefined;
  constructor(private route: ActivatedRoute, private localStorage: LocalStorageService ) {}
  ngOnInit() {
    // Fetch the dynamic ID from the URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    this.currentUserData = this.localStorage.getArray().find((user)=> user.name == this.userId)
  }
  get getWeekData() {
    return this.currentUserData?.weeklyWorkoutTime;
  }
  get getTodayData() {
    
     return this.currentUserData?.workoutTime;
  }
   get getTotalWorkoutInOneDay(){
      let sum = 0 ;
      this.currentUserData?.workoutTime.map((item)=> {
        if(item > 0){
           sum+=1;
        }
      })
      return sum;
  }
  get getPercentage(){
    return this.getTotalWorkoutInOneDay/7*100;
   }
   get getDegree(){
    return (Number(this.getPercentage.toFixed(1))/100*360).toFixed(1)
   }
   get totalWeekTime(){
    let sum = 0 ;
    this.currentUserData?.weeklyWorkoutTime.map((item)=>{
      sum += item
    })
    return sum;
   }
   get totalTodayTime(){
    let sum = 0 ;
    this.currentUserData?.workoutTime.map((item)=>{
      sum += item
    })
    return sum;
   }
   showWorkout(){
    this.selectChart = true;
  }
  showDays(){ 
    this.selectChart = false;
  }

}

