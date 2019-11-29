import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data-service.service";
import * as socketIo from 'socket.io-client';
import '../polyfills';
@Component({
  selector: 'app2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app2';
  // @ts-ignore
  assetsBase = __webpack_public_path__;
  data = {}; country; contact; company; gst = ""; form: any; id;
  isGST: boolean = false;
  constructor(private dataService: DataService) { }
  ngOnInit() {
    const socket = socketIo('http://10.10.114.97:5555');
    socket.on('editRecord', (dt) => {
      this.company = dt.company;
      this.contact = dt.contact;
      this.country = dt.country;
      if (dt.gst) {
        this.isGST = true;
        this.gst = dt.gst;
      }
      this.id = dt.id;
    });
    socket.on('addGST', (dt) => {
      this.isGST = true;
      this.company = dt.company;
      this.contact = dt.contact;
      this.country = dt.country;
      this.gst = "";
      this.id = dt.id;
    });
  }
  onSubmit() {
    this.data = {
      "company": this.company,
      "contact": this.contact,
      "country": this.country,
    }
    if (this.isGST) {
      this.data['gst'] = this.gst;
    }
    if (this.id) {
      this.dataService.updateData(this.id, this.data);
      this.id = undefined;
    } else {
      this.dataService.saveData(this.data);
    }
    this.company = "", this.contact = "", this.country = ""; this.gst = ""; this.isGST = false;
  }
}