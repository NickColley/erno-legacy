/* jshint node: true */

var React = require('react');
var Scrambo = require('scrambo');
var ScrambleStore = require('../stores/ScrambleStore.js');

var Scramble = React.createClass({
    render: function(){
        var type = this.props.type;
        var length = this.props.length;
        var seed = this.props.seed;

        var scrambles = new Scrambo();

        if(typeof type !== "undefined")
            scrambles.type(type);

        if(typeof length !== "undefined")
            scrambles.length(length);

        if(typeof seed !== "undefined")
            scrambles.seed(seed);

        ScrambleStore.scrambles = scrambles.get().join('\n');

        return (
            <span>{ScrambleStore.scrambles}</span>
        );
    }
});

module.exports = Scramble;
