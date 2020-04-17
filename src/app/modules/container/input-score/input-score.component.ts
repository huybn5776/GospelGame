import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import { MatDialog } from '@angular/material/dialog';

import { AnyObject } from '../../../interface/model/any';
import { ValidationService } from '../../../services/validation.service';
import { InputValidator } from '../../../constants/validation-messages';
import { GameScoreCalcService } from '../../services/game-score-calc.service';
import { GameStatus } from '../../../entities/game-status';
import { ConfirmDialogComponent } from '../../shared/common/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogConfig } from '../../../entities/confirm-dialog-config';
import { GameItemInfo } from '../../../entities/game-item-info';
import { allCoinTypes, allGameItems } from '../../../constants/all-game-items';
import { RootState } from '../../../store/reducers';
import { GameScoreActions } from '../../../store/actions';
import { fromGameScore } from '../../../store/selectors';

@UntilDestroy()
@Component({
  selector: 'app-input-score',
  templateUrl: './input-score.component.html',
  styleUrls: ['./input-score.component.scss']
})
export class InputScoreComponent {

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

  nextGameInningNumber$: Observable<number>;

  constructor(
    private readonly el: ElementRef,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly gameScoreCalcService: GameScoreCalcService,
    private readonly dialog: MatDialog,
    private readonly store: Store<RootState>,
  ) {
    this.initForm();
    this.nextGameInningNumber$ = store.select(fromGameScore.selectNextInning);
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      playerCount: ['', Validators.required],
      winner: ['', Validators.required],
      itemsA: {},
      coinsA: {},
      itemsB: {},
      coinsB: {},
    });
    this.formGroup.statusChanges
      .pipe(filter(() => this.submitAttempt), untilDestroyed(this))
      .subscribe(() => this.updateErrors());
    this.formGroup.get('playerCount').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(playerCount => this.updateItemCountValidator(playerCount));

    this.teamAItemsCount$ = this.formGroup.get('itemsA').valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBItemsCount$ = this.formGroup.get('itemsB').valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamACoinCount$ = this.formGroup.get('coinsA').valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBCoinCount$ = this.formGroup.get('coinsB').valueChanges
      .pipe(map(items => this.getValueCount(items)));
  }

  updateErrors() {
    return this.formErrors = this.validationService.getFormErrors(this.formGroup);
  }

  updateItemCountValidator(playerCount: number) {
    this.availableItemsCount = playerCount;
    if (this.availableItemsCount) {
      this.formGroup.get('itemsA')
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.get('itemsB')
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.get('coinsA')
        .setValidators(InputValidator.itemCount(this.availableItemsCount, 0));
      this.formGroup.get('coinsB')
        .setValidators(InputValidator.itemCount(this.availableItemsCount, 0));
      ['itemsA', 'itemsB', 'coinsA', 'coinsB']
        .forEach(name => this.formGroup.controls[name].updateValueAndValidity());
      this.updateErrors();
    }
  }

  getValueCount(obj: AnyObject<number>) {
    return R.sum(Object.values(obj || {}));
  }

  onSubmit() {
    this.submitAttempt = true;
    this.updateErrors();
    if (this.formGroup.valid) {
      const gameStatus: GameStatus = this.formGroup.value;
      const gameScore = this.gameScoreCalcService.calcScore(gameStatus);
      const dialogRef = this.openDialog(gameScore);
      dialogRef.afterClosed()
        .pipe(
          filter(RA.isTruthy),
          withLatestFrom(this.nextGameInningNumber$),
          untilDestroyed(this),
        )
        .subscribe(([_, inning]) => this.saveScore(gameScore, inning));
    } else {
      this.focusFirstError();
    }
  }

  openDialog(gameScore) {
    return this.dialog.open<ConfirmDialogComponent, ConfirmDialogConfig, boolean>(ConfirmDialogComponent, {
      data: {
        title: '遊戲分數',
        message:
          `A隊: ${gameScore.scoreA}\n` +
          `B隊: ${gameScore.scoreB}\n`,
        okLabel: '送出分數'
      },
    });
  }

  saveScore(gameScore, inning) {
    gameScore.time = new Date();
    // "id" and "inning" value will generate by backend api, set those here is just for save to store before posting data.
    gameScore.id = new Date().getTime();
    gameScore.inning = inning;
    this.store.dispatch(GameScoreActions.addScore({gameScore: gameScore}));
    this.reset();
  }

  focusFirstError() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements[0]) {
      invalidElements[0].focus();
      invalidElements[0].scrollIntoView();
    }
  }

  reset() {
    this.initForm();
    this.formErrors = {};
    this.submitAttempt = false;
  }
}
