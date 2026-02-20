type AgeLabelOptions = {
    suffix?: string;
    minDigits?: number;
};

export function getFallbackInitials(name: string): string {
    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        return '';
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export function getAgeFromBirthDate(value: string | null): number {
    if (!value) {
        return 0;
    }

    const birthDate = new Date(value);
    if (Number.isNaN(birthDate.getTime())) {
        return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }

    return age >= 0 ? age : 0;
}

export function getAgeLabelFromBirthDate(value: string | null, options?: AgeLabelOptions): string {
    const age = getAgeFromBirthDate(value);
    const minDigits = options?.minDigits ?? 2;
    const suffix = options?.suffix ?? 'anos';

    return `${String(age).padStart(minDigits, '0')} ${suffix}`;
}