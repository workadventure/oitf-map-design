class T{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const x="https://unpkg.com/@workadventure/scripting-api-extra@1.4.6/dist";class oe{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new T(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function D(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(x+"/configuration.html"+e)}async function se(t,e){const n=await WA.room.getTiledMap(),r=new Map;return K(n.layers,r,t,e),r}function K(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(n&&o.name!==n||r&&!r.includes(s.name))continue;e.set(s.name,new oe(s))}}else o.type==="group"&&K(o.layers,e,n,r)}let M;async function P(){return M===void 0&&(M=ie()),M}async function ie(){return ae(await WA.room.getTiledMap())}function ae(t){const e=new Map;return Z(t.layers,"",e),e}function Z(t,e,n){for(const r of t)r.type==="group"?Z(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function ue(){const t=await P(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ce(t){let e=1/0,n=1/0,r=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<t.height;i++)for(let a=0;a<t.width;a++)s[a+i*t.width]!==0&&(e=Math.min(e,a),o=Math.max(o,a),n=Math.min(n,i),r=Math.max(r,i));return{top:n,left:e,right:o+1,bottom:r+1}}function z(t){let e=1/0,n=1/0,r=0,o=0;for(const s of t){const i=ce(s);i.left<e&&(e=i.left),i.top<n&&(n=i.top),i.right>o&&(o=i.right),i.bottom>r&&(r=i.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var le=Object.prototype.toString,E=Array.isArray||function(e){return le.call(e)==="[object Array]"};function k(t){return typeof t=="function"}function fe(t){return E(t)?"array":typeof t}function O(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function G(t,e){return t!=null&&typeof t=="object"&&e in t}function pe(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var he=RegExp.prototype.test;function ge(t,e){return he.call(t,e)}var de=/\S/;function ye(t){return!ge(de,t)}var Ae={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function me(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return Ae[n]})}var be=/\s*/,ve=/\s+/,Y=/\s*=/,We=/\s*\}/,we=/#|\^|\/|>|\{|&|=|!/;function Ee(t,e){if(!t)return[];var n=!1,r=[],o=[],s=[],i=!1,a=!1,u="",l=0;function f(){if(i&&!a)for(;s.length;)delete o[s.pop()];else s=[];i=!1,a=!1}var d,m,R;function C(v){if(typeof v=="string"&&(v=v.split(ve,2)),!E(v)||v.length!==2)throw new Error("Invalid tags: "+v);d=new RegExp(O(v[0])+"\\s*"),m=new RegExp("\\s*"+O(v[1])),R=new RegExp("\\s*"+O("}"+v[1]))}C(e||g.tags);for(var c=new _(t),b,h,y,S,I,W;!c.eos();){if(b=c.pos,y=c.scanUntil(d),y)for(var V=0,re=y.length;V<re;++V)S=y.charAt(V),ye(S)?(s.push(o.length),u+=S):(a=!0,n=!0,u+=" "),o.push(["text",S,b,b+1]),b+=1,S===`
`&&(f(),u="",l=0,n=!1);if(!c.scan(d))break;if(i=!0,h=c.scan(we)||"name",c.scan(be),h==="="?(y=c.scanUntil(Y),c.scan(Y),c.scanUntil(m)):h==="{"?(y=c.scanUntil(R),c.scan(We),c.scanUntil(m),h="&"):y=c.scanUntil(m),!c.scan(m))throw new Error("Unclosed tag at "+c.pos);if(h==">"?I=[h,y,b,c.pos,u,l,n]:I=[h,y,b,c.pos],l++,o.push(I),h==="#"||h==="^")r.push(I);else if(h==="/"){if(W=r.pop(),!W)throw new Error('Unopened section "'+y+'" at '+b);if(W[1]!==y)throw new Error('Unclosed section "'+W[1]+'" at '+b)}else h==="name"||h==="{"||h==="&"?a=!0:h==="="&&C(y)}if(f(),W=r.pop(),W)throw new Error('Unclosed section "'+W[1]+'" at '+c.pos);return Se(Ce(o))}function Ce(t){for(var e=[],n,r,o=0,s=t.length;o<s;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Se(t){for(var e=[],n=e,r=[],o,s,i=0,a=t.length;i<a;++i)switch(o=t[i],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function _(t){this.string=t,this.tail=t,this.pos=0}_.prototype.eos=function(){return this.tail===""};_.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};_.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function w(t,e){this.view=t,this.cache={".":this.view},this.parent=e}w.prototype.push=function(e){return new w(e,this)};w.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,s,i,a,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,i=e.split("."),a=0;s!=null&&a<i.length;)a===i.length-1&&(u=G(s,i[a])||pe(s,i[a])),s=s[i[a++]];else s=o.view[e],u=G(o.view,e);if(u){r=s;break}o=o.parent}n[e]=r}return k(r)&&(r=r.call(this.view)),r};function p(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}p.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};p.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||g.tags).join(":"),s=typeof r<"u",i=s?r.get(o):void 0;return i==null&&(i=Ee(e,n),s&&r.set(o,i)),i};p.prototype.render=function(e,n,r,o){var s=this.getConfigTags(o),i=this.parse(e,s),a=n instanceof w?n:new w(n,void 0);return this.renderTokens(i,a,r,e,o)};p.prototype.renderTokens=function(e,n,r,o,s){for(var i="",a,u,l,f=0,d=e.length;f<d;++f)l=void 0,a=e[f],u=a[0],u==="#"?l=this.renderSection(a,n,r,o,s):u==="^"?l=this.renderInverted(a,n,r,o,s):u===">"?l=this.renderPartial(a,n,r,s):u==="&"?l=this.unescapedValue(a,n):u==="name"?l=this.escapedValue(a,n,s):u==="text"&&(l=this.rawValue(a)),l!==void 0&&(i+=l);return i};p.prototype.renderSection=function(e,n,r,o,s){var i=this,a="",u=n.lookup(e[1]);function l(m){return i.render(m,n,r,s)}if(u){if(E(u))for(var f=0,d=u.length;f<d;++f)a+=this.renderTokens(e[4],n.push(u[f]),r,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")a+=this.renderTokens(e[4],n.push(u),r,o,s);else if(k(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,o.slice(e[3],e[5]),l),u!=null&&(a+=u)}else a+=this.renderTokens(e[4],n,r,o,s);return a}};p.prototype.renderInverted=function(e,n,r,o,s){var i=n.lookup(e[1]);if(!i||E(i)&&i.length===0)return this.renderTokens(e[4],n,r,o,s)};p.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),s=e.split(`
`),i=0;i<s.length;i++)s[i].length&&(i>0||!r)&&(s[i]=o+s[i]);return s.join(`
`)};p.prototype.renderPartial=function(e,n,r,o){if(r){var s=this.getConfigTags(o),i=k(r)?r(e[1]):r[e[1]];if(i!=null){var a=e[6],u=e[5],l=e[4],f=i;u==0&&l&&(f=this.indentPartial(i,l,a));var d=this.parse(f,s);return this.renderTokens(d,n,r,f,o)}}};p.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};p.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||g.escape,s=n.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===g.escape?String(s):o(s)};p.prototype.rawValue=function(e){return e[1]};p.prototype.getConfigTags=function(e){return E(e)?e:e&&typeof e=="object"?e.tags:void 0};p.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!E(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){L.templateCache=t},get templateCache(){return L.templateCache}},L=new p;g.clearCache=function(){return L.clearCache()};g.parse=function(e,n){return L.parse(e,n)};g.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return L.render(e,n,r,o)};g.escape=me;g.Scanner=_;g.Context=w;g.Writer=p;class J{constructor(e,n){this.template=e,this.state=n,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=g.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],s=r[1],i=r[4];["name","&","#","^"].includes(o)&&n.add(s),i!==void 0&&typeof i!="string"&&this.recursiveGetUsedVariables(i,n)}}}async function Te(){var t;const e=await ue();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new J(o.value,WA.state);if(s.isPureString())continue;const i=s.getValue();await j(n.name,o.name,i),s.onChange(async a=>{await j(n.name,o.name,a)})}}}async function Le(){var t;const e=await P();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const i=new J(s.value,WA.state);if(i.isPureString())continue;const a=i.getValue();N(n,s.name,a),i.onChange(u=>{N(n,s.name,u)})}}}async function j(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function N(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}let B,$=0,U=0;function X(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Pe(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=F(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function _e(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=F(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function Q(t){return t.map(e=>B.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function F(t){const e=Q(t),n=z(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow($-r,2)+Math.pow(U-o,2))}function Re(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Pe(t):_e(t),X(t)}),X(t)}function Ie(t,e,n,r){const o=t.name;let s,i,a=!1;const u=n.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const f=!!u;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function R(c){const b=z(Q(e.properties.mustGetString("closeLayer").split(`
`)));i=WA.room.website.create({name:"doorKeypad"+c,url:r+"/keypad.html#"+encodeURIComponent(c),position:{x:b.right*32,y:b.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){i&&(WA.room.website.delete(i.name),i=void 0)}WA.room.onEnterLayer(o).subscribe(()=>{if(a=!0,n.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(f&&!l||!f)&&(n.getString("code")||n.getString("codeVariable"))){R(o);return}l&&(WA.state[e.name]?d():m())}),WA.room.onLeaveLayer(o).subscribe(()=>{a=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),C()}),WA.state.onVariableChange(e.name).subscribe(()=>{a&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),i&&WA.state[e.name]===!0&&C(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Ve(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-$,2)+Math.pow(t.y-U,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function Me(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Ve(t)})}function Oe(t,e,n){let r;const o=e.getString("bellPopup");WA.room.onEnterLayer(n).subscribe(()=>{var s;o?r=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(n).subscribe(()=>{r&&(r.close(),r=void 0)})}async function Be(t){t=t??x;const e=await se();B=await P();for(const n of e.values())n.properties.get("door")&&Re(n),n.properties.get("bell")&&Me(n);for(const n of B.values()){const r=new T(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const i=e.get(o);if(i===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');Ie(n,i,r,t)}const s=r.getString("bellVariable");s&&Oe(s,r,n.name)}WA.player.onPlayerMove(n=>{$=n.x,U=n.y})}function xe(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),i=t.getString("tag");ke(n,e,r,o,s,i)}}function ke(t,e,n,r,o,s){s&&!WA.player.tags.includes(s)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function $e(){const t=await P();for(const e of t.values()){const n=new T(e.properties);xe(n,e.name)}}let q;async function Ue(t){const e=await WA.room.getTiledMap();t=t??x,q=await P();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new T(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of q.values()){const i=new T(s.properties),a=i.getString("openConfig");a&&s.type==="tilelayer"&&De(a.split(","),s.name,i)}}}function De(t,e,n){let r;const o=n.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function i(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=n.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>D(t)})}function a(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=n.getString("openConfigTrigger");s&&(u&&u==="onaction"?i():D(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),a()})}function Ge(){return WA.onInit().then(()=>{Be().catch(t=>console.error(t)),$e().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),Le().catch(t=>console.error(t)),Te().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");const Ye="Video",je="Document",Ne="urlPanneau",Xe="openWebsitEexitChapitreToCerclePublic",qe="openWebsitEexitChapitreToCerclePrivate",He="openWebsitEexitCercleToChapitrePublic",Ke="openWebsitEexitCercleToChapitrePrivate",Ze="openWebsitEexitCercleToSessionPublic",ze="openWebsitEexitCercleToSessionPrivate",Je="openWebsitEexitSessionToCerclePrivate",Qe="openWebsitEexitSessionToChapitrePrivate",Fe="openWebsiteExitToEvent",ee="doorClosed",te="doorOpened";WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),ne(),WA.room.onEnterLayer("doorZone").subscribe(tt),console.info("Init WA OITF");let t="";WA.state.hasVariable("domain")&&(t=WA.state.loadVariable("domain")),WA.player.tags.forEach(a=>{console.log(a),a.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i)!=null&&(t=a)}),t!==""&&t.substring(t.length-1,t.length-1)==="/"&&(t=t.substring(0,t.length-1));const e=WA.state.loadVariable("urlVideo");if(e!=null){const a=`${t}${e}/${WA.player.id}?currentUrl=${WA.room.id}`;A(Ye,a)}const n=WA.state.loadVariable("urlDocument");if(n!=null){const a=`${t}${n}/${WA.player.id}?currentUrl=${WA.room.id}`;A(je,a)}const r=WA.state.loadVariable("chapitreChoice");if(r!=null){const a=`${t}${r}/${WA.player.id}?currentUrl=${WA.room.id}`;A(Ne,a),A(He,a),A(Ke,a),A(Qe,a)}const o=WA.state.loadVariable("projectChoice");if(o!=null){const a=`${t}${o}/${WA.player.id}?currentUrl=${WA.room.id}`;A(Xe,a),A(qe,a),A(Je,a)}const s=WA.state.loadVariable("eventChoice");if(s!=null){const a=`${t}${s}/${WA.player.id}?currentUrl=${WA.room.id}`;A(Fe,a),A(ze,a),A(Ze,a)}const i=await WA.room.website.get("iframeVideoAutiroriumYoutube");i!=null&&(WA.state.hasVariable("urlVideoAutiroriumYoutube")&&(i.url=WA.state.loadVariable("urlVideoAutiroriumYoutube")),WA.state.onVariableChange("urlVideoAutiroriumYoutube").subscribe(()=>{i.url=WA.state.loadVariable("urlVideoAutiroriumYoutube")})),Ge().then(()=>{console.log("Scripting API Extra ready")}).catch(a=>console.error(a))}).catch(t=>console.error(t));const ne=()=>{WA.room.showLayer(ee),WA.room.hideLayer(te)},et=()=>{WA.room.hideLayer(ee),WA.room.showLayer(te)},H=()=>WA.player.tags.includes("premium")||WA.player.tags.includes("Premium")||WA.player.tags.includes("PREMIUM")||WA.player.tags.includes("editor"),tt=()=>{console.log("isPremium()",H()),H()?et():ne()},A=(t,e)=>{WA.room.onEnterLayer(t).subscribe(()=>{WA.nav.openCoWebSite(e,!0,"fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; midi; camera; microphone;")}),WA.room.onLeaveLayer(t).subscribe(()=>WA.nav.closeCoWebSite())};
