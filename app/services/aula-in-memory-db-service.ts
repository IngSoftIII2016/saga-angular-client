import {InMemoryDbService} from "angular-in-memory-web-api";
export class AulasInMemoryDbService implements InMemoryDbService {
    createDb() {
        let aulas = JSON.parse(this.aulas_json);
        let edificios = JSON.parse(this.edificios_json);
        return {aulas, edificios};
    }

    private aulas_json = `
[
  {
    "id": "29",
    "nombre": "Radio Encuentro",
    "ubicacion": "0",
    "capacidad": "8",
    "Edificio_id": "5"
  },
  {
    "id": "18",
    "nombre": "Aula 1",
    "ubicacion": "0",
    "capacidad": "65",
    "Edificio_id": "2"
  },
  {
    "id": "19",
    "nombre": "Aula 2",
    "ubicacion": "0",
    "capacidad": "65",
    "Edificio_id": "2"
  },
  {
    "id": "20",
    "nombre": "Aula 3",
    "ubicacion": "0",
    "capacidad": "65",
    "Edificio_id": "2"
  },
  {
    "id": "21",
    "nombre": "Aula 4",
    "ubicacion": "0",
    "capacidad": "50",
    "Edificio_id": "2"
  },
  {
    "id": "22",
    "nombre": "INTA",
    "ubicacion": "0",
    "capacidad": "20",
    "Edificio_id": "4"
  },
  {
    "id": "25",
    "nombre": "Aula 1",
    "ubicacion": "0",
    "capacidad": "50",
    "Edificio_id": "3"
  },
  {
    "id": "26",
    "nombre": "Aula 2",
    "ubicacion": "0",
    "capacidad": "50",
    "Edificio_id": "3"
  },
  {
    "id": "27",
    "nombre": "Aula 3",
    "ubicacion": "0",
    "capacidad": "50",
    "Edificio_id": "3"
  },
  {
    "id": "28",
    "nombre": "Aula 4",
    "ubicacion": "0",
    "capacidad": "50",
    "Edificio_id": "3"
  },
  {
    "id": "1",
    "nombre": "Aula 1",
    "ubicacion": "1",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "2",
    "nombre": "Aula 2",
    "ubicacion": "2",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "3",
    "nombre": "Aula 3",
    "ubicacion": "3",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "4",
    "nombre": "Aula 4",
    "ubicacion": "4",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "5",
    "nombre": "Aula 5",
    "ubicacion": "5",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "11",
    "nombre": "Aula Magna",
    "ubicacion": "6",
    "capacidad": "200",
    "Edificio_id": "1"
  },
  {
    "id": "6",
    "nombre": "Aula 6",
    "ubicacion": "7",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "7",
    "nombre": "Aula 7",
    "ubicacion": "8",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "8",
    "nombre": "Aula 8",
    "ubicacion": "9",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "9",
    "nombre": "Aula 9",
    "ubicacion": "10",
    "capacidad": "50",
    "Edificio_id": "1"
  },
  {
    "id": "10",
    "nombre": "Aula 10",
    "ubicacion": "11",
    "capacidad": "30",
    "Edificio_id": "1"
  },
  {
    "id": "14",
    "nombre": "Laboratorio de Docencia 1",
    "ubicacion": "12",
    "capacidad": "30",
    "Edificio_id": "1"
  },
  {
    "id": "15",
    "nombre": "Laboratorio de Docencia 2",
    "ubicacion": "13",
    "capacidad": "18",
    "Edificio_id": "1"
  },
  {
    "id": "16",
    "nombre": "Laboratorio de Docencia 3",
    "ubicacion": "14",
    "capacidad": "30",
    "Edificio_id": "1"
  },
  {
    "id": "17",
    "nombre": "Laboratorio de Docencia 4",
    "ubicacion": "15",
    "capacidad": "18",
    "Edificio_id": "1"
  },
  {
    "id": "12",
    "nombre": "Laboratorio de Inform\u00e1tica Aplicada",
    "ubicacion": "16",
    "capacidad": "20",
    "Edificio_id": "1"
  },
  {
    "id": "13",
    "nombre": "Aula de Infrom\u00e1tica",
    "ubicacion": "17",
    "capacidad": "24",
    "Edificio_id": "1"
  },
  {
    "id": "24",
    "nombre": "Sala LIA",
    "ubicacion": "18",
    "capacidad": "8",
    "Edificio_id": "1"
  },
  {
    "id": "23",
    "nombre": "Buffett",
    "ubicacion": "19",
    "capacidad": "150",
    "Edificio_id": "1"
  }
]
`;
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
`;
}
