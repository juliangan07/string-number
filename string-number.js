'use strict';

/**
 * StringNumber is a class that will be able to convert strings to number
 * and perform mathematical operations, and return a string value as a result.
 */
class StringNumber {
  /**
   * This function is for string numbers smaller than 54 bits, or 16 digits.
   *
   * Take an incoming list of values, convert the values and remove ineligible values;
   * sum those values and return the string form of the sum to the caller.
   *
   * @param {Array[string | number]} terms are incoming list of values that could be of type any
   * @return {string} the sum of the incoming value that is converted back into a string
   */
  additionSmInt(terms = []) {
    /**
     * Convert all incoming terms into Number
     */
    const numberTerms = this.parseStringToNumber(terms);

    /**
     * Add up all eligible Number terms
     */
    const sumOfTerms = numberTerms.reduce((accumulator, currentVal) => {
      return accumulator + currentVal;
    })

    /**
     * Convert the result back to a string
     */
    return sumOfTerms.toString();
  }

  /**
   * Attempt to convert incoming terms into numbers, and filter out NaN values
   * @param {Array[string | number]} terms are incoming values that could possibly be of type any
   * @return {Array[Number]} An array of numbers after conversion and filtering
   */
  parseStringToNumber(terms = []) {
    /**
     * if there's no incoming input, return an empty array without further processing
     */
    if (terms.length === 0) return [];

    return terms
      .map((term) => {
        return Number(term);
      })
      .filter((numberTerm) => {
        return !Number.isNaN(numberTerm);
      });
  }

  /**
   * This function is for string numbers greater than 54 bits, or 16 digits.
   *
   * Take an incoming list of values, filter the list for strings without digits,
   * sum those values and return the string form of the sum to the caller.
   *
   * @param {Array[string | number]} terms are incoming list of values that could be of type any
   * @return {string} the sum of the incoming value that is converted back into a string
   */
  additionLgInt(terms = []) {
    /**
    * filter out all non string or number values, this will allow support
    * for a mix of string > 54 bits and numbers < 54 bits
    */
    const regex = new RegExp(/\D/g);
    const stringTerms = terms.filter((term) => {
      if (typeof term === 'number') {
        return true
      } else if (typeof term === 'string') {
        const containsNonDigits = regex.test(term);
        return !containsNonDigits;
      }

      return false;
    });

    /**
     * If there's only one element left after filter, then there's
     * nothing to sum, just return that value;
     */
    if (stringTerms.length === 1) {
      const term = stringTerms.pop();
      /**
       * if it's a number, return the string version,
       * if it's a string already, just return that.
       */
      return term.toString() || term;
    }

    /**
     * Add up all the string number values from the right to left
     */
    const sumOfTerms = stringTerms.reduce((accumulator, currentVal) => {
      let currentValueInStr;
      let accumulatorInStr;
      // convert to string if it's a number so that we can get the length
      if (typeof currentVal === 'number') {
        currentValueInStr = currentVal.toString();
      } else {
        currentValueInStr = currentVal;
      }
      if (typeof accumulator === 'number') {
        accumulatorInStr = accumulator.toString();
      } else {
        accumulatorInStr = accumulator;
      }

      let currentValIndex = currentValueInStr.length - 1;
      let accumulatorIndex = accumulatorInStr.length - 1;
      let sum = '';
      let carryOver = false;

      while (currentValIndex >= 0 || accumulatorIndex >= 0) {
        // Add digit from right to left
        const currentStr = currentValueInStr[currentValIndex];
        const accumulatorStr = accumulatorInStr[accumulatorIndex];
        let currentDigit;
        let accumulatorDigit;

        if (currentStr !== undefined) {
          currentDigit = Number(currentStr);
        }
        if (accumulatorStr !== undefined) {
          accumulatorDigit = Number(accumulatorStr);
        }

        if (!!currentDigit && !!accumulatorDigit) {
          const accumulatorDigit = Number(accumulatorStr);
          let sumOfColumn = currentDigit + accumulatorDigit;

          if (!!carryOver) {
            sumOfColumn++;
            carryOver = false;
          }

          if (sumOfColumn >= 10) {
            carryOver = true;
            sumOfColumn = sumOfColumn - 10;
          }

          sum = `${sumOfColumn.toString()}${sum}`;
        } else {
          let digitToAdd = currentDigit || accumulatorDigit;

          if (!!carryOver) {
            digitToAdd++;
            carryOver = false;
          }

          sum = `${digitToAdd.toString()}${sum}`;
        }

        currentValIndex--;
        accumulatorIndex--;
      }

      return sum;
    })

    return sumOfTerms;
  }

  /**
   * Take an incoming list of terms, sum the values and return its string form
   * @param {Array<string | number>} terms are incoming values that could possibly be of type any
   * @return string form of the sum of the incoming list
   */
  addition(terms = []) {
    /**
     * If incoming terms is not a list or has a length of 0,
     * that means there's nothing to add,
     * and the result will be 0
     */
    if (!Array.isArray(terms) || terms.length === 0) return '0';

    /**
     * If there's only one element in the incoming list,
     * assume that the sum of that list will be the first element
     * regardless of type
     */
    if (terms.length === 1) return terms.pop();

    const hasLargeInt = this.containsLargeInt(terms);

    if (hasLargeInt) {
      return this.additionLgInt(terms);
    } else {
      return this.additionSmInt(terms);
    }
  }

  /**
   * Controller to determine if incoming list contains a large integer
   * @param {Array<number | string>} terms are incoming list of values that could be of type any
   * @boolean to determine if list contains a large int that is greater than 54 bits
   */
  containsLargeInt(terms = []) {
    if (!Array.isArray(terms) || terms.length === 0) return false;

    let hasLargeInt = false;
    terms.forEach((term) => {
      if (term > Number.MAX_SAFE_INTEGER) {
        hasLargeInt = true;
        return;
      }
    });

    return hasLargeInt;
  }

  /**
   * Take an incoming list of terms, multiply the values and return its string form
   * @param {Array<string | number>} terms are incoming values that could possibly be of type any
   * @return string form of the product of the incoming list
   */
  multiply(terms = []) {
    /**
     * If incoming terms is not a list or has a length of 0,
     * that means there's nothing to multiply,
     * and the result will be 0
     */
    if (!Array.isArray(terms) || terms.length === 0) return '0';

    /**
     * If there's only one element in the incoming list,
     * assume that the product of that list will be the first element
     * regardless of type
     */
    if (terms.length === 1) return terms.pop();

    const hasLargeInt = this.containsLargeInt(terms);

    if (hasLargeInt) {
      return terms.reduce((accumulator, currentVal) => {
        const bigIntToAdd = [];
        for (let i = currentVal; i > 0; i--) {
          // ensure accumulator is always a string
          bigIntToAdd.push(accumulator.toString() || accumulator);
        }

        return this.additionLgInt(bigIntToAdd);
      });
    } else {
      return this.multiplySmInt(terms);
    }
  }

  /**
   * This function is for string numbers smaller than 54 bits, or 16 digits.
   *
   * Take an incoming list of values, convert the values and remove ineligible values;
   * multiply those values and return the string form of the product to the caller.
   *
   * @param {Array[string | number]} terms are incoming list of values that could be of type any
   * @return {string} the product of the incoming value that is converted back into a string
   */
  multiplySmInt(terms = []) {
    /**
     * Convert all incoming terms into Number
     */
    const numberTerms = this.parseStringToNumber(terms);

    /**
     * Multiply all eligible Number terms
     */
    const productOfTerms = numberTerms.reduce((accumulator, currentVal) => {
      return accumulator * currentVal;
    })

    /**
     * If the product happens to go above MAX_SAFE_INTEGER, run it through the
     * addition function to get the correct result, otherwise return the string
     * value of the product
     */
    if (productOfTerms < Number.MAX_SAFE_INTEGER) {
      /**
       * Convert the result back to a string
       */
      return productOfTerms.toString();
    } else {
      return terms.reduce((accumulator, currentVal) => {
        const bigIntToAdd = [];
        for (let i = currentVal; i > 0; i--) {
          bigIntToAdd.push(accumulator.toString() || accumulator);
        }

        return this.additionLgInt(bigIntToAdd);
      })
    }
  }
}

module.exports = StringNumber;