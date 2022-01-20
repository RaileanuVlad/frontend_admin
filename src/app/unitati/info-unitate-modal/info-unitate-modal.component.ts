import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Unitate } from 'app/models/unitate.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Clasa } from 'app/models/clasa.model';
import { NotZeroValidator } from './not-zero-validator';

@Component({
  selector: 'app-info-unitate-modal',
  templateUrl: './info-unitate-modal.component.html',
  styleUrls: ['./info-unitate-modal.component.css']
})
export class InfoUnitateModalComponent {

  @ViewChild('infoUnitateModal') modal: ModalDirective;
  editUnitateForm: FormGroup;
  unitateCurenta = new Unitate();
  numere: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  cate: number[] = [];

  chillIU = false;
  popup2 = true;


  constructor(public fb: FormBuilder, private api: ApiService, private notZeroValidator: NotZeroValidator) { }

  show(id: number): void {
    this.popup2 = true;
    this.chillIU = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.getUnitate(id);
    this.modal.show();
  }

  getUnitate(id: number) {
    this.api.getUnitate(id)
      .subscribe((unit: Unitate) => {
        this.unitateCurenta = unit;
        this.unitateCurenta.id = id;
        this.initializeFrom(this.unitateCurenta);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(unitateCurenta: Unitate) {
    this.editUnitateForm = this.fb.group({
      nivel: [unitateCurenta.nivelC, Validators.required],
      litera0: [unitateCurenta.clasaCount2[0]],
      litera1: [unitateCurenta.clasaCount2[1]],
      litera2: [unitateCurenta.clasaCount2[2]],
      litera3: [unitateCurenta.clasaCount2[3]],
      litera4: [unitateCurenta.clasaCount2[4]],
      litera5: [unitateCurenta.clasaCount2[5]],
      litera6: [unitateCurenta.clasaCount2[6]],
      litera7: [unitateCurenta.clasaCount2[7]],
      litera8: [unitateCurenta.clasaCount2[8]],
      numarM: [unitateCurenta.clasaCount2[9]]
    },
      {
        validators: [this.notZeroValidator.notZeroValidator()],
      }
    );

  }

  editUnitate() {

    this.chillIU = true;

    const editedUnitate = new Unitate(this.unitateCurenta);
    editedUnitate.nivelC = this.editUnitateForm.value.nivel;
    this.api.editUnitate(editedUnitate)
      .subscribe(() => {
      },
        (error: Error) => {
          console.log('err', error);
        });


    switch (this.editUnitateForm.value.nivel) {
      case "Școală primară":
        this.editUnitateForm.value.litera5 = "0";
        this.editUnitateForm.value.litera6 = "0";
        this.editUnitateForm.value.litera7 = "0";
        this.editUnitateForm.value.litera8 = "0";
        break;
      case "Școală gimnazială":
        this.editUnitateForm.value.litera0 = "0";
        this.editUnitateForm.value.litera1 = "0";
        this.editUnitateForm.value.litera2 = "0";
        this.editUnitateForm.value.litera3 = "0";
        this.editUnitateForm.value.litera4 = "0";
        break;

    }

    this.cate = [Number(this.editUnitateForm.value.litera0), Number(this.editUnitateForm.value.litera1), Number(this.editUnitateForm.value.litera2), Number(this.editUnitateForm.value.litera3),
    Number(this.editUnitateForm.value.litera4), Number(this.editUnitateForm.value.litera5), Number(this.editUnitateForm.value.litera6), Number(this.editUnitateForm.value.litera7),
    Number(this.editUnitateForm.value.litera8)];

    const check = [this.editUnitateForm.value.litera0, this.editUnitateForm.value.litera1, this.editUnitateForm.value.litera2, this.editUnitateForm.value.litera3,
    this.editUnitateForm.value.litera4, this.editUnitateForm.value.litera5, this.editUnitateForm.value.litera6, this.editUnitateForm.value.litera7,
    this.editUnitateForm.value.litera8, this.editUnitateForm.value.numarM];



    if (check.join(",") != this.unitateCurenta.clasaCount2.join(",")) this.pune(editedUnitate.id, this.cate, Number(this.editUnitateForm.value.numarM));
    else this.modal.hide();


  }

  async pune(id: number, cateF: number[], nrM: number) {

    for (let id of this.unitateCurenta.clasaId2) {
      await this.api.deleteClasa(id).toPromise();
    }

    var cifra = 0;
    for (let val of cateF) {
      if (val == 0) cifra++;
      else {
        for (var l = 1; l <= val; l++) {
          const newClasa = new Clasa({
            cifra: cifra.toString(),
            cifraC: cifra.toString(),
            litera: null,
            literaC: null,
            mixt: false,
            mixtC: false,
            ani: null,
            aniC: null,
            unitateId: id,
            moderator: "2"
          })
          await this.api.addClasa(newClasa).toPromise();
        }
        cifra++;
      }

    }

    if (nrM > 0) {

      for (var k = 1; k <= nrM; k++) {
        const newClasa = new Clasa({
          cifra: "Mixt",
          cifraC: "Mixt",
          litera: null,
          literaC: null,
          mixt: true,
          mixtC: true,
          ani: "",
          aniC: "",
          unitateId: id,
          moderator: "2"
        })
        await this.api.addClasa(newClasa).toPromise();
      }
    }
    this.modal.hide();
  }



}
