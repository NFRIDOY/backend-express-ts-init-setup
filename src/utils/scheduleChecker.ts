import { IOfferedCourse } from "../module/offeredCourse/offeredCourse.interface";


// is schadule same
// const isDaySame = isOfferedCourseExists && arraysEqual(isOfferedCourseExists?.days, payload?.days)
// const isTimeSame = isOfferedCourseExists &&
//     isOfferedCourseExists?.startTime === payload?.startTime &&
//     isOfferedCourseExists?.endTime === payload?.endTime;

// if (isDaySame && isTimeSame) {
//     throw new AppError(
//         409,
//         'This Course is already exists in same schadule!',
//     );
// }


// Helper to check time overlap
export function isTimeOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
    return startA < endB && startB < endA;
}

// Main comparison function
export function isScheduleSame(a: IOfferedCourse, b: IOfferedCourse): boolean {
    const commonDays = a.days.filter(day => b.days.includes(day));
    if (commonDays.length === 0) return false;

    return isTimeOverlap(a.startTime, a.endTime, b.startTime, b.endTime);
}