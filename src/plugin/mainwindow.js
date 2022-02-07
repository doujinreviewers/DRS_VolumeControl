import * as fs from 'fs';
import * as path from 'path';
import prebundlejs from './assets/DRS_VolumeControl.prebundleapp';

let prev_bgm = 0;
let prev_me = 0;
let prev_bgs = 0;
let prev_se = 0;

let state_bgm = true;
let state_me = true;
let state_bgs = true;
let state_se = true;

prev_bgm = AudioManager.bgmVolume;
prev_me = AudioManager.meVolume;
prev_bgs = AudioManager.bgsVolume;
prev_se = AudioManager.seVolume;

let root_html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ゲーム音量調整プラグイン</title>
  </head>
  <body>
    <div id="app"></div>
`
let app_html=`<script>${prebundlejs}</script>`;


const html_filename = "DRS_VolumeControl_MainWindow.html";

let showUI = () => {

  if(state_bgm){
    prev_bgm = AudioManager.bgmVolume;
  }
  if(state_me){
    prev_me = AudioManager.meVolume;
  }
  if(state_bgs){
    prev_bgs = AudioManager.bgsVolume;
  }
  if(state_se){
    prev_se = AudioManager.seVolume;
  }

  let states_html = `<div id="currentStates">${JSON.stringify({"state_bgm": state_bgm, "state_me": state_me, "state_bgs": state_bgs, "state_se": state_se})}</div>`;
  let render_html = root_html + states_html + app_html +`</body></html>`;
  fs.writeFileSync(path.join(process.cwd(), html_filename), render_html);
  nw.Window.open(html_filename, {}, function(win) {
    win.width = 300;
    win.height = 250;
    win.on('close', function () {
      try {
        fs.unlinkSync(path.join(process.cwd(), html_filename));
      } catch (e) {
        console.log(e);
      } finally {
        this.close(true);
      }
    });
  
    win.window.addEventListener("changegamevolume", function(event) {
      changeVolume(event.detail);
    });
  })
}

let changeVolume = (on) => {
  if(on.bgm){
    AudioManager.bgmVolume = prev_bgm;
    state_bgm = true;
  }else{
    AudioManager.bgmVolume = 0;
    state_bgm = false;
  }
  if(on.me){
    AudioManager.meVolume = prev_me;
    state_me = true;
  }else{
    AudioManager.meVolume = 0;
    state_me = false;
  }
  if(on.bgs){
    AudioManager.bgsVolume = prev_bgs;
    state_bgs = true;
  }else{
    AudioManager.bgsVolume = 0;
    state_bgs = false;
  }
  if(on.se){
    AudioManager.seVolume = prev_se;
    state_se = true;
  }else{
    AudioManager.seVolume = 0;
    state_se = false;
  }
}

nw.Window.get().window.addEventListener("keydown", function(e){
  if(e.key === 'F1') {
    showUI();
  }
});