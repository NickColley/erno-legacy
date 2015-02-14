/** @jsx React.DOM */

/* jshint node: true, browser: true */

var React = require('react');
var SolveStore = require('./stores/SolveStore.js');

var Timestamp = require('./components/Timestamp.jsx');
var Scramble = require('./components/Scramble.jsx');
var Timer = require('./components/Timer.jsx');
var Solves = require('./components/Solves.jsx');

var style = {
    app: {
        padding: "20px"
    },
    logo: {
        float: "left",
        width: "5em",
        marginBottom: "20px",
        marginRight: "10px"
    },
    scramble: {
        float: "right"
    },
    timer: {
        textAlign: "center",
        fontSize: "15vw"
    }
};

var App = React.createClass({

    getInitialState: function(){
        return {
            type: '333',
            length: 20,
            seed: Date.now()
        };
    },

    handleStop: function(){
        this.setState({ seed: Date.now() });
    },

    handleChange: function(e){
        this.setState({ type: e.target.value });
    },

    handleDestroy: function(){
        SolveStore.destroy();
    },

    render: function(){
        return (
            <div style={style.app}>
                <img onClick={this.handleDestroy} style={style.logo} src="erno.svg" />
                <h1 style={{float: "left"}}>Erno</h1>
                <hr style={{clear: "both"}} />
                <label>Type:</label>
                <select value={this.state.type} onChange={this.handleChange}>
                    <option value="333">333</option>
                    <option value="444">444</option>
                    <option value="222">222</option>
                </select>
                <h3>
                    Scramble:
                    <span style={style.scramble}>
                        <Scramble
                            type={this.state.type}
                            length={this.state.length}
                            seed={this.state.seed}
                        />
                    </span>
                </h3>
                <h1 style={style.timer}><Timer onStop={this.handleStop} /></h1>
                <hr />
                <h3>Solves:</h3>
                <Solves />
            </div>
        );
    }
});

React.renderComponent(<App/>, document.getElementById('app'));
