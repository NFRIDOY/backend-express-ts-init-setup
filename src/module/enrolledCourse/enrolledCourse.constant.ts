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

export const Status = {
    ACTIVE : 'ACTIVE',
    INACTIVE : 'INACTIVE',
} as const;

/** DOC: EnrolledCourseStatus
 * UPCOMING -> CURRENT -> ENDED [Ireversible]
 * CLOSED <-> UPCOMING | CURRENT | ENDED [Reversible]
*/

export const EnrolledCourseStatusList = Object.values(Status); // array


export const enrolledCourseSearchableFields = [
    'minCredit',
    'maxCredit',
    'status',
];
