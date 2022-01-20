import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scoala } from 'app/models/scoala.model';
import { ApiService } from 'app/shared/api.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { Maff } from 'app/models/maff.model';
import { Monitor } from 'app/models/monitor.model';
import { AuthService } from 'app/shared/auth.service';
import { Scoring } from 'app/models/scoring.model';
import { Pdf2ModalComponent } from 'app/preview/pdf2-modal/pdf2-modal.component';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  checkboxs5 = ["Da, prin discuția cu părinții",
    "Da, după numele de familie.",
    "Da, prin identificare de către persoane care lucrează pentru comunitate de romi (lider local, mediator școlar, mediator sanitar etc.)",
    "Da, prin constatarea unor semnalmente fizice.",
    "Da, dacă locuiesc în comunitatea de romi.",
    "Da, după limba maternă.",
    "Da, în funcție de participarea la orele de limba romani (dacă există).",
    "Da, în funcție de comportamentul manifestat.",
    "Da, prin declarație semnată de către părinți/tutori/reprezentanți legali a etniei.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  checkboxs6 = ["Da, prin discuția cu părinții",
    "Da, prin identificare de către persoane care lucrează pentru comunitate (lider local, mediator școlar, mediator sanitar etc.",
    "Da, prin constatarea modului de comunicare, de interacțiune.",
    "Da, în funcție de comportamentul manifestat de părinți.",
    "Da, pe baza ocupației pe care o au părinții.",
    "Da, prin declarație semnată de către părinți/tutori/reprezentanți legali privind educația obținută.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  checkboxs7 = ["Da, prin discuția cu părinții",
    "Da, prin identificare de către persoane care lucrează pentru comunitate (lider local, mediator școlar, mediator sanitar etc.)",
    "Da, prin constatarea unor semnalmente fizice.",
    "Da, în funcție de comportamentul manifestat.",
    "Da, pe baza dosarului DGASPC care constată situații medicale speciale sau CES în baza certificatului de orientare CJRAE.",
    "Da, prin declarație privind dizabilitatea semnată de către părinți/tutori/reprezentanți legali.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  @ViewChild('scoringToExport') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  scoringData: Scoring[];
  displayedColumns: string[];
  dataSource: any;

  Da: string = "Da";
  Nu: string = "Nu";
  loggedMonitor: Monitor;
  judetDisplayed: string;
  secondJudet: string = "ceva";
  initNo: number = 1;
  substr: string = '202109';

  @ViewChild('pdf2Modal') pdf2Modal: Pdf2ModalComponent;

  constructor(private api: ApiService, private authService: AuthService) { }




  ngOnInit(): void {
    this.getMathData();
    this.displayedColumns = ['idScoring', 'numeScoala', 'judetS', 'localitateS', 'scorA1', 'scorB1', 'scorC1', 'scorC6', 'numeU', 'statutU',
      'scorA2', 'scorA3', 'scorA4', 'scorA5',
      'scorB2', 'scorB3', 'scorB4', 'scorB5',
      'scorC2', 'scorC3', 'scorC4', 'scorC5',
      'scorC7', 'scorC8', 'scorC9', 'scorC10',
      'scorD1', 'scorD2', 'scorD3',
      'nrDep', 'star'];

  }


 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getMathData() {
    await this.api.getMonitor(this.authService.currentUserValue.id).toPromise().then((mon: Monitor) => {
      this.loggedMonitor = mon;
    })

    if (this.loggedMonitor.judet != "Toate") this.judetDisplayed = this.loggedMonitor.judet;
    if (this.loggedMonitor.email == "monitor_marazliu@cado.org.ro") this.secondJudet = "Cluj";
    if (this.loggedMonitor.email == "monitor_olaru@cado.org.ro") this.secondJudet = "Ialomita";
    if (this.loggedMonitor.email == "monitor_cojocaru@cado.org.ro") this.secondJudet = "Prahova";
    if (this.loggedMonitor.email == "monitor_iancu@cado.org.ro") this.secondJudet = "Maramures";

    await this.api.getScoring().toPromise().then((scoring: Scoring[]) => {

     

      this.scoringData = scoring;

      if (this.loggedMonitor.judet != "Toate") this.scoringData = this.scoringData.filter(res => res.judetS == this.judetDisplayed || res.judetS == "None" || res.judetS == this.secondJudet)


    })



    this.dataSource = new MatTableDataSource<Scoring>(this.scoringData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.start = 'desc';
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Scoli per pagina:';
    this.dataSource.paginator._intl.firstPageLabel = 'Prima pagina';
    this.dataSource.paginator._intl.previousPageLabel = 'Pagina precedenta';
    this.dataSource.paginator._intl.nextPageLabel = 'Pagina urmatoare';
    this.dataSource.paginator._intl.lastPageLabel = 'Ultima pagina';
  }

  showModalPdf(id: number): void {
    this.pdf2Modal.show(id);
  }

  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    console.log(ws);
    console.log(wb);
    delete (ws['14']);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    XLSX.writeFile(wb, 'ȘcoliScoring.xlsx');
  }

  nana(x: number){
    return isNaN(x);
  }

}
