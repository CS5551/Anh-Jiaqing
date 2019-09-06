import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
declare var responsiveVoice: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('key', {static: false}) key: ElementRef;
  keyValue: any;
  result: any;

  constructor(private httpClient: HttpClient) {
    this.result = null;
  }

  ngOnInit() {
  }

  getResult() {

    this.keyValue = this.key.nativeElement.value;
    if (this.keyValue !== '') {
      responsiveVoice.speak(this.keyValue);
      this.httpClient.get('https://api.nutritionix.com/v1_1/search/' + this.keyValue +
        '?results=0:1&fields=*&appId=67daeecc&appKey=1aa46a12eda27408b784b67101f62c73')
        .subscribe((data: any) => {
          if (data.hits.length !== 0) {
            this.result = data.hits[0].fields;
          }
        });
    }
  }
}
