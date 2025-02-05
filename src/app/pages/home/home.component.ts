import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name = '';
  selectedWorkout = '';
  selectedWorkoutTime = '';
  workoutForm!: FormGroup;
  
  workoutType = ["Cardio", "Strength Training", "Yoga", "Pilates", "Crossfit", "Zumba","Rest"]
  workoutTime = [5,10,15,30,35,40,45,50,55,60];
  workoutsByWeek = Array(7).fill(0)
  workoutsByUser = Array(this.workoutType.length).fill(0);



  constructor(private localStorageService: LocalStorageService,private fb: FormBuilder, private toastr: ToastrService){
    this.workoutForm = this.fb.group({
      name : ['',[Validators
        .required, Validators.pattern('^[a-zA-Z ]+$')]],
        workoutType: ['', Validators.required],
        workoutTime : ['',Validators.required]
    })
  }

  onSubmit(){
    if(!this.workoutForm.valid){
      this.toastr.error('Please fill form properly', 'Ohh')
      return
    }
     const data = this.localStorageService.getArray();
     const indexofWorkout = this.workoutType.indexOf(this.selectedWorkout);
     this.workoutsByUser[indexofWorkout] += parseInt(this.selectedWorkoutTime)
     const thisWeekIndex = new Date().getDay();
     const totalTime = this.workoutsByUser.reduce((a,b) => a+b,0);
     this.workoutsByWeek[thisWeekIndex] += totalTime 
     const user =  data.find((user) => user.name == this.workoutForm.value.name)
     if(data.length > 0 && user){
      user.weeklyWorkoutTime[thisWeekIndex] += totalTime;
      user.workoutTime[indexofWorkout] += parseInt(this.selectedWorkoutTime)
      this.toastr.success("User added successfully", user.name)
     } else{
      data.push({
        name : this.workoutForm.value.name,
        workoutTime : this.workoutsByUser,
        weeklyWorkoutTime : this.workoutsByWeek
      })
      this.toastr.success("User added successfully", this.workoutForm.value.name)
      }
      this.localStorageService.setArray(data)
      this.name = ''
      this.selectedWorkout = '',
      this.selectedWorkoutTime = ''
      this.workoutsByWeek= Array(7).fill(0)
      this.workoutsByUser = Array(this.workoutType.length).fill(0);
  }

}
