"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('utils function test', function () {
    it('convert object to querystring', function () {
        var obj = {
            id: '1',
            number: 12,
            message: '你好'
        };
        expect(index_1.objectToQS(obj)).toBe('id=1&number=12&message=%E4%BD%A0%E5%A5%BD');
    });
});
