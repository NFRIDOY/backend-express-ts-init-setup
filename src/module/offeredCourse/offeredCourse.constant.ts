export const Day = {
    Sat: 'Sat' ,
    Sun: 'Sun' ,
    Mon: 'Mon' ,
    Tue: 'Tue' ,
    Wed: 'Wed' ,
    Thu: 'Thu' ,
    Fri: 'Fri',
} as const;

export const Days = Object.values(Day); // array

export const OfferedCourseStatus = {
    ACTIVE : 'ACTIVE',
    INACTIVE : 'INACTIVE',
} as const;

/** DOC: OfferedCourseStatus
 * UPCOMING -> CURRENT -> ENDED [Ireversible]
 * CLOSED <-> UPCOMING | CURRENT | ENDED [Reversible]
*/

export const OfferedCourseStatusList = Object.values(OfferedCourseStatus); // array


export const offeredCourseSearchableFields = [
    'minCredit',
    'maxCredit',
    'status',
];
