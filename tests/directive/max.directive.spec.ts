/*
 Copyright 2013-Present the original author or authors from the Simlife project.

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
import { SimMaxValidatorDirective } from '../../src/directive/max.directive';
import {FormControl} from '@angular/forms';

describe('SimMaxValidatorDirective Tests', () => {
    let dir: SimMaxValidatorDirective;
    let c: FormControl;

    beforeEach(() => {
        dir = new SimMaxValidatorDirective();
        c = new FormControl('', {})
    });

    describe('UI logic tests', () => {
        it('should reject value superior max', () => {
            dir.simMax = 10;
            c.setValue(11);
            expect(dir.validate(c)).toBeDefined();
            expect(dir.validate(c).max).toBeDefined();
            expect(dir.validate(c).max.valid).toBeDefined();
            expect(dir.validate(c).max.valid).toBe(false);
        });

        it('should validate value equals max', () => {
            dir.simMax = 10;
            c.setValue(10);
            expect(dir.validate(c)).toBeNull();
        });

        it('should validate value inferior max', () => {
            dir.simMax = 10;
            c.setValue(9);
            expect(dir.validate(c)).toBeNull();
        });

        it('should accept null values', () => {
            dir.simMax = 10;
            c.setValue(null);
            expect(dir.validate(c)).toBeNull();
        });

        it('should validate 0 correctly', () => {
            dir.simMax = -1;
            c.setValue(0);
            expect(dir.validate(c)).toBeDefined();
            expect(dir.validate(c).max).toBeDefined();
            expect(dir.validate(c).max.valid).toBeDefined();
            expect(dir.validate(c).max.valid).toBe(false);
        });
    });
});
