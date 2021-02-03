// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        countDownTime: 10,
        timerBar:cc.ProgressBar,
        tipLayout: cc.Node,
        readyLayout: cc.Node,
        finishLayout: cc.Node,
        gameLayout: cc.Node,
        pauseLayout: cc.Node,
        introLayout: cc.Node,

        timerLabel: cc.Label,
        finishLabel: cc.Label,
        wordLabel: cc.Label,
        wordShadowLabel: cc.Label,
        wordNumLabel: cc.Label,
        wordNumShadowLabel: cc.Label,

        spinLabel: cc.Label,
    },


    onLoad() {
        this.dataNode = cc.find('dataNode').getComponent('Data_Choice')
        this.audioNode = cc.find('audioNode').getComponent('AudioController')
        /*
        let self = this
        wx.startDeviceMotionListening()
        wx.onDeviceMotionChange(function (res) {
            self.onDeviceMotionEvent(res)
        })
        */
    },

    handleOrientation:function(event) {
        this.spinLabel.string = '旋转角度： z ' + this.toDecimal(event.gamma)
      },

    start() {
        this.maxTime = this.dataNode.GetDataTimer()
        this.nowTimer = 3
        this.lastTimer = this.countDownTime
        this.wordClipNum=this.dataNode.GetDataWordClip()
        this.ReadJson()
        this.introLayout.active = true
        this.gameLayout.active = false
        this.pauseLayout.active = false
        this.readyLayout.active = false
        this.tipLayout.active = false
        this.finishLayout.active = false
        this.nowState = 0
        this.isTiming = false
        this.isOver = false
        this.wordsAllNum = 1
        this.wordsCorretNum = 0
        this.maxUp = 50
        this.minUp = 70
        this.maxDown = 120
        this.minDown = 110
        this.flipState = -1
        this.lastNum = -1
        this.isPause = false
    },

    update(dt) {
        //this.spinLabel.string = '角度：x '+ this.x+'  y '+this.y+'  z '+this.z
        if(this.nowState==-1 && !this.isOver && !this.isPause)
        {
            this.nowTimer-=dt
            this.timerLabel.string =''
            this.timerBar.progress = 1
            if(this.nowTimer>0)
            {
                this.wordLabel.string = Math.ceil(this.nowTimer).toString()
                this.wordShadowLabel.string = Math.ceil(this.nowTimer).toString()
            } else {
                this.nowState = 2
                this.nowTimer = this.maxTime
                this.lastTimer = this.countDownTime
                this.GetNewWord()
                this.wordNumLabel.string = '1'
                this.wordNumShadowLabel.string = '1'
            }
        }
        else if (this.isTiming && !this.isOver && !this.isPause) {
            this.nowTimer -= dt
            if (this.nowTimer <= 0) {
                this.isOver = true
                this.timerLabel.string = '0 秒'
                this.timerBar.progress = 0
                this.GameOver()
            } else {
                //时间显示
                if( this.nowTimer<=this.lastTimer)
                {
                    this.lastTimer--
                    this.audioNode.playAudio('UI_CountDown_end')
                }
                this.timerBar.progress = this.toDecimal(Math.ceil(this.nowTimer)/this.maxTime)
                this.timerLabel.string = Math.ceil(this.nowTimer).toString() + ' 秒'
            }
        }
        if(this.wordClip.length<=0){
            this.GameOver();
        }
    },

    onDestroy () {
            if(typeof(wx) != "undefined"){
                console.log("停止监听加速器")
                //wx.stopAccelerometer()
                wx.stopDeviceMotionListening()
                wx.offDeviceMotionChange()
            }
    },

    GameOver: function() {
        if (!this.finishLayout.active)
            this.finishLayout.active = true
        this.gameLayout.active = false
        this.isPause = false
        this.finishLabel.string = ''+this.wordsCorretNum
        this.audioNode.playAudio('MX_GameOver')
    },

    
    toDecimal:function(x) { 
        if (isNaN(x)) { 
          return -1; 
        }
        var f = Math.round(x*100)/100; 
        return f;
    },

    onDeviceMotionEvent:function (res) {
        this.spinLabel.string = '旋转角度： z ' + this.toDecimal(res.gamma)

        var angle = this.toDecimal(res.gamma);
        if(typeof(wx) != "undefined")
        {
            angle = Math.abs(angle)
        }
        else{
            angle = angle<0?angle+180:angle
        }
        if(angle < 0 ||this.nowState==0||this.isPause) return
        
        if(angle < this.minDown && angle > this.minUp){
            this.flipState = 0
        }
        
        if(this.flipState == 0){
            if(angle>this.maxDown){
                this.flipState = 1
                this.Btn_FlipDown()
            }
            else if(angle<this.maxUp){
                this.flipState = -1
                this.Btn_FlipUp()
            }
        }
    },

    ReadJson: function(){
        var self=this;
        cc.resources.load("Dictionary0",function(err,jsonAsset){
            switch(self.wordClipNum){
                case 0:
                //全家一起玩
                self.wordClip=jsonAsset.json.A0007.Words;
                break;
                case 1:
                //都是干饭人
                self.wordClip=jsonAsset.json.A0006.Words;
                break;
                case 2:
                //我最时尚
                self.wordClip=jsonAsset.json.A0005.Words;
                break;
                case 3:
                //头号玩家
                self.wordClip=jsonAsset.json.A0009.Words;
                break;
                case 4:
                //动物王国
                self.wordClip=jsonAsset.json.A0003.Words;
                break;
                case 5:
                //网上冲浪
                self.wordClip=jsonAsset.json.A0001.Words;
                break;
                case 6:
                //科技百事通
                self.wordClip=jsonAsset.json.A0004.Words;
                break;
                case 7:
                //传统文化
                self.wordClip=jsonAsset.json.A00011.Words;
                break;
                case 8:
                //成语
                self.wordClip=jsonAsset.json.A00002.Words;
                break;
                case 9:
                //俗语
                self.wordClip=jsonAsset.json.A00012.Words;
                break;
            }
        })
    },
    GetNewWord: function(){
        var num=Math.floor(Math.random()*this.wordClip.length);
        this.lastNum=num;
        var text = this.wordClip[num];
        this.wordLabel.string=this.wordClip[num];
        this.wordShadowLabel.string=this.wordClip[num];
        this.wordClip.splice(num,1);
        //字体调整
        if(text.length<=4){
            this.wordLabel.fontSize = 250
            this.wordLabel.lineHeight = 250
            this.wordShadowLabel.fontSize = 250
            this.wordShadowLabel.lineHeight = 250
        }else if(text.length==5){
            this.wordLabel.fontSize = 200
            this.wordLabel.lineHeight = 200
            this.wordShadowLabel.fontSize = 200
            this.wordShadowLabel.lineHeight = 200
        }else{
            this.wordLabel.fontSize = 160
            this.wordLabel.lineHeight = 160
            this.wordShadowLabel.fontSize = 160
            this.wordShadowLabel.lineHeight = 160
            if(text.length>6)
            {
                var newText =''
                if(text.indexOf("，")!=-1){
                    var num1 = text.indexOf("，")
                    newText = text.substring(0,num1)+'\n'+text.substring(num1+1,text.length);
                }else{
                    var num1 = Math.ceil(text.length/2)
                    newText = text.substring(0,num1)+'\n'+text.substring(num1,text.length);
                }
                
                this.wordLabel.string = newText
                this.wordShadowLabel.string = newText
            }
        }
        
    },

    /*GetNewWord0: function() {
        var index = Math.floor(Math.random() * this.wordsNum)
        if(this.lastNum==index)
            index = Math.floor(Math.random() * this.wordsNum)
        if(this.lastNum==index)
            index = Math.floor(Math.random() * this.wordsNum)
        this.lastNum = index
        this.wordLabel.string = this.wordClip[index]
    },*/


    Btn_FlipDown: function() {
        if (this.isOver)
            return;
        switch (this.nowState) {
            case 1:
                //开始游戏
                this.gameLayout.active = true
                if (this.tipLayout.active)
                    this.tipLayout.active = false
                this.nowState = -1
                this.isTiming = true
                this.GetNewWord()
                this.wordNumLabel.string = '0'
                this.wordNumShadowLabel.string = '0'
                this.audioNode.playAudio('UI_CountDown_Start')
                //this.timerLabel.string = ' '+this.nowTimer.toString() + ' 秒'
                break;
            case 2:
                //游戏中
                this.wordsAllNum++;
                this.wordsCorretNum++;
                this.wordNumLabel.string = this.wordsAllNum
                this.wordNumShadowLabel.string = this.wordsAllNum
                this.GetNewWord()
                this.audioNode.playAudio('UI_Combo')
                cc.log(this.wordsAllNum + ' ' + this.wordsCorretNum);
                //结束
                break;
        }
    },

    Btn_FlipUp: function() {
        if (this.isOver || this.nowState != 2)
            return;
        if (this.nowState == 2) {
            this.wordsAllNum++;
            this.GetNewWord();
            this.wordNumLabel.string = this.wordsAllNum
            this.wordNumShadowLabel.string = this.wordsAllNum
            this.audioNode.playAudio('UI_Skip')
            cc.log(this.wordsAllNum + ' ' + this.wordsCorretNum);
        }
    },

    onClickButton: function(sender, str) {
        this.audioNode.playAudio('UI_Common')
        switch (str) {
            case 'introNext':
                if(this.introLayout.active)
                    this.introLayout.active=false
                if (!this.readyLayout.active)
                    this.readyLayout.active = true
                break;
            case 'again':
                this.audioNode.playAudio('MX_BGM_On')
                cc.director.loadScene('Game')
                break;
            case 'Home':
                this.dataNode.RemoveDataNode();
                this.audioNode.playAudio('MX_BGM_On')
                cc.director.loadScene('Home')
                break;
            case 'ready':
                if(this.readyLayout.active)
                    this.readyLayout.active=false
                if (!this.tipLayout.active)
                    this.tipLayout.active = true
                this.nowState = 1
                this.granted()//获取设备方向权限
                break;
            case 'back':
                cc.director.loadScene('TimeChoice')
                break;
            case 'pause':
                this.isPause = !this.isPause
                this.pauseLayout.active = this.isPause
                if(this.isPause)
                {
                    this.audioNode.playAudio('PauseAll')
                }else{
                    this.audioNode.playAudio('ResumeAll')
                }
                break;
            case 'btnUp':
                Btn_FlipUp()
                break;
            case 'btnDown':
                Btn_FlipDown()
                break;
        }
    },

    granted: function(){
        console.log('granting!')
        var u = navigator.userAgent
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)//iOS
        console.log('is ios '+ isiOS )

        let self = this
        if (typeof(wx) != "undefined")
        {
            //微信小程序
            wx.startDeviceMotionListening()
            wx.onDeviceMotionChange(function (res) {
                self.onDeviceMotionEvent(res)
            })
        } else if(isiOS){
            if(window.DeviceOrientationEvent) {
                DeviceMotionEvent.requestPermission().then(function (state) {
                    if ('granted' === state) {
                       window.addEventListener('deviceorientation', function (res) {
                           self.onDeviceMotionEvent(res)
                       }, true);
                    } else {
                        alert('apply permission state: ' + state);
                    }
                }).catch(function(err){
                    alert('error: ' + err);
                });
            } else {
                console.log('不支持陀螺仪')
            }
        }else {
            //其他平台
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', function (res) {
                    self.onDeviceMotionEvent(res)
                }, true);
            } else {
                console.log('不支持陀螺仪')
            }
        }
    }
});