export function addMask(mask, number, start) {
  return start ? `${mask}${number}` : `${number}${mask}`;
}

export function removeMask(number) {
  return number.replace(/[^\d.-]/g, '');
}
