import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Edificio} from "../entities/edificio";
import {Localidad} from "../entities/localidad";

@Injectable()
export class EdificioService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private edificioUrl = 'http://localhost/saga/api/edificios';
    constructor(private http: Http) {}

    getEdificiosMedium() {
        return this.http.get(this.edificioUrl)
            .toPromise()
            .then(res => <Edificio[]> res.json().data)
            .then(data => { return data; });
    }

    delete(id: number): Promise<void> {
        const url = `${this.edificioUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(nombre: string, localidad:Localidad): Observable<Edificio> {
        return this.http.post(this.edificioUrl, JSON.stringify({data: {nombre: nombre , localidad: localidad,id:""}}), {headers: this.headers})
            .map(this.extractData).catch(this.handleError);

    }
    private extractData(res: Response){
        console.log(res);
        let body = res.json();
        return body.data||{};

    }
    update(edificio: Edificio): Promise<Edificio> {
        const url = `${this.edificioUrl}`;
        return this.http
            .put(url, JSON.stringify({data: {nombre: edificio.nombre , localidad: edificio.localidad, id :edificio.id}}), {headers: this.headers})
            .toPromise()
            .then(() => edificio)
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

    getAll(): Promise<Edificio[]> {
        return this.http
            .get(this.edificioUrl)
            .toPromise()
            .then(res => res.json().data as Edificio[])
            .catch(this.handleError);
    }

    getById(id:number): Promise<Edificio> {
        return this.http
            .get(`${this.edificioUrl}/${id}`)
            .toPromise()
            .then(res => res.json().data as Edificio)
            .catch(this.handleError)
    }
}