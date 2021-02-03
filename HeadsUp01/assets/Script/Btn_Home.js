// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        intro_content: cc.Node,
        dataNode: cc.Node
    },

    onLoad() {
        this.audioNode = cc.find('audioNode').getComponent('AudioController')
        this.audioNode.playAudio('MX_BGM_On')
    },

    onClickButton: function(sender, str) {
        this.audioNode.playAudio('UI_Common')
        switch (str) {
            case 'start':
                this.audioNode.playAudio('MX_BGM_On')
                cc.director.loadScene('WordsChoice')
                break
            case 'intro_open':
                this.intro_content.active = true
                break
            case 'intro_close':
                this.intro_content.active = false
                break
        }

    }
});