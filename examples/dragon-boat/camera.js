import { Vector3 } from 'three';
/** Fits all eight bounds corners inside the perspective frustum, preserving view direction. */
export function fitCamera(camera, target, bounds, margin=1.18) {
  const direction=camera.position.clone().sub(target).normalize();
  const right=new Vector3().crossVectors(camera.up,direction).normalize();
  const up=new Vector3().crossVectors(direction,right).normalize();
  const tanV=Math.tan(camera.fov*Math.PI/360), tanH=tanV*camera.aspect;
  let distance=0;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
    const v=new Vector3(x,y,z).sub(target),near=v.dot(direction);
    distance=Math.max(distance,near+Math.abs(v.dot(right))*margin/tanH,near+Math.abs(v.dot(up))*margin/tanV);
  }
  camera.position.copy(target).addScaledVector(direction,distance);
  camera.lookAt(target);camera.updateMatrixWorld();return distance;
}
