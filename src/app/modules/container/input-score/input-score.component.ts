import { Component, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

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
    this.formGroup.controls['playerCount'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(playerCount => this.updateItemCountValidator(playerCount));

    this.teamAItemsCount$ = this.formGroup.controls['itemsA'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBItemsCount$ = this.formGroup.controls['itemsB'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamACoinCount$ = this.formGroup.controls['coinsA'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
    this.teamBCoinCount$ = this.formGroup.controls['coinsB'].valueChanges
      .pipe(map(items => this.getValueCount(items)));
  }

  updateErrors() {
    return this.formErrors = this.validationService.getFormErrors(this.formGroup);
  }

  updateItemCountValidator(playerCount: number) {
    this.availableItemsCount = playerCount;
    if (this.availableItemsCount) {
      this.formGroup.controls['itemsA']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['itemsB']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['coinsA']
        .setValidators(InputValidator.itemCount(this.availableItemsCount, 0));
      this.formGroup.controls['coinsB']
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

  reset() {
    this.initForm();
    this.formErrors = {};
    this.submitAttempt = false;
  }

  ngOnDestroy() { }
}
