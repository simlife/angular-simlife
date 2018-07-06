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
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SimItemCountComponent } from '../../src/component/sim-item-count.component';
import { SimTranslateComponent } from '../../src/language/sim-translate.directive';
import { SimConfigService } from '../../src/config.service';

function getElementHtml(element: ComponentFixture<SimItemCountComponent>): string {
    const res = element.nativeElement.querySelector('.sim-item-count');
    return (res && res.innerHTML) ? res.innerHTML.trim() : '';
}

function getElementAttribute(element: ComponentFixture<SimItemCountComponent>, value: string): string {
    let res = element.nativeElement.querySelector('.sim-item-count');
    if (res && res.attributes) {
        res = res.attributes.getNamedItem(value);
        return (res && res.value) ? res.value.trim() : '';
    }
    return '';
}

describe('SimItemCountComponent test', () => {

    let comp: SimItemCountComponent;
    let fixture: ComponentFixture<SimItemCountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimItemCountComponent, SimTranslateComponent],
            imports: [TranslateModule.forRoot()],
            providers: [
                {
                    provide: SimConfigService,
                    useValue: new SimConfigService({defaultI18nLang: 'en', i18nEnabled: true})
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimItemCountComponent);
        comp = fixture.componentInstance;
    });

    describe('UI logic tests', () => {
        it('should initialize with undefined', () => {
            expect(comp.page).toBeUndefined();
            expect(comp.itemsPerPage).toBeUndefined();
            expect(comp.total).toBeUndefined();
        });

        it('should change the content on page change', () => {
            comp.page = 1;
            comp.itemsPerPage = 10;
            comp.total = 100;
            fixture.detectChanges();

            getElementHtml(fixture);
            expect(getElementAttribute(fixture, 'translateValues')).toBe(`{first: '1', second: '10', total: '100'}`);
            comp.page = 2;
            fixture.detectChanges();

            getElementHtml(fixture);
            expect(getElementAttribute(fixture, 'translateValues')).toBe(`{first: '11', second: '20', total: '100'}`);
        });

        it('should not translate the content', () => {
            comp.i18nEnabled = false;
            comp.page = 1;
            comp.itemsPerPage = 10;
            comp.total = 100;
            fixture.detectChanges();
            expect(getElementAttribute(fixture, 'translateValues')).toBe(``);
            expect(getElementHtml(fixture)).toBe(``);

            comp.page = 2;
            fixture.detectChanges();
            expect(getElementAttribute(fixture, 'translateValues')).toBe(``);
            expect(getElementHtml(fixture)).toBe(``);
        });
    });
});
