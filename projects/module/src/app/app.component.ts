import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AbelOracleService, DropFile, FD_LOG, XesLogParserService} from 'ilpn-components';

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

    // TODO update module template with new dependency

    public FD_LOG = FD_LOG;

    constructor(private _xesParser: XesLogParserService, private _αbelOracle: AbelOracleService) {
    }

    processFileUpload(files: Array<DropFile>) {
        const log = this._xesParser.parse(files[0].content);
        this._αbelOracle.determineConcurrency(log).subscribe(partialOrderNets => {
            console.log(partialOrderNets)
        })
    }
}
