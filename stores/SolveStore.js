/* jshint node: true, browser: true */

var Pouchdb = require('pouchdb');

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher.js');
var assign = require('object-assign');

var ScrambleStore = require('./ScrambleStore.js');

var db = new Pouchdb('solves');

AppDispatcher.register(function(payload) {
    if (payload.actionType === 'solve-addition') {
        db.put({
            _id: Date.now().toString(),
            scramble: ScrambleStore.scrambles,
            time: payload.time
        }, function(err, res){
            if(err){
                return console.error(err);
            }
        });
    }
});

var _solves = [];

var CHANGE_EVENT = 'change';

db.changes({
    since: 'now',
    live: true
}).on('change', getAllDocs);

function getAllDocs(){
    db.allDocs({include_docs: true}, function(err, res) {
        _solves = res.rows.map(function(row){
            return row.doc;
        });
        SolveStore.emitChange();
    });
}
getAllDocs();

var SolveStore = assign({}, EventEmitter.prototype, {
    getAll : function() {
        return _solves;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    destroy: function(){
        db.destroy(function(){
            window.location.reload();
        });
    }
});

module.exports = SolveStore;
