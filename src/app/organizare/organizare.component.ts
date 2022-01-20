import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scoala } from 'app/models/scoala.model';
import { ApiService } from 'app/shared/api.service';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { Monitor } from 'app/models/monitor.model';
import { AuthService } from 'app/shared/auth.service';
import { Router } from '@angular/router';
import { Progres } from 'app/models/progres.model';
import { Organizare } from 'app/models/organizare.model';

@Component({
  selector: 'app-organizare',
  templateUrl: './organizare.component.html',
  styleUrls: ['./organizare.component.css']
})
export class OrganizareComponent implements OnInit {



  checkboxsB5 = ["Către Inspectoratul Școlar",
    "Către Consiliul de Părinți",
    "Către minister, prin încărcare în SIIIR",
    "Către ONG-uri interesate"]

  checkboxsB6 = ["Informarea cadrelor didactice și a părinților privind demararea monitorizării segregării școlare",
    "Pregătirea instrumentelor de colectare a datelor (chestionar, fișă de date etc.)",
    "Colectarea datelor printr-un sistem care asigură protecția datelor cu caracter personal",
    "Încărcarea datelor în SIIIR",
    "Analiza datelor și comunicarea rezultatelor către părinți.",
    "Informarea autorităților locale asupra situației"]

  checkboxsB7 = ["Consultarea părinților pentru a evalua gradul de nemulțumire al acestora",
    "Solicitarea de consiliere metodologică către Inspectoratul Școlar",
    "Elaborarea și adoptare unui plan de desegregare școlară",
    "Mutarea elevilor din clase/ultimele bănci/clădiri pentru a nu mai exista segregare școlară"]



  @ViewChild('organizareToExport') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) tablerefresh: MatTable<any>;
  masterData: Organizare[];
  displayedColumns: string[];
  dataSource: any;
  loggedMonitor: Monitor;
  judetDisplayed: string;
  secondJudet: string = "ceva";
  substr: string = '202109';
  initNo: number = 1;

  l3c: string = "";
  b5c: string = "";
  b6c: string = "";
  b7c: string = "";

  l3: boolean[];
  b5: boolean[];
  b6: boolean[];
  b7: boolean[];

  constructor(private api: ApiService, private authService: AuthService, private router: Router,) { }




  ngOnInit(): void {

    this.getMasterData();
    this.displayedColumns = ['crt', 'nume', 'raspuns71', 'upload71', 'raspuns72', 'raspuns73',
      'raspuns5', 'raspuns6', 'raspuns7', 'raspuns8', 'raspuns9', 'raspuns10', 'raspuns11',
      'raspuns13', 'raspuns14', 'raspuns15', 'raspuns16', 'raspuns17', 'raspuns18', 'raspuns19',
      'raspuns20', 'raspuns21', 'raspuns22', 'raspuns23', 'raspuns24', 'raspuns28', 'raspuns29', 'raspuns30', 'upload30',
      'raspuns31', 'raspuns32', 'raspuns33', 'raspuns34',
      'nrInreg',];

  }


  /*applyJudet(jud: string){
    this.judetDisplayed = jud;
    this.getMasterData();
    console.log(this.masterData);
    console.log(jud);
    
  }*/



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getMasterData() {
    await this.api.getMonitor(this.authService.currentUserValue.id).toPromise().then((mon: Monitor) => {
      this.loggedMonitor = mon;
    })

    if (this.loggedMonitor.judet != "Toate") this.judetDisplayed = this.loggedMonitor.judet;
    if (this.loggedMonitor.email == "monitor_marazliu@cado.org.ro") this.secondJudet = "Cluj";
    if (this.loggedMonitor.email == "monitor_olaru@cado.org.ro") this.secondJudet = "Ialomita";
    if (this.loggedMonitor.email == "monitor_cojocaru@cado.org.ro") this.secondJudet = "Prahova";
    if (this.loggedMonitor.email == "monitor_iancu@cado.org.ro") this.secondJudet = "Maramures";


    await this.api.getOrganizare().toPromise().then((orgs: Organizare[]) => {
      orgs.forEach((org, idx) => {
        org.nr = this.initNo;
        this.initNo++;


      })
      this.masterData = orgs;

      this.masterData.forEach((org, idx) => {

        this.l3c = "";
        this.b5c = "";
        this.b6c = "";
        this.b7c = "";

        if (org.raspuns73 != null) {

          this.masterData[idx].raspuns73 = org.raspuns73.replace(/true/g, "DA").replace(/false/g, "NU");

        }

        if (org.raspuns17 != null) {

          this.b5 = JSON.parse('[' + org.raspuns17 + ']');
          this.b5.forEach((val, idx) => {
            if (val) {
              if (this.b5c != "") this.b5c += " + ";
              this.b5c += this.checkboxsB5[idx];
            }
          })
          this.masterData[idx].raspuns17 = this.b5c;

        }

        if (org.raspuns18 != null) {

          this.b6 = JSON.parse('[' + org.raspuns18 + ']');
          this.b6.forEach((val, idx) => {
            if (val) {
              if (this.b6c != "") this.b6c += " + ";
              this.b6c += this.checkboxsB6[idx];
            }
          })
          this.masterData[idx].raspuns18 = this.b6c;

        }

        if (org.raspuns19 != null) {

          this.b7 = JSON.parse('[' + org.raspuns19 + ']');
          this.b7.forEach((val, idx) => {
            if (val) {
              if (this.b7c != "") this.b7c += " + ";
              this.b7c += this.checkboxsB7[idx];
            }
          })
          this.masterData[idx].raspuns19 = this.b7c;

        }

      })
    })

    if (this.loggedMonitor.judet != "Toate") this.masterData = this.masterData.filter(res => res.judet == this.judetDisplayed || res.judet == "None" || res.judet == this.secondJudet)

    this.dataSource = new MatTableDataSource<Organizare>(this.masterData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.start = 'desc';
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Scoli per pagina:';
    this.dataSource.paginator._intl.firstPageLabel = 'Prima pagina';
    this.dataSource.paginator._intl.previousPageLabel = 'Pagina precedenta';
    this.dataSource.paginator._intl.nextPageLabel = 'Pagina urmatoare';
    this.dataSource.paginator._intl.lastPageLabel = 'Ultima pagina';

    this.tablerefresh.renderRows();
  }





  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    console.log(ws);
    console.log(wb);
    delete (ws['14']);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    XLSX.writeFile(wb, 'Pas4Școli.xlsx');
  }


}
