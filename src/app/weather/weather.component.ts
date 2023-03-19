import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnDestroy {
  iframeSources = [
    'https://forecast.weather.gov/MapClick.php?lat=41.88544500000006&lon=-87.62229499999995#.YYgE9WDMJ1M',
    // 'https://iiseagrant.org/45198/',
    'https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJ3ZWF0aGVyIiwiY2VudGVyIjpbLTg3LjU2OSw0MS44MzZdLCJ6b29tIjo5LCJsb2NhdGlvbiI6Wy04Ny42MTUsNDEuODg1XX0sImFuaW1hdGluZyI6ZmFsc2UsImJhc2UiOiJzdGFuZGFyZCIsImFydGNjIjpmYWxzZSwiY291bnR5IjpmYWxzZSwiY3dhIjpmYWxzZSwicmZjIjpmYWxzZSwic3RhdGUiOmZhbHNlLCJtZW51Ijp0cnVlLCJzaG9ydEZ1c2VkT25seSI6ZmFsc2UsIm9wYWNpdHkiOnsiYWxlcnRzIjowLjYsImxvY2FsIjowLjYsImxvY2FsU3RhdGlvbnMiOjAuOCwibmF0aW9uYWwiOjAuNn19#/',
    'https://marine.weather.gov/MapClick.php?w0=t&w1=td&w2=wc&w3=sfcwind&w4=sky&w5=pop&w6=rh&w7=rain&w8=thunder&w14=wvhd&pqpfhr=6&psnwhr=6&AheadHour=0&Submit=Submit&&FcstType=graphical&textField1=41.9821&textField2=-87.6063&site=lot&menu=1',
  ];
  counter = 1;
  msPerSecond = 1000;
  seconds = 20 * this.msPerSecond;
  source = interval(this.seconds);
  subscription: Subscription = this.source.subscribe((val) => {
    this.updateIframe();
  });

  constructor(public sanitizer: DomSanitizer) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateIframe() {
    const iframe = document.getElementById(
      'weatherIframe'
    ) as HTMLIFrameElement;
    iframe.src = this.iframeSources[this.counter];
    this.counter++;
    if (this.counter === this.iframeSources.length) {
      this.counter = 0;
    }
  }
}
