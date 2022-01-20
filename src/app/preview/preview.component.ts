import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scoala } from 'app/models/scoala.model';
import { ApiService } from 'app/shared/api.service';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PdfModalComponent } from './pdf-modal/pdf-modal.component';
import * as XLSX from 'xlsx';
import { ProgresModalComponent } from './progres-modal/progres-modal.component';
import { Monitor } from 'app/models/monitor.model';
import { AuthService } from 'app/shared/auth.service';
import { Router } from '@angular/router';
import { Pdf2ModalComponent } from './pdf2-modal/pdf2-modal.component';
import { Progres } from 'app/models/progres.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @ViewChild('tableToExport') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('pdfModal') pdfModal: PdfModalComponent;
  @ViewChild('pdf2Modal') pdf2Modal: Pdf2ModalComponent;
  @ViewChild('progresModal') progresModal: ProgresModalComponent;
  @ViewChild(MatTable) tablerefresh: MatTable<any>;
  masterData: Scoala[];
  displayedColumns: string[];
  dataSource: any;
  loggedMonitor: Monitor;
  judetDisplayed: string;
  secondJudet: string = "ceva";
  substr: string = '202109';
  progres: Progres;
  pTotal: number;
  tTotal: number;
  initNo: number = 1;

  constructor(private api: ApiService, private authService: AuthService, private router: Router,) { }




  ngOnInit(): void {

    this.getMasterData();
    this.displayedColumns = ['crt', 'nume', 'email', 'judet', 'localitate', 'mediu', 'sirues', 'director', 'strada', 'nrStrada', 'uProcent', 'cProcent', 'semnatura', 'nrIntr', 'dataIntr', 'nrInreg', 'star', 'star2', 'moderator'];
    this.api.getProgres().subscribe((pogres: Progres)=>{
      this.progres = pogres;
      this.pTotal = pogres.pBotosani + pogres.pBrasov + pogres.pBucuresti + pogres.pCluj + pogres.pConstanta + pogres.pIalomita + pogres.pIasi + pogres.pMaramures + pogres.pMures + pogres.pPrahova + pogres.pSuceava;
      this.tTotal = pogres.tBotosani + pogres.tBrasov + pogres.tBucuresti + pogres.tCluj + pogres.tConstanta + pogres.tIalomita + pogres.tIasi + pogres.tMaramures + pogres.tMures + pogres.tPrahova + pogres.tSuceava;
    });

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
    await this.api.getMonitor(this.authService.currentUserValue.id).toPromise().then((mon: Monitor)=>{
      this.loggedMonitor = mon;
    })

    if(this.loggedMonitor.judet != "Toate") this.judetDisplayed = this.loggedMonitor.judet;
    if (this.loggedMonitor.email == "monitor_marazliu@cado.org.ro") this.secondJudet = "Cluj";
    if (this.loggedMonitor.email == "monitor_olaru@cado.org.ro") this.secondJudet = "Ialomita";
    if (this.loggedMonitor.email == "monitor_cojocaru@cado.org.ro") this.secondJudet = "Prahova";
    if (this.loggedMonitor.email == "monitor_iancu@cado.org.ro") this.secondJudet = "Maramures";


    await this.api.getScoli().toPromise().then((scoli: Scoala[]) => {
      scoli.forEach((scoala, idx)=>{
        scoala.nr = this.initNo;
        this.initNo ++ ;
        if(scoala.nrInregC!=null) 
        {
          scoala.uProcent = scoala.uProcentC;
          scoala.cProcent = scoala.cProcentC;
        }

      })
      this.masterData = scoli;
      
    })

    if(this.loggedMonitor.judet != "Toate") this.masterData = this.masterData.filter(res => res.judet == this.judetDisplayed || res.judet == "None" || res.judet == this.secondJudet)

    this.dataSource = new MatTableDataSource<Scoala>(this.masterData);
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


  showModalPdf(id: number): void {
    this.pdfModal.show(id);
  }

  showModalPdf2(id: number): void {
    this.pdf2Modal.show(id);
  }

  showModalProgres(): void {
    this.progresModal.show();
  }

  goToModerator(id: number): void {
    localStorage.setItem('modId', id.toString());
    this.router.navigate(['/moderator']);
  }

  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
   console.log(ws);
   console.log(wb);
    delete(ws['14']);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    XLSX.writeFile(wb, 'ȘcoliAdmin.xlsx');
  }


}
