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
import { Chestionar } from 'app/models/chestionar.model';

@Component({
  selector: 'app-chestionar',
  templateUrl: './chestionar.component.html',
  styleUrls: ['./chestionar.component.css']
})
export class ChestionarComponent implements OnInit {

  @ViewChild('chestionarToExport') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  chestionarData: Chestionar[];
  displayedColumns: string[];
  dataSource: any;

  Da: string = "Da";
  Nu: string = "Nu";
  loggedMonitor: Monitor;
  judetDisplayed: string;
  secondJudet: string = "ceva";
  substr: string = '202109';
  initNo: number = 1;

  @ViewChild('pdf2Modal') pdf2Modal: Pdf2ModalComponent;

  constructor(private api: ApiService, private authService: AuthService) { }




  ngOnInit(): void {
    this.getChestionarData();
    this.displayedColumns = ['idChestionar', 'numeScoala', 'numeU',
    'raspuns51a', 'raspuns51b', 'raspuns51c', 'raspuns51d', 'raspuns52a', 'raspuns52b', 'raspuns52c', 'raspuns52d', 'raspuns53a', 'raspuns53b', 
    'raspuns53c', 'raspuns53d', 'raspuns54', 'raspuns55', 'raspuns56', 'raspuns58', 'raspuns59', 'raspuns60a', 'raspuns60b', 'raspuns61', 
    'raspuns62', 'raspuns63', 'raspuns64', 'raspuns65', 'raspuns68a', 'raspuns68b', 'raspuns69', 'raspuns70',
      'pathChestionar', 'nrDep', 'star'];

  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getChestionarData() {
    await this.api.getMonitor(this.authService.currentUserValue.id).toPromise().then((mon: Monitor) => {
      this.loggedMonitor = mon;
    })

    if (this.loggedMonitor.judet != "Toate") this.judetDisplayed = this.loggedMonitor.judet;
    if (this.loggedMonitor.email == "monitor_marazliu@cado.org.ro") this.secondJudet = "Cluj";
    if (this.loggedMonitor.email == "monitor_olaru@cado.org.ro") this.secondJudet = "Ialomita";
    if (this.loggedMonitor.email == "monitor_cojocaru@cado.org.ro") this.secondJudet = "Prahova";
    if (this.loggedMonitor.email == "monitor_iancu@cado.org.ro") this.secondJudet = "Maramures";

    await this.api.getChestionar().toPromise().then((chests: Chestionar[]) => {

      

      this.chestionarData = chests;

      if (this.loggedMonitor.judet != "Toate") this.chestionarData = this.chestionarData.filter(res => res.judetS == this.judetDisplayed || res.judetS == "None" || res.judetS == this.secondJudet)


    })



    this.dataSource = new MatTableDataSource<Chestionar>(this.chestionarData);
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



    XLSX.writeFile(wb, 'ChestionareMonitori.xlsx');
  }

  nana(x: number){
    return isNaN(x);
  }
}
