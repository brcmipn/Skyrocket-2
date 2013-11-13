

function SpriteAudio(src, arrDefs, loop) {
  var that = this,
  that.audio = document.createElement('audio');
  that.audio.src = src;
  that.audio.autobuffer = true;
  that.audio.load();
  that.audio.muted = true; // makes no difference on iOS :(
  that.track.itemDef="";

  that.arrDefs=arrDefs;
  that.updateCallback = null;
  that.playing = false;
  that.lastUsed = 0;


  that.pause = function () {
    that.audio.currentTime = 0;
    that.audio.muted = true;
    try {that.audio.pause();} catch (e) {;}
  }

  that.replay = function () {  
    if(that.itemDef)
      that.play(that.itemDef, 0);
  }

  that.play = function (itemDef, position, booleanNoRepetir) {  
    if(booleanNoRepetir){
      if(that.itemDef==itemDef){
        return;
      } 
    }

    that.itemDef=itemDef; 

    var elem=that.arrDefs[itemDef];
    if(!elem){
      console.info("error en audio:"+itemDef);
      return;

    }

    var startPos=elem[0];
    var duration=elem[1];

    
    var time = startPos+position,
    var limit = startPos+duration;

    clearInterval(that.timer);
    that.playing = true;
    that.lastUsed = +new Date;
  
    that.audio.muted = false;
    //Evita error en IE9
    try {that.audio.pause();} catch (e) {console.info("err:"+e);}
    try {
      if (time == 0) time = 0.01; // yay hacks. Sometimes setting time to 0 doesn't play back
      that.audio.currentTime = time;
      that.audio.play();
    } catch (e) {
      console.info("err:"+e);
      this.updateCallback = function () {
        that.track.updateCallback = null;
        that.audio.currentTime = time;
        that.audio.play();
      };
    } 
    //se ejecuta la primera vez regularmente
    that.audio.play();
  }
 
  that.timer = setInterval(function () {
    if (that.audio.currentTime >= limit) {
      try {that.audio.pause();} catch (e) {;}
      
      that.audio.muted = true;
      clearInterval(that.timer);
      if(that.loop){
        //console.info('terminado por codigo->'+itemDef+"-"+position);
        that.timer = setInterval(function () {that.play(itemDef, position);}, 10);
      } 

    }
  }, 10);

};