import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-estetic-car',
  templateUrl: './info-estetic-car.component.html',
  styleUrls: ['./info-estetic-car.component.css']
})
export class InfoEsteticCarComponent implements OnInit {
  public infoEsteticForm: any;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.infoEsteticForm = this.controlContainer.control;
    this.infoEsteticForm = this.infoEsteticForm.controls["infoEsteticForm"];
  }
}