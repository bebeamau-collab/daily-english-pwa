// Test instrumentation only: qa-server.py injects this on isolated localhost.
(() => {
  const NativeAudio = window.Audio;
  let sequence=0;
  let output;
  function panel() {
    if(!output) {
      output=document.createElement('output');
      output.id='qa-audio-status';
      output.setAttribute('aria-label','測試音訊狀態');
      output.style.cssText='display:block;padding:8px;font:12px monospace;background:#fff3bf;color:#111;overflow-wrap:anywhere';
      document.body.append(output);
    }
    return output;
  }
  window.Audio = function(...args) {
    const audio=new NativeAudio(...args);
    const id=String(++sequence);
    const update=event=>{
      const el=panel();
      if(event==='playing')audio.dataset.qaPlaying='true';
      if(event==='pause'||event==='ended'||event==='error')audio.dataset.qaPlaying='false';
      const info={id,src:audio.src,event,time:audio.currentTime,duration:Number.isFinite(audio.duration)?audio.duration:0,paused:audio.paused,error:audio.error?.code||0,readyState:audio.readyState};
      el.textContent=JSON.stringify(info);
      Object.assign(el.dataset,{id,src:audio.src,event,time:String(audio.currentTime),duration:String(info.duration),error:String(info.error),playing:audio.dataset.qaPlaying||'false',advanced:String(audio.currentTime>0.05&&!audio.paused),ended:String(audio.ended)});
    };
    for(const event of ['loadstart','loadedmetadata','canplay','play','playing','timeupdate','pause','ended','error'])audio.addEventListener(event,()=>update(event));
    return audio;
  };
  window.Audio.prototype=NativeAudio.prototype;
})();
