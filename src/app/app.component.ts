import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from "./services/data-service.service";
import * as socketIo from 'socket.io-client';
import '../polyfills';
import { of } from 'rxjs';
@Component({
  selector: 'app2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app2';
  // @ts-ignore
  assetsBase = __webpack_public_path__;
  data = {}; country; contact; company; form: any; id; isGST: boolean = false; gst = "";
  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit() {
    window.addEventListener("oldData", function (e: CustomEvent) {
      this.id = e.detail.id;
      this.country = e.detail.country;
      this.contact = e.detail.contact;
      this.company = e.detail.company;
      if (e.detail.gst) {
        this.isGST = true;
        this.gst = e.detail.gst;
      }
      this.changeDetectorRef.detectChanges();
    }.bind(this));
    window.addEventListener("addGST", function (e: CustomEvent) {
      this.isGST = true;
      this.id = e.detail.id;
      this.country = e.detail.country;
      this.contact = e.detail.contact;
      this.company = e.detail.company;
      this.gst = "";
      this.changeDetectorRef.detectChanges();
    }.bind(this));
  }
  onSubmit() {
    this.data = {
      "company": this.company,
      "contact": this.contact,
      "country": this.country,
    }
    if (this.gst) {
      this.data['gst'] = this.gst;
    }
    if (this.id != undefined) {
      this.dataService.updateData(this.id, this.data);
      this.company = "", this.contact = "", this.country = ""; this.id = undefined; this.gst = "";
      this.isGST = false;
    } else {
      this.dataService.saveData(this.data);
      this.company = "", this.contact = "", this.country = ""; this.gst = "";
      this.isGST = false;
    }
  }
}