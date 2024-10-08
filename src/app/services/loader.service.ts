import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingCount = 0;

  show() {
    this.loadingCount++;
    this.updateLoadingState();
  }

  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    this.updateLoadingState();
  }

  private updateLoadingState() {
    this.loadingSubject.next(this.loadingCount > 0);
  }
}
