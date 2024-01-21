export class helperService {
    /**
     * Convert object to query string
     * @param {Object} obj
     * @returns {string}
     */
    static serialize(obj) {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return '';
        }
        return (
            '?' +
            Object.keys(obj)
                .reduce((a, k) => {
                    a.push(k + '=' + encodeURIComponent(obj[k]));
                    return a;
                }, [])
                .join('&')
        );
    }
}