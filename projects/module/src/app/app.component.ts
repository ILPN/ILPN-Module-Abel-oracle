import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {
    AbelOracleService,
    DropFile,
    FD_LOG,
    FD_PETRI_NET,
    IncrementingCounter,
    PetriNetSerialisationService,
    XesLogParserService
} from 'ilpn-components';

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
    public FD_PN = FD_PETRI_NET;

    public result: Array<DropFile> | undefined = undefined;

    constructor(private _xesParser: XesLogParserService,
                private _αbelOracle: AbelOracleService,
                private _PetriNetSerializer: PetriNetSerialisationService) {
    }

    processFileUpload(files: Array<DropFile>) {
        this.result = undefined;
        const log = this._xesParser.parse(files[0].content);
        this._αbelOracle.determineConcurrency(log).subscribe(partialOrderNets => {
            const counter = new IncrementingCounter();
            this.result = partialOrderNets.sort((a, b) => b.frequency! - a.frequency!).map(pn => {
                return new DropFile(`po${counter.next()}.pn`, this._PetriNetSerializer.serialise(pn));
            });
        })
    }
}
