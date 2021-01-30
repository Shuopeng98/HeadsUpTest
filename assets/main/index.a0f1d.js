window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AudioController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed8e6F6l7ZNb5c2Vpic+CbR", "AudioController");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        music: cc.AudioClip,
        button: cc.AudioClip,
        right: cc.AudioClip,
        wrong: cc.AudioClip,
        overEffect: cc.AudioClip,
        startEffect: cc.AudioClip,
        countEffect: cc.AudioClip
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
      },
      playAudio: function playAudio(x) {
        switch (x) {
         case "music":
          if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(this.music, true);
            cc.audioEngine.setMusicVolume(.5);
          }
          break;

         case "stopMusic":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.pauseMusic();
          break;

         case "btn":
          cc.audioEngine.playEffect(this.button, false);
          break;

         case "right":
          cc.audioEngine.playEffect(this.right, false);
          break;

         case "wrong":
          cc.audioEngine.playEffect(this.wrong, false);
          break;

         case "over":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.pauseMusic();
          cc.audioEngine.playEffect(this.overEffect, false);
          break;

         case "start":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.setMusicVolume(.3);
          cc.audioEngine.playEffect(this.startEffect, false);
          break;

         case "count":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.setMusicVolume(.1);
          cc.audioEngine.playEffect(this.countEffect, false);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Btn_Choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dbafkK025IboelvcfDskbW", "Btn_Choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        maxTimerNum: 0,
        maxWordClips: 10
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.clip = 0;
      },
      start: function start() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        this.audioNode = cc.find("audioNode").getComponent("AudioController");
      },
      update: function update(dt) {},
      onChooseTime: function onChooseTime(sender, str) {
        this.audioNode.playAudio("btn");
        this.timer = parseInt(str) <= this.maxTimerNum ? parseInt(str) : this.maxTimerNum;
        this.dataNode.SetDataTimer(this.timer);
        cc.director.loadScene("Game");
      },
      onChooseWords: function onChooseWords(sender, str) {
        this.audioNode.playAudio("btn");
        this.clip = parseInt(str) < this.maxWordClips ? parseInt(str) : 0;
        this.dataNode.SetDataWordClip(this.clip);
        cc.director.loadScene("TimeChoice");
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("btn");
        switch (str) {
         case "backToHome":
          this.dataNode.RemoveDataNode();
          cc.director.loadScene("Home");
          break;

         case "backToWords":
          cc.director.loadScene("WordsChoice");
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Btn_Home: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f6acCROjxE26SDeh/DKfBo", "Btn_Home");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        intro_content: cc.Node,
        dataNode: cc.Node
      },
      onLoad: function onLoad() {
        this.audioNode = cc.find("audioNode").getComponent("AudioController");
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("btn");
        switch (str) {
         case "start":
          this.audioNode.playAudio("music");
          cc.director.loadScene("WordsChoice");
          break;

         case "intro_open":
          this.intro_content.active = true;
          break;

         case "intro_close":
          this.intro_content.active = false;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Data_Choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55873AK4ABKf7ILDH4lrsdF", "Data_Choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        timerMax: 0,
        wordClip: 0
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
      },
      RemoveDataNode: function RemoveDataNode() {
        cc.game.removePersistRootNode(this.node);
      },
      GetDataTimer: function GetDataTimer() {
        cc.log(this.timerMax);
        return this.timerMax;
      },
      SetDataTimer: function SetDataTimer(x) {
        this.timerMax = x;
        cc.log(this.timerMax);
        return this.timerMax;
      },
      GetDataWordClip: function GetDataWordClip() {
        cc.log(this.wordClip);
        return this.wordClip;
      },
      SetDataWordClip: function SetDataWordClip(x) {
        this.wordClip = x;
        cc.log(this.wordClip);
        return this.wordClip;
      }
    });
    cc._RF.pop();
  }, {} ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bb24nimbZOFIcX0Ju7vH9m", "GameManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        timerBar: cc.ProgressBar,
        tipLayout: cc.Node,
        readyLayout: cc.Node,
        finishLayout: cc.Node,
        gameLayout: cc.Node,
        pauseLayout: cc.Node,
        timerLabel: cc.Label,
        finishLabel: cc.Label,
        wordLabel: cc.Label,
        wordShadowLabel: cc.Label,
        wordNumLabel: cc.Label,
        wordNumShadowLabel: cc.Label,
        spinLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        this.audioNode = cc.find("audioNode").getComponent("AudioController");
      },
      handleOrientation: function handleOrientation(event) {
        this.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a z " + this.toDecimal(event.gamma);
      },
      start: function start() {
        this.maxTime = this.dataNode.GetDataTimer();
        this.nowTimer = 3;
        this.wordClipNum = this.dataNode.GetDataWordClip();
        this.ReadJson();
        this.gameLayout.active = false;
        this.pauseLayout.active = false;
        this.readyLayout.active = true;
        this.tipLayout.active = false;
        this.finishLayout.active = false;
        this.nowState = 0;
        this.isTiming = false;
        this.isOver = false;
        this.wordsAllNum = 1;
        this.wordsCorretNum = 0;
        this.maxUp = 50;
        this.minUp = 70;
        this.maxDown = 120;
        this.minDown = 110;
        this.flipState = -1;
        this.lastNum = -1;
        this.isPause = false;
        this.Countdown = false;
      },
      update: function update(dt) {
        if (-1 != this.nowState || this.isOver || this.isPause) {
          if (this.isTiming && !this.isOver && !this.isPause) {
            this.nowTimer -= dt;
            if (this.nowTimer <= 0) {
              this.isOver = true;
              this.timerLabel.string = "0 \u79d2";
              this.timerBar.progress = 0;
              this.GameOver();
            } else {
              if (this.nowTimer < 10 && !this.Countdown) {
                this.audioNode.playAudio("count");
                this.Countdown = true;
              }
              this.timerBar.progress = this.toDecimal(Math.ceil(this.nowTimer) / this.maxTime);
              this.timerLabel.string = Math.ceil(this.nowTimer).toString() + " \u79d2";
            }
          }
        } else {
          this.nowTimer -= dt;
          this.timerLabel.string = "";
          this.timerBar.progress = 1;
          if (this.nowTimer > 0) {
            this.wordLabel.string = Math.ceil(this.nowTimer).toString();
            this.wordShadowLabel.string = Math.ceil(this.nowTimer).toString();
          } else {
            this.nowState = 2;
            this.nowTimer = this.maxTime;
            this.GetNewWord();
            this.wordNumLabel.string = "1";
            this.wordNumShadowLabel.string = "1";
          }
        }
        this.wordClip.length <= 0 && this.GameOver();
      },
      onDestroy: function onDestroy() {
        if ("undefined" != typeof wx) {
          console.log("\u505c\u6b62\u76d1\u542c\u52a0\u901f\u5668");
          wx.stopDeviceMotionListening();
          wx.offDeviceMotionChange();
        }
      },
      GameOver: function GameOver() {
        this.finishLayout.active || (this.finishLayout.active = true);
        this.gameLayout.active = false;
        this.isPause = false;
        this.finishLabel.string = "" + this.wordsCorretNum;
        this.audioNode.playAudio("over");
      },
      toDecimal: function toDecimal(x) {
        if (isNaN(x)) return -1;
        var f = Math.round(100 * x) / 100;
        return f;
      },
      onDeviceMotionEvent: function onDeviceMotionEvent(res) {
        this.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a z " + this.toDecimal(res.gamma);
        var angle = this.toDecimal(res.gamma);
        angle = "undefined" != typeof wx ? Math.abs(angle) : angle < 0 ? angle + 180 : angle;
        if (angle < 0 || 0 == this.nowState || this.isPause) return;
        angle < this.minDown && angle > this.minUp && (this.flipState = 0);
        if (0 == this.flipState) if (angle > this.maxDown) {
          this.flipState = 1;
          this.Btn_FlipDown();
        } else if (angle < this.maxUp) {
          this.flipState = -1;
          this.Btn_FlipUp();
        }
      },
      ReadJson: function ReadJson() {
        var self = this;
        cc.resources.load("Dictionary0", function(err, jsonAsset) {
          switch (self.wordClipNum) {
           case 0:
            self.wordClip = jsonAsset.json.A0007.Words;
            break;

           case 1:
            self.wordClip = jsonAsset.json.A0006.Words;
            break;

           case 2:
            self.wordClip = jsonAsset.json.A0005.Words;
            break;

           case 3:
            self.wordClip = jsonAsset.json.A0009.Words;
            break;

           case 4:
            self.wordClip = jsonAsset.json.A0003.Words;
            break;

           case 5:
            self.wordClip = jsonAsset.json.A0001.Words;
            break;

           case 6:
            self.wordClip = jsonAsset.json.A0004.Words;
            break;

           case 7:
            self.wordClip = jsonAsset.json.A00011.Words;
            break;

           case 8:
            self.wordClip = jsonAsset.json.A00002.Words;
            break;

           case 9:
            self.wordClip = jsonAsset.json.A00012.Words;
          }
        });
      },
      GetNewWord: function GetNewWord() {
        var num = Math.floor(Math.random() * this.wordClip.length);
        this.lastNum = num;
        var text = this.wordClip[num];
        this.wordLabel.string = this.wordClip[num];
        this.wordShadowLabel.string = this.wordClip[num];
        this.wordClip.splice(num, 1);
        if (text.length <= 4) {
          this.wordLabel.fontSize = 250;
          this.wordLabel.lineHeight = 250;
          this.wordShadowLabel.fontSize = 250;
          this.wordShadowLabel.lineHeight = 250;
        } else if (5 == text.length) {
          this.wordLabel.fontSize = 200;
          this.wordLabel.lineHeight = 200;
          this.wordShadowLabel.fontSize = 200;
          this.wordShadowLabel.lineHeight = 200;
        } else {
          this.wordLabel.fontSize = 160;
          this.wordLabel.lineHeight = 160;
          this.wordShadowLabel.fontSize = 160;
          this.wordShadowLabel.lineHeight = 160;
          if (text.length > 6) {
            var newText = "";
            if (-1 != text.indexOf("\uff0c")) {
              var num1 = text.indexOf("\uff0c");
              newText = text.substring(0, num1) + "\n" + text.substring(num1 + 1, text.length);
            } else {
              var num1 = Math.ceil(text.length / 2);
              newText = text.substring(0, num1) + "\n" + text.substring(num1, text.length);
            }
            this.wordLabel.string = newText;
            this.wordShadowLabel.string = newText;
          }
        }
      },
      Btn_FlipDown: function Btn_FlipDown() {
        if (this.isOver) return;
        switch (this.nowState) {
         case 1:
          this.gameLayout.active = true;
          this.tipLayout.active && (this.tipLayout.active = false);
          this.nowState = -1;
          this.isTiming = true;
          this.GetNewWord();
          this.wordNumLabel.string = "0";
          this.wordNumShadowLabel.string = "0";
          this.audioNode.playAudio("start");
          break;

         case 2:
          this.wordsAllNum++;
          this.wordsCorretNum++;
          this.wordNumLabel.string = this.wordsAllNum;
          this.wordNumShadowLabel.string = this.wordsAllNum;
          this.GetNewWord();
          this.audioNode.playAudio("right");
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      Btn_FlipUp: function Btn_FlipUp() {
        if (this.isOver || 2 != this.nowState) return;
        if (2 == this.nowState) {
          this.wordsAllNum++;
          this.GetNewWord();
          this.wordNumLabel.string = this.wordsAllNum;
          this.wordNumShadowLabel.string = this.wordsAllNum;
          this.audioNode.playAudio("wrong");
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("btn");
        switch (str) {
         case "again":
          this.audioNode.playAudio("music");
          cc.director.loadScene("Game");
          break;

         case "Home":
          this.dataNode.RemoveDataNode();
          cc.director.loadScene("Home");
          break;

         case "ready":
          this.readyLayout.active && (this.readyLayout.active = false);
          this.tipLayout.active || (this.tipLayout.active = true);
          this.nowState = 1;
          this.granted();
          break;

         case "back":
          cc.director.loadScene("TimeChoice");
          break;

         case "pause":
          this.isPause = !this.isPause;
          this.pauseLayout.active = this.isPause;
          this.isPause ? this.audioNode.playAudio("stopMusic") : this.audioNode.playAudio("music");
          break;

         case "btnUp":
          Btn_FlipUp();
          break;

         case "btnDown":
          Btn_FlipDown();
        }
      },
      granted: function granted() {
        console.log("granting!");
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        console.log("is ios " + isiOS);
        var self = this;
        if ("undefined" != typeof wx) {
          wx.startDeviceMotionListening();
          wx.onDeviceMotionChange(function(res) {
            self.onDeviceMotionEvent(res);
          });
        } else isiOS ? window.DeviceOrientationEvent ? DeviceMotionEvent.requestPermission().then(function(state) {
          "granted" === state ? window.addEventListener("deviceorientation", function(res) {
            self.onDeviceMotionEvent(res);
          }, true) : alert("apply permission state: " + state);
        })["catch"](function(err) {
          alert("error: " + err);
        }) : console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea") : window.DeviceOrientationEvent ? window.addEventListener("deviceorientation", function(res) {
          self.onDeviceMotionEvent(res);
        }, true) : console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioController", "Btn_Choice", "Btn_Home", "Data_Choice", "GameManager" ]);