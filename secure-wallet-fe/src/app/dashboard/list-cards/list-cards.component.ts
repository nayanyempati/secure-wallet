import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardService } from 'src/app/backend-api/card/card.service';
import { AddCardsComponent } from './add-cards/add-cards.component';
import { ViewCardComponent } from './view-card/view-card.component';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss'],
})
export class ListCardsComponent implements OnInit {
  cardLists!: any;
  constructor(private modalCtrl: ModalController,
    private _CardService: CardService,) { }

  ngOnInit() {
    this.listCards();
  }


  listCards() {
    this._CardService.listCards().subscribe({
      next: (response) => {
        this.cardLists = response;
      }
    })
  }

  async addCard() {
    const modal = await this.modalCtrl.create({
      component: AddCardsComponent,
    });
    modal.onDidDismiss().then(data => {
      this.listCards()
    });
    return await modal.present();
  }

  async viewCard(card: any) {
    const modal = await this.modalCtrl.create({
      component: ViewCardComponent,
      componentProps: {
        data: card
      }
    });
    modal.onDidDismiss().then(data => {
      this.listCards()
    });
    return await modal.present();
  }


  onSearchCard(key: any) {
    if(key){
      this._CardService.searchCard(key).subscribe({
        next: (response) => {
          this.cardLists = response;
        }
      })
    }
    this.listCards();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


}
