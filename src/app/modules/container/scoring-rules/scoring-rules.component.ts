import { Component } from '@angular/core';

import { allGameItems } from '../../../constants/all-game-items';

@Component({
  selector: 'app-scoring-rules',
  templateUrl: './scoring-rules.component.html',
  styleUrls: ['./scoring-rules.component.scss']
})
export class ScoringRulesComponent {

  items = allGameItems;

}
