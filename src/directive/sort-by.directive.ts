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
import { Directive, Host, HostListener, Input, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { SimSortDirective } from './sort.directive';
import { SimConfigService } from '../config.service';

@Directive({
    selector: '[simSortBy]'
})
export class SimSortByDirective implements AfterViewInit {

    @Input() simSortBy: string;

    sortAscIcon = 'fa-sort-asc';
    sortDescIcon = 'fa-sort-desc';

    simSort: SimSortDirective;

    constructor(@Host() simSort: SimSortDirective, private el: ElementRef, private renderer: Renderer, configService: SimConfigService) {
        this.simSort = simSort;
        const config = configService.getConfig();
        this.sortAscIcon = config.sortAscIcon;
        this.sortDescIcon = config.sortDescIcon;
    }

    ngAfterViewInit(): void {
        if (this.simSort.predicate && this.simSort.predicate !== '_score' && this.simSort.predicate === this.simSortBy) {
            this.applyClass();
        }
    }

    @HostListener('click') onClick() {
        if (this.simSort.predicate && this.simSort.predicate !== '_score') {
            this.simSort.sort(this.simSortBy);
            this.applyClass();
        }
    }

    private applyClass() {
        const childSpan = this.el.nativeElement.children[1];
        let add = this.sortAscIcon;
        if (!this.simSort.ascending) {
            add = this.sortDescIcon;
        }
        this.renderer.setElementClass(childSpan, add, true);
    };
}
