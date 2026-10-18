const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
vm.runInThisContext(html.match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
for (const [era,seed] of [[0,7],[2,3],[3,11],[5,5]]) {
const s=new Sim(seed,era); const c={}; const msgs=[];
s.on(e=>{c[e.type]=(c[e.type]||0)+1; if(e.type==='army'||e.type==='battle'||e.type==='fall') msgs.push(`Y${e.year} ${e.text}`)});
const t0=Date.now(); let maxA=0, stuck=0;
for(let y=1;y<=80;y++){for(let k=0;k<Sim.YEAR;k++){s.step(); maxA=Math.max(maxA,s.armies.filter(r=>!r.dead).length);} }
console.log('era',era,'ms',Date.now()-t0,'pop',s.agents.length,'tribes',s.tribes.size,'maxArmies',maxA, JSON.stringify(c));
console.log(msgs.slice(0,14).join('\n'));
}
