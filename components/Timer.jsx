/* jshint node: true, browser: true */

var React = require('react');
var AppDispatcher = require('../dispatcher.js');
var Timestamp = require('./Timestamp.jsx');

var Timer = React.createClass({

    getInitialState: function(){
        return {
          time: new Date(0),
          start: null,
          timer: null
        };
    },

    componentDidMount: function() {
        document.addEventListener('keyup', function(e){
            if(e.keyCode === 32) this.handleSpace();
        }.bind(this));
    },

    componentWillUnmount: function() {
        document.removeEventListener('keyup');
    },

    handleSpace: function() {
        if(this.state.timer){

            clearTimeout(this.state.timer);
            this.setState({ timer: null });

            AppDispatcher.dispatch({
              actionType: 'solve-addition',
              time: this.state.time
            });

            this.props.onStop();

            return;
        }

        var timer = setInterval(function(){
            this.setState({ time: new Date(new Date() - this.state.start)  });
        }.bind(this), 0);

        this.setState({
          time: new Date(0),
          start: new Date(),
          timer: timer
        });
    },

    render: function() {
        return <div><Timestamp time={this.state.time} /></div>;
    }
});

module.exports = Timer;
