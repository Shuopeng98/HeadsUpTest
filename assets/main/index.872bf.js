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
  Btn_Choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dbafkK025IboelvcfDskbW", "Btn_Choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        maxTimerNum: 0,
        maxWordClips: 8
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.clip = 0;
      },
      start: function start() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
      },
      update: function update(dt) {},
      onChooseTime: function onChooseTime(sender, str) {
        this.timer = parseInt(str) <= this.maxTimerNum ? parseInt(str) : this.maxTimerNum;
        this.dataNode.SetDataTimer(this.timer);
        cc.director.loadScene("Game");
      },
      onChooseWords: function onChooseWords(sender, str) {
        this.clip = parseInt(str) < this.maxWordClips ? parseInt(str) : 0;
        this.dataNode.SetDataWordClip(this.clip);
        cc.director.loadScene("TimeChoice");
      },
      onClickButton: function onClickButton(sender, str) {
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
        dataNode: cc.Node,
        spinLabel: cc.Label
      },
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update(dt) {},
      granted: function granted() {
        var self = this;
        this.is_ios() ? window.DeviceOrientationEvent ? window.DeviceOrientationEvent.requestPermission().then(function(state) {
          "granted" === state ? window.addEventListener("deviceorientation", function(res) {
            self.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a" + Math.round(1e3 * Math.abs(res.gamma)) / 1e3;
            console.log("z: " + res.gamma);
          }, false) : alert("apply permission state: " + state);
        })["catch"](function(err) {
          alert("error: " + err);
        }) : console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea") : window.DeviceOrientationEvent ? window.addEventListener("deviceorientation", function(res) {
          self.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a" + Math.round(1e3 * Math.abs(res.gamma)) / 1e3;
          console.log("z: " + res.gamma);
        }, false) : console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
      },
      is_ios: function is_ios() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      },
      onClickButton: function onClickButton(sender, str) {
        switch (str) {
         case "start":
          cc.director.loadScene("WordsChoice");
          break;

         case "intro_open":
          this.intro_content.active = true;
          break;

         case "intro_close":
          this.intro_content.active = false;
          break;

         case "grant":
          this.granted();
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
        timerLabel: cc.Label,
        tipLayout: cc.Node,
        readyLayout: cc.Node,
        finishLayout: cc.Node,
        gameLayout: cc.Node,
        pauseLayout: cc.Node,
        finishLabel: cc.Label,
        finishStr1: "",
        finishStr2: "",
        wordLabel: cc.Label,
        spinLabel: cc.Label,
        wordNumLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        var self = this;
        window.addEventListener("deviceorientation", function(res) {
          cc.log("spin!!!!");
          self.onDeviceMotionEvent(res);
        }, true);
      },
      handleOrientation: function handleOrientation(event) {
        this.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a z " + this.toDecimal(event.gamma);
      },
      start: function start() {
        this.nowTimer = this.dataNode.GetDataTimer();
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
        this.maxUp = 20;
        this.minUp = 60;
        this.maxDown = 140;
        this.minDown = 110;
        this.flipState = -1;
        this.lastNum = -1;
        this.isPause = false;
      },
      update: function update(dt) {
        if (this.isTiming && !this.isOver && !this.isPause) {
          this.nowTimer -= dt;
          if (this.nowTimer <= 0) {
            this.isOver = true;
            this.timerLabel.string = "0 \u79d2";
            this.GameOver();
          } else this.timerLabel.string = Math.ceil(this.nowTimer).toString() + " \u79d2";
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
      },
      onDeviceMotionEvent: function onDeviceMotionEvent(res) {
        this.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a z " + this.toDecimal(res.gamma);
        var angle = this.toDecimal(res.gamma);
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
          }
        });
      },
      GetNewWord: function GetNewWord() {
        var num = Math.floor(Math.random() * this.wordClip.length);
        this.lastNum = num;
        this.wordLabel.string = this.wordClip[num];
        this.wordClip.splice(num, 1);
      },
      toDecimal: function toDecimal(x) {
        if (isNaN(x)) return -1;
        var f = Math.round(1e3 * Math.abs(x)) / 1e3;
        return f;
      },
      Btn_FlipDown: function Btn_FlipDown() {
        if (this.isOver) return;
        switch (this.nowState) {
         case 1:
          this.gameLayout.active = true;
          this.tipLayout.active && (this.tipLayout.active = false);
          this.nowState = 2;
          this.isTiming = true;
          this.GetNewWord();
          this.wordNumLabel.string = this.wordsAllNum;
          this.timerLabel.string = this.nowTimer.toString() + " \u79d2";
          break;

         case 2:
          this.wordsAllNum++;
          this.wordsCorretNum++;
          this.wordNumLabel.string = this.wordsAllNum;
          this.GetNewWord();
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      Btn_FlipUp: function Btn_FlipUp() {
        if (this.isOver || 2 != this.nowState) return;
        if (2 == this.nowState) {
          this.wordsAllNum++;
          this.GetNewWord();
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      onClickButton: function onClickButton(sender, str) {
        switch (str) {
         case "again":
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
          break;

         case "back":
          cc.director.loadScene("TimeChoice");
          break;

         case "pause":
          this.isPause = !this.isPause;
          this.pauseLayout.active = this.isPause;
        }
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Btn_Choice", "Btn_Home", "Data_Choice", "GameManager" ]);