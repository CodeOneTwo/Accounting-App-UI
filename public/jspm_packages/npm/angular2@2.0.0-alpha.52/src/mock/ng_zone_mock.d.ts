import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { EventEmitter } from 'angular2/src/facade/async';
export declare class MockNgZone extends NgZone {
    constructor();
    onEventDone: EventEmitter<any>;
    run(fn: Function): any;
    runOutsideAngular(fn: Function): any;
    simulateZoneExit(): void;
}
