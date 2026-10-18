const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
for (const [era,seed] of [[5,7],[6,3],[3,5]]) { const s=new Sim(seed,era); const m=[]; let subs=0;
s.on(e=>{ if(/submarine|torpedo|Anti-aircraft|shot down/.test(e.text)) m.push(`Y${e.year} ${e.text}`); });
for(let k=0;k<50*Sim.YEAR;k++){ s.step(); subs=Math.max(subs,s.ships.filter(x=>x.alive&&x.sub).length); }
console.log('era',era,'pop',s.agents.length,'maxSubs',subs); console.log(m.slice(0,8).join('\n')); }
