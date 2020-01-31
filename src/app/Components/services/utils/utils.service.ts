import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  dateFormat(dd, time = false) {
    if (dd == null) {
      return '';
    }
    let isSafari = false;
    // isSafari = !!window.navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    if (isSafari) {
      return dd;
    }
    let e;
    // var dateFromFun = dd.replace(/([+\-]\d\d)(\d\d)$/,"$1:$2");
    // dateFromFun = dd
    var timestamp = Date.parse(dd);

    if (isNaN(timestamp) == false) {
    } else {
      // not a valid date string
      return '';
    }
    e = new Date(dd);


    let m: any = e.getMinutes();
    let s: any = e.getSeconds();
    let h: any = e.getHours();
    let mm: any = e.getMonth() + 1;
    let d: any = e.getDate();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (time) {
      return mm + '/' + d + '/' + e.getFullYear() +
        ' ' + h + ':' + m + ':' + s;
    }
    return mm + '/' + d + '/' + e.getFullYear();

  }


  timeStampToDate(timeStamp) {
    var date = new Date(timeStamp);
    return date;
  }
 

  convertDateToReqFormat(str) {
    var res = str.split('-');
    var date = res[1] + '/' + res[2] + '/' + res[0];
    return date;
  }


    simpledateFormat(dd, time = false) {
    if (dd == null) {
      return '';
    }
    let isSafari = false;
    // isSafari = !!window.navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    if (isSafari) {
      return dd;
    }
    let e;
    // var dateFromFun = dd.replace(/([+\-]\d\d)(\d\d)$/,"$1:$2");
    // dateFromFun = dd
    var timestamp = Date.parse(dd);

    if (isNaN(timestamp) == false) {
    } else {
      // not a valid date string
      return '';
    }
    e = new Date(dd);


    let m: any = e.getMinutes();
    let s: any = e.getSeconds();
    let h: any = e.getHours();
    let mm: any = e.getMonth() + 1;
    let d: any = e.getDate();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (m < 10) {
      m = '0' + m;
    }
 
    return mm + '/' + d + '/' + e.getFullYear();

  }




    dbdateFormat(dd, time = false) {
    if (dd == null) {
      return '';
    }
    let isSafari = false;
    // isSafari = !!window.navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    if (isSafari) {
      return dd;
    }
    let e;
    // var dateFromFun = dd.replace(/([+\-]\d\d)(\d\d)$/,"$1:$2");
    // dateFromFun = dd
    var timestamp = Date.parse(dd);

    if (isNaN(timestamp) == false) {
    } else {
      // not a valid date string
      return '';
    }
    e = new Date(dd);


    let m: any = e.getMinutes();
    let s: any = e.getSeconds();
    let h: any = e.getHours();
    let mm: any = e.getMonth() + 1;
    let d: any = e.getDate();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (m < 10) {
      m = '0' + m;
    }


    
    return e.getFullYear() + '-' + mm + '-' +d ;

  }
}
