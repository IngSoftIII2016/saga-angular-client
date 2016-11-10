import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Sede} from '../entities/sede';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class SedeService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private sedeUrl = 'http://localhost/saga/api/sedes';
    constructor(private http: Http) {}

		getSedesMedium() {
			return this.http.get(this.sedeUrl)
						.toPromise()
						.then(res => <Sede[]> res.json().data)
						.then(data => { return data; });
		}
	  
	  delete(id: number): Promise<void> {
		const url = `${this.sedeUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		  .toPromise()
		  .then(() => null)
		  .catch(this.handleError);
	  }
	  create(nombre: string): Observable<Sede> {
		return this.http.post(this.sedeUrl, JSON.stringify({data: {nombre: nombre,id:""}}), {headers: this.headers})
		            .map(this.extractData).catch(this.handleError);

	  }
	  private extractData(res: Response){
		   console.log(res);
		  let body = res.json();
		  return body.data||{};
		  
	  }
	  update(sede: Sede): Promise<Sede> {
		const url = `${this.sedeUrl}`;
		return this.http
		  .put(url, JSON.stringify({data: {nombre:sede.nombre , id:sede.id}}), {headers: this.headers})
		  .toPromise()
		  .then(() => sede)
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
