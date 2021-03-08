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
    var _properties;
    cc.Class({
      extends: cc.Component,
      properties: (_properties = {
        MX_BGM: cc.AudioClip,
        MX_GameOver: cc.AudioClip,
        UI_Start: cc.AudioClip,
        UI_Common: cc.AudioClip,
        UI_Combo: [ cc.AudioClip ],
        UI_Skip: cc.AudioClip,
        UI_CountDown_Start: cc.AudioClip,
        UI_CountDown_End: cc.AudioClip
      }, _properties["UI_Skip"] = cc.AudioClip, _properties.UI_Clip = [ cc.AudioClip ], 
      _properties),
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.combo = 0;
      },
      playAudio: function playAudio(name, x) {
        void 0 === x && (x = -1);
        switch (name) {
         case "MX_BGM_On":
          cc.audioEngine.isMusicPlaying() || cc.audioEngine.playMusic(this.MX_BGM, true);
          cc.audioEngine.setMusicVolume(.5);
          break;

         case "MX_BGM_Off":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.pauseMusic();
          break;

         case "UI_Common":
          cc.audioEngine.playEffect(this.UI_Common, false);
          break;

         case "UI_Combo":
          this.combo++;
          this.combo <= 3 ? cc.audioEngine.playEffect(this.UI_Combo[this.combo - 1], false) : cc.audioEngine.playEffect(this.UI_Combo[2], false);
          break;

         case "UI_Skip":
          this.combo = 0;
          cc.audioEngine.playEffect(this.UI_Skip, false);
          break;

         case "MX_GameOver":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.pauseMusic();
          cc.audioEngine.playEffect(this.MX_GameOver, false);
          break;

         case "UI_CountDown_Start":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.setMusicVolume(.1);
          cc.audioEngine.playEffect(this.UI_CountDown_Start, false);
          this.combo = 0;
          break;

         case "UI_CountDown_end":
          cc.audioEngine.isMusicPlaying() && cc.audioEngine.setMusicVolume(.1);
          cc.audioEngine.playEffect(this.UI_CountDown_End, false);
          break;

         case "PauseAll":
          cc.audioEngine.pauseAllEffects();
          cc.audioEngine.pauseMusic();
          break;

         case "ResumeAll":
          cc.audioEngine.resumeAllEffects();
          cc.audioEngine.resumeMusic();
          break;

         case "UI_Clip":
          x >= 0 && null != this.UI_Clip && x < this.UI_Clip.length ? cc.audioEngine.playEffect(this.UI_Clip[x], false) : cc.audioEngine.playEffect(this.UI_Common, false);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Btn_Choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dbafkK025IboelvcfDskbW", "Btn_Choice");
    "use strict";
    require("NoSleep.js");
    cc.Class({
      extends: cc.Component,
      properties: {
        maxTimerNum: 0,
        maxWordClips: 10
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.clip = 0;
        this.libid = "";
      },
      start: function start() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        this.audioNode = cc.find("audioNode").getComponent("AudioController");
      },
      update: function update(dt) {},
      onChooseTime: function onChooseTime(sender, str) {
        this.audioNode.playAudio("UI_Common");
        this.timer = parseInt(str) <= this.maxTimerNum ? parseInt(str) : this.maxTimerNum;
        this.dataNode.SetDataTimer(this.timer);
        cc.director.loadScene("Game");
      },
      onChooseWords: function onChooseWords(sender, str) {
        this.clip = parseInt(str) < this.maxWordClips ? parseInt(str) : 0;
        this.dataNode.SetDataWordClip(this.clip);
        this.ReadJson();
        this.audioNode.playAudio("UI_Clip", this.clip);
        cc.director.loadScene("TimeChoice");
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("UI_Common");
        switch (str) {
         case "backToHome":
          this.dataNode.RemoveDataNode();
          cc.director.loadScene("Home");
          break;

         case "backToWords":
          cc.director.loadScene("WordsChoice");
        }
      },
      ReadJson: function ReadJson() {
        var self = this;
        cc.resources.load("Dictionary0", function(err, jsonAsset) {
          switch (self.clip) {
           case 0:
            self.words = jsonAsset.json.A0007.Words;
            self.libid = "A0007";
            break;

           case 1:
            self.words = jsonAsset.json.A0006.Words;
            self.libid = "A0006";
            break;

           case 2:
            self.words = jsonAsset.json.A0005.Words;
            self.libid = "A0005";
            break;

           case 3:
            self.words = jsonAsset.json.A0009.Words;
            self.libid = "A0009";
            break;

           case 4:
            self.words = jsonAsset.json.A0003.Words;
            self.libid = "A0003";
            break;

           case 5:
            self.words = jsonAsset.json.A0001.Words;
            self.libid = "A0001";
            break;

           case 6:
            self.words = jsonAsset.json.A0004.Words;
            self.libid = "A0004";
            break;

           case 7:
            self.words = jsonAsset.json.A0011.Words;
            self.libid = "A0011";
            break;

           case 8:
            self.words = jsonAsset.json.A0002.Words;
            self.libid = "A0002";
            break;

           case 9:
            self.words = jsonAsset.json.A0012.Words;
            self.libid = "A0012";
          }
          self.dataNode.words = JSON.parse(JSON.stringify(self.words));
          self.dataNode.libid = self.libid;
        });
      }
    });
    cc._RF.pop();
  }, {
    "NoSleep.js": void 0
  } ],
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
        this.audioNode.playAudio("MX_BGM_On");
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("UI_Common");
        switch (str) {
         case "start":
          this.audioNode.playAudio("MX_BGM_On");
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
  DataTempStore: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8d2bG4jxRJFIXIdxRUw6uA", "DataTempStore");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Data_Choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e139eCjhjxJAIjHnjcI8oiy", "Data_Choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        timerMax: 0,
        wordClip: 0
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.rounds = 0;
        this.words = [];
        this.libid = "";
        this.userData = {};
        this.gameData = {};
        this.roundsData = new Array();
        this.wordsData = new Array();
      },
      start: function start() {},
      Uuid: function Uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) s[i] = hexDigits.substr(Math.floor(16 * Math.random()), 1);
        s[14] = "4";
        s[19] = hexDigits.substr(3 & s[19] | 8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      },
      StorageData: function StorageData(key, data) {
        "undefined" != typeof wx ? wx.setStorage({
          key: key,
          data: data,
          success: function success(res) {
            console.log("\u5df2\u5b58\u50a8:" + data);
          }
        }) : window.localStorage.setItem(key, data);
      },
      GetData: function GetData(key) {
        if ("undefined" != typeof wx) {
          var value = wx.getStorageSync(key);
          console.log("\u8bfb\u53d6\uff1a" + value);
          return value;
        }
        var value = window.localStorage.getItem(key);
        console.log("\u8bfb\u53d6\uff1a" + value);
        return value;
      },
      RemoveData: function RemoveData(key) {
        "undefined" != typeof wx ? wx.removeStorage({
          key: key,
          success: function success(res) {
            console.log("\u79fb\u9664:" + res);
          }
        }) : window.localStorage.removeItem(key);
      },
      HasData: function HasData(key) {
        if ("undefined" != typeof wx) {
          var value = wx.getStorageSync(key);
          return "string" == typeof value && value.length > 0;
        }
        var value = window.localStorage.getItem(key);
        return "string" == typeof value && value.length > 0;
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
    require("NoSleep.js");
    cc.Class({
      extends: cc.Component,
      properties: {
        countDownTime: 10,
        timerBar: cc.ProgressBar,
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
        spinLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        this.audioNode = cc.find("audioNode").getComponent("AudioController");
        this.posts = [ "/cgi-bin/Gateway.fcgi?method=nhwc_addGameData", "/cgi-bin/Gateway.fcgi?method=nhwc_addRoundRecord", "/cgi-bin/Gateway.fcgi?method=nhwc_addWordRecord" ];
        this.host = window.location.host;
      },
      handleOrientation: function handleOrientation(event) {
        this.spinLabel.string = "\u65cb\u8f6c\u89d2\u5ea6\uff1a z " + this.toDecimal(event.gamma);
      },
      start: function start() {
        this.constTimeStamp = 1612577003;
        this.maxTime = this.dataNode.GetDataTimer();
        this.nowTimer = 3;
        this.lastTimer = this.countDownTime;
        this.wordClip = JSON.parse(JSON.stringify(this.dataNode.words));
        console.log("thisWordClip" + this.wordClip);
        this.libid = this.dataNode.libid;
        this.introLayout.active = true;
        this.gameLayout.active = false;
        this.pauseLayout.active = false;
        this.readyLayout.active = false;
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
        this.tempRoundData = {
          roundId: 0,
          gameId: 0,
          userId: "",
          libId: "",
          beginTime: 0,
          endTime: 0,
          wordCount: 0,
          skipCount: 0,
          extParams: ""
        };
        this.tempRoundData.roundId = this.GetTimeStamp() - this.constTimeStamp;
        this.tempRoundData.gameId = this.dataNode.gameData.gameId;
        this.tempRoundData.userId = this.dataNode.gameData.userId;
        this.tempRoundData.beginTime = this.GetTimeStamp();
        this.tempWordsData = new Array();
        this.wordData = {
          wordId: 0,
          userId: "",
          libId: "",
          roundId: 0,
          status: 0,
          createTime: 0,
          costTime: 0,
          word: "",
          extParams: ""
        };
        this.wordData.userId = this.tempRoundData.userId;
        this.wordData.roundId = this.tempRoundData.roundId;
        this.wordData.gameId = this.tempRoundData.gameId;
        this.noSleep = new NoSleep();
        this.isNoSleep = false;
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
              if (this.nowTimer <= this.lastTimer) {
                this.lastTimer--;
                this.audioNode.playAudio("UI_CountDown_end");
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
            this.lastTimer = this.countDownTime;
            this.GetNewWord();
            this.wordNumLabel.string = "1";
            this.wordNumShadowLabel.string = "1";
          }
        }
        if (null != this.wordClip && !this.isOver && this.wordClip.length <= 0) {
          this.GameOver();
          this.isOver = true;
        }
      },
      onDestroy: function onDestroy() {
        if ("undefined" != typeof wx) {
          console.log("\u505c\u6b62\u76d1\u542c\u52a0\u901f\u5668");
          wx.stopDeviceMotionListening();
          wx.offDeviceMotionChange();
        }
      },
      GameOver: function GameOver() {
        this.tempRoundData.libId = this.libid;
        for (var i in this.tempWordsData) this.tempWordsData[i].libId = this.libid;
        this.tempRoundData.endTime = this.GetTimeStamp();
        this.tempRoundData.wordCount = this.wordsAllNum - 1;
        this.tempRoundData.skipCount = this.wordsAllNum - this.wordsCorretNum - 1;
        this.dataNode.roundsData.push(this.tempRoundData);
        for (var _i in this.tempWordsData) this.dataNode.wordsData.push(this.tempWordsData[_i]);
        this.dataNode.gameData.duration = this.GetTimeStamp() - this.dataNode.gameData.beginTime;
        for (var _i2 in this.dataNode.wordsData) console.log(this.dataNode.wordsData[_i2]);
        console.log(this.tempRoundData);
        console.log(this.dataNode.gameData);
        console.log(this.dataNode.userData);
        this.XHR(this.posts[1], this.tempRoundData, "roundData");
        this.finishLayout.active || (this.finishLayout.active = true);
        this.gameLayout.active = false;
        this.isPause = false;
        this.finishLabel.string = "" + this.wordsCorretNum;
        this.audioNode.playAudio("MX_GameOver");
      },
      XHR: function XHR(str, obj, message) {
        var xhr = new XMLHttpRequest();
        var Host = "test" == this.host.split(".")[0] ? "test.jz.game.qq.com" : "jz.game.qq.com";
        var post = str;
        xhr.onload = function(e) {
          console.log("request success");
        };
        xhr.onloadend = function(e) {
          console.log("request loadend");
        };
        xhr.onerror = function(e) {
          console.log("request error");
        };
        xhr.ontimeout = function(e) {
          console.log("request timeout");
        };
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            console.log("\u8fd4\u56de\u4fe1\u606f:" + message + response);
            return response;
          }
        };
        xhr.open("POST", "https://" + Host + post, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.withCredentials = true;
        xhr.send(JSON.stringify(obj));
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
      GetNewWord: function GetNewWord() {
        var num = Math.floor(Math.random() * this.wordClip.length);
        this.lastNum = num;
        var text = this.wordClip[num];
        this.wordLabel.string = this.wordClip[num];
        this.wordShadowLabel.string = this.wordClip[num];
        this.wordData.createTime = this.GetTimeStamp();
        this.wordData.wordId = this.GetTimeStamp() - this.constTimeStamp;
        this.wordData.word = this.wordClip[num];
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
      GetWordId: function GetWordId(str) {
        var wordIdStr = "";
        if (str.length <= 3) for (var i = 0; i < str.length; i++) wordIdStr += String(str.charCodeAt(i)); else for (var i = 0; i < 3; i++) wordIdStr += String(str.charCodeAt(i));
        return Number(wordIdStr);
      },
      GetTimeStamp: function GetTimeStamp() {
        var d = new Date();
        var time = d.getTime() / 1e3;
        return Math.ceil(time);
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
          this.audioNode.playAudio("UI_CountDown_Start");
          break;

         case 2:
          this.wordsAllNum++;
          this.wordsCorretNum++;
          this.wordNumLabel.string = this.wordsAllNum;
          this.wordNumShadowLabel.string = this.wordsAllNum;
          this.wordData.costTime = this.GetTimeStamp() - this.wordData.createTime;
          this.wordData.status = 1;
          this.tempWordsData.push(JSON.parse(JSON.stringify(this.wordData)));
          this.XHR(this.posts[2], this.wordData, "wordData" + (this.wordsAllNum - 1));
          this.GetNewWord();
          this.audioNode.playAudio("UI_Combo");
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      Btn_FlipUp: function Btn_FlipUp() {
        if (this.isOver || 2 != this.nowState) return;
        if (2 == this.nowState) {
          this.wordsAllNum++;
          this.wordData.costTime = this.GetTimeStamp() - this.wordData.createTime;
          this.wordData.status = 0;
          this.tempWordsData.push(JSON.parse(JSON.stringify(this.wordData)));
          this.XHR(this.posts[2], this.wordData, "wordData" + (this.wordsAllNum - 1));
          this.GetNewWord();
          this.wordNumLabel.string = this.wordsAllNum;
          this.wordNumShadowLabel.string = this.wordsAllNum;
          this.audioNode.playAudio("UI_Skip");
          cc.log(this.wordsAllNum + " " + this.wordsCorretNum);
        }
      },
      onClickButton: function onClickButton(sender, str) {
        this.audioNode.playAudio("UI_Common");
        switch (str) {
         case "introNext":
          this.introLayout.active && (this.introLayout.active = false);
          this.readyLayout.active || (this.readyLayout.active = true);
          break;

         case "again":
          this.audioNode.playAudio("MX_BGM_On");
          cc.director.loadScene("Game");
          break;

         case "Home":
          this.dataNode.RemoveDataNode();
          this.audioNode.playAudio("MX_BGM_On");
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
          this.isPause ? this.audioNode.playAudio("PauseAll") : this.audioNode.playAudio("ResumeAll");
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
        } else if (isiOS) {
          var reg = /os [\d._]*/gi;
          var verinfo = u.match(reg);
          var version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
          var arr = version.split(".");
          var edition = arr[0] + "." + arr[1];
          console.log("edi " + edition);
          if (edition >= 13.3) window.DeviceOrientationEvent ? DeviceMotionEvent.requestPermission().then(function(state) {
            "granted" === state ? window.addEventListener("deviceorientation", function(res) {
              self.onDeviceMotionEvent(res);
            }, true) : alert("apply permission state: " + state);
          })["catch"](function(err) {
            alert("error: " + err);
          }) : console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea"); else if (window.DeviceOrientationEvent) window.addEventListener("deviceorientation", function(res) {
            self.onDeviceMotionEvent(res);
          }, true); else {
            alert("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
            console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
          }
        } else if (window.DeviceOrientationEvent) window.addEventListener("deviceorientation", function(res) {
          self.onDeviceMotionEvent(res);
        }, true); else {
          alert("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
          console.log("\u4e0d\u652f\u6301\u9640\u87ba\u4eea");
        }
      }
    });
    cc._RF.pop();
  }, {
    "NoSleep.js": void 0
  } ],
  Log: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f053CfhUpN1q/AZYsxgpfE", "Log");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.dataNode = cc.find("dataNode").getComponent("Data_Choice");
        this.authStatus = false;
        this.post = "/cgi-bin/Gateway.fcgi?method=nhwc_addUserInfo";
        this.host = window.location.host;
        var self = this;
        this.temp_userData = {
          userId: "",
          nickName: "",
          gender: 0,
          country: "",
          province: "",
          city: "",
          brand: "",
          platform: "",
          gameCounts: 0,
          createTime: 0
        };
        this.temp_gameData = {
          userId: "",
          gameId: 0,
          duration: 0,
          beginTime: 0
        };
        if (this.dataNode.HasData("userId")) {
          console.log("\u5df2\u6ce8\u518c");
          var temp = JSON.parse(this.dataNode.GetData("userId"));
          for (var i in temp) this.temp_userData[i] = temp[i];
        } else {
          console.log("\u672a\u6ce8\u518c");
          this.temp_userData.userId = this.dataNode.Uuid();
          var d = new Date();
          this.temp_userData.createTime = d.getTime();
          this.dataNode.StorageData("userId", JSON.stringify(this.temp_userData));
        }
        if ("undefined" != typeof wx) {
          var sysInfo = window.wx.getSystemInfoSync();
          this.temp_userData.brand = sysInfo.brand;
          this.temp_userData.platform = sysInfo.platform;
          var width = sysInfo.screenWidth;
          var height = sysInfo.screenHeight;
          wx.getSetting({
            success: function success(res) {
              console.log(res.authSetting);
              if (res.authSetting["scope.userInfo"]) {
                console.log("\u7528\u6237\u5df2\u6388\u6743");
                wx.getUserInfo({
                  success: function success(res) {
                    var userInfo = res.userInfo;
                    self.temp_userData.nickName = userInfo.nickName;
                    self.temp_userData.gender = userInfo.gender > 0 ? 0 : 1;
                    self.temp_userData.country = userInfo.country;
                    self.temp_userData.province = userInfo.province;
                    self.temp_userData.city = userInfo.city;
                    console.log(res);
                    self.XHR(self.post, self.temp_userData, "userData");
                    self.temp_userData.gameCounts++;
                    self.temp_gameData.gameId = self.temp_userData.gameCounts;
                    self.temp_gameData.userId = self.temp_userData.userId;
                    var d = new Date();
                    self.temp_gameData.beginTime = d.getTime();
                    self.authStatus = true;
                    self.StoreInDataNode();
                    self.dataNode.StorageData("userId", JSON.stringify(self.temp_userData));
                  }
                });
              } else {
                console.log("\u7528\u6237\u672a\u6388\u6743");
                var button = window.wx.createUserInfoButton({
                  type: "text",
                  text: "",
                  style: {
                    left: 0,
                    top: 0,
                    width: width,
                    height: height,
                    backgroundColor: "#00000000",
                    color: "#ffffff",
                    fontSize: 20,
                    textAlign: "center",
                    lineHeight: height
                  }
                });
                button.onTap(function(res) {
                  if (res.userInfo) {
                    console.log("\u7528\u6237\u6388\u6743:", res);
                    var userInfo = res.userInfo;
                    self.temp_userData.nickName = userInfo.nickName;
                    self.temp_userData.gender = userInfo.gender > 0 ? 0 : 1;
                    self.temp_userData.country = userInfo.country;
                    self.temp_userData.province = userInfo.province;
                    self.temp_userData.city = userInfo.city;
                    self.XHR(self.post, self.temp_userData, "userData");
                    self.temp_userData.gameCounts++;
                    self.temp_gameData.gameId = self.temp_userData.gameCounts;
                    self.temp_gameData.userId = self.temp_userData.userId;
                    var _d = new Date();
                    self.temp_gameData.beginTime = _d.getTime();
                    self.authStatus = true;
                    self.StoreInDataNode();
                    self.dataNode.StorageData("userId", JSON.stringify(self.temp_userData));
                    button.destroy();
                  } else console.log("\u7528\u6237\u62d2\u7edd\u6388\u6743:", res);
                });
              }
            }
          });
        } else {
          this.temp_userData.gameCounts++;
          this.temp_gameData.gameId = this.temp_userData.gameCounts;
          this.temp_gameData.userId = this.temp_userData.userId;
          var _d2 = new Date();
          self.temp_gameData.beginTime = _d2.getTime();
          self.StoreInDataNode();
          self.dataNode.StorageData("userId", JSON.stringify(self.temp_userData));
          self.XHR(self.post, self.temp_userData, "userData");
        }
      },
      StoreInDataNode: function StoreInDataNode() {
        for (var i in this.temp_userData) this.dataNode.userData[i] = this.temp_userData[i];
        for (var _i in this.temp_gameData) this.dataNode.gameData[_i] = this.temp_gameData[_i];
        console.log("\u7528\u6237\u4fe1\u606f");
        console.log(this.temp_userData);
        console.log("\u6e38\u620f\u4fe1\u606f");
        console.log(this.temp_gameData);
      },
      XHR: function XHR(str, obj, message) {
        var xhr = new XMLHttpRequest();
        var Host = "test" == this.host.split(".")[0] ? "test.jz.game.qq.com" : "jz.game.qq.com";
        var post = str;
        xhr.onload = function(e) {
          console.log("request success");
        };
        xhr.onloadend = function(e) {
          console.log("request loadend");
        };
        xhr.onerror = function(e) {
          console.log("request error");
        };
        xhr.ontimeout = function(e) {
          console.log("request timeout");
        };
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            console.log("\u8fd4\u56de\u4fe1\u606f:" + message + response);
            return response;
          }
        };
        xhr.open("POST", "https://" + Host + post, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.withCredentials = true;
        xhr.send(JSON.stringify(obj));
      }
    });
    cc._RF.pop();
  }, {} ],
  NoSleep: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3523dRZF9Hw7QBOR5LLbuR", "NoSleep");
    "use strict";
    !function(A, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.NoSleep = e() : A.NoSleep = e();
    }(void 0, function() {
      return function(A) {
        var e = {};
        function B(g) {
          if (e[g]) return e[g].exports;
          var o = e[g] = {
            i: g,
            l: !1,
            exports: {}
          };
          return A[g].call(o.exports, o, o.exports, B), o.l = !0, o.exports;
        }
        return B.m = A, B.c = e, B.d = function(A, e, g) {
          B.o(A, e) || Object.defineProperty(A, e, {
            enumerable: !0,
            get: g
          });
        }, B.r = function(A) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(A, "__esModule", {
            value: !0
          });
        }, B.t = function(A, e) {
          if (1 & e && (A = B(A)), 8 & e) return A;
          if (4 & e && "object" == typeof A && A && A.__esModule) return A;
          var g = Object.create(null);
          if (B.r(g), Object.defineProperty(g, "default", {
            enumerable: !0,
            value: A
          }), 2 & e && "string" != typeof A) for (var o in A) B.d(g, o, function(e) {
            return A[e];
          }.bind(null, o));
          return g;
        }, B.n = function(A) {
          var e = A && A.__esModule ? function() {
            return A["default"];
          } : function() {
            return A;
          };
          return B.d(e, "a", e), e;
        }, B.o = function(A, e) {
          return Object.prototype.hasOwnProperty.call(A, e);
        }, B.p = "", B(B.s = 0);
      }([ function(A, e, B) {
        var g = function() {
          function A(A, e) {
            for (var B = 0; B < e.length; B++) {
              var g = e[B];
              g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), 
              Object.defineProperty(A, g.key, g);
            }
          }
          return function(e, B, g) {
            return B && A(e.prototype, B), g && A(e, g), e;
          };
        }();
        var o = B(1), E = o.webm, n = o.mp4, C = function C() {
          return "undefined" != typeof navigator && parseFloat(("" + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [ 0, "" ])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) < 10 && !window.MSStream;
        }, Q = function Q() {
          return "wakeLock" in navigator;
        }, i = function() {
          function A() {
            var e = this;
            if (function(A, e) {
              if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, A), this.enabled = !1, Q()) {
              this._wakeLock = null;
              var B = function B() {
                null !== e._wakeLock && "visible" === document.visibilityState && e.enable();
              };
              document.addEventListener("visibilitychange", B), document.addEventListener("fullscreenchange", B);
            } else C() ? this.noSleepTimer = null : (this.noSleepVideo = document.createElement("video"), 
            this.noSleepVideo.setAttribute("title", "No Sleep"), this.noSleepVideo.setAttribute("playsinline", ""), 
            this._addSourceToVideo(this.noSleepVideo, "webm", E), this._addSourceToVideo(this.noSleepVideo, "mp4", n), 
            this.noSleepVideo.addEventListener("loadedmetadata", function() {
              e.noSleepVideo.duration <= 1 ? e.noSleepVideo.setAttribute("loop", "") : e.noSleepVideo.addEventListener("timeupdate", function() {
                e.noSleepVideo.currentTime > .5 && (e.noSleepVideo.currentTime = Math.random());
              });
            }));
          }
          return g(A, [ {
            key: "_addSourceToVideo",
            value: function value(A, e, B) {
              var g = document.createElement("source");
              g.src = B, g.type = "video/" + e, A.appendChild(g);
            }
          }, {
            key: "enable",
            value: function value() {
              var A = this;
              return Q() ? navigator.wakeLock.request("screen").then(function(e) {
                A._wakeLock = e, A.enabled = !0, console.log("Wake Lock active."), A._wakeLock.addEventListener("release", function() {
                  console.log("Wake Lock released.");
                });
              })["catch"](function(e) {
                throw A.enabled = !1, console.error(e.name + ", " + e.message), e;
              }) : C() ? (this.disable(), console.warn("\n        NoSleep enabled for older iOS devices. This can interrupt\n        active or long-running network requests from completing successfully.\n        See https://github.com/richtr/NoSleep.js/issues/15 for more details.\n      "), 
              this.noSleepTimer = window.setInterval(function() {
                document.hidden || (window.location.href = window.location.href.split("#")[0], window.setTimeout(window.stop, 0));
              }, 15e3), this.enabled = !0, Promise.resolve()) : this.noSleepVideo.play().then(function(e) {
                return A.enabled = !0, e;
              })["catch"](function(e) {
                throw A.enabled = !1, e;
              });
            }
          }, {
            key: "disable",
            value: function value() {
              Q() ? (this._wakeLock && this._wakeLock.release(), this._wakeLock = null) : C() ? this.noSleepTimer && (console.warn("\n          NoSleep now disabled for older iOS devices.\n        "), 
              window.clearInterval(this.noSleepTimer), this.noSleepTimer = null) : this.noSleepVideo.pause(), 
              this.enabled = !1;
            }
          }, {
            key: "isEnabled",
            get: function get() {
              return this.enabled;
            }
          } ]), A;
        }();
        A.exports = i;
      }, function(A, e, B) {
        A.exports = {
          webm: "data:video/webm;base64,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",
          mp4: "data:video/mp4;base64,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"
        };
      } ]);
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioController", "Btn_Choice", "Btn_Home", "DataTempStore", "Data_Choice", "GameManager", "Log", "NoSleep" ]);