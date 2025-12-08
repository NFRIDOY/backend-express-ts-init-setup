export const Day = {
    Sat: 'Sat',
    Sun: 'Sun',
    Mon: 'Mon',
    Tue: 'Tue',
    Wed: 'Wed',
    Thu: 'Thu',
    Fri: 'Fri',
} as const; // object

// export const Day = {
//     Sat: { long: "Saturday", short: "Sat" },
//     Sun: { long: "Sunday", short: "Sun" },
//     Mon: { long: "Monday", short: "Mon" },
//     Tue: { long: "Tuesday", short: "Tue" },
//     Wed: { long: "Wednesday", short: "Wed" },
//     Thu: { long: "Thursday", short: "Thu" },
//     Fri: { long: "Friday", short: "Fri" },
//   } as const;

export const Days = Object.values(Day); // array

export type IDays = typeof Days[keyof typeof Days]; // Type