import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Scoala } from 'app/models/scoala.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SumValidator2 } from './sum-validator2';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})


export class InfoModalComponent {
  @ViewChild('infoModal') modal: ModalDirective;

  editScoalaForm: FormGroup;
  scoalaCurenta = new Scoala();
  popup = true;


  constructor(public fb: FormBuilder, private api: ApiService, private sumValidator2: SumValidator2) { }

  show(id: number): void {
    this.popup = true;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.modal.show();
    this.getScoala(id);
  }

  getScoala(id: number) {
    this.api.getScoala(id)
      .subscribe((school: Scoala) => {
        this.scoalaCurenta = school;
        this.scoalaCurenta.id = id;
        this.initializeFrom(this.scoalaCurenta);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(scoalaCurenta: Scoala) {
    this.editScoalaForm = this.fb.group({
      sirues: [scoalaCurenta.siruesC, Validators.required],
      director: [scoalaCurenta.directorC, Validators.required],
      furnizorDate: [scoalaCurenta.furnizorDateC, Validators.required],
      nrFurnizor: [scoalaCurenta.nrFurnizorC, Validators.required],
      total: [Number(scoalaCurenta.totalC), Validators.required],
      romi: [Number(scoalaCurenta.romiC), Validators.required],
      romiE: [Number(scoalaCurenta.romiE)],
      dizabilitati: [Number(scoalaCurenta.dizabilitatiC), Validators.required],
      parinti: [Number(scoalaCurenta.parintiC), Validators.required],
      burse: [Number(scoalaCurenta.burseC), Validators.required],
      repetenti: [Number(scoalaCurenta.repetentiC), Validators.required],
      online: [Number(scoalaCurenta.onlineC), Validators.required],
      remediala: [Number(scoalaCurenta.remedialaC), Validators.required],
    },
      {
        validators: [this.sumValidator2.sumValidator2()],
      }
    );
  }

  editScoala() {
    if (this.editScoalaForm.pristine) {
      this.modal.hide();
      return;
    }
    const editedScoala = new Scoala({
      id: this.scoalaCurenta.id,
      judet: this.scoalaCurenta.judet,
      mediu: this.scoalaCurenta.mediu,
      nume: this.scoalaCurenta.nume,
      sirues: this.scoalaCurenta.sirues,
      director: this.scoalaCurenta.director,
      furnizorDate: this.scoalaCurenta.furnizorDate,
      nrFurnizor: this.scoalaCurenta.nrFurnizor,
      total: this.scoalaCurenta.total,
      romi: this.scoalaCurenta.romi,
      dizabilitati: this.scoalaCurenta.dizabilitati,
      parinti: this.scoalaCurenta.parinti,
      burse: this.scoalaCurenta.burse,
      repetenti: this.scoalaCurenta.repetenti,
      online: this.scoalaCurenta.online,
      remediala: this.scoalaCurenta.remediala,
      semnatura: this.scoalaCurenta.semnatura,
      email: this.scoalaCurenta.email,
      parola: this.scoalaCurenta.parola,
      unitateId: this.scoalaCurenta.unitateId,
      unitateNume: this.scoalaCurenta.unitateNume,
      burseC: this.editScoalaForm.value.burse,
      directorC: this.editScoalaForm.value.director,
      dizabilitatiC: this.editScoalaForm.value.dizabilitati,
      furnizorDateC: this.editScoalaForm.value.furnizorDate,
      nrFurnizorC: this.editScoalaForm.value.nrFurnizor,
      onlineC: this.editScoalaForm.value.online,
      parintiC: this.editScoalaForm.value.parinti,
      remedialaC: this.editScoalaForm.value.remediala,
      repetentiC: this.editScoalaForm.value.repetenti,
      romiC: this.editScoalaForm.value.romi,
      romiE: this.editScoalaForm.value.romiE,
      siruesC: this.editScoalaForm.value.sirues,
      totalC: this.editScoalaForm.value.total
    });

    this.api.editScoala(editedScoala)
      .subscribe(() => {
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }



}

