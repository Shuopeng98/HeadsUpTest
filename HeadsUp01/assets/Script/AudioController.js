// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        music : cc.AudioClip,
        button : cc.AudioClip,

        right1 : cc.AudioClip,
        right2 : cc.AudioClip,
        right3 : cc.AudioClip,
        wrong : cc.AudioClip,

        overEffect : cc.AudioClip,
        startEffect : cc.AudioClip,
        countEffect : cc.AudioClip,
    },


    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.combo=0
    },

    playAudio:function(x){
        switch(x)
        {
            case 'music':
                if(!cc.audioEngine.isMusicPlaying())
                {
                    cc.audioEngine.playMusic(this.music,true)
                    cc.audioEngine.setMusicVolume(0.5)
                }
                break;
            case 'stopMusic':
                if(cc.audioEngine.isMusicPlaying())
                {
                    cc.audioEngine.pauseMusic()
                }
                break;
            case 'btn':
                cc.audioEngine.playEffect(this.button,false)
                break;
            case 'right':
                this.combo++
                if(this.combo==1)
                    cc.audioEngine.playEffect(this.right1,false)
                else if(this.combo==2)
                    cc.audioEngine.playEffect(this.right2,false)
                else
                    cc.audioEngine.playEffect(this.right3,false)
                break;
            case 'wrong':
                this.combo=0
                cc.audioEngine.playEffect(this.wrong,false)
                break;
            case 'over':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.pauseMusic()
                cc.audioEngine.playEffect(this.overEffect,false)
                break;
            case 'start':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.setMusicVolume(0.3)
                cc.audioEngine.playEffect(this.startEffect,false)
                this.combo=0
                break;
            case 'count':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.setMusicVolume(0.1)
                cc.audioEngine.playEffect(this.countEffect,false)
                break;
            case 'pauseAll':
                cc.audioEngine.pauseAllEffects();
                break;
            case 'resumeAll':
                cc.audioEngine.resumeAllEffects();
                break;
        }
    },

});
