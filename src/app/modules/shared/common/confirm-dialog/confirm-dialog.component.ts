import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogConfig } from '../../../../entities/confirm-dialog-config';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  messages: string[] = [];
  config: ConfirmDialogConfig;

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmDialogConfig,
  ) {
    this.config = this.applyDefault(data);
    this.messages = (this.config.message || '').split('\n').filter(s => s);
  }

  ok() {
    this.dialogRef.close(true);
  }

  applyDefault(config: ConfirmDialogConfig): ConfirmDialogConfig {
    return Object.entries(config)
      .filter(([_, value]) => value !== undefined)
      .reduce((newConfig, [key, value]) => {
        newConfig[key] = value;
        return newConfig;
      }, new ConfirmDialogConfig());
  }
}
