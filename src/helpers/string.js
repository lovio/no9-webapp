import size from 'lodash-es/size';
import times from 'lodash-es/times';

export function maskPhone(phone) {
  return `${phone.substr(0, 3)}****${phone.substr(7, 4)}`;
}

export function maskName(name) {
  return name ? [name[0], ...times(size(name) - 1, () => '*')].join('') : '';
}

/* eslint-disable */
export function dealNumber(cents) {
  if (cents) {
    const money = String(cents / 100);
    const left = money.split('.')[0];
    let right = money.split('.')[1];
    right = right ? (right.length >= 2 ? `.${right.substr(0, 2)}` : `.${right}0`) : '.00';
    const temp = left
      .split('')
      .reverse()
      .join('')
      .match(/(\d{1,3})/g);
    return (
      (Number(money) < 0 ? '-' : '') +
      temp
        .join(',')
        .split('')
        .reverse()
        .join('') +
      right
    );
  } else if (cents === 0) {
    // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0.00';
  }
  return '';
}
