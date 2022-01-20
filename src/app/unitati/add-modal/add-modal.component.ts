import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unitate } from 'app/models/unitate.model';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent{
  @ViewChild('addModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  chillAdd = false;
  addUnitateForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  show(id: number): void {

    this.chillAdd = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.initializeFrom(id);
    this.modal.show();
    
    
  }

  initializeFrom(id: number) {
    this.addUnitateForm = this.fb.group({
      localitate: [null, Validators.required],
      nume: [null, Validators.required],
      statut: ["AR"],
      nivel: ["Școală primară"],
      strada: [null],
      nrStrada: [null],
      codPostal: [null],
      telefon: [null],
      fax: [null],
      nrCladiri: [0],
      scoalaId: [id],
    });
  }


  async addUnitate(){
    this.chillAdd=true;
    const editedUnitate = new Unitate();
    editedUnitate.localitate = this.addUnitateForm.value.localitate;
    editedUnitate.nume = this.addUnitateForm.value.nume;
    editedUnitate.statut = this.addUnitateForm.value.statut;
    editedUnitate.nivel = this.addUnitateForm.value.nivel;
    editedUnitate.strada = this.addUnitateForm.value.strada;
    editedUnitate.nrStrada = this.addUnitateForm.value.nrStrada;
    editedUnitate.codPostal = this.addUnitateForm.value.codPostal;
    editedUnitate.telefon = this.addUnitateForm.value.telefon;
    editedUnitate.fax = this.addUnitateForm.value.fax;
    editedUnitate.nrCladiri = this.addUnitateForm.value.nrCladiri;
    editedUnitate.scoalaId = this.addUnitateForm.value.scoalaId;
    editedUnitate.nivelC = "Școală primară";
    editedUnitate.moderator = "2";
    console.log(editedUnitate)
    await this.api.addUnitate(editedUnitate).toPromise().then(()=>{
      this.change.emit();
    });
    this.modal.hide();
  }



}
