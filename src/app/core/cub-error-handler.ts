import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'env/environment';

/**
 * 未來所有的 Angular 錯誤訊息，都會透過這裡集中處理。
 *
 * 使用方式如下：
 * 1. 預設的 handleError 用來處理所有一般性的 Angular 例外錯誤，
 *    建議不要把訊息輸出到畫面上，而是把傳送錯誤訊息到後端透過 Web API 紀錄。
 * 2. 如果要讓訊息透過一些 UI 元件來顯示在畫面上，可以在這個類別擴充處理的函式(方法)。
 * Ref: https://angular.io/api/core/ErrorHandler
 *
 * @export
 * @class CUBErrorHandler
 * @implements {ErrorHandler}
 */
@Injectable({
  providedIn: 'root'
})
export class CUBErrorHandler implements ErrorHandler {
  handleError(error) {

    if (!environment.production) {
      console.error(error);
      return;
    }

    if (error.message) {
      // 取得錯誤訊息的第一行
      console.dir(
        (error.message as string).substr(0, error.message.indexOf('\n'))
      );
    }

    if (error.zone) {
      console.log(error.zone._properties.isAngularZone);
    }

    console.dir(error);

    console.log(Object.keys(error));
  }
}
