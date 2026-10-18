const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const core=html.match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1];
vm.runInThisContext(core);
const era=+process.argv[2]||0, seed=+process.argv[3]||7, years=+process.argv[4]||60;
const s=new Sim(seed,era); const counts={};
s.on(e=>{counts[e.type]=(counts[e.type]||0)+1});
const t0=Date.now();
for(let y=1;y<=years;y++){for(let k=0;k<Sim.YEAR;k++)s.step(); if(y%10===0){const st=s.stats(); console.log(`Y${y} pop=${st.pop} tribes=${st.tribes} loners=${st.loners} era=${Sim.ERAS[st.era].name} wars=${[...s.tribes.values()].reduce((n,t)=>n+t.wars.size,0)/2}`);}}
console.log('ms',Date.now()-t0, counts);
console.log(s.history.slice(0,12).map(e=>`Y${e.year} ${e.text}`).join('\n'));
console.log('...');console.log(s.history.slice(-12).map(e=>`Y${e.year} ${e.text}`).join('\n'));
