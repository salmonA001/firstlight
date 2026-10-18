const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const s=new Sim(7,0); const c={}; s.on(e=>c[e.type]=(c[e.type]||0)+1);
for(let k=0;k<150*60;k++)s.step();
const dist={}; for(const t of s.tribes.values()) dist[t.ai.strategy]=(dist[t.ai.strategy]||0)+1;
console.log(dist, 'policy', c.policy, 'alliance', c.alliance);
for(const t of [...s.tribes.values()].slice(0,5)) console.log(t.name, Sim.STYLES[t.style].name, t.ai.strategy, JSON.stringify(Object.fromEntries(Object.entries(t.ai.v).map(([k,v])=>[k,+v.toFixed(2)]))), 'allies', t.allies.size);
console.log(s.history.filter(e=>e.type==='policy'||e.type==='alliance'||/surrender/.test(e.text)).slice(-8).map(e=>e.text).join('\n'));
