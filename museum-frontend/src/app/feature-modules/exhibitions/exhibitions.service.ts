import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exhibition, ExhibitionProposal } from './model/exhibition.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {

  constructor(private http: HttpClient,private router: Router) { }

  getExhibitions(): Observable<Exhibition> {
    return this.http.get<Exhibition>(environment.apiHost + 'exhibitions');
  }

  getExhibitionById(id: number): Observable<Exhibition> {
    return this.http.get<Exhibition>(environment.apiHost + `exhibitions/${id}`);
  }

  proposeExhibition(proposalData: ExhibitionProposal): Observable<Exhibition> {
    console.log(proposalData);
    const url = environment.apiHost + `exhibitions/propose`;
    return this.http.post<Exhibition>(url, proposalData);
  }

  seeOrganizerGeneratedReport() : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfExhibitions/generate-organizer-report', { responseType: 'blob' });
  }

  seeCuratorGeneratedReport() : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfExhibitions/generate-curator-report', { responseType: 'blob' });
  }
}
