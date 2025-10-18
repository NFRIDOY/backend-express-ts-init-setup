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

export const OfferdCoursesStatus = {
    ACTIVE : 'ACTIVE',
    INACTIVE : 'INACTIVE',
} as const;

/** DOC: OfferdCoursesStatus
 * UPCOMING -> CURRENT -> ENDED [Ireversible]
 * CLOSED <-> UPCOMING | CURRENT | ENDED [Reversible]
*/

export const OfferdCoursesStatusList = Object.values(OfferdCoursesStatus); // array


export const offerdCoursesSearchableFields = [
    'minCredit',
    'maxCredit',
    'status',
];
