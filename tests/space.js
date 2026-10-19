// Modern nations launch rockets and race to the Moon; launches survive save and load.
const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const s=new Sim(5,6); for(let i=0;i<60*30;i++) s.step();
const space=s.history.filter(e=>/orbit|Moon|Mars|probe|space station|astronauts/.test(e.text));
if(!space.length) throw new Error('no rocket launches in 30 years of the 2000s');
const t=[...s.tribes.values()].sort((a,b)=>(b.space||0)-(a.space||0))[0];
console.log('launches',t.name,t.space); console.log(space.slice(0,6).map(e=>'Y'+e.year+' '+e.text).join('\n'));
const s2=Sim.load(s.serialize()); s2.step(); if(!Array.isArray(s2.rockets)) throw new Error('rockets not restored');
const old=new Sim(3,1); for(let i=0;i<60*20;i++) old.step(); if(old.history.some(e=>/orbit/.test(e.text))) throw new Error('rockets in the ancient world');
console.log('ok');
