import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit {
  toasts$;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  ngOnInit() {}

  removeToast(id: number) {
    this.toastService.remove(id);
  }

  getToastClasses(toast: Toast): string {
    const baseClasses = 'cursor-pointer';
    
    switch (toast.type) {
      case 'success':
        return `${baseClasses} bg-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white`;
      default:
        return `${baseClasses} bg-blue-500 text-white`;
    }
  }
}
