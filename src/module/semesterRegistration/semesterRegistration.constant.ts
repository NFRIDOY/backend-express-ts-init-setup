
export const SemesterRegistrationStatus = {
    UPCOMING: 'UPCOMING',
    CURRENT: 'CURRENT',
    ENDED: 'ENDED',
    CLOSED: 'CLOSED',
} as const;

/** DOC: SemesterRegistrationStatus
 * UPCOMING -> CURRENT -> ENDED [Ireversible]
 * CLOSED <-> UPCOMING | CURRENT | ENDED [Reversible]
*/

export const SemesterRegistrationStatusList = Object.values(SemesterRegistrationStatus); // array


export const semesterRegistrationSearchableFields = [
    'minCredit',
    'maxCredit',
    'status',
];
