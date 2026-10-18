const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const s=new Sim(9,2); for(let k=0;k<60*60;k++)s.step();
console.log('faiths', [...s.religions.values()].map(r=>r.name+' '+JSON.stringify(s.followers(r.id))));
const j=s.serialize(); console.log('save KB', (j.length/1024).toFixed(0));
const s2=Sim.load(j); for(let k=0;k<20*60;k++)s2.step(); console.log('after load', JSON.stringify(s2.stats()), s2.year(), s2.history.slice(-2).map(e=>e.text));
