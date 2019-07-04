## String-Number

This is a sample library that parses numbers that is typeof 'string', and sum them or multiply them.

## Overview
Simply instantiate a new StringNumber class and you'll have access to both `addition()` and `multiply()` functions.

# Things to note / limitations:
1. Both function takes in an Array of strings.
2. If other than strings and numbers are passed into the functions, it will be filtered out, this is done in order to simplify the code path, and restrict the amount of possibility that this class needs to handle.
3. If string contains a mixed of numbers + characters, it will be considered invalid and be filtered out. As mentioned above, filtering out some values to handle fewer code path until future iterations.
4. Decimals work for addition works to a certain degree, there may be cases that it will not produce the correct result.
5. Multiplication with decimals for large integer is currently not supported.

# To Start
1. `git clone git@github.com:juliangan07/string-number.git`
2. `nvm use`
2. `yarn`
3. `yarn test`

