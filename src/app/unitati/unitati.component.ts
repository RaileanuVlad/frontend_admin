import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Scoala } from '../models/scoala.model';
import { AuthService } from '../shared/auth.service';
import { FormControl } from '@angular/forms';
import { Unitate } from '../models/unitate.model';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { InfoUnitateModalComponent } from './info-unitate-modal/info-unitate-modal.component';
import { ExtraUnitateModalComponent } from './extra-unitate-modal/extra-unitate-modal.component';
import { ClaseModalComponent } from './clase-modal/clase-modal.component';
import { HttpEventType } from '@angular/common/http';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { StructuraModalComponent } from './structura-modal/structura-modal.component';
import { Monitor } from 'app/models/monitor.model';
import { ExplicatieModalComponent } from './explicatie-modal/explicatie-modal.component';
import { MonitorModalComponent } from './monitor-modal/monitor-modal.component';
import { ScoalaIntrebare } from 'app/models/scoalaIntrebare.model';
import { OrganizareModalComponent } from './organizare-modal/organizare-modal.component';


@Component({
  selector: 'app-unitati',
  templateUrl: './unitati.component.html',
  styleUrls: ['./unitati.component.css']
})
export class UnitatiComponent implements OnInit {

  complet: boolean = false;
  progress: number;
  scoalaCurenta = new Scoala();
  unitatiId: number[];
  unitatiModerator: string[];
  cladiriId = []; //STERGE
  scoalaId = 0;
  tabs = []; //STERGE

  c2finished: boolean = true;

  selected = new FormControl(0); //STERGE
  name: string;
  dummyUnit: Unitate;

  test = new Unitate();

  pas1: boolean = false;
  pas2: boolean = false;
  pas3: boolean = false;
  pas4: boolean = false;
  fileToUpload: File = null;
  url: any;
  string0: string = "0";
  string1: string = "1";
  string2: string = "2";

  @ViewChild('infoModal') infoModal: InfoModalComponent;
  @ViewChild('addModal') addModal: AddModalComponent;
  @ViewChild('structuraModal') structuraModal: StructuraModalComponent;
  @ViewChild('infoUnitateModal') infoUnitateModal: InfoUnitateModalComponent;
  @ViewChild('extraUnitateModal') extraUnitateModal: ExtraUnitateModalComponent;
  @ViewChild('claseModal') claseModal: ClaseModalComponent;
  @ViewChild('monitorModal') monitorModal: MonitorModalComponent;
  @ViewChild('deleteModal') deleteModal: DeleteModalComponent;
  @ViewChild('organizareModal') organizareModal: OrganizareModalComponent;
  @ViewChild('explicatieModal') explicatieModal: ExplicatieModalComponent;


  constructor(private api: ApiService, private authService: AuthService) { }

  uploadFile = (files) => {

    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url = new Object({
            fileUrl: null
          });
          this.url = event.body;
          this.scoalaCurenta.semnatura = this.url.fileUrl;
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          this.api.getMonitor(2).subscribe((counter : Monitor)=>{
            this.scoalaCurenta.nrInreg = yyyy+mm+dd+counter.parola;
            this.scoalaCurenta.nrInregC = yyyy+mm+dd+counter.parola;
            counter.parola = (Number(counter.parola)+1).toString();
            this.api.editMonitor(counter).subscribe(()=>{});
            this.api.editScoala(this.scoalaCurenta).subscribe(() => { });
          })
          
          
        }
      })
  }

  ngOnInit(): void {

    this.scoalaId = Number(localStorage.getItem('modId'));

    this.getScoala(this.scoalaId);

  }


  resetProgress(): void {
    this.progress = 0;
  }

  getScoala(id: number) {
    this.api.getScoala(id)
      .subscribe((school: Scoala) => {
        this.scoalaCurenta = school;
        this.scoalaCurenta.id = id;
        this.unitatiId = school.unitateId;
        this.unitatiModerator = school.unitateModerator;
        if (school.uProcent == 100 && school.cProcent == 100) this.complet = true;
        else this.complet = false;
        if (this.scoalaCurenta.nrInreg != null) this.pas3 = true;
        this.api.getScoalaIntrebareS(this.scoalaCurenta.id).subscribe((sis: ScoalaIntrebare[])=>{
          if(sis.length <  29) this.c2finished = false;
          if(sis.length == 29)
          {
            sis.forEach((si: ScoalaIntrebare)=>{
              if(si.raspunsC == null || si.raspunsC == "") this.c2finished = false;
            })
          }
          else this.c2finished = false;
        })
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  refresh() {
    this.getScoala(this.scoalaId);
  }


  showModal(): void {
    this.infoModal.show(this.scoalaId);
  }

  showModalExtra(id: number): void {
    this.extraUnitateModal.show(id);
  }
  
  
  showModalStructura(id: number): void {
    this.structuraModal.show(id);
  }

  showModalUnitate(id: number): void {
    this.infoUnitateModal.show(id);
  }

  showModalClase(id: number): void {
    this.claseModal.show(id);
  }

  showModalMonitor(id: number): void {
    this.monitorModal.show(id);
  }

  showModalAdd(): void {
    this.addModal.show(this.scoalaId);
  }

  showModalDelete(id: number, getNume: string): void {
    this.deleteModal.show(id, getNume);
  }

  showModalOrganizare(): void {
    this.organizareModal.show(this.scoalaId);
  }

  showModalExplicatie(): void {
    this.explicatieModal.show(this.scoalaId);
  }


  async omiteStructura(idUnit: number){
    await this.api.getUnitate(idUnit).toPromise().then((tempUnit : Unitate)=>{
      tempUnit.id = idUnit;
      tempUnit.moderator = "1";
      this.api.editUnitate(tempUnit).subscribe(()=>{
        this.refresh();
      });
      
    })
    
    
    
  }

  async restoreStructura(idUnit: number){
    await this.api.getUnitate(idUnit).toPromise().then((tempUnit : Unitate)=>{
      tempUnit.id = idUnit;
      tempUnit.moderator = "0";
      this.api.editUnitate(tempUnit).subscribe(()=>{
        this.refresh();
      });
      
    })
    
    
    
  }


  cpas1(): void {
    this.pas1 = !this.pas1;
  }

  cpas2(): void {
    this.pas2 = !this.pas2;
  }

  cpas3(): void {
    this.pas3 = !this.pas3;
  }

  cpas4(): void {
    this.pas4 = !this.pas4;
  }

  changeE() {
    this.getScoala(this.scoalaId);
  }
}
