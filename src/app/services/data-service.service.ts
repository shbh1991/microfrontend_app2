import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const data_URL = 'http://10.10.114.97:5555';
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  saveData(body) {
    var result;
    this.http.post(data_URL + "/saveData/", JSON.stringify(body), httpOptions).pipe().subscribe(response => {
      result = response;
    });
    return result;
  }
  updateData(id, data) {
    var result;
    this.http.put(data_URL + "/updateData/" + id, JSON.stringify(data), httpOptions).pipe().subscribe(response => {
      result = response;
    });
    return result;
  }
}