import { Client } from './../model/client';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ClientService {

  private readonly API_URL = 'http://localhost:8080/smart/clients/';

  dataChange: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Client[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

   /** CRUD METHODS */
   getAllClients(): void {
    this.httpClient.get<Client[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
/* addClient (client: Client): void {
    this.dialogData = client;
  }*/

  /*updateClient (client: Client): void {
    this.dialogData = client;
  }*/
  updateClient(client: Client): void {
    this.httpClient.put(this.API_URL + client.id, client).subscribe(data => {
        this.dialogData = data;
        console.log('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        console.error('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  /*deleteClient (id: number): void {
    console.log(id);
  }*/
  deleteClient(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      // console.log(data['']);
      console.log('delete client' + id);
      },
      (err: HttpErrorResponse) => {
        console.error('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  addClient(client: Client): void {
    this.httpClient.post(this.API_URL, client).subscribe(data => {
      this.dialogData = data;
     // this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
        console.error('error while add client');
     // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

}
