// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        MX_BGM : cc.AudioClip,
        MX_GameOver: cc.AudioClip,

        UI_Start : cc.AudioClip,
        UI_Common : cc.AudioClip,

        UI_Combo : [cc.AudioClip],

        UI_Skip : cc.AudioClip,
        UI_CountDown_Start : cc.AudioClip,
        UI_CountDown_End : cc.AudioClip,
        UI_Skip : cc.AudioClip,

        UI_Clip:[cc.AudioClip],
        
    },


    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.combo=0
    },

    playAudio:function(name,x=-1){
        switch(name)
        {
            case 'MX_BGM_On':
                if(!cc.audioEngine.isMusicPlaying())
                {
                    cc.audioEngine.playMusic(this.MX_BGM,true)
                }
                cc.audioEngine.setMusicVolume(0.5)
                break;
            case 'MX_BGM_Off':
                if(cc.audioEngine.isMusicPlaying())
                {
                    cc.audioEngine.pauseMusic()
                }
                break;
            case 'UI_Common':
                cc.audioEngine.playEffect(this.UI_Common,false)
                break;
            case 'UI_Combo':
                this.combo++
                if(this.combo<=3)
                    cc.audioEngine.playEffect(this.UI_Combo[this.combo-1],false)
                else
                    cc.audioEngine.playEffect(this.UI_Combo[2],false)
                break;
            case 'UI_Skip':
                this.combo=0
                cc.audioEngine.playEffect(this.UI_Skip,false)
                break;
            case 'MX_GameOver':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.pauseMusic()
                cc.audioEngine.playEffect(this.MX_GameOver,false)
                break;
            case 'UI_CountDown_Start':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.setMusicVolume(0.1)
                cc.audioEngine.playEffect(this.UI_CountDown_Start,false)
                this.combo=0
                break;
            case 'UI_CountDown_end':
                if(cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.setMusicVolume(0.1)
                cc.audioEngine.playEffect(this.UI_CountDown_End,false)
                break;
            case 'PauseAll':
                cc.audioEngine.pauseAllEffects();
                cc.audioEngine.pauseMusic();
                break;
            case 'ResumeAll':
                cc.audioEngine.resumeAllEffects();
                cc.audioEngine.resumeMusic();
                break;
            case 'UI_Clip':
                if(x>=0 && this.UI_Clip!=null && x<this.UI_Clip.length )
                    cc.audioEngine.playEffect(this.UI_Clip[x],false)
                else
                    cc.audioEngine.playEffect(this.UI_Common,false)
                break;
        }
    },

});
