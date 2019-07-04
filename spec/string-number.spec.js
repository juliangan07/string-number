'use strict';

const StringNumber = require('../string-number');

describe('StringNumber class', () => {
  let stringNumber;

  beforeEach(() => {
    stringNumber = new StringNumber();
  });

  describe('#addition,', () => {
    beforeEach(() => {
      spyOn(stringNumber, 'parseStringToNumber').and.callThrough();
      spyOn(stringNumber, 'additionSmInt').and.callThrough();
      spyOn(stringNumber, 'additionLgInt').and.callThrough();
      spyOn(stringNumber, 'containsLargeInt').and.callThrough();
    })

    it('test case #1 - "1" + "2" = "3"', () => {
      const terms = ["1", "2"];
      console.time('Test Case #1');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #1');

      expect(result).toEqual('3');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #2 - no input incoming input found', () => {
      console.time('Test Case #2');
      const result = stringNumber.addition();
      console.timeEnd('Test Case #2');

      expect(result).toEqual('0');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalled();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalledWith();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

    it('test case #3 - "6" + "7" = "13"', () => {
      const terms = ["6", "7"];
      console.time('Test Case #3');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #3');

      expect(result).toEqual('13');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #4 - "123" + "9" = "132"', () => {
      const terms = ["123", "9"];
      console.time('Test Case #4');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #4');

      expect(result).toEqual('132');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #5 - "11111111111111111111" + "22222222222222222222" = "33333333333333333333"', () => {
      const terms = ['11111111111111111111', '22222222222222222222']
      console.time('Test Case #5');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #5');

      expect(result).toEqual('33333333333333333333');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalledWith();
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).toHaveBeenCalledWith(terms);
    });

    it('test case #6 - "a" + "1" = "1"', () => {
      const terms = ["a", "1"];
      console.time('Test Case #6');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #6');

      expect(result).toEqual('1');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #7 - "a9" + "13" = "13"', () => {
      const terms = ["a9", "13"];
      console.time('Test Case #7');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #7');

      expect(result).toEqual('13');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #8 - "-9" + "13" = "4"', () => {
      const terms = ["-9", "13"];
      console.time('Test Case #8');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #8');

      expect(result).toEqual('4');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #9 - "-200" = "-200"', () => {
      const terms = ["-200"];
      console.time('Test Case #9');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #9');

      expect(result).toEqual('-200');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalledWith();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #10 - input is not a list', () => {
      console.time('Test Case #10');
      const result = stringNumber.addition(5);
      console.timeEnd('Test Case #10');

      expect(result).toEqual('0');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalled();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

   it('test case #11 - "200" + "1.3" = "-200"', () => {
      const terms = ['200', '1.3'];
      console.time('Test Case #11');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #11');

      expect(result).toEqual('201.3');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

    it('test case #12 - "78492579273482934" + "7289347928457824" = "85781927201940758"', () => {
      const terms = ['78492579273482934', '7289347928457824'];
      console.time('Test Case #12');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #12');

      expect(result).toEqual('85781927201940758');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).toHaveBeenCalledWith(terms);
    });

    it('test case #13 - "78492579273482934" + 7289347928457 = "85781927201940758"', () => {
      const terms = ['78492579273482934', 7289347928457];
      console.time('Test Case #13');
      const result = stringNumber.addition(terms);
      console.timeEnd('Test Case #13');


      expect(result).toEqual('78499868621411391');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).toHaveBeenCalledWith(terms);
    });
  })

  describe('#multiply,', () => {
    beforeEach(() => {
      spyOn(stringNumber, 'parseStringToNumber').and.callThrough();
      spyOn(stringNumber, 'multiplySmInt').and.callThrough();
      spyOn(stringNumber, 'containsLargeInt').and.callThrough();
    })

    it('test case #14 = "200" * "2" = "400"', () => {
      const terms = ['200', '2'];
      const result = stringNumber.multiply(terms);

      expect(result).toEqual('400');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.multiplySmInt).toHaveBeenCalledWith(terms);
    });

    it('test case #15 = "8403029" * "20" = "168060580"', () => {
      const terms = ['8403029', '20'];
      console.time('Test Case #15');
      const result = stringNumber.multiply(terms);
      console.timeEnd('Test Case #15');

      expect(result).toEqual('168060580');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.multiplySmInt).toHaveBeenCalledWith(terms);
    });

    it('test case #16 = "8888888888888" * "15" = "25694418708090"', () => {
      const terms = ['8888888888888', '13'];
      console.time('Test Case #15');
      const result = stringNumber.multiply(terms);
      console.timeEnd('Test Case #15');

      expect(result).toEqual('115555555555544');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.multiplySmInt).toHaveBeenCalledWith(terms);
    });
  });
});
