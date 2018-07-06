/*
 Copyright 2013-2017 the original author or authors from the Simlife project.

 This file is part of the Simlife project, see https://simlife.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Injectable } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

import { SimEventManager } from '../../src/service/event-manager.service';

@Injectable({
    providedIn: 'root'
})
class SpyService {
  called = false;
}

function callback(spyService) {
    spyService.called = true;
}

describe('Event Manager test', () => {

    describe('Event Manager Test', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    SimEventManager,
                    SpyService
                ]
            });
        });

        it('should not fail when nosubscriber and broadcasting', inject([SimEventManager],
            (eventManager: SimEventManager) => {
            expect(eventManager.observer).toBeUndefined();
            eventManager.broadcast({ name: 'modifier', content: 'modified something'});
        }));

        it('should create an observable and callback when broadcasted', inject([SimEventManager, SpyService],
            (eventManager: SimEventManager, spyService: SpyService) => {
            expect(spyService.called).toBeFalsy();
            eventManager.subscribe('modifier', (response) => callback(spyService));
            eventManager.broadcast({ name: 'modifier', content: 'modified something'});
            expect(spyService.called).toBeTruthy();
        }));

    });
});
