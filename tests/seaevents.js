// Sea events change with the era: serpents early, pirates and treasure later, oil rigs and cruise ships in modern times.
const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8').match(/<script id="sim-core">([\s\S]*?)<\/script>/)[1]);
const want={0:['serpent','beached','storm'],6:['cruise','spill','wave','storm']};
for(let era=0;era<7;era++){const s=new Sim(7+era,era);const kinds={};
 for(let i=0;i<300;i++){s.step(); if(i%5==0)s.seaEvent(); for(const e of s.effects)if(!e._c){e._c=1;kinds[e.type]=1;}}
 if(want[era]&&!want[era].some(k=>kinds[k])) throw new Error('era '+era+' had no sea events: '+Object.keys(kinds));
 if(era===0&&(kinds.cruise||kinds.spill)) throw new Error('modern sea events in the Stone Age');
 const s2=Sim.load(s.serialize()); s2.step();
 console.log('era',era,Object.keys(kinds).join(','),'sites',s.seaSites.length);}
console.log('ok');
