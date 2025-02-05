import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService, LocalStorageServiceType } from '../../services/local-storage.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-track',
  imports: [FormsModule,CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  selectedWorkout = ''
  selectedSort=''
  trackData: LocalStorageServiceType[] = []
  workoutType : string[]  = ["Cardio", "Strength Training", "Yoga", "Pilates", "Crossfit", "Zumba","Rest"]
  searchTerm: string = '';
  currentPage: number = 1;
  itemPage: number = 4;
  totalPage: number = 0;
  

  constructor(private localStorageService: LocalStorageService,private searchService: SearchService, private router: Router){
    this.trackData = [...localStorageService.getArray()]
  }

  onSearch() {
    if(this.searchTerm == ''){
      this.trackData = this.localStorageService.getArray()
    }else{
      this.trackData = this.searchService.searchByName(this.trackData, this.searchTerm);
    }
  }
   filteredWorkout() {
    if (!this.selectedWorkout || this.selectedWorkout == 'All') {
       this.trackData = this.localStorageService.getArray(); // Show all items
    }else{
      this.trackData = this.localStorageService.getArray(); // Show all items
      this.trackData =  this.trackData.filter(item => item.workoutTime[this.workoutType.indexOf(this.selectedWorkout)]);
    }
  }
  sortFiltered(){
    switch(this.selectedSort){
      case "2" : 
      this.trackData.sort((a, b) => {
        const totalA = a.workoutTime.reduce((a, b) => a + b, 0);
        const totalB = b.workoutTime.reduce((a, b) => a + b, 0);
        return totalB - totalA;
      });
      break;
      case "3" : 
      this.trackData.sort((a, b) => {
        const totalA = a.workoutTime.reduce((a, b) => a + b, 0);
        const totalB = b.workoutTime.reduce((a, b) => a + b, 0);
        return totalA - totalB;
      });
      break;
      case "1" : 
        this.trackData = this.localStorageService.getArray()
      break;
    }
    
  }

   getSum(array:number[]){
    return array.reduce((a, b) => a + b,0);
  }
  getLabel(array :number[]) : string[] {
   const workoutsBages : string[] = [];
  array.map((item , index) =>{
    if(item > 0){
      workoutsBages.push(this.workoutType[index])
    }
  })
   return workoutsBages
  }
  getTodayTotalWorkouts(array : number[]) : number {
       let total = 0;
       array.map((item) => {
        if(item > 0){
          total += 1;
        }
       })
      return total
  }
  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemPage;
    return this.trackData.slice(startIndex, startIndex + this.itemPage);
  }
  
  changePage(page: number) {
    const totalPage = this.getTotalPage();  // Get total pages dynamically
    if (page >= 1 && page <= totalPage) {
      this.currentPage = page;
    }
  }
  
  getTotalPage() {
    
    return Math.ceil(this.trackData.length / this.itemPage);
  }
  
  goToAbout(path : string) : void{
    this.router.navigate([`/trackData/${path}`])
  }

}
