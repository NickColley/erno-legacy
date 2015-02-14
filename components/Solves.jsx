/* jshint node: true */

var React = require('react');
var SolveStore = require('../stores/SolveStore.js');
var Timestamp = require('./Timestamp.jsx');

var Solves = React.createClass({
    getInitialState: function(){
        return { solves: SolveStore.getAll() };
    },

    componentDidMount: function() {
        SolveStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SolveStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({ solves: SolveStore.getAll() });
    },

    render: function(){
        var solves = this.state.solves.map(function(solve){
            return <span>
                <Timestamp time={solve.time} />
                {' '}
            </span>;
        });
        return <div>{solves}</div>;
    }
});

module.exports = Solves;
