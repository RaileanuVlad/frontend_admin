import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Unitate } from 'app/models/unitate.model';
import { Clasa } from 'app/models/clasa.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SumValidator } from './sum-validator';


@Component({
  selector: 'app-clase-modal',
  templateUrl: './clase-modal.component.html',
  styleUrls: ['./clase-modal.component.css']
})
export class ClaseModalComponent {
  @ViewChild('claseModal') modal: ModalDirective;

  editClasaForm: FormGroup;
  unitateCurenta = new Unitate();
  clasaCurenta = new Clasa();
  iter = 0;
  litere = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
  cladiri = [];
  errMes:boolean = false;
  popup3 = true;
  string2:string = "2";


  constructor(public fb: FormBuilder, private api: ApiService, private sumValidator: SumValidator) { }

  show(id: number): void {
    this.popup3=true;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.cladiri = [];
    this.clasaCurenta = new Clasa();
    this.errMes = false;
    this.iter = 0;

    
    this.getUnitate(id);

    this.modal.show();



  }

  getUnitate(id: number) {
    this.api.getUnitate(id)
      .subscribe((unitate: Unitate) => {
        this.unitateCurenta = unitate;
        this.unitateCurenta.id = id;
        this.unitateCurenta.clasaId = this.unitateCurenta.clasaId.concat(this.unitateCurenta.clasaId1).concat(this.unitateCurenta.clasaId2);
        console.log(this.unitateCurenta.clasaId);
        if(this.unitateCurenta.clasaId.length>0){
        for (var i = 1; i <= this.unitateCurenta.nrCladiriC; i++) {
          this.cladiri.push(i);
        } 
        
          this.api.getClasa(this.unitateCurenta.clasaId[this.iter])
          .subscribe((clasa: Clasa) => {
            this.clasaCurenta = clasa;
            this.clasaCurenta.id = this.unitateCurenta.clasaId[this.iter];
            this.initializeFrom(this.clasaCurenta);
          },
            (error: Error) => {
              console.log('err', error);

            });
        }
        else{
          this.errMes = true;
        }
        
      })

  }

  getClasa(id: number) {
    this.api.getClasa(id)
      .subscribe((clasa: Clasa) => {
        this.clasaCurenta = clasa;
        this.clasaCurenta.id = id;
        this.initializeFrom(this.clasaCurenta);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(clasaCurenta: Clasa) {
    this.editClasaForm = this.fb.group({
      litera: [clasaCurenta.literaC, Validators.required],
      total: [Number(clasaCurenta.totalC), Validators.required],
      romi: [Number(clasaCurenta.romiC), Validators.required],
      romiE: [Number(clasaCurenta.romiE)],
      dizabilitati: [Number(clasaCurenta.dizabilitatiC), Validators.required],
      parinti: [Number(clasaCurenta.parintiC), Validators.required],
      burse: [Number(clasaCurenta.burseC), Validators.required],
      repetenti: [Number(clasaCurenta.repetentiC), Validators.required],
      online: [Number(clasaCurenta.onlineC), Validators.required],
      remediala: [Number(clasaCurenta.remedialaC), Validators.required],
      total2b: [Number(clasaCurenta.total2bC), Validators.required],
      romi2b: [Number(clasaCurenta.romi2bC), Validators.required],
      dizabilitati2b: [Number(clasaCurenta.dizabilitati2bC), Validators.required],
      parinti2b: [Number(clasaCurenta.parinti2bC), Validators.required],
      burse2b: [Number(clasaCurenta.burse2bC), Validators.required],
      repetenti2b: [Number(clasaCurenta.repetenti2bC), Validators.required],
      online2b: [Number(clasaCurenta.online2bC), Validators.required],
      remediala2b: [Number(clasaCurenta.remediala2bC), Validators.required],
      ani: [clasaCurenta.aniC],
      cladire: [clasaCurenta.cladireC, Validators.required],
      predare: [clasaCurenta.predareC, Validators.required],
      moderator: [clasaCurenta.moderator, Validators.required],
      dataC: ["da"]
    },
    {
      validators: [this.sumValidator.sumValidator()],
    }
    );
  }

  editClasa() {
    const editedClasa = new Clasa({
      id: this.clasaCurenta.id,
      cifra: this.clasaCurenta.cifra,
      cifraC: this.clasaCurenta.cifraC,
      literaC: this.editClasaForm.value.litera,
      totalC: this.editClasaForm.value.total,
      romiC: this.editClasaForm.value.romi,
      romiE: this.editClasaForm.value.romiE,
      dizabilitatiC: this.editClasaForm.value.dizabilitati,
      parintiC: this.editClasaForm.value.parinti,
      burseC: this.editClasaForm.value.burse,
      repetentiC: this.editClasaForm.value.repetenti,
      onlineC: this.editClasaForm.value.online,
      remedialaC: this.editClasaForm.value.remediala,
      total2bC: this.editClasaForm.value.total2b,
      romi2bC: this.editClasaForm.value.romi2b,
      dizabilitati2bC: this.editClasaForm.value.dizabilitati2b,
      parinti2bC: this.editClasaForm.value.parinti2b,
      burse2bC: this.editClasaForm.value.burse2b,
      repetenti2bC: this.editClasaForm.value.repetenti2b,
      online2bC: this.editClasaForm.value.online2b,
      remediala2bC: this.editClasaForm.value.remediala2b,
      mixt: this.clasaCurenta.mixt,
      mixtC: this.clasaCurenta.mixt,
      aniC: this.editClasaForm.value.ani,
      cladireC: this.editClasaForm.value.cladire,
      predareC: this.editClasaForm.value.predare,
      moderator: this.editClasaForm.value.moderator
    });


    this.api.editClasa(editedClasa)
        .subscribe(() => {

        },
          (error: Error) => {
            console.log('err', error);
          });

  }

  nextPage(fata: boolean){

 
    if (fata && this.unitateCurenta.clasaId.length - 1 > this.iter) {


      this.editClasa();
      this.iter = this.iter + 1;
      this.getClasa(this.unitateCurenta.clasaId[this.iter]);

    }
    else if (!fata && this.iter > 0) {

      this.editClasa();
      this.iter = this.iter - 1;
      this.getClasa(this.unitateCurenta.clasaId[this.iter]);

    }
    else if (fata && this.unitateCurenta.clasaId.length - 1 <= this.iter) {

      this.editClasa();
      this.modal.hide();

    }
    else if (!fata && this.iter <= 0){

      this.modal.hide();

    }

    

  }
  


}
