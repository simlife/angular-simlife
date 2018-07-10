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
import { NgModule, ModuleWithProviders, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SIM_PIPES, SIM_DIRECTIVES, SIM_COMPONENTS, SIM_SERVICES } from './src/sim-components';
import {
    SimMissingTranslationHandler,
    SimTranslateComponent,
    SimLanguageService
} from './src/language';
import { SimModuleConfig } from './src/config';
import { SimConfigService } from './src/config.service';
import { SimAlertService } from './src/service';

// Re export the files
export * from './src/pipe';
export * from './src/directive';
export * from './src/service';
export * from './src/component';
export * from './src/language';
export * from './src/config.service';
export * from './src/config';

export function translatePartialLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'i18n/', `.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`);
}

export function missingTranslationHandler(configService: SimConfigService) {
    return new SimMissingTranslationHandler(configService);
}

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translatePartialLoader,
                deps: [HttpClient]
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useFactory: missingTranslationHandler,
                deps: [SimConfigService]
            }
        }),
        CommonModule
    ],
    declarations: [
        ...SIM_PIPES,
        ...SIM_DIRECTIVES,
        ...SIM_COMPONENTS,
        SimTranslateComponent
    ],
    exports: [
        ...SIM_PIPES,
        ...SIM_DIRECTIVES,
        ...SIM_COMPONENTS,
        SimTranslateComponent,
        TranslateModule,
        CommonModule
    ]
})
export class NgSimlifeModule {
    static forRoot(moduleConfig: SimModuleConfig): ModuleWithProviders {
        return {
            ngModule: NgSimlifeModule,
            providers: [
                ...SIM_SERVICES,
                { provide: SimLanguageService, useClass: SimLanguageService, deps: [TranslateService, SimConfigService] },
                { provide: SimAlertService, useClass: SimAlertService, deps: [Sanitizer, SimConfigService, TranslateService] },
                { provide: SimModuleConfig, useValue: moduleConfig },
                { provide: SimConfigService, useClass: SimConfigService, deps: [SimModuleConfig] }
            ]
        };
    }
    static forChild(moduleConfig: SimModuleConfig): ModuleWithProviders {
        return {
            ngModule: NgSimlifeModule,
            providers: [
                { provide: SimModuleConfig, useValue: moduleConfig },
            ]
        };
    }
}
