import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {DropFile, FD_LOG, XesLogParserService} from 'ilpn-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        // TODO base href
        {provide: APP_BASE_HREF, useValue: '/ilovepetrinets/'}
    ]
})
export class AppComponent {

    public FD_LOG = FD_LOG;

    constructor(private _xesParser: XesLogParserService) {
    }

    processFileUpload(files: Array<DropFile>) {
        console.log(this._xesParser.parse(files[0].content));
    }
}
