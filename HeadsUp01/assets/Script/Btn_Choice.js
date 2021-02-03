// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        maxTimerNum: 0,
        maxWordClips: 10
    },

    onLoad() {
        this.timer = 0
        this.clip = 0
        
    },

    start() {
        this.dataNode = cc.find('dataNode').getComponent('Data_Choice')
        this.audioNode = cc.find('audioNode').getComponent('AudioController')
    },

    update(dt) {},

    onChooseTime: function(sender, str) {
        this.audioNode.playAudio('btn')
        this.timer = (parseInt(str) <= this.maxTimerNum) ? parseInt(str) : this.maxTimerNum
        this.dataNode.SetDataTimer(this.timer)
        cc.director.loadScene('Game')
    },

    onChooseWords: function(sender, str) {
        this.audioNode.playAudio('btn')
        this.clip = (parseInt(str) < this.maxWordClips) ? parseInt(str) : 0;
        this.dataNode.SetDataWordClip(this.clip)
        cc.director.loadScene('TimeChoice')
    },

    onClickButton: function(sender, str) {
        this.audioNode.playAudio('btn')
        switch (str) {
            case 'backToHome':
                this.dataNode.RemoveDataNode();
                cc.director.loadScene('Home')
                break
            case 'backToWords':
                cc.director.loadScene('WordsChoice')
                break
        }

    },
});