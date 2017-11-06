import pingpp from 'pingpp-js';

export function createPayment(charge) {
  return new Promise(resolve => pingpp.createPayment(charge, resolve));
}
