import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from './shared/search.pipe';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { PreviewComponent } from './preview/preview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PdfModalComponent } from './preview/pdf-modal/pdf-modal.component';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MathComponent } from './math/math.component';
import { ProgresModalComponent } from './preview/progres-modal/progres-modal.component';
import { AddModalComponent } from './unitati/add-modal/add-modal.component';
import { ClaseModalComponent } from './unitati/clase-modal/clase-modal.component';
import { DeleteModalComponent } from './unitati/delete-modal/delete-modal.component';
import { ExplicatieModalComponent } from './unitati/explicatie-modal/explicatie-modal.component';
import { ExtraUnitateModalComponent } from './unitati/extra-unitate-modal/extra-unitate-modal.component';
import { InfoModalComponent } from './unitati/info-modal/info-modal.component';
import { InfoUnitateModalComponent } from './unitati/info-unitate-modal/info-unitate-modal.component';
import { StructuraModalComponent } from './unitati/structura-modal/structura-modal.component';
import { UnitatiComponent } from './unitati/unitati.component';
import { ScoringComponent } from './scoring/scoring.component';
import { Pdf2ModalComponent } from './preview/pdf2-modal/pdf2-modal.component';
import { MonitorModalComponent } from './unitati/monitor-modal/monitor-modal.component';
import { OrganizareComponent } from './organizare/organizare.component';
import { ChestionarComponent } from './chestionar/chestionar.component';
import { OrganizareModalComponent } from './unitati/organizare-modal/organizare-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchPipe,
    PdfModalComponent,
    PreviewComponent,
    MathComponent,
    ProgresModalComponent,
    UnitatiComponent,
    InfoModalComponent,
    InfoUnitateModalComponent,
    ClaseModalComponent,
    ExtraUnitateModalComponent,
    AddModalComponent,
    DeleteModalComponent,
    StructuraModalComponent,
    ExplicatieModalComponent,
    ScoringComponent,
    Pdf2ModalComponent,
    MonitorModalComponent,
    OrganizareComponent,
    ChestionarComponent,
    OrganizareModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
