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
      const result = stringNumber.addition(terms);

      expect(result).toEqual('3');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #2 - no input incoming input found', () => {
      const result = stringNumber.addition();

      expect(result).toEqual('0');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalled();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalledWith();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

    it('test case #3 - "6" + "7" = "13"', () => {
      const terms = ["6", "7"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('13');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #4 - "123" + "9" = "132"', () => {
      const terms = ["123", "9"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('132');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #5 - "11111111111111111111" + "22222222222222222222" = "33333333333333333333"', () => {
      const terms = ['11111111111111111111', '22222222222222222222']
      const result = stringNumber.addition(terms);

      expect(result).toEqual('33333333333333333333');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalledWith();
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).not.toHaveBeenCalledWith();
      expect(stringNumber.additionLgInt).toHaveBeenCalledWith(terms);
    });

    it('test case #6 - "a" + "1" = "1"', () => {
      const terms = ["a", "1"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('1');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #7 - "a9" + "13" = "13"', () => {
      const terms = ["a9", "13"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('13');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #8 - "-9" + "13" = "4"', () => {
      const terms = ["-9", "13"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('4');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #9 - "-200" = "-200"', () => {
      const terms = ["-200"];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('-200');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalledWith();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    });

    it('test case #10 - input is not a list', () => {
      const result = stringNumber.addition(5);

      expect(result).toEqual('0');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalled();
      expect(stringNumber.containsLargeInt).not.toHaveBeenCalled();
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

   it('test case #11 - "200" + "1.3" = "-200"', () => {
      const terms = ['200', '1.3'];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('201.3');
      expect(stringNumber.parseStringToNumber).toHaveBeenCalledWith(terms);
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionLgInt).not.toHaveBeenCalled();
    })

    it('test case #12 - "78492579273482934" + "7289347928457824" = "85781927201940758"', () => {
      const terms = ['78492579273482934', '7289347928457824'];
      const result = stringNumber.addition(terms);

      expect(result).toEqual('85781927201940758');
      expect(stringNumber.parseStringToNumber).not.toHaveBeenCalledWith();
      expect(stringNumber.containsLargeInt).toHaveBeenCalledWith(terms);
      expect(stringNumber.additionSmInt).not.toHaveBeenCalled();
      expect(stringNumber.additionLgInt).toHaveBeenCalledWith(terms);
    });
  })
});
