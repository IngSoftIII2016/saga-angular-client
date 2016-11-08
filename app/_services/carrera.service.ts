import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Carrera} from '../../app/_entities/carrera';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class CarreraService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private carreraUrl = 'http://localhost/saga/api/carreras';
    constructor(private http: Http) {}

		getCarrerasMedium() {
			return this.http.get(this.carreraUrl)
						.toPromise()
						.then(res => <Carrera[]> res.json().data)
						.then(data => { return data; });
		}
	  
	  delete(id: number): Promise<void> {
		const url = `${this.carreraUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		  .toPromise()
		  .then(() => null)
		  .catch(this.handleError);
	  }
	  create(nombre: string): Observable<Carrera> {
		return this.http.post(this.carreraUrl, JSON.stringify({data: {nombre: nombre ,id:""}}), {headers: this.headers})
		            .map(this.extractData).catch(this.handleError);

	  }
	  private extractData(res: Response){
		   console.log(res);
		  let body = res.json();
		  return body.data||{};
		  
	  }
	  update(carrera: Carrera): Promise<Carrera> {
		const url = `${this.carreraUrl}`;
		return this.http
		  .put(url, JSON.stringify({data: {nombre: carrera.nombre ,id :carrera.id}}), {headers: this.headers})
		  .toPromise()
		  .then(() => carrera)
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
