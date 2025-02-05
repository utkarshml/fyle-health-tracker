import { Injectable } from '@angular/core';

export interface LocalStorageServiceType {
  name: string;
  weeklyWorkoutTime: number[];
  workoutTime: number[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'data';

  constructor() {}

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== null;
  }

  // Initialize the array if it doesn't exist
  initializeArray(): void {
    if (this.isLocalStorageAvailable()) {
      const existingData = localStorage.getItem(this.storageKey);
      if (!existingData) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      }
    }
  }

  // Retrieve the array
  getArray(): LocalStorageServiceType[] {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    }
    return []; // Return empty array if localStorage is not available
  }

  // Update the array
  setArray(data: LocalStorageServiceType[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }

  // Clear the array
  clearArray(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
