import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as R from 'ramda';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog } from '@angular/material';

import { AnyObject } from '../../../interface/model/any';
import { ValidationService } from '../../../services/validation.service';
import { InputValidator } from '../../../constants/validation-messages';
import { GameScoreCalcService } from '../../services/game-score-calc.service';
import { GameStatus } from '../../../entities/game-status';
import { ConfirmDialogComponent } from '../../shared/common/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogConfig } from '../../../entities/confirm-dialog-config';
import { GameScoreService } from '../../services/game-score.service';
import { GameItemInfo } from '../../../entities/game-item-info';
import { allGameItems, allCoinTypes } from '../../../constants/all-game-items';

@Component({
  selector: 'app-input-score',
  templateUrl: './input-score.component.html',
  styleUrls: ['./input-score.component.scss']
})
export class InputScoreComponent implements OnDestroy {

  formGroup: FormGroup;
  submitAttempt = false;
  formErrors: AnyObject<string> = {};
  availableItemsCount: number;

  allGameItems: GameItemInfo[] = allGameItems;
  allCoinTypes: GameItemInfo[] = allCoinTypes;

  teamAItemsCount$: Observable<number>;
  teamBItemsCount$: Observable<number>;
  teamACoinCount$: Observable<number>;
  teamBCoinCount$: Observable<number>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly gameScoreCalcService: GameScoreCalcService,
    private readonly gameScoreService: GameScoreService,
    private readonly dialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
      playerCount: ['', Validators.required],
      winner: ['', Validators.required],
      teamAItems: {},
      teamACoins: {},
      teamBItems: {},
      teamBCoins: {},
    });
    this.formGroup.statusChanges
      .pipe(filter(() => this.submitAttempt), untilDestroyed(this))
      .subscribe(() => this.updateErrors());
    this.formGroup.controls['playerCount'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(playerCount => this.updateItemCountValidator(playerCount));

    this.teamAItemsCount$ = this.formGroup.controls['teamAItems'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBItemsCount$ = this.formGroup.controls['teamBItems'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamACoinCount$ = this.formGroup.controls['teamACoins'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBCoinCount$ = this.formGroup.controls['teamBCoins'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
  }

  updateErrors() {
    return this.formErrors = this.validationService.getFormErrors(this.formGroup);
  }

  updateItemCountValidator(playerCount: number) {
    this.availableItemsCount = playerCount;
    if (this.availableItemsCount) {
      this.formGroup.controls['teamAItems']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['teamBItems']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['teamACoins']
        .setValidators(InputValidator.itemCount(this.availableItemsCount, 0));
      this.formGroup.controls['teamBCoins']
        .setValidators(InputValidator.itemCount(this.availableItemsCount, 0));
      ['teamAItems', 'teamBItems', 'teamACoins', 'teamBCoins']
        .forEach(name => this.formGroup.controls[name].updateValueAndValidity());
      this.updateErrors();
    }
  }

  getValueCount(obj: AnyObject<number>) {
    return R.sum(Object.values(obj));
  }

  onSubmit() {
    this.submitAttempt = true;
    this.updateErrors();
    if (this.formGroup.valid) {
      const gameStatus: GameStatus = this.formGroup.value;
      const calcScoreResult = this.gameScoreCalcService.calcScore(gameStatus);
      const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogConfig, boolean>(ConfirmDialogComponent, {
        data: {
          title: '遊戲分數',
          message:
            `A隊: ${calcScoreResult.teamAScore}\n` +
            `B隊: ${calcScoreResult.teamBScore}\n`,
          okLabel: '送出分數'
        },
      });
    }
  }

  ngOnDestroy() { }

}
