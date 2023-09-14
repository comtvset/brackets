module.exports = function check(str, bracketsConfig) {
  const OPEN = ['(', '[', '{', '1', '3', '5', '7', '8', '|'];
  const CLOSE = {
    [')']: '(',
    [']']: '[',
    ['}']: '{',
    ['2']: '1',
    ['4']: '3',
    ['6']: '5',
    ['7']: 'open7',
    ['8']: 'open8',
    ['|']: 'open|',
  };

  let stack = [];
  let newStr = str.split('');

  for (let i = 0; i < newStr.length; i++) {
    let cur = newStr[i];

    if (OPEN.includes(cur)) {
      if(cur === '|') {
        if(stack.includes('open|')) {
          stack.pop();
        } else {stack.push('open|')}
      }
      else if(cur === '7') {
        if(stack.includes('open7')) {
          stack.pop();
        } else {stack.push('open7')}
      }
      else if(cur === '8') {
        if(stack.includes('open8')) {
          stack.pop();
        } else {stack.push('open8')}
      }
      else {stack.push(cur)}
    } else {
      if (stack.length === 0) {
        return false;
      }

      let topEl = stack[stack.length - 1];

      if (CLOSE[cur] === topEl) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
