const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const s=new Sim(5,3); for(let k=0;k<600;k++)s.step();
const t=[...s.tribes.values()][0];
for(const k of ['meteor','quake','plague','fire','drought','harvest','people']) { const e=s.nudge(k,t.camp.x+1,t.camp.y+1); console.log(k, e&&e.text); }
for(let k=0;k<3000;k++)s.step();
console.log(s.history.filter(e=>['naval','disaster','blessing'].includes(e.type)).slice(-14).map(e=>e.text).join('\n'));
console.log('ships',s.ships.length, 'fires', s.fires.size);
