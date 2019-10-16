import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent {
  @Input() count = 0;
  @Input() maxCount = 0;
  @Input() name = '';
  @Input() src = '';
  @Output() countChange = new EventEmitter<number>();

  changeCount(offset: number) {
    let newCount = (this.count || 0) + offset;
    newCount = this.maxCount ? Math.min(this.maxCount, newCount) : newCount;
    newCount = Math.max(0, newCount);
    if (newCount !== this.count) {
      this.count = newCount;
      this.countChange.emit(this.count);
    }
  }
}
