const VERSION = Object.freeze({
    MAJOR: 1,
    MINOR: 2,
    MICRO: 0,
    getId: function() {
        return this.MAJOR*37**2 + this.MINOR*37 + this.MICRO;
    },
    toString: function() {
        return `v${this.MAJOR}.${this.MINOR}.${this.MICRO}`;
    }
});
