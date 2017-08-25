'use strict';

import expect from 'expect';
import {normalizeDate} from "../services/dateService";

describe('dateService', function () {

    it('should return correct normalized date', function () {

        const date = 'Tue Aug 22 2017 14:57:28 GMT+0200 (Central European Daylight Time)';
        const normalizedDate = '2017-8-22';

        expect(normalizeDate(new Date(date))).toEqual(normalizedDate);

    });

    it('should return correct normalized date if date is string', function () {

        const date = 'Tue Aug 22 2017 14:57:28 GMT+0200 (Central European Daylight Time)';
        const normalizedDate = '2017-8-22';

        expect(normalizeDate(date)).toEqual(normalizedDate);

    });

});