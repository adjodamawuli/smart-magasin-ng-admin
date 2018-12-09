import { HttpClient } from '@angular/common/http';
import { Client } from './../../sessions/model/client';
import { ClientService } from './../../sessions/service/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { ClientPopupComponent } from './client-popup/client-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: egretAnimations
})
export class ClientComponent implements OnInit {
  public items: any[];
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private clientService: ClientService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.initItems();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
  }
  initItems() {

    this.getItemSub = this.clientService.getClients()
      .subscribe(data => {
        this.items = data;
      },
      (err) => {
        console.log(err);
      });
  }
  getItems(result?) {
    this.clientService.getItems()
      .subscribe(data => {
        this.items = data;
        if(result){
          this.items.unshift(result);
        }
      },
      (err) => {
        console.log(err);
      });
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Ajout d\'un nouveau client' : 'Modification du client';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ClientPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.clientService.setItems(this.items);

          this.clientService.addClient(res).subscribe(result => {
            this.getItems(result);
            this.items.slice();
            this.loader.close();
            this.snack.open('Ajout avec succès!', 'OK', { duration: 4000 });
          },
          (err) => {
            console.log(err);
          });

        } else {

          this.clientService.updateClient(res)
            .subscribe(updatedData => {
              this.items = this.items.map(i => {
                if(i.id === res.id) {
                  return Object.assign({}, i, updatedData);
                }
                return i;
              });

              this.loader.close();
              this.snack.open('Modification avec succsès!', 'OK', { duration: 4000 })
            });
        }
      });
  }

  deleteItem(row: Client) {
    this.clientService.deleteClient(row.id).subscribe(data => {
      const index = this.items.indexOf(row);
      if (index > -1) {
        this.items.splice(index, 1);
        this.clientService.setItems(this.items);
        this.getItems();
        console.log('delete client' + row.id);
        this.snack.open('Suppression avec succès!', 'OK', { duration: 4000 });
      }},
      (err) => {
        console.log(err);
      });
  }

}
