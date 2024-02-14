export function allCaps(string: string) {
    return string
        .split('')
        .map((item) => item.toUpperCase())
        .join('')
        .toString()
}
