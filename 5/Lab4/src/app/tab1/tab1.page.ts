import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  input: string;
  resultKnowledge: any;
  resultImages: any;

  constructor(private httpClient: HttpClient) {
    this.input = '';
    this.resultKnowledge = null;
    this.resultImages = null;
  }

  search() {
    this.resultImages = null;
    this.resultKnowledge = null;
    if (this.input !== '') {
      this.httpClient.get('https://kgsearch.googleapis.com/v1/entities:search?query=' + this.input +
          '&key=AIzaSyBwBVJOXIRpF0WaFEttaF9bLApiH2WftQQ&limit=1&indent=True')
          .subscribe((data: any) => {
            if (data.itemListElement.length !== 0) {
              this.resultKnowledge = data.itemListElement[0].result;
            }
          });
    }
  }

  searchImage() {
    this.resultImages = null;
    this.resultKnowledge = null;
    if (this.input !== '') {
      this.httpClient.get('https://pixabay.com/api/?key=13649062-5df1c82a676a823d5924d2b2b&q=' + this.input)
          .subscribe((data: any) => {
              if (data.hits.length !== 0) {
              this.resultImages = data.hits;
            }
          });
    }

  }
}
