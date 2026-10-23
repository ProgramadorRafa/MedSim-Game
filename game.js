(() => {
'use strict';
const KEY='medsim_progress_v3';
const OLD_KEYS=['medsim_progress_v2'];
const SOUND_KEY='medsim_sound_enabled_v1';
let soundEnabled=true;
try{soundEnabled=localStorage.getItem(SOUND_KEY)!=='false';}catch{}
let audioContext=null;
function playSound(kind){
  if(!soundEnabled)return;
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass)return;
    if(!audioContext)audioContext=new AudioContextClass();
    if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
    const now=audioContext.currentTime+.025;
    const notes={correct:[[523,0,.12],[659,.13,.12],[784,.26,.20]],wrong:[[330,0,.18],[220,.2,.28]],death:[[392,0,.22],[294,.25,.26],[196,.54,.32],[130.81,.9,.65]],victory:[[523,0,.14],[659,.16,.14],[784,.32,.14],[1046,.5,.42]]}[kind]||[];
    notes.forEach(([freq,offset,duration])=>{
      const oscillator=audioContext.createOscillator();
      const gain=audioContext.createGain();
      oscillator.type=kind==='death'?'sawtooth':kind==='wrong'?'triangle':'sine';
      oscillator.frequency.setValueAtTime(freq,now+offset);
      gain.gain.setValueAtTime(.0001,now+offset);
      gain.gain.exponentialRampToValueAtTime(kind==='death'?.065:.11,now+offset+.025);
      gain.gain.exponentialRampToValueAtTime(.0001,now+offset+duration);
      oscillator.connect(gain);gain.connect(audioContext.destination);
      oscillator.start(now+offset);oscillator.stop(now+offset+duration+.02);
    });
  }catch(error){console.warn('Áudio indisponível:',error);}
}
function updateSoundButton(){const button=$('soundToggle');button.textContent=soundEnabled?'🔊 Som ligado':'🔇 Som desligado';button.setAttribute('aria-pressed',String(soundEnabled));}

const $=id=>document.getElementById(id);
const initial=(name='')=>({name,index:0,score:0,errors:0,health:50,selected:null,done:false});
let game=initial();
function valid(g){return g&&typeof g.name==='string'&&g.name.length<=40&&Number.isInteger(g.index)&&g.index>=0&&g.index<=QUESTIONS.length&&Number.isInteger(g.score)&&Number.isInteger(g.errors)&&g.score>=0&&g.errors>=0&&g.score+g.errors<=QUESTIONS.length&&Number.isFinite(g.health)&&g.health>=0&&g.health<=100&&(g.selected===null||(Number.isInteger(g.selected)&&g.selected>=0&&g.selected<4))&&typeof g.done==='boolean'&&g.index===g.score+g.errors-(g.selected===null?0:1);}
try{const stored=JSON.parse(localStorage.getItem(KEY));if(valid(stored))game=stored;}catch{}
function save(){try{localStorage.setItem(KEY,JSON.stringify(game));$('saveStatus').textContent='✓ Progresso salvo';}catch{$('saveStatus').textContent='⚠ Salvamento indisponível';}}
function showModal(type){$('overlay').hidden=false;$('nameForm').hidden=type!=='start';$('modalRestart').hidden=type==='start';$('modalScore').hidden=type==='start';if(type==='start'){$('modalTitle').textContent='Bem-vindo ao MedSim';$('modalDescription').textContent='Identifique-se para assumir o atendimento e tentar estabilizar o paciente.';$('nameInput').value='';setTimeout(()=>$('nameInput').focus(),0);}else{const dead=game.errors>=6;$('modalTitle').textContent=dead?'Paciente faleceu':'Paciente estabilizado!';$('modalDescription').textContent=dead?'Você acumulou 6 erros. O paciente perdeu os sinais vitais na simulação. Reinicie para tentar novamente.':'Você concluiu a missão com pelo menos 6 acertos!';$('modalScore').textContent=`${game.name}: ${game.score} acertos · ${game.errors} erros`;}}
function hideModal(){$('overlay').hidden=true;}
function monitor(){
  const dead=game.errors>=6;
  const won=game.done&&!dead;
  const h=dead?0:won?100:game.health;
  const severity=dead?'dead':game.errors>=5?'critical':game.errors>=3?'warning':'normal';
  const color=severity==='dead'||severity==='critical'?'#fb7185':severity==='warning'?'#fbbf24':'#34d399';
  const monitorPanel=document.querySelector('.monitor');
  monitorPanel.classList.remove('monitor-warning','monitor-critical','monitor-dead');
  if(severity!=='normal')monitorPanel.classList.add('monitor-'+severity);
  $('healthBar').style.width=h+'%';
  $('healthBar').style.background=dead?'#ef4444':h>=65?'#34d399':h>=35?'#fbbf24':'#fb7185';
  $('healthLabel').textContent=h+'%';
  $('hr').textContent=dead?'0':Math.round(112-(h-50)*.55);
  $('spo').textContent=dead?'--':Math.min(99,Math.round(93+(h-50)*.12));
  $('bp').textContent=dead?'--/--':`${Math.round(100+(h-50)*.4)}/${Math.round(65+(h-50)*.2)}`;
  $('rr').textContent=dead?'0':Math.max(10,Math.round(24-(h-50)*.12));
  $('status').textContent=dead?'● ÓBITO':won?'● ESTABILIZADO':severity==='critical'?'● ESTADO CRÍTICO':severity==='warning'?'● ALERTA':h>=65?'● MELHORANDO':'● INSTÁVEL';
  $('status').style.color=dead?'#fb7185':won?'#34d399':color;
  $('wave').setAttribute('d',dead?'M0 52 H360':'M0 52 H35 L45 48 L55 52 H75 L86 62 L96 12 L106 85 L116 52 H145 Q160 34 175 52 H210 L220 48 L230 52 H255 L265 62 L275 12 L285 85 L296 52 H325 Q340 34 355 52 H360');
  $('wave').style.stroke=color;
  $('wave').style.animation=dead?'none':'';
  $('waveLabel').textContent=dead?'SEM ATIVIDADE SIMULADA':severity==='critical'?'ALERTA: SINAIS EM ESTADO CRÍTICO':severity==='warning'?'ATENÇÃO: SINAIS EM DETERIORAÇÃO':'RITMO CARDÍACO DETECTADO';
  $('waveLabel').style.color=color;
  ['hr','spo','bp','rr'].forEach(id=>{
    $(id).style.color=severity==='critical'||dead?'#fb7185':severity==='warning'?'#fbbf24':'';
  });
}

function render(){ if(!game.done && game.name)hideModal(); $('playerName').textContent=game.name||'—';$('score').textContent=`${game.score} acertos · ${game.errors} erros`;$('progress').style.width=Math.min(100,game.index/QUESTIONS.length*100)+'%';monitor();if(game.done){$('step').textContent='SIMULAÇÃO ENCERRADA';$('question').textContent='Atendimento concluído';$('options').replaceChildren();$('feedback').hidden=true;$('next').hidden=true;showModal('result');return;}$('step').textContent=`QUESTÃO ${String(game.index+1).padStart(2,'0')} / ${QUESTIONS.length}`;const q=QUESTIONS[game.index];$('question').textContent=q.question;$('options').replaceChildren();q.options.forEach((option,i)=>{const button=document.createElement('button');button.type='button';button.className='option';button.textContent=`${String.fromCharCode(65+i)}. ${option}`;if(game.selected!==null){button.disabled=true;if(i===q.correct)button.classList.add('correct');else if(i===game.selected)button.classList.add('wrong');}else button.addEventListener('click',()=>answer(i));$('options').appendChild(button);});$('feedback').hidden=game.selected===null;if(game.selected!==null)$('feedback').textContent=(game.selected===q.correct?'✓ Correto. ':'✕ Incorreto. ')+q.explanation;$('next').hidden=game.selected===null;$('next').textContent=game.index===QUESTIONS.length-1?'Concluir avaliação →':'Próxima pergunta →';}
function answer(i){if(game.done||game.selected!==null)return;game.selected=i;if(i===QUESTIONS[game.index].correct){game.score++;game.health=Math.min(100,game.health+10);}else{game.errors++;game.health=Math.max(0,game.health-12);}if(game.errors>=6){game.done=true;game.health=0;playSound('death');}else{playSound(i===QUESTIONS[game.index].correct?'correct':'wrong');}save();render();}
function restart(){game=initial(game.name);save();hideModal();render();}
function clearAll(){if(!window.confirm('Apagar nome e progresso? Esta ação não pode ser desfeita.'))return;try{localStorage.removeItem(KEY);OLD_KEYS.forEach(k=>localStorage.removeItem(k));}catch{}game=initial();render();showModal('start');$('saveStatus').textContent='Dados apagados';}
$('nameForm').addEventListener('submit',e=>{e.preventDefault();const name=$('nameInput').value.trim();if(name.length<2){$('nameInput').setCustomValidity('Informe pelo menos 2 caracteres.');$('nameInput').reportValidity();return;}$('nameInput').setCustomValidity('');game=initial(name);save();hideModal();render();});$('nameInput').addEventListener('input',()=>$('nameInput').setCustomValidity(''));
$('next').addEventListener('click',()=>{if(game.done||game.selected===null)return;game.index++;game.selected=null;if(game.index>=QUESTIONS.length){game.done=true;playSound(game.score>=6?'victory':'death');}save();render();});$('modalRestart').addEventListener('click',restart);$('resetAll').addEventListener('click',clearAll);
$('soundToggle').addEventListener('click',()=>{soundEnabled=!soundEnabled;try{localStorage.setItem(SOUND_KEY,String(soundEnabled));}catch{}updateSoundButton();});updateSoundButton();
render();if(!game.name)showModal('start');
})();
