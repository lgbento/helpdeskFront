import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ResponseApi } from 'src/app/model/response-api';
import { SummaryModel } from './../../model/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: SummaryModel = new SummaryModel();
  message : {};
  classCss : {};

  constructor(
    private ticketService: TicketService,
  ) { }

  ngOnInit() {
    this.ticketService.summary().subscribe((responseApi:ResponseApi) => {
        this.summary = responseApi.data;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
 }

}
