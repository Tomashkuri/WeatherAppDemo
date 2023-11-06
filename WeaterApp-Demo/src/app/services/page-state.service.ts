import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private currentPage = 'weather';
  constructor() { }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
