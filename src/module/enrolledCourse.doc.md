# 📘 Enrolled Course Services Documentation

This module provides services for managing student course enrollments and updating course marks in a university semester registration system.

## 📦 Module Overview

- **File**: `enrolledCourse.service.ts`
- **Dependencies**:
  - `mongoose` for transaction handling
  - `http-status` for standardized HTTP status codes
  - `AppError` for custom error handling
  - Models: `Course`, `Faculty`, `OfferedCourse`, `SemesterRegistration`, `Student`, `EnrolledCourse`
  - Utility: `calculateGradeAndPoints`

---

## 🔧 Functions

### 1. `createEnrolledCourseIntoDB(userId: string, payload: TEnrolledCourse)`

Enrolls a student into an offered course after performing several validations.

#### ✅ Steps:
1. **Validate Offered Course**:
   - Check if the course exists.
   - Ensure the course has available capacity.

2. **Validate Student**:
   - Confirm the student exists.
   - Ensure the student is not already enrolled in the course.

3. **Credit Limit Check**:
   - Calculate total enrolled credits.
   - Ensure adding the new course does not exceed the semester's `maxCredit`.

4. **Enroll Student**:
   - Start a MongoDB session and transaction.
   - Create the `EnrolledCourse` document.
   - Decrease the `maxCapacity` of the offered course.
   - Commit the transaction.

#### ⚠️ Throws:
- `AppError` with appropriate HTTP status if any validation fails.

#### 📤 Returns:
- The created `EnrolledCourse` document.

---

### 2. `updateEnrolledCourseMarksIntoDB(facultyId: string, payload: Partial<TEnrolledCourse>)`

Allows a faculty member to update a student's course marks and calculate final grade.

#### ✅ Steps:
1. **Validate Entities**:
   - Check if semester registration, offered course, student, and faculty exist.
   - Ensure the course belongs to the requesting faculty.

2. **Update Marks**:
   - If `finalTerm` is present, calculate total marks and derive grade and grade points.
   - Update the `courseMarks` fields dynamically.

3. **Update Document**:
   - Apply updates to the `EnrolledCourse` document.

#### ⚠️ Throws:
- `AppError` if any entity is not found or access is unauthorized.

#### 📤 Returns:
- The updated `EnrolledCourse` document.

---

## 🧠 Utility Used

### `calculateGradeAndPoints(totalMarks: number)`
- Computes the letter grade and grade points based on total marks.
- Used when `finalTerm` marks are submitted.

---

## 🗂️ Exported Service

```ts
export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
```

---

