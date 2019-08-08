import { Injectable } from '@angular/core';
import { environment } from 'env/environment';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';

import { NotifySeverity } from '../enums/notify-severity.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotifyService {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {}

  clear() {
    this.messageService.clear();
  }

  notify(
    severity: NotifySeverity,
    summary: string,
    detail: string,
    life: number = environment.toast.life,
    sticky: boolean = environment.toast.sticky
  ) {
    this.messageService.add({ severity, summary, detail, life, sticky });
  }

  confirmAcceptOnly(
    message: string,
    header: string,
    options: Confirmation = null
  ): Observable<boolean> {
    let newOptions: Confirmation = { message };
    if (!options) {
      newOptions = Object.assign(newOptions, options);
    }
    newOptions.rejectVisible = false;
    newOptions.key = 'notify';
    return this.confirm(message, header, newOptions);
  }

  confirm(
    message: string,
    header: string,
    options: Confirmation = null
  ): Observable<boolean> {
    const generalLang = this.translate.instant('general');

    const tmpConfirmationOptions: Confirmation = {
      key: 'confirm',
      message: message,
      header: header,
      acceptLabel: generalLang['yes'],
      rejectLabel: generalLang['no']
    };

    return Observable.create((observer: Observer<boolean>) => {
      this.confirmationService.confirm(
        Object.assign(tmpConfirmationOptions, options, {
          accept: () => {
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          }
        })
      );
    });
  }
}
