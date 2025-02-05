import { Injectable } from '@angular/core';
import * as stringSimilarity from 'string-similarity';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchByName(data: any[], searchTerm: string): any[] {
    if (!searchTerm) return data; // If search term is empty, return all data

    const names = data.map(obj => obj.name.toLowerCase()); // Extract names in lowercase
    const matches = stringSimilarity.findBestMatch(searchTerm.toLowerCase(), names);

    return data.filter(obj => 
      obj.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (matches.ratings.find(r => r.target === obj.name.toLowerCase())?.rating ?? 0) > 0.5 // Adjust similarity threshold
    );
  }
}
