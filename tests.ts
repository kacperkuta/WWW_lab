// @ts-ignore
import {Fibo} from './main.ts';
import { expect } from "chai";
import "mocha";

describe("Fibonacci", () => {
    it("should equal 0 for call with 0", () => {
        expect(Fibo(0)).to.equal(0);
    });
    it("should equal 0 for call with 0", () => {
        expect(Fibo(1)).to.equal(1);
    })
});