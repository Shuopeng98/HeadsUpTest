window.__require=function i(t,e,o){function s(n,c){if(!e[n]){if(!t[n]){var r=n.split("/");if(r=r[r.length-1],!t[r]){var d="function"==typeof __require&&__require;if(!c&&d)return d(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+n+"'")}n=r}var h=e[n]={exports:{}};t[n][0].call(h.exports,function(i){return s(t[n][1][i]||i)},h,h.exports,i,t,e,o)}return e[n].exports}for(var a="function"==typeof __require&&__require,n=0;n<o.length;n++)s(o[n]);return s}({AudioController:[function(i,t,e){"use strict";cc._RF.push(t,"ed8e6F6l7ZNb5c2Vpic+CbR","AudioController"),cc.Class({extends:cc.Component,properties:{music:cc.AudioClip,button:cc.AudioClip,right1:cc.AudioClip,right2:cc.AudioClip,right3:cc.AudioClip,wrong:cc.AudioClip,overEffect:cc.AudioClip,startEffect:cc.AudioClip,countEffect:cc.AudioClip},onLoad:function(){cc.game.addPersistRootNode(this.node),this.combo=0},playAudio:function(i){switch(i){case"music":cc.audioEngine.isMusicPlaying()||(cc.audioEngine.playMusic(this.music,!0),cc.audioEngine.setMusicVolume(.5));break;case"stopMusic":cc.audioEngine.isMusicPlaying()&&cc.audioEngine.pauseMusic();break;case"btn":cc.audioEngine.playEffect(this.button,!1);break;case"right":this.combo++,1==this.combo?cc.audioEngine.playEffect(this.right1,!1):2==this.combo?cc.audioEngine.playEffect(this.right2,!1):cc.audioEngine.playEffect(this.right3,!1);break;case"wrong":this.combo=0,cc.audioEngine.playEffect(this.wrong,!1);break;case"over":cc.audioEngine.isMusicPlaying()&&cc.audioEngine.pauseMusic(),cc.audioEngine.playEffect(this.overEffect,!1);break;case"start":cc.audioEngine.isMusicPlaying()&&cc.audioEngine.setMusicVolume(.3),cc.audioEngine.playEffect(this.startEffect,!1),this.combo=0;break;case"count":cc.audioEngine.isMusicPlaying()&&cc.audioEngine.setMusicVolume(.1),cc.audioEngine.playEffect(this.countEffect,!1);break;case"pauseAll":cc.audioEngine.pauseAllEffects();break;case"resumeAll":cc.audioEngine.resumeAllEffects()}}}),cc._RF.pop()},{}],Btn_Choice:[function(i,t,e){"use strict";cc._RF.push(t,"7dbafkK025IboelvcfDskbW","Btn_Choice"),cc.Class({extends:cc.Component,properties:{maxTimerNum:0,maxWordClips:10},onLoad:function(){this.timer=0,this.clip=0},start:function(){this.dataNode=cc.find("dataNode").getComponent("Data_Choice"),this.audioNode=cc.find("audioNode").getComponent("AudioController")},update:function(i){},onChooseTime:function(i,t){this.audioNode.playAudio("btn"),this.timer=parseInt(t)<=this.maxTimerNum?parseInt(t):this.maxTimerNum,this.dataNode.SetDataTimer(this.timer),cc.director.loadScene("Game")},onChooseWords:function(i,t){this.audioNode.playAudio("btn"),this.clip=parseInt(t)<this.maxWordClips?parseInt(t):0,this.dataNode.SetDataWordClip(this.clip),cc.director.loadScene("TimeChoice")},onClickButton:function(i,t){switch(this.audioNode.playAudio("btn"),t){case"backToHome":this.dataNode.RemoveDataNode(),cc.director.loadScene("Home");break;case"backToWords":cc.director.loadScene("WordsChoice")}}}),cc._RF.pop()},{}],Btn_Home:[function(i,t,e){"use strict";cc._RF.push(t,"7f6acCROjxE26SDeh/DKfBo","Btn_Home"),cc.Class({extends:cc.Component,properties:{intro_content:cc.Node,dataNode:cc.Node},onLoad:function(){this.audioNode=cc.find("audioNode").getComponent("AudioController")},onClickButton:function(i,t){switch(this.audioNode.playAudio("btn"),t){case"start":this.audioNode.playAudio("music"),cc.director.loadScene("WordsChoice");break;case"intro_open":this.intro_content.active=!0;break;case"intro_close":this.intro_content.active=!1}}}),cc._RF.pop()},{}],Data_Choice:[function(i,t,e){"use strict";cc._RF.push(t,"55873AK4ABKf7ILDH4lrsdF","Data_Choice"),cc.Class({extends:cc.Component,properties:{timerMax:0,wordClip:0},onLoad:function(){cc.game.addPersistRootNode(this.node)},RemoveDataNode:function(){cc.game.removePersistRootNode(this.node)},GetDataTimer:function(){return cc.log(this.timerMax),this.timerMax},SetDataTimer:function(i){return this.timerMax=i,cc.log(this.timerMax),this.timerMax},GetDataWordClip:function(){return cc.log(this.wordClip),this.wordClip},SetDataWordClip:function(i){return this.wordClip=i,cc.log(this.wordClip),this.wordClip}}),cc._RF.pop()},{}],GameManager:[function(i,t,e){"use strict";cc._RF.push(t,"6bb24nimbZOFIcX0Ju7vH9m","GameManager"),cc.Class({extends:cc.Component,properties:{timerBar:cc.ProgressBar,tipLayout:cc.Node,readyLayout:cc.Node,finishLayout:cc.Node,gameLayout:cc.Node,pauseLayout:cc.Node,introLayout:cc.Node,timerLabel:cc.Label,finishLabel:cc.Label,wordLabel:cc.Label,wordShadowLabel:cc.Label,wordNumLabel:cc.Label,wordNumShadowLabel:cc.Label,spinLabel:cc.Label},onLoad:function(){this.dataNode=cc.find("dataNode").getComponent("Data_Choice"),this.audioNode=cc.find("audioNode").getComponent("AudioController")},handleOrientation:function(i){this.spinLabel.string="\u65cb\u8f6c\u89d2\u5ea6\uff1a z "+this.toDecimal(i.gamma)},start:function(){this.maxTime=this.dataNode.GetDataTimer(),this.nowTimer=3,this.wordClipNum=this.dataNode.GetDataWordClip(),this.ReadJson(),this.introLayout.active=!0,this.gameLayout.active=!1,this.pauseLayout.active=!1,this.readyLayout.active=!1,this.tipLayout.active=!1,this.finishLayout.active=!1,this.nowState=0,this.isTiming=!1,this.isOver=!1,this.wordsAllNum=1,this.wordsCorretNum=0,this.maxUp=50,this.minUp=70,this.maxDown=120,this.minDown=110,this.flipState=-1,this.lastNum=-1,this.isPause=!1,this.Countdown=!1},update:function(i){-1!=this.nowState||this.isOver||this.isPause?!this.isTiming||this.isOver||this.isPause||(this.nowTimer-=i,this.nowTimer<=0?(this.isOver=!0,this.timerLabel.string="0 \u79d2",this.timerBar.progress=0,this.GameOver()):(this.nowTimer<10&&!this.Countdown&&(this.audioNode.playAudio("count"),this.Countdown=!0),this.timerBar.progress=this.toDecimal(Math.ceil(this.nowTimer)/this.maxTime),this.timerLabel.string=Math.ceil(this.nowTimer).toString()+" \u79d2")):(this.nowTimer-=i,this.timerLabel.string="",this.timerBar.progress=1,this.nowTimer>0?(this.wordLabel.string=Math.ceil(this.nowTimer).toString(),this.wordShadowLabel.string=Math.ceil(this.nowTimer).toString()):(this.nowState=2,this.nowTimer=this.maxTime,this.GetNewWord(),this.wordNumLabel.string="1",this.wordNumShadowLabel.string="1")),this.wordClip.length<=0&&this.GameOver()},onDestroy:function(){"undefined"!=typeof wx&&(console.log("\u505c\u6b62\u76d1\u542c\u52a0\u901f\u5668"),wx.stopDeviceMotionListening(),wx.offDeviceMotionChange())},GameOver:function(){this.finishLayout.active||(this.finishLayout.active=!0),this.gameLayout.active=!1,this.isPause=!1,this.finishLabel.string=""+this.wordsCorretNum,this.audioNode.playAudio("over")},toDecimal:function(i){return isNaN(i)?-1:Math.round(100*i)/100},onDeviceMotionEvent:function(i){this.spinLabel.string="\u65cb\u8f6c\u89d2\u5ea6\uff1a z "+this.toDecimal(i.gamma);var t=this.toDecimal(i.gamma);(t="undefined"!=typeof wx?Math.abs(t):t<0?t+180:t)<0||0==this.nowState||this.isPause||(t<this.minDown&&t>this.minUp&&(this.flipState=0),0==this.flipState&&(t>this.maxDown?(this.flipState=1,this.Btn_FlipDown()):t<this.maxUp&&(this.flipState=-1,this.Btn_FlipUp())))},ReadJson:function(){var i=this;cc.resources.load("Dictionary0",function(t,e){switch(i.wordClipNum){case 0:i.wordClip=e.json.A0007.Words;break;case 1:i.wordClip=e.json.A0006.Words;break;case 2:i.wordClip=e.json.A0005.Words;break;case 3:i.wordClip=e.json.A0009.Words;break;case 4:i.wordClip=e.json.A0003.Words;break;case 5:i.wordClip=e.json.A0001.Words;break;case 6:i.wordClip=e.json.A0004.Words;break;case 7:i.wordClip=e.json.A00011.Words;break;case 8:i.wordClip=e.json.A00002.Words;break;case 9:i.wordClip=e.json.A00012.Words}})},GetNewWord:function(){var i=Math.floor(Math.random()*this.wordClip.length);this.lastNum=i;var t=this.wordClip[i];if(this.wordLabel.string=this.wordClip[i],this.wordShadowLabel.string=this.wordClip[i],this.wordClip.splice(i,1),t.length<=4)this.wordLabel.fontSize=250,this.wordLabel.lineHeight=250,this.wordShadowLabel.fontSize=250,this.wordShadowLabel.lineHeight=250;else if(5==t.length)this.wordLabel.fontSize=200,this.wordLabel.lineHeight=200,this.wordShadowLabel.fontSize=200,this.wordShadowLabel.lineHeight=200;else if(this.wordLabel.fontSize=160,this.wordLabel.lineHeight=160,this.wordShadowLabel.fontSize=160,this.wordShadowLabel.lineHeight=160,t.length>6){var e="";if(-1!=t.indexOf("\uff0c")){var o=t.indexOf("\uff0c");e=t.substring(0,o)+"\n"+t.substring(o+1,t.length)}else{o=Math.ceil(t.length/2);e=t.substring(0,o)+"\n"+t.substring(o,t.length)}this.wordLabel.string=e,this.wordShadowLabel.string=e}},Btn_FlipDown:function(){if(!this.isOver)switch(this.nowState){case 1:this.gameLayout.active=!0,this.tipLayout.active&&(this.tipLayout.active=!1),this.nowState=-1,this.isTiming=!0,this.GetNewWord(),this.wordNumLabel.string="0",this.wordNumShadowLabel.string="0",this.audioNode.playAudio("start");break;case 2:this.wordsAllNum++,this.wordsCorretNum++,this.wordNumLabel.string=this.wordsAllNum,this.wordNumShadowLabel.string=this.wordsAllNum,this.GetNewWord(),this.audioNode.playAudio("right"),cc.log(this.wordsAllNum+" "+this.wordsCorretNum)}},Btn_FlipUp:function(){this.isOver||2!=this.nowState||2==this.nowState&&(this.wordsAllNum++,this.GetNewWord(),this.wordNumLabel.string=this.wordsAllNum,this.wordNumShadowLabel.string=this.wordsAllNum,this.audioNode.playAudio("wrong"),cc.log(this.wordsAllNum+" "+this.wordsCorretNum))},onClickButton:function(i,t){switch(this.audioNode.playAudio("btn"),t){case"introNext":this.introLayout.active&&(this.introLayout.active=!1),this.readyLayout.active||(this.readyLayout.active=!0);break;case"again":this.audioNode.playAudio("music"),cc.director.loadScene("Game");break;case"Home":this.dataNode.RemoveDataNode(),cc.director.loadScene("Home");break;case"ready":this.readyLayout.active&&(this.readyLayout.active=!1),this.tipLayout.active||(this.tipLayout.active=!0),this.nowState=1,this.granted();break;case"back":cc.director.loadScene("TimeChoice");break;case"pause":this.isPause=!this.isPause,this.pauseLayout.active=this.isPause,this.isPause?(this.audioNode.playAudio("stopMusic"),this.audioNode.playAudio("pauseAll")):(this.audioNode.playAudio("music"),this.audioNode.playAudio("resumeAll"));break;case"btnUp":Btn_FlipUp();break;case"btnDown":Btn_FlipDown()}},granted:function(){console.log("granting!");var i=!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);console.log("is ios "+i);var t=this;"undefined"!=typeof wx?(wx.startDeviceMotionListening(),wx.onDeviceMotionChange(function(i){t.onDeviceMotionEvent(i)})):i?window.DeviceOrientationEvent?DeviceMotionEvent.requestPermission().then(function(i){"granted"===i?window.addEventListener("deviceorientation",function(i){t.onDeviceMotionEvent(i)},!0):alert("apply permission state: "+i)}).catch(function(i){alert("error: "+i)}):console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea"):window.DeviceOrientationEvent?window.addEventListener("deviceorientation",function(i){t.onDeviceMotionEvent(i)},!0):console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea")}}),cc._RF.pop()},{}]},{},["AudioController","Btn_Choice","Btn_Home","Data_Choice","GameManager"]);