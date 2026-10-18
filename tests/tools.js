const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const s=new Sim(5,3); for(let k=0;k<1200;k++)s.step();
const ts=[...s.tribes.values()].sort((a,b)=>b.members.size-a.members.size);
for(const k of ['volcano','flood','forest','bless','gift','discord','peace','prophet','rebels','rally']) { const t=ts[0]; const e=s.nudge(k,t.camp.x+1,t.camp.y+1); console.log(k,'->', e&&e.text, '|', s.history[s.history.length-1].text); }
for(let k=0;k<2000;k++)s.step();
console.log('ok pop', s.agents.length||s.byId.size, 'tribes', s.tribes.size);
