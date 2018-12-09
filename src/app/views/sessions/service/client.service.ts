import { Client } from './../model/client';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {delay } from 'rxjs/operators';

@Injectable()
export class ClientService {

  private readonly API_URL = 'http://192.168.1.92:8080/smart/clients/';

  items: any[];

  constructor (private httpClient: HttpClient) {}

  setItems(items){
    this.items = items;
  }
  getItems(){
    return of(this.items.slice()).pipe(delay(1000))
  }
  getClients() {
    return this.httpClient.get < Client[] > (this.API_URL);
  }

  updateClient(client: Client) {
    return this.httpClient.put(this.API_URL + client.id, client);
  }

  deleteClient(id: number) {
   return  this.httpClient.delete(this.API_URL + id);
  }


  addClient(client: Client) {
    return this.httpClient.post(this.API_URL, client);
  }

}

