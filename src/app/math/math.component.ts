import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scoala } from 'app/models/scoala.model';
import { ApiService } from 'app/shared/api.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { Maff } from 'app/models/maff.model';
import { PdfModalComponent } from 'app/preview/pdf-modal/pdf-modal.component';
import { Monitor } from 'app/models/monitor.model';
import { AuthService } from 'app/shared/auth.service';
import { Pdf2ModalComponent } from 'app/preview/pdf2-modal/pdf2-modal.component';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.css']
})
export class MathComponent implements OnInit {

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

  @ViewChild('mathToExport') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  mathData: Maff[];
  displayedColumns: string[];
  dataSource: any;
  i5: boolean[];
  i6: boolean[];
  i7: boolean[];
  i5c: string = "";
  i6c: string = "";
  i7c: string = "";
  Da: string = "Da";
  Nu : string = "Nu";
  loggedMonitor: Monitor;
  judetDisplayed: string;
  secondJudet: string = "ceva";
  substr: string = '202109';
  initNo: number = 1;

  @ViewChild('pdfModal') pdfModal: PdfModalComponent;
  @ViewChild('pdf2Modal') pdf2Modal: Pdf2ModalComponent;
  
  constructor(private api: ApiService, private authService: AuthService) { }




  ngOnInit(): void {
    this.getMathData();
    this.displayedColumns = ['idMaff', 'numeScoala', 'judetS', 'localitateS', 'numeU', 'statutU', 'alerta1', 'alerta2', 'alerta3', 'alerta4', 'alerta5', 'raspuns40', 'alerta7', 'alerta8', 'alerta9', 'alerta10', 'alerta11', 'nrDep', 'star'];

  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getMathData() {
    await this.api.getMonitor(this.authService.currentUserValue.id).toPromise().then((mon: Monitor)=>{
      this.loggedMonitor = mon;
    })

    if(this.loggedMonitor.judet != "Toate") this.judetDisplayed = this.loggedMonitor.judet;
    if (this.loggedMonitor.email == "monitor_marazliu@cado.org.ro") this.secondJudet = "Cluj";
    if (this.loggedMonitor.email == "monitor_olaru@cado.org.ro") this.secondJudet = "Ialomita";
    if (this.loggedMonitor.email == "monitor_cojocaru@cado.org.ro") this.secondJudet = "Prahova";
    if (this.loggedMonitor.email == "monitor_iancu@cado.org.ro") this.secondJudet = "Maramures";

    await this.api.getMaff().toPromise().then((maff: Maff[]) => {
      this.mathData = maff;

      if(this.loggedMonitor.judet != "Toate") this.mathData = this.mathData.filter(res => res.judetS == this.judetDisplayed || res.judetS == "None" || res.judetS == this.secondJudet)

      this.mathData.forEach((unitate, idx) => {

        

        this.i5c = "";
        this.i6c = "";
        this.i7c = "";

        if (unitate.raspuns41 != null) {

          this.i5 = JSON.parse('[' + unitate.raspuns41.substring(0, unitate.raspuns41.indexOf("||")) + ']');
          this.i5.forEach((val, idx) => {
            if (val) this.i5c += this.checkboxs5[idx] + " + ";
          })
          this.i5c += "Explicatie: " + unitate.raspuns41.substring(unitate.raspuns41.indexOf("||") + 2);
          this.mathData[idx].raspuns41 = this.i5c;
        }

        if (unitate.raspuns46 != null) {
          this.i6 = JSON.parse('[' + unitate.raspuns46.substring(0, unitate.raspuns46.indexOf("||")) + ']');
          this.i6.forEach((val, idx) => {
            if (val) this.i6c += this.checkboxs6[idx] + " + ";
          })
          this.i6c += "Explicatie: " + unitate.raspuns46.substring(unitate.raspuns46.indexOf("||") + 2);
          this.mathData[idx].raspuns46 = this.i6c;
        }
        if (unitate.raspuns47 != null) {
          this.i7 = JSON.parse('[' + unitate.raspuns47.substring(0, unitate.raspuns47.indexOf("||")) + ']');
          this.i7.forEach((val, idx) => {
            if (val) this.i7c += this.checkboxs7[idx] + " + ";
          })
          this.i7c += "Explicatie: " + unitate.raspuns47.substring(unitate.raspuns47.indexOf("||") + 2);
          this.mathData[idx].raspuns47 = this.i7c;
        }
        
        
       
      })
    })


    this.dataSource = new MatTableDataSource<Maff>(this.mathData);
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
    this.pdfModal.show(id);
  }

  showModalPdf2(id: number): void {
    this.pdf2Modal.show(id);
  }

  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    console.log(ws);
    console.log(wb);
    delete (ws['14']);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    XLSX.writeFile(wb, 'ȘcoliAlerte.xlsx');
  }


}



