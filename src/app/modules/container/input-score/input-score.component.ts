import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-score',
  templateUrl: './input-score.component.html',
  styleUrls: ['./input-score.component.scss']
})
export class InputScoreComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      playerCount: ['', Validators.required],
      winner: ['', Validators.required],
      teamANewcomerAddition: ['', Validators.required],
      teamAItems: [{}, Validators.required],
      teamBNewcomerAddition: ['', Validators.required],
      teamBItems: [{}, Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
  }

}
