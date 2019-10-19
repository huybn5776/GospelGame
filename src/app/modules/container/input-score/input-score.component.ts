import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

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

  teamAItemsCount = 0;
  teamBItemsCount = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly gameScoreCalcService: GameScoreCalcService,
    private readonly dialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
      playerCount: ['', Validators.required],
      winner: ['', Validators.required],
      teamANewcomerAddition: ['', Validators.required],
      teamAItems: {},
      teamBNewcomerAddition: ['', Validators.required],
      teamBItems: {},
    });
    this.formGroup.statusChanges
      .pipe(filter(() => this.submitAttempt), untilDestroyed(this))
      .subscribe(() => this.updateErrors());
    this.formGroup.controls['playerCount'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(playerCount => this.updateItemCountValidator(playerCount));
    this.formGroup.controls['teamAItems'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(items => this.teamAItemsCount = this.getValueCount(items));
    this.formGroup.controls['teamBItems'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(items => this.teamBItemsCount = this.getValueCount(items));
  }

  updateErrors() {
    return this.formErrors = this.validationService.getFormErrors(this.formGroup);
  }

  updateItemCountValidator(playerCount: number) {
    this.availableItemsCount = playerCount === 2 ? 3 :
      playerCount === 4 ? 5 : null;
    if (this.availableItemsCount) {
      this.formGroup.controls['teamAItems']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['teamBItems']
        .setValidators(InputValidator.itemCount(this.availableItemsCount));
      this.formGroup.controls['teamAItems'].updateValueAndValidity();
      this.formGroup.controls['teamBItems'].updateValueAndValidity();
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
