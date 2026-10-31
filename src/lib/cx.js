/**
 * Une clases CSS ignorando los valores falsos (false, null, undefined, "").
 * cx("card", isActive && "active", className) → "card active extra"
 */
export const cx = (...classNames) => classNames.filter(Boolean).join(" ");
