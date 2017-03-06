import 'core-js/client/shim';
import 'zone.js/dist/zone';


import '@angular/common';
import 'rxjs';


import 'primeng/resources/primeng.min.css';

import 'materialize-css/bin/jquery-2.1.1.min.js';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/bin/materialize.css';

import './css/scss/font-awesome.scss';

import './index.scss';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app';

declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  Error['stackTraceLimit'] = Infinity; // tslint:disable-line:no-string-literal
  require('zone.js/dist/long-stack-trace-zone'); // tslint:disable-line:no-var-requires
}

platformBrowserDynamic().bootstrapModule(AppModule);
