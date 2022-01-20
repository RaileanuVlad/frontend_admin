import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unitate } from 'app/models/unitate.model';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  @ViewChild('deleteModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  chillDel = false;
  addUnitateForm: FormGroup;
  getNumeCheck: string;
  idUnitate: number;
  confirm: string;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  show(id: number, getNume: string): void {
    this.confirm = "";
    this.getNumeCheck = getNume;
    this.idUnitate = id;
    this.chillDel = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.modal.show();
    
    
  }

  

  async deleteUnitate(){
    this.chillDel=true;
    await this.api.deleteUnitate(this.idUnitate).toPromise().then(()=>{
      this.change.emit();
    });
    this.modal.hide();
  }


}
