/** Arithmetic parser for practice tools. No JavaScript evaluation is used. */
export function calculateExpression(expression: string): number {
  const source = expression.replace(/\s/g, '');
  if (!source || source.length > 100 || !/^[\d.+\-*/()]+$/.test(source))
    throw new Error('Enter numbers and +, −, ×, or ÷.');
  let position = 0;
  function factor(depth: number): number {
    if (depth > 20) throw new Error('The expression is too complex.');
    const token = source[position];
    if (token === '+' || token === '-') {
      position++;
      return (token === '-' ? -1 : 1) * factor(depth + 1);
    }
    if (token === '(') {
      position++;
      const value = sum(depth + 1);
      if (source[position++] !== ')') throw new Error('Check the brackets.');
      return value;
    }
    const match = source.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (!match) throw new Error('Check your expression.');
    position += match[0].length;
    return Number(match[0]);
  }
  function product(depth: number): number {
    let value = factor(depth);
    while (source[position] === '*' || source[position] === '/') {
      const operation = source[position++],
        right = factor(depth);
      if (operation === '/' && right === 0)
        throw new Error('Cannot divide by zero.');
      value = operation === '*' ? value * right : value / right;
    }
    return value;
  }
  function sum(depth: number): number {
    let value = product(depth);
    while (source[position] === '+' || source[position] === '-') {
      const operation = source[position++],
        right = product(depth);
      value = operation === '+' ? value + right : value - right;
    }
    return value;
  }
  const value = sum(0);
  if (position !== source.length || !Number.isFinite(value))
    throw new Error('Check your expression.');
  return Number(value.toPrecision(12));
}
