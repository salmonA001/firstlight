const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
for (const [era,seed] of [[1,3],[4,7],[5,11]]) {
const s=new Sim(seed,era); console.log('era',era,'islands',s.islands.length, 'landmasses', s.landSize.filter(n=>n>3).length, 'island nations', [...s.tribes.values()].filter(t=>s.isIsland(t)).length);
let maxM=0; for(let k=0;k<YEARS();k++){ s.step(); maxM=Math.max(maxM,s.ships.filter(x=>x.alive&&x.merchant).length); }
function YEARS(){return 60*40;}
console.log(' merchants max',maxM,'links',s.links.map(l=>l.kind).join(','), 'island nations now', [...s.tribes.values()].filter(t=>s.isIsland(t)).length);
console.log(' ', s.history.filter(e=>e.type==='sea'||/irate/.test(e.text)).slice(-5).map(e=>'Y'+e.year+' '+e.text).join('\n  '));
const s2=Sim.load(s.serialize()); for(let k=0;k<200;k++) s2.step(); console.log(' save ok links', s2.links.length);
}
