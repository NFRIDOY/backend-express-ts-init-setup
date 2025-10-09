// normal 
// function flattenNested(prefix: string, obj: Record<string, unknown>): Record<string, unknown> {
//   return Object.fromEntries(
//     Object.entries(obj).map(([key, value]) => [`${prefix}.${key}`, value])
//   );
// }

// Nested
function flattenNestedDeepKey(prefix: string, obj: Record<string, any>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
        const fullKey = `${prefix}.${key}`;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenNestedDeepKey(fullKey, value));
        } else {
            result[fullKey] = value;
        }
    }

    return result;
}

export default flattenNestedDeepKey;

/**
* Recursively flattens a nested object into a single-level object
* where each key is a dot-separated path representing its original location.
*
* Example:
* Input:
* {
*   guardian: {
*     name: {
*       firstName: "Ali",
*       lastName: "Khan"
*     },
*     phone: "01712345678"
*   }
* }
*
* Output:
* {
*   "guardian.name.firstName": "Ali",
*   "guardian.name.lastName": "Khan",
*   "guardian.phone": "01712345678"
* }
*
* @param prefix - The current path prefix (e.g., "guardian", "student.name")
* @param obj - The object to flatten
* @returns A flat object with dot-separated keys
*/
