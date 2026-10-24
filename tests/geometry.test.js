import assert from 'node:assert/strict';
import {defaults,station,section,hullData} from '../examples/dragon-boat/geometry.js';
let cases=0;
for(const length of [9,12.49,15])for(const beam of [.9,1.16,1.65])for(const rocker of [.05,.25,.55]){
 const p={length,beam,rocker},data=hullData(p);cases++;
 assert(data.positions.every(Number.isFinite),'Every coordinate finite');
 assert(data.indices.every(n=>Number.isInteger(n)&&n>=0&&n<data.positions.length/3),'Valid indices');
 assert.equal(station(1,p).keel,rocker);assert.equal(station(-1,p).keel,rocker);assert.equal(station(0,p).keel,0);
 assert.equal(station(0,p).width,beam/2);assert.equal(station(1,p).x,length/2);
 for(let i=0;i<=100;i++){const t=i/50-1;assert.equal(station(t,p).width,station(-t,p).width);for(let j=0;j<=32;j++){const a=(j/32-.5)*Math.PI,v=section(t,a,p),other=section(t,-a,p);assert(Math.abs(v[2]+other[2])<1e-10);assert.equal(v[1],other[1]);const inner=section(t,a,p,true);assert(inner[1]>=v[1]-1e-10);assert(Math.abs(inner[2])<=Math.abs(v[2])+1e-10);}}
}
assert.deepEqual(defaults,{length:12.49,beam:1.16,rocker:.25});
console.log(`PASS ${cases} dimension combinations: finite mesh, indices, symmetry, rocker end rise, inner/outer clearance.`);
