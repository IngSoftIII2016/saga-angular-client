import {InMemoryDbService} from "angular-in-memory-web-api";

export class EdificioInMemoryDbService implements InMemoryDbService {
    createDb() {
        let edificios = JSON.parse(this.edificios_json);
        return {edificios};
    }
    private edificios_json:string = `
[
  {
    "id": "1",
    "nombre": "Campus",
    "Localidad_id": "1"
  },
  {
    "id": "2",
    "nombre": "La Rural",
    "Localidad_id": "1"
  },
  {
    "id": "3",
    "nombre": "Manzana Hist\u00f3rica",
    "Localidad_id": "1"
  },
  {
    "id": "4",
    "nombre": "INTA",
    "Localidad_id": "1"
  },
  {
    "id": "5",
    "nombre": "Radio Encuentro",
    "Localidad_id": "1"
  }
]
`
}