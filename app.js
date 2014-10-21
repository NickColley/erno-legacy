
/** @jsx React.DOM */
var React = require('react');
var Scrambo = require('scrambo');

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

        return (
            <div>{scrambles.get().join('\n')}</div>
        );
    }
});

var App = React.createClass({

    componentDidMount: function() {
        document.addEventListener('keyup', function(e){
            if(e.keyCode === 32) this.handleSpace();
        }.bind(this));
    },

    componentWillUnmount: function() {
        document.removeEventListener('keyup');
    },

    getInitialState: function(){
        return {
            type: '333',
            length: 20,
            seed: 1,
        };
    },

    handleSpace: function(){
        this.setState({ seed: Date.now() });
    },

    handleChange: function(e){
        this.setState({ type: e.target.value });
    },

    render: function(){
        return (
            <div>
                <h1>Erno</h1>
                <h2>
                    <Scramble
                        type={this.state.type}
                        length={this.state.length}
                        seed={this.state.seed}
                    />
                </h2>
                <label>Type:</label>
                <select value={this.state.type} onChange={this.handleChange}>
                    <option value="333">333</option>
                    <option value="444">444</option>
                    <option value="222">222</option>
                </select>
            </div>
        );
    }
});

React.renderComponent(<App/>, document.getElementById('app'));
