export const Status = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
} as const;

export const EnrolledCourseStatusList = Object.values(Status); // array


export const enrolledCourseSearchableFields = [
    'studentId',
    'status',
];

export const StatusCourseMarksObject = {
    unavailable: "unavailable",
    available: "available",
} as const;

export const GradeObject = {
    APlus: "A+",
    A: "A",
    AMinus: "A-",
    BPlus: "B+",
    B: "B",
    BMinus: "B-",
    CPlus: "C+",
    C: "C",
    CMinus: "C-",
    D: "D",
    F: "F",
    NA: "N/A",
} as const;


// export const GradeMarks = {
//     [GradeObject.APlus]: "90-100",
//     [GradeObject.A]: "85-89",
//     [GradeObject.AMinus]: "80-84",
//     [GradeObject.BPlus]: "75-79",
//     [GradeObject.B]: "70-74",
//     [GradeObject.BMinus]: "65-69",
//     [GradeObject.CPlus]: "60-64",
//     [GradeObject.C]: "55-59",
//     [GradeObject.CMinus]: "50-54",
//     [GradeObject.D]: "40-49",
//     [GradeObject.F]: "0-39",
//     [GradeObject.NA]: "Not Applicable",
//   } as const;

// export const GradeMarks = {
//     [GradeObject.APlus]: [90, 100],
//     [GradeObject.A]: [85, 89],
//     [GradeObject.AMinus]: [80, 84],
//     [GradeObject.BPlus]: [75, 79],
//     [GradeObject.B]: [70, 74],
//     [GradeObject.BMinus]: [65, 69],
//     [GradeObject.CPlus]: [60, 64],
//     [GradeObject.C]: [55, 59],
//     [GradeObject.CMinus]: [50, 54],
//     [GradeObject.D]: [40, 49],
//     [GradeObject.F]: [0, 39],
//     [GradeObject.NA]: [],
//   } as const;

// export const GradeMarks = {
//     [GradeObject.APlus]: 95,
//     [GradeObject.A]: 87,
//     [GradeObject.AMinus]: 82,
//     [GradeObject.BPlus]: 77,
//     [GradeObject.B]: 72,
//     [GradeObject.BMinus]: 67,
//     [GradeObject.CPlus]: 62,
//     [GradeObject.C]: 57,
//     [GradeObject.CMinus]: 52,
//     [GradeObject.D]: 45,
//     [GradeObject.F]: 20,
//     [GradeObject.NA]: null,
// } as const;

// // GradeMarks with minimum values
// // NEXT: Dynamic
export const GradeMarks = {
    [GradeObject.APlus]: "90",
    [GradeObject.A]: "85",
    [GradeObject.AMinus]: "80",
    [GradeObject.BPlus]: "75",
    [GradeObject.B]: "70",
    [GradeObject.BMinus]: "65",
    [GradeObject.CPlus]: "60",
    [GradeObject.C]: "55",
    [GradeObject.CMinus]: "50",
    [GradeObject.D]: "40",
    [GradeObject.F]: "0",
    [GradeObject.NA]: "N/A",
  } as const;

// console.log(GradeMarks["A+"]);   // 95

// console.log(GradeMarks[GradeObject.APlus]);   // 95
// console.log(GradeMarks[GradeObject.CMinus]);  // 52