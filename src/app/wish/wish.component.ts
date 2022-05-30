import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wish } from './wish.model';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {

  wishes: Wish[] = [];
  filteredWishes: Wish[] = [];
  selectedWishes: Wish[] = [];
  searchText = '';

  constructor(private httpClient: HttpClient) {
   }

  ngOnInit(): void {
    this.httpClient.get("assets/wishes.json").subscribe((data: Wish[]) =>{
      this.wishes = data;
    });
  }

  searchTextChanged(text: string) {
    if (text === '') {
      this.filteredWishes = [];
    } else {
      let fullList: Wish[] = this.wishes.slice();
      fullList = fullList.filter((x) => !this.selectedWishes.filter((y) => y.id === x.id).length);
      this.filteredWishes = fullList.filter((wish) => wish.wish.toLowerCase().includes(text.toLowerCase()));
      if (this.filteredWishes.length > 5) {
        this.filteredWishes = this.filteredWishes.slice(0, 5);
      }
    }
  }

  onWishSelected(wish: Wish) {
    this.selectedWishes.push(wish);
    this.searchText = '';
    this.filteredWishes = [];
  }

  onWishDelete(wish: Wish) {
    this.selectedWishes = this.selectedWishes.filter((w) => !w.wish.toLowerCase().includes(wish.wish.toLowerCase()));
  }

  clearAll() {
    this.selectedWishes = [];
  }

}
