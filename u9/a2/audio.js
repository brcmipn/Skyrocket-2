

function Track(src, arrDefs, loop) {
  var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
  var isIPad=false;
  if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
     isIPad=true; 
  }

  this.maxTime=0;
  try{
    for (key in arrDefs) {
      var val=arrDefs[key];
      var defTime=parseFloat(val[0])+parseFloat(val[1])
      if(this.maxTime<defTime){
        this.maxTime=defTime;
      } 
    }
    if(modoDebug){
      console.info(src+"...definiendo maxTime:"+this.maxTime);
    } 
  } catch(e){
    if(modoDebug){
        console.info("error definiendo maxTime->"+e);
    }  
  }

  var track = this,
  audio = document.createElement('audio');
  audio.src = src;
  audio.autobuffer = true;
  audio.load();
  audio.muted = true; // makes no difference on iOS :(
  track.itemDef="";

  /* This is the magic. Since we can't preload, and loading requires a user's 
  input. So we bind a touch event to the body, and fingers crossed, the 
  user taps. This means we can call play() and immediate pause - which will
  start the download process - so it's effectively preloaded.

  This logic is pretty insane, but forces iOS devices to successfully 
  skip an unload audio to a specific point in time.
  first we play, when the play event fires we pause, allowing the asset
  to be downloaded, once the progress event fires, we should have enough
  to skip the currentTime head to a specific point. */
  if(isIPad){
    var force = function () {
      //audio.pause();
      try {audio.pause();} catch (e) {;}
      audio.removeEventListener('play', force, false);
    };

    var progress = function () {
      audio.removeEventListener('progress', progress, false);
      if (track.updateCallback !== null) track.updateCallback();
    };

    audio.addEventListener('play', force, false);
    audio.addEventListener('progress', progress, false);

    var kickoff = function () {
      audio.play();
      document.documentElement.removeEventListener(click, kickoff, true);
    };

    document.documentElement.addEventListener(click, kickoff, true);
  }

  this.loop=loop;
  this.arrDefs=arrDefs;
  this.updateCallback = null;
  this.audio = audio;
  this.playing = false;
  this.lastUsed = 0;
  //this.spriteLength = spriteLength;
  //this.audioLead = audioLead;
}

Track.prototype.pause = function () {
  var track = this,  audio = this.audio;
  audio.currentTime = 0;
  audio.muted = true;
  //audio.pause();
  try {audio.pause();} catch (e) {;}
}

Track.prototype.replay = function () {  
  if(this.itemDef)
    this.play(this.itemDef, 0);
}

Track.prototype.play = function (itemDef, position, booleanNoRepetir) {  
  //console.info("this.itemDef:"+this.itemDef) ;
  if(modoNoSound){
     if(modoDebug){
        console.info("No Sound Configurado");
     }  
     return;
  }

  if(booleanNoRepetir){
    if(this.itemDef==itemDef){
      return;
    } 
  }

  this.itemDef=itemDef; 

  var elem=this.arrDefs[itemDef];
  if(!elem){
    if(modoDebug){
      console.info("error en audio:"+itemDef);
    }  
    return;

  }

  var startPos=elem[0];
  var duration=elem[1];

  var track = this,
      audio = this.audio,
      time = startPos+position,
      limit = startPos+duration;

  clearInterval(track.timer);
  track.playing = true;
  track.lastUsed = +new Date;
  
  audio.muted = false;
  //Evita error en IE9
  try {audio.pause();} catch (e) {
    if(modoDebug){
      console.info("err:"+e);
    } 
  }
  try {
    if (time == 0) time = 0.01; // yay hacks. Sometimes setting time to 0 doesn't play back
    audio.currentTime = time;
    audio.play();
  } catch (e) {
    if(modoDebug){
      console.info("err:"+e);
    }  
    this.updateCallback = function () {
      track.updateCallback = null;
      audio.currentTime = time;
      audio.play();
    };
    //se ejecuta la primera vez regularmente
    audio.play();
  }
 
  track.timer = setInterval(function () {
    if (audio.currentTime >= limit) {
      try {audio.pause();} catch (e) {;}
      
      audio.muted = true;
      clearInterval(track.timer);
      if(track.loop){
        //console.info('terminado por codigo->'+itemDef+"-"+position);
        track.timer = setInterval(function () {track.play(itemDef, position);}, 10);
      } 

    }
  }, 10);

};

var loadAudio=function(audioTrack){ 
  var that={};

  that.audioTrack=audioTrack;
  that.start=function(){
    that.itvLoadAudio=setInterval(
      function(){
        try{
          that.audioTrack.audio.currentTime = that.audioTrack.maxTime-0.1;

          that.onReady();
          clearInterval(that.itvLoadAudio);
        }catch(e){
          if(modoDebug){
            console.info("err->itvLoadAudio-->"+e);
           } 
        }
      }, 
    100);
  }

  that.setOnReady=function(func){
    that.onReady=func;
  }  

  that.onReady=function(){}
  
  return that;

}