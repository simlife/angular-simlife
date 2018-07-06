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
import { TestBed, inject } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SimAlertService, SimAlert } from '../../src/service/alert.service';
import { SimConfigService } from '../../src/config.service';

describe('Alert service test', () => {

    describe('Alert Service Test', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TranslateModule.forRoot()],
                providers: [
                    {
                        provide: SimConfigService,
                        useValue: new SimConfigService({defaultI18nLang: 'en', i18nEnabled: true})
                    }
                ]
            });
            // Make sure we can install mock clock
            jasmine.clock().uninstall();
            jasmine.clock().install();
        });

        afterEach(() => {
            jasmine.clock().uninstall();
        });

        it('should produce a proper alert object and fetch it', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.addAlert({
                type: 'success',
                msg: 'Hello Simlife',
                params: {},
                timeout: 3000,
                toast: true,
                position: 'top left'
            }, [])).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife',
                id: 0,
                timeout: 3000,
                toast: true,
                position: 'top left',
                scoped: undefined
            }));

            expect(service.get().length).toBe(1);
            expect(service.get()[0]).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife',
                id: 0,
                timeout: 3000,
                toast: true,
                position: 'top left',
                scoped: undefined
            }));
        }));

        it('should produce an alert object with correct id', inject([SimAlertService], (service: SimAlertService) => {
            service.info('Hello Simlife info');
            expect(service.success('Hello Simlife success')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife success',
                id: 1
            }));

            expect(service.get().length).toBe(2);
            expect(service.get()[1]).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife success',
                id: 1
            }));
        }));

        it('should close an alert correctly', inject([SimAlertService], (service: SimAlertService) => {
            service.info('Hello Simlife info');
            service.info('Hello Simlife info 2');
            expect(service.success('Hello Simlife success')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife success',
                id: 2
            }));

            expect(service.get().length).toBe(3);
            service.closeAlert(1);
            expect(service.get().length).toBe(2);
            expect(service.get()[1]).not.toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'info',
                msg: 'Hello Simlife info 2',
                id: 1
            }));
            service.closeAlert(2);
            expect(service.get().length).toBe(1);
            expect(service.get()[0]).not.toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife success',
                id: 2
            }));
            service.closeAlert(0);
            expect(service.get().length).toBe(0);
        }));

        it('should close an alert on timeout correctly', inject([SimAlertService], (service: SimAlertService) => {
            service.info('Hello Simlife info');

            expect(service.get().length).toBe(1);

            jasmine.clock().tick(6000); // increment clock 6000 ms.

            expect(service.get().length).toBe(0);
        }));

        it('should clear alerts', inject([SimAlertService], (service: SimAlertService) => {
            service.info('Hello Simlife info');
            service.error('Hello Simlife info');
            service.success('Hello Simlife info');
            expect(service.get().length).toBe(3);
            service.clear();
            expect(service.get().length).toBe(0);
        }));

        it('should produce a scoped alert', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.addAlert({
                type: 'success',
                msg: 'Hello Simlife',
                params: {},
                timeout: 3000,
                toast: true,
                position: 'top left',
                scoped: true
            }, [])).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife',
                id: 0,
                timeout: 3000,
                toast: true,
                position: 'top left',
                scoped: true
            }));

            expect(service.get().length).toBe(0);
        }));

        it('should produce a success message', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.success('Hello Simlife')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife'
            }));
        }));

        it('should produce a success message with custom position', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.success('Hello Simlife', {}, 'bottom left')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'success',
                msg: 'Hello Simlife',
                position: 'bottom left',
            }));
        }));

        it('should produce a error message', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.error('Hello Simlife')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'danger',
                msg: 'Hello Simlife'
            }));
        }));

        it('should produce a warning message', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.warning('Hello Simlife')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'warning',
                msg: 'Hello Simlife'
            }));
        }));

        it('should produce a info message', inject([SimAlertService], (service: SimAlertService) => {
            expect(service.info('Hello Simlife')).toEqual(jasmine.objectContaining(<SimAlert>{
                type: 'info',
                msg: 'Hello Simlife'
            }));
        }));
    });
});
