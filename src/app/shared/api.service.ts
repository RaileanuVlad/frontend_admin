import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scoala } from '../models/scoala.model';
import { Unitate } from '../models/unitate.model';
import { Clasa } from '../models/clasa.model';
import { Intrebare } from '../models/intrebare.model';
import { Monitor } from '../models/monitor.model';
import { MonitorIntrebare } from '../models/monitorIntrebare.model';
import { ScoalaIntrebare } from '../models/scoalaIntrebare.model';
import { UnitateIntrebare } from '../models/unitateIntrebare.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  baseUrl = 'https://segregaretest.azurewebsites.net/api';

  addScoala(scoala: Scoala) {
    return this.http.post(this.baseUrl + '/scoala', {
      'judet': scoala.judet,
      'mediu': scoala.mediu,
      'nume': scoala.nume,
      'sirues': scoala.sirues,
      'director': scoala.director,
      'furnizorDate': scoala.furnizorDate,
      'nrFurnizor': scoala.nrFurnizor,
      'semnatura': scoala.semnatura,
      'email': scoala.email,
      'parola': scoala.parola,
      'unitateId': JSON.parse('[' + scoala.unitateId + ']')
    }, { headers: this.header });


  }

  addUnitate(unitate: Unitate) {
    return this.http.post(this.baseUrl + '/unitate', unitate, { headers: this.header });

  }

  addClasa(clasa: Clasa) {
    return this.http.post(this.baseUrl + '/clasa', clasa, { headers: this.header });
  }

  addMonitor(monitor: Monitor) {
    return this.http.post(this.baseUrl + '/monitor', monitor, { headers: this.header });
  }

  addIntrebare(intrebare: Intrebare) {
    return this.http.post(this.baseUrl + '/intrebare', intrebare, { headers: this.header });
  }

  addScoalaIntrebare(scoalaIntrebare: ScoalaIntrebare) {
    return this.http.post(this.baseUrl + '/scoalaintrebare', scoalaIntrebare, { headers: this.header });
  }

  addMonitorIntrebare(monitorIntrebare: MonitorIntrebare) {
    return this.http.post(this.baseUrl + '/monitorintrebare', monitorIntrebare, { headers: this.header });
  }

  addUnitateIntrebare(unitateIntrebare: UnitateIntrebare) {
    return this.http.post(this.baseUrl + '/unitateintrebare', unitateIntrebare, { headers: this.header });
  }






  getScoala(id: number) {
    return this.http.get(this.baseUrl + '/scoala/' + id.toString(), { headers: this.header });
  }

  getUnitate(id: number) {
    return this.http.get(this.baseUrl + '/unitate/' + id.toString(), { headers: this.header });
  }

  getClasa(id: number) {
    return this.http.get(this.baseUrl + '/clasa/' + id.toString(), { headers: this.header });
  }

  getMonitor(id: number) {
    return this.http.get(this.baseUrl + '/monitor/' + id.toString(), { headers: this.header });
  }

  getIntrebare(id: number) {
    return this.http.get(this.baseUrl + '/intrebare/' + id.toString(), { headers: this.header });
  }

  getScoalaIntrebare(id: number) {
    return this.http.get(this.baseUrl + '/scoalaintrebare/' + id.toString(), { headers: this.header });
  }

  getMonitorIntrebare(id: number) {
    return this.http.get(this.baseUrl + '/monitorintrebare/' + id.toString(), { headers: this.header });
  }

  getUnitateIntrebare(id: number) {
    return this.http.get(this.baseUrl + '/unitateintrebare/' + id.toString(), { headers: this.header });
  }

  getIntrebariTip(tip: string) {
    return this.http.get(this.baseUrl + '/intrebare/tip/' + tip, { headers: this.header });
  }

  getScoalaIntrebariSI(idS: number, idI: number) {
    return this.http.get(this.baseUrl + '/scoalaintrebare/' + idS + '/' + idI, { headers: this.header });
  }

  getScoalaIntrebariS(idS: number) {
    return this.http.get(this.baseUrl + '/scoalaintrebare/byIdS?IdS=' + idS, { headers: this.header });
  }

  getUnitateIntrebariUI(idU: number, idI: number) {
    return this.http.get(this.baseUrl + '/unitateintrebare/' + idU + '/' + idI, { headers: this.header });
  }

  getUnitateIntrebariU(idU: number) {
    return this.http.get(this.baseUrl + '/unitateintrebare/byIdU?IdU=' + idU, { headers: this.header })
  }

  getMonitorIntrebariMIUI(idU: number, idI: number) {
    return this.http.get(this.baseUrl + '/monitorintrebare/' + idU + '/' + idI, { headers: this.header });
  }

  getMonitorIntrebariMIU(idU: number) {
    return this.http.get(this.baseUrl + '/monitorintrebare/byIdU?IdU=' + idU, { headers: this.header })
  }





  getScoli() {
    return this.http.get(this.baseUrl + '/scoala', { headers: this.header });
  }

  getProgres() {
    return this.http.get(this.baseUrl + '/scoala/progres', { headers: this.header });
  }

  getUnitati() {
    return this.http.get(this.baseUrl + '/unitate', { headers: this.header });
  }

  getMaff() {
    return this.http.get(this.baseUrl + '/unitate/maff', { headers: this.header });
  }

  getScoring() {
    return this.http.get(this.baseUrl + '/unitate/scoring', { headers: this.header });
  }

  getOrganizare() {
    return this.http.get(this.baseUrl + '/scoala/organizare', { headers: this.header });
  }

  getChestionar() {
    return this.http.get(this.baseUrl + '/unitate/chestionar', { headers: this.header });
  }


  getClase() {
    return this.http.get(this.baseUrl + '/clasa', { headers: this.header });
  }

  getMonitori() {
    return this.http.get(this.baseUrl + '/monitor', { headers: this.header });
  }

  getIntrebari() {
    return this.http.get(this.baseUrl + '/intrebare', { headers: this.header });
  }

  getScoalaIntrebari() {
    return this.http.get(this.baseUrl + '/scoalaintrebare', { headers: this.header });
  }

  getMonitorIntrebari() {
    return this.http.get(this.baseUrl + '/monitorintrebare', { headers: this.header });
  }

  getUnitateIntrebari() {
    return this.http.get(this.baseUrl + '/unitateintrebare', { headers: this.header });
  }

  getScoalaIntrebareS(id: number){
    return this.http.get(this.baseUrl + '/scoalaintrebare/byIdS?IdS=' + id, { headers: this.header });
  }




  deleteScoala(id: number) {
    return this.http.delete(this.baseUrl + '/scoala/' + id.toString(), { headers: this.header });
  }

  deleteUnitate(id: number) {
    return this.http.delete(this.baseUrl + '/unitate/' + id.toString(), { headers: this.header });
  }

  deleteClasa(id: number) {
    return this.http.delete(this.baseUrl + '/clasa/' + id.toString(), { headers: this.header });
  }

  deleteMonitor(id: number) {
    return this.http.delete(this.baseUrl + '/monitor/' + id.toString(), { headers: this.header });
  }

  deleteIntrebare(id: number) {
    return this.http.delete(this.baseUrl + '/intrebare/' + id.toString(), { headers: this.header });
  }

  deleteScoalaIntrebare(id: number) {
    return this.http.delete(this.baseUrl + '/scoalaintrebare/' + id.toString(), { headers: this.header });
  }

  deleteMonitorIntrebare(id: number) {
    return this.http.delete(this.baseUrl + '/monitorintrebare/' + id.toString(), { headers: this.header });
  }

  deleteUnitateIntrebare(id: number) {
    return this.http.delete(this.baseUrl + '/unitateintrebare/' + id.toString(), { headers: this.header });
  }





  editScoala(scoala: Scoala) {

    return this.http.put(this.baseUrl + '/scoala/' + scoala.id.toString(), scoala, { headers: this.header });
  }

  editUnitate(unitate: Unitate) {
    return this.http.put(this.baseUrl + '/unitate/' + unitate.id.toString(), unitate, { headers: this.header });
  }

  editClasa(clasa: Clasa) {
    return this.http.put(this.baseUrl + '/clasa/' + clasa.id.toString(), clasa, { headers: this.header });
  }

  editMonitor(monitor: Monitor) {
    return this.http.put(this.baseUrl + '/monitor/' + monitor.id.toString(), monitor, { headers: this.header });
  }

  editIntrebare(intrebare: Intrebare) {
    return this.http.put(this.baseUrl + '/intrebare/' + intrebare.id.toString(), intrebare, { headers: this.header });
  }

  editScoalaIntrebare(scoalaIntrebare: ScoalaIntrebare) {
    return this.http.put(this.baseUrl + '/scoalaintrebare/' + scoalaIntrebare.id.toString(), scoalaIntrebare, { headers: this.header });
  }

  editMonitorIntrebare(monitorIntrebare: MonitorIntrebare) {
    return this.http.put(this.baseUrl + '/monitorintrebare/' + monitorIntrebare.id.toString(), monitorIntrebare, { headers: this.header });
  }

  editUnitateIntrebare(unitateIntrebare: UnitateIntrebare) {
    return this.http.put(this.baseUrl + '/unitateintrebare/' + unitateIntrebare.id.toString(), unitateIntrebare, { headers: this.header });
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.baseUrl + '/upload', formData, { reportProgress: true, observe: 'events' });
  }


}

