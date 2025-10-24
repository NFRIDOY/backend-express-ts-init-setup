// utils/auth/isJWTIssuedBeforePasswordChanged.ts

/**
 * Checks if a JWT was issued before the user's password was changed.
 * @param passwordChangedTimestamp - Date when the password was last changed
 * @param jwtIssuedTimestamp - JWT's iat (issued at) timestamp in seconds
 * @returns true if JWT was issued before password change, false otherwise
 */

export const isJWTIssuedBeforePasswordChanged = (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean => {
    const passwordChangedTime = Math.floor(passwordChangedTimestamp.getTime() / 1000);
    return passwordChangedTime > jwtIssuedTimestamp;
  };