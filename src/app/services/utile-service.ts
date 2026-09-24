import { Injectable } from '@angular/core';
import { CategoryService } from './category-service';

@Injectable({
  providedIn: 'root',
})
export class UtileService {

  public stopPropagation(event: PointerEvent) {
    event.stopPropagation();
  }
  public stopPrevent(event: PointerEvent) {
    event.preventDefault();
  }
}
