/* jshint node: true */

var React = require('react');

var Timestamp = React.createClass({
    pad: function(n, w) {
        n = n + '';
        return n.length >= w ? n : new Array(w - n.length + 1).join('0') + n;
    },
    render: function() {
        var time = this.props.time;
        var min = this.pad(time.getMinutes(), 2);
        var sec = this.pad(time.getSeconds(), 2);
        var mil = this.pad(time.getMilliseconds(), 3);

        var stamp = [sec, mil];

        if(min > 0){
            stamp.unshift(min);
        }

        return <span>{stamp.join(':')}</span>;
    }
});

module.exports = Timestamp;
