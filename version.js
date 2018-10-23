const VERSION = Object.freeze({
    MAJOR: 1,
    MINOR: 0,
    MICRO: 2,
    getId: function() {
        return this.MAJOR*37**2 + this.MINOR*37 + this.MICRO;
    },
    toString: function() {
        return `v${this.MAJOR}.${this.MINOR}.${this.MICRO}`;
    }
});