import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3,Box3} from 'three';
import {fitCamera} from '../examples/dragon-boat/camera.js';
let cases=0;
for(const [w,h] of [[360,640],[390,520],[768,600],[1440,900]])for(const length of [9,12.49,15])for(const view of ['perspective','side','top']){
const camera=new PerspectiveCamera(w<600?48:35,w/h,.05,200),target=new Vector3(0,.4,0);
if(view==='side')camera.position.set(0,1,length*1.22);else if(view==='top')camera.position.set(0,length*1.4,.001);else camera.position.set(length*.57,length*.59,length*.84);
const bounds=new Box3(new Vector3(-length/2-1.1,-.03,-.9),new Vector3(length/2+1.3,2.55,.95));fitCamera(camera,target,bounds);
for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const v=new Vector3(x,y,z).project(camera);assert(Math.abs(v.x)<.86&&Math.abs(v.y)<.86&&v.z>-1&&v.z<1,`Clipped ${w}×${h} ${view}`);}cases++;
}
console.log(`PASS ${cases} camera cases: all ornament-inclusive bounds inside perspective frustum.`);
