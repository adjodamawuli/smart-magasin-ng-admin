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
  getItems(result) {
    this.clientService.getItems()
      .subscribe(data => {
        this.items = data;
        this.items.unshift(result);
      },
      (err) => {
        console.log(err);
      });
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'Update member';
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
           // this.items.unshift(addedData);
            this.getItems(result);
            // this.items = result;
            this.items.slice();
            this.loader.close();
            this.snack.open('Member Added!', 'OK', { duration: 4000 });
          },
          (err) => {
            console.log(err);
          });

        } else {
          this.clientService.updateClient(res)
            .subscribe(updatedData => {
              this.items = this.items.map(i => {
                if(i._id === data.id) {
                  return Object.assign({}, i, updatedData);
                }
                return i;
              })

              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
        console.log(this.items);
      });
  }

  deleteItem(row) {
  }

}
