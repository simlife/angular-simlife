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
import { SimTruncateWordsPipe } from '../../src/pipe/truncate-words.pipe';

describe('TruncateWordsPipe Tests', () => {
    let pipe: SimTruncateWordsPipe;
    const input = 'Simlife is the best';
    beforeEach(() => {
        pipe = new SimTruncateWordsPipe();
    });

    it('Should return any', () => {
        const words: any = -1;
        const result = pipe.transform(input, words);
        expect(result).toBe('');
    });

    it('Should return sentence', () => {
        const words = 3;
        const result = pipe.transform(input, words);
        expect(result).toBe('Simlife is the...');
    });
});
