import { Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Scoala } from 'app/models/scoala.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-explicatie-modal',
  templateUrl: './explicatie-modal.component.html',
  styleUrls: ['./explicatie-modal.component.css']
})
export class ExplicatieModalComponent {


  @ViewChild('explicatieModal') modal: ModalDirective;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  

  editExplicatieForm: FormGroup;
  scoalaCurenta = new Scoala();
  popup = true;


  constructor(public fb: FormBuilder, private api: ApiService, private _ngZone: NgZone) { }

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
    this.editExplicatieForm = this.fb.group({
      explicatie: [scoalaCurenta.explicatieC, [Validators.required, Validators.maxLength(10000)]]
    });
  }

  editExplicatie() {
    if (this.editExplicatieForm.pristine) {
      this.modal.hide();
      return;
    }
    const editedScoala = new Scoala(this.scoalaCurenta);
    editedScoala.explicatieC = this.editExplicatieForm.value.explicatie;

    this.api.editScoala(editedScoala)
      .subscribe(() => {
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }


  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}

