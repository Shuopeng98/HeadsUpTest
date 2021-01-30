cc.Class({
    extends: cc.Component,

    properties: {
        timerMax: 0,
        wordClip: 0,
    },


    onLoad() {
        cc.game.addPersistRootNode(this.node);
    },

    //start() {},

    //update(dt) {},

    RemoveDataNode: function() {
        cc.game.removePersistRootNode(this.node);
    },

    GetDataTimer: function() {
        cc.log(this.timerMax)
        return this.timerMax
    },

    SetDataTimer: function(x) {
        this.timerMax = x
        cc.log(this.timerMax)
        return this.timerMax
    },

    GetDataWordClip: function() {
        cc.log(this.wordClip)
        return this.wordClip
    },
    SetDataWordClip: function(x) {
        this.wordClip = x
        cc.log(this.wordClip)
        return this.wordClip
    },
});