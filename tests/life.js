const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(require('path').join(__dirname,'..'),'index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
for (const era of [0,2,5]) {
const s=new Sim(9,era); const t0=Date.now(); for(let k=0;k<60*30;k++) s.step();
const ag=s.agents, goals={}; for(const a of ag) if(a.goal) goals[a.goal.type]=(goals[a.goal.type]||0)+1;
const jobs={}; for(const a of ag) if(a.job) jobs[a.job]=(jobs[a.job]||0)+1;
console.log('era',era,'pop',ag.length,'ms',Date.now()-t0,'married',ag.filter(a=>a.spouse).length,'kids>0',ag.filter(a=>a.kids).length,'friends',ag.filter(a=>a.friend).length,'grieving',ag.filter(a=>a.grief>0).length);
console.log(' goals',JSON.stringify(goals)); console.log(' jobs',JSON.stringify(jobs));
console.log(' fests', s.history.filter(e=>e.type==='festival').length, s.history.filter(e=>e.type==='family').slice(-1).map(e=>e.text), s.history.filter(e=>e.type==='festival').slice(-1).map(e=>e.text));
console.log(' thoughts:', [...new Set(ag.map(a=>a.thought))].slice(0,12).join(' | '));
const s2=Sim.load(s.serialize()); for(let k=0;k<100;k++) s2.step(); console.log(' save ok');
}
