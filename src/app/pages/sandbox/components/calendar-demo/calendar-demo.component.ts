import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-demo.component.html',
  styleUrls: ['./calendar-demo.component.scss']
})
export class CalendarDemoComponent implements OnInit {
  locale = {
    firstDayOfWeek: 0,
    dayNames: [
      '星期天',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ],
    dayNamesShort: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    monthNamesShort: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    today: '今日',
    clear: '清除'
  };

  showIcon = true;
  showTime = false;
  formatStr = 'yy/mm/dd ';
  defaultDate: Date | string;
  minDate: Date | string;
  maxDate: Date | string;
  date: Date | string;
  constructor() {}

  ngOnInit() {}

  showData() {
    console.log(this.date);
  }
}
