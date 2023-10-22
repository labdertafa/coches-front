import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-tech-car',
  templateUrl: './info-tech-car.component.html',
  styleUrls: ['./info-tech-car.component.css']
})
export class InfoTechCarComponent implements OnInit {
  public infoTechForm: any;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.infoTechForm = this.controlContainer.control;
    this.infoTechForm = this.infoTechForm.controls["infoTechForm"];
  }

}