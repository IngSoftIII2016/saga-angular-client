import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Periodo} from '../entities/periodo';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class PeriodoService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private periodoUrl = 'http://localhost/saga/api/periodos';
    constructor(private http: Http) {}

		getPeriodosMedium() {
			return this.http.get(this.periodoUrl)
						.toPromise()
						.then(res => <Periodo[]> res.json().data)
						.then(data => { return data; });
		}
	  
	  delete(id: number): Promise<void> {
		const url = `${this.periodoUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		  .toPromise()
		  .then(() => null)
		  .catch(this.handleError);
	  }
	  create(fecha_inicio: Date, fecha_fin:Date, descripcion:string): Observable<Periodo> {
		return this.http.post(this.periodoUrl, JSON.stringify({data: {fecha_inicio: fecha_inicio, fecha_fin:fecha_fin , descripcion: descripcion ,id:""}}), {headers: this.headers})
		            .map(this.extractData).catch(this.handleError);

	  }
	  private extractData(res: Response){
		   console.log(res);
		  let body = res.json();
		  return body.data||{};
		  
	  }
	  update(periodo: Periodo): Promise<Periodo> {
		const url = `${this.periodoUrl}`;
		return this.http
		  .put(url, JSON.stringify({data: {fecha_inicio:periodo.fecha_inicio , fecha_fin:periodo.fecha_fin , descripcion:periodo.descripcion, id :periodo.id}}), {headers: this.headers})
		  .toPromise()
		  .then(() => periodo)
		  .catch(this.handleError);
	  }
		private handleError (error: Response | any) { // In a real world app, we might use a remote logging infrastructure 
			 let errMsg: string;
			 if (error instanceof Response) { 
				 const body = error.json() || ''; 
				 const err = body.error || JSON.stringify(body);
				 errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
			 }
			else { errMsg = error.message ? error.message : error.toString(); } 
			console.error(errMsg); return Observable.throw(errMsg);
		} 
	 /*  
	  private handleError(error: any): Promise<any> {
		  console.error('An error occurred', error); 
		  return Promise.reject(error.message || error);
	}
	*/
}
