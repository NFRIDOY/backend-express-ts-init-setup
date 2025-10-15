
export const SemesterRegistrationStatus = {
    UPCOMING: 'UPCOMING',
    CURRENT: 'CURRENT',
    CLOSED: 'CLOSED',
} as const;

export const SemisterRegistrationStatusList = Object.values(SemesterRegistrationStatus); // array


export const semesterRegistrationSearchableFields = [
    'minCredit',
    'maxCredit',
    'status',
];
