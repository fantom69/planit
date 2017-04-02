import 'core-js/client/shim';
import 'zone.js/dist/zone';


import '@angular/common';
import 'rxjs';



import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'primeng/resources/themes/omega/theme.css'
import 'primeng/resources/primeng.min.css'

import './app/commun/css/scss/font-awesome.scss';

import './index.scss';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.modules';

declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  Error['stackTraceLimit'] = Infinity; // tslint:disable-line:no-string-literal
  require('zone.js/dist/long-stack-trace-zone'); // tslint:disable-line:no-var-requires
}

platformBrowserDynamic().bootstrapModule(AppModule);
