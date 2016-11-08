import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Docente} from '../../app/_entities/Docente';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class DocenteService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private docenteUrl = 'http://localhost/saga/api/docentes';
    constructor(private http: Http) {}

		getDocentesMedium() {
			return this.http.get(this.docenteUrl)
						.toPromise()
						.then(res => <Docente[]> res.json().data)
						.then(data => { return data; });
		}
	  
	  delete(id: number): Promise<void> {
		const url = `${this.docenteUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		  .toPromise()
		  .then(() => null)
		  .catch(this.handleError);
	  }
	  create(nombre: string, apellido:string): Observable<Docente> {
		return this.http.post(this.docenteUrl, JSON.stringify({data: {nombre: nombre , apellido: apellido ,id:""}}), {headers: this.headers})
		            .map(this.extractData).catch(this.handleError);

	  }
	  private extractData(res: Response){
		   console.log(res);
		  let body = res.json();
		  return body.data||{};
		  
	  }
	  update(docente: Docente): Promise<Docente> {
		const url = `${this.docenteUrl}`;
		return this.http
		  .put(url, JSON.stringify({data: {nombre: docente.nombre , apellido: docente.apellido ,id :docente.id}}), {headers: this.headers})
		  .toPromise()
		  .then(() => docente)
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
