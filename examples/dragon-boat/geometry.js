export const defaults = Object.freeze({ length: 12.49, beam: 1.16, rocker: .25 });
export function station(t, p) {
  const width = p.beam / 2 * Math.pow(Math.max(0, 1 - t*t), .64);
  const keel = p.rocker * Math.pow(Math.abs(t), 3.2);
  const depth = .49 + .12 * Math.pow(Math.abs(t), 3);
  return { x: t*p.length/2, width, keel, depth };
}
export function section(t, a, p, inside=false) {
  const s=station(t,p), thickness=inside ? .028 : 0;
  return [s.x, s.keel+thickness+(s.depth-thickness)*(1-Math.cos(a)), Math.max(0,s.width-thickness)*Math.sin(a)];
}
export function hullData(p, segments=96, cross=32) {
  const positions=[], indices=[];
  for(let layer=0;layer<2;layer++) for(let i=0;i<=segments;i++) for(let j=0;j<=cross;j++) positions.push(...section(i/segments*2-1,(j/cross-.5)*Math.PI,p,!!layer));
  const stride=cross+1, offset=(segments+1)*stride;
  const quad=(a,b,c,d,flip=false)=>indices.push(...(flip?[a,c,b,a,d,c]:[a,b,c,a,c,d]));
  for(let l=0;l<2;l++) for(let i=0;i<segments;i++) for(let j=0;j<cross;j++){const a=l*offset+i*stride+j;quad(a,a+stride,a+stride+1,a+1,!!l);}
  for(let i=0;i<segments;i++)for(const j of [0,cross]){const a=i*stride+j;quad(a,a+stride,a+stride+offset,a+offset,j===0);}
  for(const i of [0,segments])for(let j=0;j<cross;j++){const a=i*stride+j;quad(a,a+1,a+1+offset,a+offset,i===0);}
  return {positions,indices};
}
