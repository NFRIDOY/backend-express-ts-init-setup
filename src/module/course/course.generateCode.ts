// TODO: Use it

import { IName } from "../common/user/user.interface";

// DEMO
function generateCode(name: IName, existingCodes = new Set()) {
  const parts = (`${name.firstName} ${name.middleName || ''} ${name.lastName}`).trim().split(/\s+/);

  // First approach: first letter of first 3 parts
  if (parts.length >= 3) {
    const code1 = parts.slice(0, 3).map(p => p[0].toUpperCase()).join('');
    if (!existingCodes.has(code1)) return code1;
  }

  // Second approach: first 2 letters of first + first of second
  if (parts.length >= 2) {
    const code2 = parts[0].slice(0, 2).toUpperCase() + parts[1][0].toUpperCase();
    if (!existingCodes.has(code2)) return code2;
  }

  // Third approach: first of first + first 2 of second
  if (parts.length >= 2) {
    const code3 = parts[0][0].toUpperCase() + parts[1].slice(0, 2).toUpperCase();
    if (!existingCodes.has(code3)) return code3;
  }

  // Fallback: brute-force all 3-letter combinations
  for (let i = 65; i <= 90; i++) {
    for (let j = 65; j <= 90; j++) {
      for (let k = 65; k <= 90; k++) {
        const code = String.fromCharCode(i, j, k);
        if (!existingCodes.has(code)) return code;
      }
    }
  }

  throw new Error('No available 3-letter codes left');
}

// const existing = new Set([]);
// const existing = new Set(['MSA', 'MDS', 'MDA']);
// const existing = new Set(['MSA']);
// console.log(generateCode('md saladin ali', existing)); // Might return 'MSL' or next available

export default generateCode;