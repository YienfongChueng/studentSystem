export function filterEunmusLabel(value = '', map = {}) {
    if(value === '' || value === undefined || value === null) {
        return '--'
    }
    return map[value]
}