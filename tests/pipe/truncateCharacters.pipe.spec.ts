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
import {SimTruncateCharactersPipe} from '../../src/pipe/truncate-characters.pipe';

describe('TruncateCharactersPipe Tests', () => {

    const input = 'simlife test';
    const chars = 12;
    const breakOnWord: any = false;
    let pipe: SimTruncateCharactersPipe;
    beforeEach(() => {
        pipe = new SimTruncateCharactersPipe();
    });

    it('Should return the first word', () => {
        const result = pipe.transform(input, chars, breakOnWord);

        expect(result).toEqual('simlife...');
    });
});
