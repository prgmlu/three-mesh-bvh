var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire4485;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire4485=o),o.register("5Rd1x",(function(e,t){var n,a,i,r;n=e.exports,a="OrbitControls",i=()=>m,Object.defineProperty(n,a,{get:i,set:r,enumerable:!0,configurable:!0});var c=o("ilwiq");const s={type:"change"},l={type:"start"},p={type:"end"};class m extends c.EventDispatcher{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new c.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:c.MOUSE.ROTATE,MIDDLE:c.MOUSE.DOLLY,RIGHT:c.MOUSE.PAN},this.touches={ONE:c.TOUCH.ROTATE,TWO:c.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",Z),this._domElementKeyEvents=e},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Z),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(s),n.update(),a=o.NONE},this.update=function(){const t=new c.Vector3,l=(new c.Quaternion).setFromUnitVectors(e.up,new c.Vector3(0,1,0)),p=l.clone().invert(),b=new c.Vector3,f=new c.Quaternion,E=2*Math.PI;return function(){const e=n.object.position;t.copy(e).sub(n.target),t.applyQuaternion(l),r.setFromVector3(t),n.autoRotate&&a===o.NONE&&N(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(r.theta+=m.theta*n.dampingFactor,r.phi+=m.phi*n.dampingFactor):(r.theta+=m.theta,r.phi+=m.phi);let c=n.minAzimuthAngle,g=n.maxAzimuthAngle;return isFinite(c)&&isFinite(g)&&(c<-Math.PI?c+=E:c>Math.PI&&(c-=E),g<-Math.PI?g+=E:g>Math.PI&&(g-=E),r.theta=c<=g?Math.max(c,Math.min(g,r.theta)):r.theta>(c+g)/2?Math.max(c,r.theta):Math.min(g,r.theta)),r.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,r.phi)),r.makeSafe(),r.radius*=u,r.radius=Math.max(n.minDistance,Math.min(n.maxDistance,r.radius)),!0===n.enableDamping?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),t.setFromSpherical(r),t.applyQuaternion(p),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(m.theta*=1-n.dampingFactor,m.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(m.set(0,0,0),d.set(0,0,0)),u=1,!!(h||b.distanceToSquared(n.object.position)>i||8*(1-f.dot(n.object.quaternion))>i)&&(n.dispatchEvent(s),b.copy(n.object.position),f.copy(n.object.quaternion),h=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",q),n.domElement.removeEventListener("pointerdown",V),n.domElement.removeEventListener("pointercancel",F),n.domElement.removeEventListener("wheel",X),n.domElement.removeEventListener("pointermove",z),n.domElement.removeEventListener("pointerup",F),null!==n._domElementKeyEvents&&(n._domElementKeyEvents.removeEventListener("keydown",Z),n._domElementKeyEvents=null)};const n=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=o.NONE;const i=1e-6,r=new c.Spherical,m=new c.Spherical;let u=1;const d=new c.Vector3;let h=!1;const b=new c.Vector2,f=new c.Vector2,E=new c.Vector2,g=new c.Vector2,y=new c.Vector2,O=new c.Vector2,T=new c.Vector2,P=new c.Vector2,v=new c.Vector2,w=[],A={};function L(){return Math.pow(.95,n.zoomSpeed)}function N(e){m.theta-=e}function M(e){m.phi-=e}const j=function(){const e=new c.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),d.add(e)}}(),x=function(){const e=new c.Vector3;return function(t,o){!0===n.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),d.add(e)}}(),S=function(){const e=new c.Vector3;return function(t,o){const a=n.domElement;if(n.object.isPerspectiveCamera){const i=n.object.position;e.copy(i).sub(n.target);let r=e.length();r*=Math.tan(n.object.fov/2*Math.PI/180),j(2*t*r/a.clientHeight,n.object.matrix),x(2*o*r/a.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(j(t*(n.object.right-n.object.left)/n.object.zoom/a.clientWidth,n.object.matrix),x(o*(n.object.top-n.object.bottom)/n.object.zoom/a.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function R(e){n.object.isPerspectiveCamera?u/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(e){n.object.isPerspectiveCamera?u*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(e){b.set(e.clientX,e.clientY)}function I(e){g.set(e.clientX,e.clientY)}function C(){if(1===w.length)b.set(w[0].pageX,w[0].pageY);else{const e=.5*(w[0].pageX+w[1].pageX),t=.5*(w[0].pageY+w[1].pageY);b.set(e,t)}}function D(){if(1===w.length)g.set(w[0].pageX,w[0].pageY);else{const e=.5*(w[0].pageX+w[1].pageX),t=.5*(w[0].pageY+w[1].pageY);g.set(e,t)}}function H(){const e=w[0].pageX-w[1].pageX,t=w[0].pageY-w[1].pageY,n=Math.sqrt(e*e+t*t);T.set(0,n)}function U(e){if(1==w.length)f.set(e.pageX,e.pageY);else{const t=B(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);f.set(n,o)}E.subVectors(f,b).multiplyScalar(n.rotateSpeed);const t=n.domElement;N(2*Math.PI*E.x/t.clientHeight),M(2*Math.PI*E.y/t.clientHeight),b.copy(f)}function _(e){if(1===w.length)y.set(e.pageX,e.pageY);else{const t=B(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);y.set(n,o)}O.subVectors(y,g).multiplyScalar(n.panSpeed),S(O.x,O.y),g.copy(y)}function K(e){const t=B(e),o=e.pageX-t.x,a=e.pageY-t.y,i=Math.sqrt(o*o+a*a);P.set(0,i),v.set(0,Math.pow(P.y/T.y,n.zoomSpeed)),R(v.y),T.copy(P)}function V(e){!1!==n.enabled&&(0===w.length&&(n.domElement.setPointerCapture(e.pointerId),n.domElement.addEventListener("pointermove",z),n.domElement.addEventListener("pointerup",F)),function(e){w.push(e)}(e),"touch"===e.pointerType?function(e){switch(G(e),w.length){case 1:switch(n.touches.ONE){case c.TOUCH.ROTATE:if(!1===n.enableRotate)return;C(),a=o.TOUCH_ROTATE;break;case c.TOUCH.PAN:if(!1===n.enablePan)return;D(),a=o.TOUCH_PAN;break;default:a=o.NONE}break;case 2:switch(n.touches.TWO){case c.TOUCH.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&H(),n.enablePan&&D(),a=o.TOUCH_DOLLY_PAN;break;case c.TOUCH.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&H(),n.enableRotate&&C(),a=o.TOUCH_DOLLY_ROTATE;break;default:a=o.NONE}break;default:a=o.NONE}a!==o.NONE&&n.dispatchEvent(l)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case c.MOUSE.DOLLY:if(!1===n.enableZoom)return;!function(e){T.set(e.clientX,e.clientY)}(e),a=o.DOLLY;break;case c.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;I(e),a=o.PAN}else{if(!1===n.enableRotate)return;Y(e),a=o.ROTATE}break;case c.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;Y(e),a=o.ROTATE}else{if(!1===n.enablePan)return;I(e),a=o.PAN}break;default:a=o.NONE}a!==o.NONE&&n.dispatchEvent(l)}(e))}function z(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(G(e),a){case o.TOUCH_ROTATE:if(!1===n.enableRotate)return;U(e),n.update();break;case o.TOUCH_PAN:if(!1===n.enablePan)return;_(e),n.update();break;case o.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;!function(e){n.enableZoom&&K(e),n.enablePan&&_(e)}(e),n.update();break;case o.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;!function(e){n.enableZoom&&K(e),n.enableRotate&&U(e)}(e),n.update();break;default:a=o.NONE}}(e):function(e){switch(a){case o.ROTATE:if(!1===n.enableRotate)return;!function(e){f.set(e.clientX,e.clientY),E.subVectors(f,b).multiplyScalar(n.rotateSpeed);const t=n.domElement;N(2*Math.PI*E.x/t.clientHeight),M(2*Math.PI*E.y/t.clientHeight),b.copy(f),n.update()}(e);break;case o.DOLLY:if(!1===n.enableZoom)return;!function(e){P.set(e.clientX,e.clientY),v.subVectors(P,T),v.y>0?R(L()):v.y<0&&k(L()),T.copy(P),n.update()}(e);break;case o.PAN:if(!1===n.enablePan)return;!function(e){y.set(e.clientX,e.clientY),O.subVectors(y,g).multiplyScalar(n.panSpeed),S(O.x,O.y),g.copy(y),n.update()}(e)}}(e))}function F(e){!function(e){delete A[e.pointerId];for(let t=0;t<w.length;t++)if(w[t].pointerId==e.pointerId)return void w.splice(t,1)}(e),0===w.length&&(n.domElement.releasePointerCapture(e.pointerId),n.domElement.removeEventListener("pointermove",z),n.domElement.removeEventListener("pointerup",F)),n.dispatchEvent(p),a=o.NONE}function X(e){!1!==n.enabled&&!1!==n.enableZoom&&a===o.NONE&&(e.preventDefault(),n.dispatchEvent(l),function(e){e.deltaY<0?k(L()):e.deltaY>0&&R(L()),n.update()}(e),n.dispatchEvent(p))}function Z(e){!1!==n.enabled&&!1!==n.enablePan&&function(e){let t=!1;switch(e.code){case n.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?M(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):S(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?M(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):S(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?N(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):S(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?N(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):S(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}(e)}function q(e){!1!==n.enabled&&e.preventDefault()}function G(e){let t=A[e.pointerId];void 0===t&&(t=new c.Vector2,A[e.pointerId]=t),t.set(e.pageX,e.pageY)}function B(e){const t=e.pointerId===w[0].pointerId?w[1]:w[0];return A[t.pointerId]}n.domElement.addEventListener("contextmenu",q),n.domElement.addEventListener("pointerdown",V),n.domElement.addEventListener("pointercancel",F),n.domElement.addEventListener("wheel",X,{passive:!1}),this.update()}}}));
//# sourceMappingURL=characterMovement.9329e59d.js.map
