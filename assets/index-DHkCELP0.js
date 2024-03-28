var an=Object.defineProperty;var cn=(e,n,t)=>n in e?an(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var mt=(e,n,t)=>(cn(e,typeof n!="symbol"?n+"":n,t),t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function Fe(){}function en(e){return e()}function Yt(){return Object.create(null)}function Oe(e){e.forEach(en)}function tn(e){return typeof e=="function"}function yt(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}function un(e){return Object.keys(e).length===0}function o(e,n){e.appendChild(n)}function O(e,n,t){e.insertBefore(n,t||null)}function I(e){e.parentNode&&e.parentNode.removeChild(e)}function lt(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function a(e){return document.createElement(e)}function T(e){return document.createTextNode(e)}function h(){return T(" ")}function ot(){return T("")}function k(e,n,t,l){return e.addEventListener(n,t,l),()=>e.removeEventListener(n,t,l)}function r(e,n,t){t==null?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function hn(e){let n;return{p(...t){n=t,n.forEach(l=>e.push(l))},r(){n.forEach(t=>e.splice(e.indexOf(t),1))}}}function fn(e){return Array.from(e.childNodes)}function K(e,n){n=""+n,e.data!==n&&(e.data=n)}function $(e,n){e.value=n??""}function Mt(e,n){for(let t=0;t<e.options.length;t+=1){const l=e.options[t];l.selected=~n.indexOf(l.__value)}}function dn(e){return[].map.call(e.querySelectorAll(":checked"),n=>n.__value)}function Ie(e,n,t){e.classList.toggle(n,!!t)}function pn(e,n,{bubbles:t=!1,cancelable:l=!1}={}){return new CustomEvent(e,{detail:n,bubbles:t,cancelable:l})}let Qe;function Ze(e){Qe=e}function gn(){if(!Qe)throw new Error("Function called outside component initialization");return Qe}function mn(){const e=gn();return(n,t,{cancelable:l=!1}={})=>{const s=e.$$.callbacks[n];if(s){const i=pn(n,t,{cancelable:l});return s.slice().forEach(c=>{c.call(e,i)}),!i.defaultPrevented}return!0}}const Ue=[],Rt=[];let Pe=[];const Bt=[],_n=Promise.resolve();let bt=!1;function bn(){bt||(bt=!0,_n.then(nn))}function We(e){Pe.push(e)}const _t=new Set;let Be=0;function nn(){if(Be!==0)return;const e=Qe;do{try{for(;Be<Ue.length;){const n=Ue[Be];Be++,Ze(n),yn(n.$$)}}catch(n){throw Ue.length=0,Be=0,n}for(Ze(null),Ue.length=0,Be=0;Rt.length;)Rt.pop()();for(let n=0;n<Pe.length;n+=1){const t=Pe[n];_t.has(t)||(_t.add(t),t())}Pe.length=0}while(Ue.length);for(;Bt.length;)Bt.pop()();bt=!1,_t.clear(),Ze(e)}function yn(e){if(e.fragment!==null){e.update(),Oe(e.before_update);const n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(We)}}function vn(e){const n=[],t=[];Pe.forEach(l=>e.indexOf(l)===-1?n.push(l):t.push(l)),t.forEach(l=>l()),Pe=n}const nt=new Set;let Ne;function ln(){Ne={r:0,c:[],p:Ne}}function on(){Ne.r||Oe(Ne.c),Ne=Ne.p}function ve(e,n){e&&e.i&&(nt.delete(e),e.i(n))}function De(e,n,t,l){if(e&&e.o){if(nt.has(e))return;nt.add(e),Ne.c.push(()=>{nt.delete(e),l&&(t&&e.d(1),l())}),e.o(n)}else l&&l()}function Le(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function vt(e){e&&e.c()}function st(e,n,t){const{fragment:l,after_update:s}=e.$$;l&&l.m(n,t),We(()=>{const i=e.$$.on_mount.map(en).filter(tn);e.$$.on_destroy?e.$$.on_destroy.push(...i):Oe(i),e.$$.on_mount=[]}),s.forEach(We)}function it(e,n){const t=e.$$;t.fragment!==null&&(vn(t.after_update),Oe(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}function wn(e,n){e.$$.dirty[0]===-1&&(Ue.push(e),bn(),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function wt(e,n,t,l,s,i,c=null,u=[-1]){const p=Qe;Ze(e);const d=e.$$={fragment:null,ctx:[],props:i,update:Fe,not_equal:s,bound:Yt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(p?p.$$.context:[])),callbacks:Yt(),dirty:u,skip_bound:!1,root:n.target||p.$$.root};c&&c(d.root);let j=!1;if(d.ctx=t?t(e,n.props||{},(g,_,...S)=>{const b=S.length?S[0]:_;return d.ctx&&s(d.ctx[g],d.ctx[g]=b)&&(!d.skip_bound&&d.bound[g]&&d.bound[g](b),j&&wn(e,g)),_}):[],d.update(),j=!0,Oe(d.before_update),d.fragment=l?l(d.ctx):!1,n.target){if(n.hydrate){const g=fn(n.target);d.fragment&&d.fragment.l(g),g.forEach(I)}else d.fragment&&d.fragment.c();n.intro&&ve(e.$$.fragment),st(e,n.target,n.anchor),nn()}Ze(p)}class kt{constructor(){mt(this,"$$");mt(this,"$$set")}$destroy(){it(this,1),this.$destroy=Fe}$on(n,t){if(!tn(t))return Fe;const l=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return l.push(t),()=>{const s=l.indexOf(t);s!==-1&&l.splice(s,1)}}$set(n){this.$$set&&!un(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const kn="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(kn);function Ut(e,n,t){const l=e.slice();return l[17]=n[t],l}function Cn(e){let n,t=Le(e[0].keys.split(",")),l=[];for(let s=0;s<t.length;s+=1)l[s]=Pt(Ut(e,t,s));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();n=ot()},m(s,i){for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(s,i);O(s,n,i)},p(s,i){if(i&1){t=Le(s[0].keys.split(","));let c;for(c=0;c<t.length;c+=1){const u=Ut(s,t,c);l[c]?l[c].p(u,i):(l[c]=Pt(u),l[c].c(),l[c].m(n.parentNode,n))}for(;c<l.length;c+=1)l[c].d(1);l.length=t.length}},d(s){s&&I(n),lt(l,s)}}}function jn(e){let n;return{c(){n=a("em"),n.textContent="No Triggers!"},m(t,l){O(t,n,l)},p:Fe,d(t){t&&I(n)}}}function Tn(e){let n,t,l;return{c(){n=a("input"),r(n,"type","text"),r(n,"class","svelte-1l9t61v")},m(s,i){O(s,n,i),$(n,e[0].keys),t||(l=k(n,"input",e[13]),t=!0)},p(s,i){i&1&&n.value!==s[0].keys&&$(n,s[0].keys)},d(s){s&&I(n),t=!1,l()}}}function Pt(e){let n,t=e[17]+"",l;return{c(){n=a("kbd"),l=T(t),r(n,"class","svelte-1l9t61v")},m(s,i){O(s,n,i),o(n,l)},p(s,i){i&1&&t!==(t=s[17]+"")&&K(l,t)},d(s){s&&I(n)}}}function Wt(e){let n,t,l,s=e[0].description.length+"",i,c,u=e[0].description.length===1?"":"s",p,d,j;return{c(){n=a("textarea"),t=h(),l=a("small"),i=T(s),c=T(" character"),p=T(u),r(n,"class","description svelte-1l9t61v")},m(g,_){O(g,n,_),$(n,e[0].description),O(g,t,_),O(g,l,_),o(l,i),o(l,c),o(l,p),d||(j=k(n,"input",e[16]),d=!0)},p(g,_){_&1&&$(n,g[0].description),_&1&&s!==(s=g[0].description.length+"")&&K(i,s),_&1&&u!==(u=g[0].description.length===1?"":"s")&&K(p,u)},d(g){g&&(I(n),I(t),I(l)),d=!1,j()}}}function Sn(e){let n,t,l,s,i,c,u,p,d,j,g,_=e[3]?"↙":"↗",S,b,E,ie,q,X=e[0].value.length+"",W,ee,D=e[0].value.length===1?"":"s",ue,F,C,G,_e,B,re,Z=e[1]?"✔":"✎",fe,V,le,z=e[2]?"Hide":"Show",de,J,be,U,ae;function he(v,m){return v[1]?Tn:v[0].keys.length===0?jn:Cn}let H=he(e),Y=H(e),L=e[2]&&Wt(e);return{c(){n=a("section"),t=a("header"),l=a("button"),s=T("✨"),c=h(),u=a("h3"),u.textContent="Placeholder Title",p=h(),d=a("span"),d.textContent="Placeholder Type",j=h(),g=a("button"),S=T(_),b=h(),E=a("textarea"),ie=h(),q=a("small"),W=T(X),ee=T(" character"),ue=T(D),F=h(),C=a("div"),G=a("h4"),G.textContent="Triggers:",_e=h(),Y.c(),B=h(),re=a("button"),fe=T(Z),V=h(),le=a("button"),de=T(z),J=T(" Description"),be=h(),L&&L.c(),r(l,"title",i="Use for Character Creator [currently "+e[0].useForCharacterCreation+"]"),r(l,"class","svelte-1l9t61v"),Ie(l,"is_cc",e[0].useForCharacterCreation),r(u,"contenteditable","true"),r(u,"class","title svelte-1l9t61v"),e[0].title===void 0&&We(()=>e[6].call(u)),r(d,"contenteditable","true"),r(d,"class","type svelte-1l9t61v"),e[0].type===void 0&&We(()=>e[8].call(d)),r(t,"class","svelte-1l9t61v"),r(E,"class","value svelte-1l9t61v"),r(G,"class","svelte-1l9t61v"),r(re,"class","svelte-1l9t61v"),r(le,"class","svelte-1l9t61v"),r(C,"class","triggers svelte-1l9t61v"),r(n,"class","svelte-1l9t61v"),Ie(n,"fullScreen",e[3])},m(v,m){O(v,n,m),o(n,t),o(t,l),o(l,s),o(t,c),o(t,u),e[0].title!==void 0&&(u.innerText=e[0].title),o(t,p),o(t,d),e[0].type!==void 0&&(d.innerText=e[0].type),o(t,j),o(t,g),o(g,S),o(n,b),o(n,E),$(E,e[0].value),o(n,ie),o(n,q),o(q,W),o(q,ee),o(q,ue),o(n,F),o(n,C),o(C,G),o(C,_e),Y.m(C,null),o(C,B),o(C,re),o(re,fe),o(C,V),o(C,le),o(le,de),o(le,J),o(n,be),L&&L.m(n,null),U||(ae=[k(l,"click",e[5]),k(u,"input",e[6]),k(u,"focusout",e[7]),k(d,"input",e[8]),k(d,"focusout",e[9]),k(g,"click",e[10]),k(E,"input",e[11]),k(E,"focusout",e[12]),k(re,"click",e[14]),k(le,"click",e[15])],U=!0)},p(v,[m]){m&1&&i!==(i="Use for Character Creator [currently "+v[0].useForCharacterCreation+"]")&&r(l,"title",i),m&1&&Ie(l,"is_cc",v[0].useForCharacterCreation),m&1&&v[0].title!==u.innerText&&(u.innerText=v[0].title),m&1&&v[0].type!==d.innerText&&(d.innerText=v[0].type),m&8&&_!==(_=v[3]?"↙":"↗")&&K(S,_),m&1&&$(E,v[0].value),m&1&&X!==(X=v[0].value.length+"")&&K(W,X),m&1&&D!==(D=v[0].value.length===1?"":"s")&&K(ue,D),H===(H=he(v))&&Y?Y.p(v,m):(Y.d(1),Y=H(v),Y&&(Y.c(),Y.m(C,B))),m&2&&Z!==(Z=v[1]?"✔":"✎")&&K(fe,Z),m&4&&z!==(z=v[2]?"Hide":"Show")&&K(de,z),v[2]?L?L.p(v,m):(L=Wt(v),L.c(),L.m(n,null)):L&&(L.d(1),L=null),m&8&&Ie(n,"fullScreen",v[3])},i:Fe,o:Fe,d(v){v&&I(n),Y.d(),L&&L.d(),U=!1,Oe(ae)}}}function En(e,n,t){const l=mn();let{card:s}=n,i=!1,c=!1,u=!1;const p=()=>{t(0,s.useForCharacterCreation=!s.useForCharacterCreation,s)};function d(){s.title=this.innerText,t(0,s)}const j=()=>l("editTitle");function g(){s.type=this.innerText,t(0,s)}const _=()=>l("editType"),S=()=>{t(3,u=!u)};function b(){s.value=this.value,t(0,s)}const E=()=>l("editValue");function ie(){s.keys=this.value,t(0,s)}const q=()=>{t(1,i=!i)},X=()=>{t(2,c=!c)};function W(){s.description=this.value,t(0,s)}return e.$$set=ee=>{"card"in ee&&t(0,s=ee.card)},e.$$.update=()=>{e.$$.dirty&2&&(i||l("editTriggers"))},[s,i,c,u,l,p,d,j,g,_,S,b,E,ie,q,X,W]}class sn extends kt{constructor(n){super(),wt(this,n,En,Sn,yt,{card:0})}}function Vt(e){let n,t,l,s,i,c,u,p,d,j,g,_,S,b,E,ie,q,X,W,ee,D,ue,F,C,G,_e,B,re,Z,fe,V,le,z,de,J,be,U,ae,he,H,Y,L,v,m,pe,Se,we,Q,ce,M,ge,me,A,R,P,Ae,ke,Ve;return F=new sn({props:{card:e[1]}}),{c(){n=a("section"),t=a("article"),l=a("h2"),l.textContent="What is all of this?",s=h(),i=a("button"),i.textContent="Oh no, text! Take me back!",c=h(),u=a("p"),u.innerHTML=`This is a tool for use with <a target="_blank" href="https://play.aidungeon.com/" class="svelte-1jxmbfm">AI Dungeon&#39;s</a> Story
                Cards. Story cards are chunks of text that provide additional details to the AI when one of the trigger
                words listed is mentioned. These trigger words are not case sensitive, but do take things like spaces
                into account. Since the native tools can become a bit tedious for large batches of story cards, and
                since AI Dungeon lets you export them and import them again, this tool tries to offer as many missing
                features as possible.`,p=h(),d=a("h3"),d.textContent="How do I get the cards?",j=h(),g=a("p"),g.textContent=`In the [...] menu of your scenario or adventure, there should be an Edit option. There should also be an
                Edit button on the scenario or adventure's page. Clicking that will open a nice pop-up that gives you
                access to the behind-the-scenes stuff. On the Details tab, scroll down to the bottom and you should see
                a section labeled Story Card Management (if you're on mobile, it may ask you to use your browser for
                this: go ahead and switch). Click the gray Export button to get your cards!`,_=h(),S=a("h3"),S.textContent="And how do I load my changes?",b=h(),E=a("p"),E.textContent=`It's the same thing, except click the scary red Import button and upload the edited file! You can save
                your changes here by clicking the Save button in the header: this will download a JSON file that you can
                import. Note that importing story cards will OVERWRITE ALL YOUR EXISTING CARDS IN THE STORY, so be SURE
                you select the right scenario/adventure/file when importing!`,ie=h(),q=a("h3"),q.textContent="That's good and all, but how do I edit a story card?",X=h(),W=a("p"),W.textContent=`Each card pops up with a little editor window. Any changes you make here will instantly update the JSON,
                and when you're satisfied with your changes you can save the file as described above.`,ee=h(),D=a("p"),D.textContent="Here's a sample you can play with. Editing this won't affect anything you have loaded.",ue=h(),vt(F.$$.fragment),C=h(),G=a("p"),G.textContent="Some points to note:",_e=h(),B=a("ul"),B.innerHTML=`<li>The ✨ icon button shows whether the card is visible in Character Creation. It&#39;s highlighted orange
                    if so, and shows the normal color if not. If you don&#39;t use Character Creation, you can ignore this:
                    cards will always have this enabled by default, and it doesn&#39;t affect gameplay.</li> <li>The default card types are <kbd>location</kbd>, <kbd>faction</kbd>, <kbd>class</kbd>, and
                    <kbd>race</kbd>
                    . All other card types will show up under Custom in AI Dungeon. Note that the filter
                    on here is case sensitive, so if you have <kbd>Spell</kbd> and <kbd>spell</kbd>, it will show twice
                    in the list.</li> <li>The triggers are split apart by default, preserving whitespace. When you click the edit button, it
                    will convert to the standard AI Dungeon format of a comma-separated list.</li> <li>The button in the top-right corner puts you into a full-screen editor. Clicking it again toggles it
                    back to normal.</li> <li>Most of the time, the description for a story card is meaningless. It is displayed for users if the
                    card is being used in a character creator scenario, but otherwise it&#39;s mostly used for notes. New
                    scenarios default this value to the same thing you enter in the main area. The editor hides it by
                    default, but you can click the Show Description (and subsequent Hide Description) button to toggle
                    it for the card.</li>`,re=h(),Z=a("h3"),Z.textContent="What's this about filters?",fe=h(),V=a("p"),V.textContent=`Seeing all your cards at once might not be what you want, especially if you have dozens or even hundreds
                and want to find something specific. Filters stack on top of each other, meaning you can have multiple
                active at once and see where they overlap.`,le=h(),z=a("ul"),z.innerHTML=`<li><strong>Search Filters:</strong> You can search for text (case-insensitive) within the card title,
                    entry (the part that gets sent to the AI), or triggers (the part the AI uses to add a card to the
                    context). Remember, the AI is case-insensitive too!</li> <li><strong>Card Type:</strong> You can choose to view cards that match specific types. If you want to
                    quickly deselect all of them, click Clear Types. The list is multiple-selection, which means you
                    can have more than one type active at once.</li> <li>When you&#39;re done, you can click <strong>Clear Filters</strong> to reset to the defaults.</li>`,de=h(),J=a("p"),J.textContent="You can also sort the cards in a few ways:",be=h(),U=a("ul"),U.innerHTML=`<li><strong>Alphabetically:</strong> Sort by card title in alphabetical order.</li> <li><strong>By type:</strong> Sort by card type in alphabetical order.</li> <li><strong>By entry length:</strong> Sort by the length of the entry text. Useful for finding overly
                    short or long cards.</li>`,ae=h(),he=a("p"),he.textContent="To change the sort direction, click the Sort Ascending (or Sort Descending) button.",H=h(),Y=a("p"),Y.textContent="You can also show cards that match some common errors or oversights:",L=h(),v=a("ul"),v.innerHTML=`<li><strong>Empty triggers:</strong> This will show cards that trigger on whitespace, or on empty text.
                    The AI will generally ALWAYS load these cards. It will also match cards with no triggers: this will
                    have the opposite effect, where the AI will NEVER load these cards. Most of the time, this isn&#39;t
                    what you want.</li> <li><strong>No Character Creator description:</strong> <em>If you are using Character Creator,</em> then
                    it is good practice for every Character Creator card to have a description so players know what
                    their choice means from a story standpoint. It&#39;s not required, just nice. If you are NOT using
                    Character creator, you can ignore this. Note that it will also match cards with the default text of
                    <kbd>Notes go here.</kbd>.</li>`,m=h(),pe=a("h3"),pe.textContent="Speaking of triggers, what's that Show Triggers button do?",Se=h(),we=a("p"),we.textContent=`It displays all the triggers for all the cards in a single chunk. If you have a big story, this can be
                a LOT of data, which is why it's hidden by default. But it does highlight in red any time you have more
                than one card mapped to a trigger, and orange any time another trigger overlaps that trigger (for
                instance, "half-elf" overlapping "elf"). If something doesn't look right, you can click on the trigger
                to show the card that uses it (replacing the Trigger search with that trigger).`,Q=h(),ce=a("h3"),ce.textContent="Something's broken/I have a cool idea/I just wanna say thanks",M=h(),ge=a("p"),ge.innerHTML=`Hop in the <a target="_blank" href="https://discord.com/invite/HB2YBZYjyf" class="svelte-1jxmbfm">AI Dungeon Discord server</a>
                and check out the
                <a target="_blank" href="https://discord.com/channels/903327676884979802/1214767285655576696" class="svelte-1jxmbfm">thread
                under the sharing section</a> to give any feedback! You can also
                <a target="_blank" href="https://github.com/ndm13/aid-json-helper/issues" class="svelte-1jxmbfm">open an issue</a> on the
                project&#39;s <a target="_blank" href="https://github.com/ndm13/aid-json-helper/" class="svelte-1jxmbfm">GitHub page</a>, but
                there&#39;s no guarantee I&#39;ll get to it in a timely manner. This is a very casual project for me, but when
                the community is engaged it motivates me to work on it.`,me=h(),A=a("p"),A.textContent=`The more technical questions (how it's built/deployed/developed) are probably answered on that GitHub
                page too.`,R=h(),P=a("button"),P.textContent="Okay, got it!",r(u,"class","svelte-1jxmbfm"),r(g,"class","svelte-1jxmbfm"),r(E,"class","svelte-1jxmbfm"),r(W,"class","svelte-1jxmbfm"),r(D,"class","svelte-1jxmbfm"),r(G,"class","svelte-1jxmbfm"),r(B,"class","svelte-1jxmbfm"),r(V,"class","svelte-1jxmbfm"),r(z,"class","svelte-1jxmbfm"),r(J,"class","svelte-1jxmbfm"),r(U,"class","svelte-1jxmbfm"),r(he,"class","svelte-1jxmbfm"),r(Y,"class","svelte-1jxmbfm"),r(v,"class","svelte-1jxmbfm"),r(we,"class","svelte-1jxmbfm"),r(ge,"class","svelte-1jxmbfm"),r(A,"class","svelte-1jxmbfm"),r(t,"class","svelte-1jxmbfm"),r(n,"class","svelte-1jxmbfm")},m(oe,x){O(oe,n,x),o(n,t),o(t,l),o(t,s),o(t,i),o(t,c),o(t,u),o(t,p),o(t,d),o(t,j),o(t,g),o(t,_),o(t,S),o(t,b),o(t,E),o(t,ie),o(t,q),o(t,X),o(t,W),o(t,ee),o(t,D),o(t,ue),st(F,t,null),o(t,C),o(t,G),o(t,_e),o(t,B),o(t,re),o(t,Z),o(t,fe),o(t,V),o(t,le),o(t,z),o(t,de),o(t,J),o(t,be),o(t,U),o(t,ae),o(t,he),o(t,H),o(t,Y),o(t,L),o(t,v),o(t,m),o(t,pe),o(t,Se),o(t,we),o(t,Q),o(t,ce),o(t,M),o(t,ge),o(t,me),o(t,A),o(t,R),o(t,P),Ae=!0,ke||(Ve=[k(i,"click",e[3]),k(P,"click",e[4])],ke=!0)},p:Fe,i(oe){Ae||(ve(F.$$.fragment,oe),Ae=!0)},o(oe){De(F.$$.fragment,oe),Ae=!1},d(oe){oe&&I(n),it(F),ke=!1,Oe(Ve)}}}function In(e){let n,t,l,s,i,c,u=e[0]&&Vt(e);return{c(){n=a("button"),n.textContent="What is all of this?",t=h(),u&&u.c(),l=ot()},m(p,d){O(p,n,d),O(p,t,d),u&&u.m(p,d),O(p,l,d),s=!0,i||(c=k(n,"click",e[2]),i=!0)},p(p,[d]){p[0]?u?(u.p(p,d),d&1&&ve(u,1)):(u=Vt(p),u.c(),ve(u,1),u.m(l.parentNode,l)):u&&(ln(),De(u,1,1,()=>{u=null}),on())},i(p){s||(ve(u),s=!0)},o(p){De(u),s=!1},d(p){p&&(I(n),I(t),I(l)),u&&u.d(p),i=!1,c()}}}function Ln(e,n,t){let l=!1;return[l,{title:"Title of Your Card",value:"This is the part that gets sent to the AI.",useForCharacterCreation:!0,keys:"words,that,trigger,the ai,and can include, leading,and trailing ,spaces",description:"This is the part that gets shown to the user in Character Creator, or a space for notes.",type:"Card Type"},()=>t(0,l=!0),()=>t(0,l=!1),()=>t(0,l=!1)]}class On extends kt{constructor(n){super(),wt(this,n,Ln,In,yt,{})}}function Jt(e,n,t){const l=e.slice();return l[41]=n[t],l}function Gt(e,n,t){const l=e.slice();return l[44]=n[t],l}function zt(e,n,t){const l=e.slice();return l[47]=n[t],l}function $t(e){let n,t=e[47]+"",l,s;return{c(){n=a("option"),l=T(t),n.selected=!0,n.__value=s=e[47],$(n,n.__value)},m(i,c){O(i,n,c),o(n,l)},p(i,c){c[0]&2048&&t!==(t=i[47]+"")&&K(l,t),c[0]&2048&&s!==(s=i[47])&&(n.__value=s,$(n,n.__value))},d(i){i&&I(n)}}}function Kt(e){let n,t=Le(Object.keys(e[13])),l=[];for(let s=0;s<t.length;s+=1)l[s]=Xt(Gt(e,t,s));return{c(){for(let s=0;s<l.length;s+=1)l[s].c();n=ot()},m(s,i){for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(s,i);O(s,n,i)},p(s,i){if(i[0]&73736){t=Le(Object.keys(s[13]));let c;for(c=0;c<t.length;c+=1){const u=Gt(s,t,c);l[c]?l[c].p(u,i):(l[c]=Xt(u),l[c].c(),l[c].m(n.parentNode,n))}for(;c<l.length;c+=1)l[c].d(1);l.length=t.length}},d(s){s&&I(n),lt(l,s)}}}function Xt(e){let n,t=e[44]+"",l,s=e[13][e[44]].count>1?" x"+e[13][e[44]].count:"",i,c=e[13][e[44]].overlap>0?" +"+e[13][e[44]].overlap:"",u,p,d;function j(){return e[33](e[44])}return{c(){n=a("kbd"),l=T(t),i=T(s),u=T(c),r(n,"class","svelte-19uwijq"),Ie(n,"plural",e[13][e[44]].count>1),Ie(n,"overlap",e[13][e[44]].overlap>0)},m(g,_){O(g,n,_),o(n,l),o(n,i),o(n,u),p||(d=k(n,"click",j),p=!0)},p(g,_){e=g,_[0]&8192&&t!==(t=e[44]+"")&&K(l,t),_[0]&8192&&s!==(s=e[13][e[44]].count>1?" x"+e[13][e[44]].count:"")&&K(i,s),_[0]&8192&&c!==(c=e[13][e[44]].overlap>0?" +"+e[13][e[44]].overlap:"")&&K(u,c),_[0]&8192&&Ie(n,"plural",e[13][e[44]].count>1),_[0]&8192&&Ie(n,"overlap",e[13][e[44]].overlap>0)},d(g){g&&I(n),p=!1,d()}}}function Zt(e){let n;function t(i,c){return i[0].length===0?Nn:i[4]||i[5]?qn:An}let l=t(e),s=l(e);return{c(){s.c(),n=ot()},m(i,c){s.m(i,c),O(i,n,c)},p(i,c){l!==(l=t(i))&&(s.d(1),s=l(i),s&&(s.c(),s.m(n.parentNode,n)))},d(i){i&&I(n),s.d(i)}}}function An(e){let n;return{c(){n=a("p"),n.textContent=`You've filtered everything out! To reset, click the "Clear Filters" button!`},m(t,l){O(t,n,l)},d(t){t&&I(n)}}}function qn(e){let n;return{c(){n=a("p"),n.textContent="No errors found! You're good!"},m(t,l){O(t,n,l)},d(t){t&&I(n)}}}function Nn(e){let n;return{c(){n=a("p"),n.textContent=`Load some story cards to get started! Open a scenario or adventure, go to Edit > Details > Story Card
                Management, and export your story cards! When you're done editing, you can save them here and import
                them again in the same section.
            `},m(t,l){O(t,n,l)},d(t){t&&I(n)}}}function Qt(e){let n,t;return n=new sn({props:{card:e[41]}}),n.$on("editTriggers",e[35]),n.$on("editTitle",e[36]),n.$on("editType",e[37]),n.$on("editValue",e[38]),{c(){vt(n.$$.fragment)},m(l,s){st(n,l,s),t=!0},p(l,s){const i={};s[0]&4096&&(i.card=l[41]),n.$set(i)},i(l){t||(ve(n.$$.fragment,l),t=!0)},o(l){De(n.$$.fragment,l),t=!1},d(l){it(n,l)}}}function Dn(e){let n,t,l,s,i,c,u,p,d,j,g,_,S,b,E,ie,q=e[12].length+"",X,W,ee=e[0].length+"",D,ue,F,C,G,_e,B,re,Z,fe,V,le,z,de,J,be,U,ae,he,H,Y,L,v,m,pe,Se,we,Q,ce,M,ge,me,A,R,P,Ae,ke,Ve,oe,x,Ct,Je,jt,Ge,Tt,xe=e[7]?"Descending":"Ascending",rt,St,at,Et,He,Ye,Ce,It,ze,Lt,Me,je,Ot,$e,At,ct,qt,Ke,Nt,ut,qe,et=e[9]?"Hide":"Show",ht,Dt,tt=Object.keys(e[13]).length+"",ft,Ft,dt,Ee,Te,pt,gt,Ht;i=new On({});let Re=Le(e[11]),te=[];for(let f=0;f<Re.length;f+=1)te[f]=$t(zt(e,Re,f));let se=e[9]&&Kt(e),ye=Le(e[12]),N=[];for(let f=0;f<ye.length;f+=1)N[f]=Qt(Jt(e,ye,f));const rn=f=>De(N[f],1,1,()=>{N[f]=null});let ne=null;return ye.length||(ne=Zt(e)),pt=hn(e[27][0]),{c(){n=a("header"),t=a("h2"),t.textContent="Story Card Viewer/Editor",l=h(),s=a("span"),vt(i.$$.fragment),c=h(),u=a("section"),p=a("button"),p.textContent="Add Card",d=h(),j=a("input"),g=h(),_=a("button"),_.textContent="Save",S=h(),b=a("nav"),E=a("em"),ie=T("Showing "),X=T(q),W=T(" entries out of "),D=T(ee),ue=h(),F=a("section"),C=a("fieldset"),G=a("label"),G.textContent="Title:",_e=h(),B=a("input"),re=h(),Z=a("label"),Z.textContent="Entry:",fe=h(),V=a("input"),le=h(),z=a("label"),z.textContent="Trigger:",de=h(),J=a("input"),be=h(),U=a("fieldset"),ae=a("label"),ae.textContent="Type:",he=h(),H=a("select");for(let f=0;f<te.length;f+=1)te[f].c();Y=h(),L=a("button"),L.textContent="Clear Types",v=h(),m=a("button"),m.textContent="Clear Filters",pe=h(),Se=a("small"),Se.textContent="Sort:",we=h(),Q=a("section"),ce=a("span"),M=a("input"),ge=h(),me=a("label"),me.textContent="Alphabetically",A=h(),R=a("span"),P=a("input"),Ae=h(),ke=a("label"),ke.textContent="By type",Ve=h(),oe=a("span"),x=a("input"),Ct=h(),Je=a("label"),Je.textContent="By entry length",jt=h(),Ge=a("button"),Tt=T("Sort "),rt=T(xe),St=h(),at=a("small"),at.textContent="Common Errors:",Et=h(),He=a("section"),Ye=a("span"),Ce=a("input"),It=h(),ze=a("label"),ze.textContent="Empty triggers",Lt=h(),Me=a("span"),je=a("input"),Ot=h(),$e=a("label"),$e.textContent="No Character Creator description",At=h(),ct=a("small"),ct.textContent="Triggers:",qt=h(),Ke=a("section"),se&&se.c(),Nt=h(),ut=a("span"),qe=a("button"),ht=T(et),Dt=T(" Triggers ("),ft=T(tt),Ft=T(")"),dt=h(),Ee=a("main");for(let f=0;f<N.length;f+=1)N[f].c();ne&&ne.c(),r(s,"class","helpbox svelte-19uwijq"),r(j,"accept","application/json,text/json,.json"),r(j,"type","file"),r(u,"class","io svelte-19uwijq"),r(n,"class","svelte-19uwijq"),r(G,"for","title"),r(G,"class","svelte-19uwijq"),r(B,"name","title"),r(B,"id","title"),r(Z,"for","entry"),r(Z,"class","svelte-19uwijq"),r(V,"name","entry"),r(V,"id","entry"),r(z,"for","triggers"),r(z,"class","svelte-19uwijq"),r(J,"name","triggers"),r(J,"id","triggers"),r(C,"class","searchWithin svelte-19uwijq"),r(ae,"for","type"),r(ae,"class","svelte-19uwijq"),r(H,"name","type"),H.multiple=!0,e[8]===void 0&&We(()=>e[24].call(H)),r(U,"class","type svelte-19uwijq"),r(F,"class","filter svelte-19uwijq"),r(M,"type","radio"),r(M,"id","alpha"),r(M,"name","sort"),M.__value="alpha",$(M,M.__value),r(me,"for","alpha"),r(me,"class","svelte-19uwijq"),r(ce,"class","svelte-19uwijq"),r(P,"type","radio"),r(P,"id","type"),r(P,"name","sort"),P.__value="type",$(P,P.__value),r(ke,"for","type"),r(ke,"class","svelte-19uwijq"),r(R,"class","svelte-19uwijq"),r(x,"type","radio"),r(x,"id","length"),r(x,"name","sort"),x.__value="length",$(x,x.__value),r(Je,"for","length"),r(Je,"class","svelte-19uwijq"),r(oe,"class","svelte-19uwijq"),r(Q,"class","sort svelte-19uwijq"),r(Ce,"title","Shows cards with empty or missing triggers. Empty triggers will cause cards to trigger constantly, while missing triggers will cause them to never trigger."),r(Ce,"type","checkbox"),r(Ce,"id","empty"),r(Ce,"name","empty"),r(ze,"for","empty"),r(ze,"class","svelte-19uwijq"),r(Ye,"class","svelte-19uwijq"),r(je,"title","Shows cards that are shown in character creator, but have no description. This only applies if you use character creator!"),r(je,"type","checkbox"),r(je,"id","noDescription"),r(je,"name","noDescription"),r($e,"for","noDescription"),r($e,"class","svelte-19uwijq"),r(Me,"class","svelte-19uwijq"),r(He,"class","issues svelte-19uwijq"),r(Ke,"class","triggers svelte-19uwijq"),r(b,"class","svelte-19uwijq"),r(Ee,"class","svelte-19uwijq"),pt.p(M,P,x)},m(f,w){O(f,n,w),o(n,t),o(n,l),o(n,s),st(i,s,null),o(n,c),o(n,u),o(u,p),o(u,d),o(u,j),o(u,g),o(u,_),O(f,S,w),O(f,b,w),o(b,E),o(E,ie),o(E,X),o(E,W),o(E,D),o(b,ue),o(b,F),o(F,C),o(C,G),o(C,_e),o(C,B),$(B,e[1]),o(C,re),o(C,Z),o(C,fe),o(C,V),$(V,e[2]),o(C,le),o(C,z),o(C,de),o(C,J),$(J,e[3]),o(F,be),o(F,U),o(U,ae),o(U,he),o(U,H);for(let y=0;y<te.length;y+=1)te[y]&&te[y].m(H,null);Mt(H,e[8]),o(U,Y),o(U,L),o(F,v),o(F,m),o(b,pe),o(b,Se),o(b,we),o(b,Q),o(Q,ce),o(ce,M),M.checked=M.__value===e[6],o(ce,ge),o(ce,me),o(Q,A),o(Q,R),o(R,P),P.checked=P.__value===e[6],o(R,Ae),o(R,ke),o(Q,Ve),o(Q,oe),o(oe,x),x.checked=x.__value===e[6],o(oe,Ct),o(oe,Je),o(Q,jt),o(Q,Ge),o(Ge,Tt),o(Ge,rt),o(b,St),o(b,at),o(b,Et),o(b,He),o(He,Ye),o(Ye,Ce),Ce.checked=e[4],o(Ye,It),o(Ye,ze),o(He,Lt),o(He,Me),o(Me,je),je.checked=e[5],o(Me,Ot),o(Me,$e),o(b,At),o(b,ct),o(b,qt),o(b,Ke),se&&se.m(Ke,null),o(b,Nt),o(b,ut),o(ut,qe),o(qe,ht),o(qe,Dt),o(qe,ft),o(qe,Ft),O(f,dt,w),O(f,Ee,w);for(let y=0;y<N.length;y+=1)N[y]&&N[y].m(Ee,null);ne&&ne.m(Ee,null),Te=!0,gt||(Ht=[k(p,"click",e[17]),k(j,"change",e[20]),k(j,"change",e[18]),k(_,"click",e[19]),k(B,"input",e[21]),k(V,"input",e[22]),k(J,"input",e[23]),k(H,"change",e[24]),k(L,"click",e[25]),k(m,"click",e[16]),k(M,"change",e[26]),k(P,"change",e[28]),k(x,"change",e[29]),k(Ge,"click",e[30]),k(Ce,"change",e[31]),k(je,"change",e[32]),k(qe,"click",e[34])],gt=!0)},p(f,w){if((!Te||w[0]&4096)&&q!==(q=f[12].length+"")&&K(X,q),(!Te||w[0]&1)&&ee!==(ee=f[0].length+"")&&K(D,ee),w[0]&2&&B.value!==f[1]&&$(B,f[1]),w[0]&4&&V.value!==f[2]&&$(V,f[2]),w[0]&8&&J.value!==f[3]&&$(J,f[3]),w[0]&2048){Re=Le(f[11]);let y;for(y=0;y<Re.length;y+=1){const Xe=zt(f,Re,y);te[y]?te[y].p(Xe,w):(te[y]=$t(Xe),te[y].c(),te[y].m(H,null))}for(;y<te.length;y+=1)te[y].d(1);te.length=Re.length}if(w[0]&2304&&Mt(H,f[8]),w[0]&64&&(M.checked=M.__value===f[6]),w[0]&64&&(P.checked=P.__value===f[6]),w[0]&64&&(x.checked=x.__value===f[6]),(!Te||w[0]&128)&&xe!==(xe=f[7]?"Descending":"Ascending")&&K(rt,xe),w[0]&16&&(Ce.checked=f[4]),w[0]&32&&(je.checked=f[5]),f[9]?se?se.p(f,w):(se=Kt(f),se.c(),se.m(Ke,null)):se&&(se.d(1),se=null),(!Te||w[0]&512)&&et!==(et=f[9]?"Hide":"Show")&&K(ht,et),(!Te||w[0]&8192)&&tt!==(tt=Object.keys(f[13]).length+"")&&K(ft,tt),w[0]&61489){ye=Le(f[12]);let y;for(y=0;y<ye.length;y+=1){const Xe=Jt(f,ye,y);N[y]?(N[y].p(Xe,w),ve(N[y],1)):(N[y]=Qt(Xe),N[y].c(),ve(N[y],1),N[y].m(Ee,null))}for(ln(),y=ye.length;y<N.length;y+=1)rn(y);on(),!ye.length&&ne?ne.p(f,w):ye.length?ne&&(ne.d(1),ne=null):(ne=Zt(f),ne.c(),ne.m(Ee,null))}},i(f){if(!Te){ve(i.$$.fragment,f);for(let w=0;w<ye.length;w+=1)ve(N[w]);Te=!0}},o(f){De(i.$$.fragment,f),N=N.filter(Boolean);for(let w=0;w<N.length;w+=1)De(N[w]);Te=!1},d(f){f&&(I(n),I(S),I(b),I(dt),I(Ee)),it(i),lt(te,f),se&&se.d(),lt(N,f),ne&&ne.d(),pt.r(),gt=!1,Oe(Ht)}}}function xt(e){const n=e.map(l=>l.keys.split(",")).reduce((l,s)=>(s.forEach(i=>l[i]?l[i].count++:l[i]={count:1}),l),{}),t=Object.keys(n);return t.forEach(l=>n[l].overlap=t.filter(s=>s.indexOf(l)>-1&&l!==s).length),n}function Fn(e,n,t){let l,s,i,c=[],u=[],p="",d="",j="",g=!1,_=!1,S="default",b=!1,E=!1;function ie(){return xt(c)}function q(){return X(c,p,d,j,g,_,S,b)}function X(m,pe,Se,we,Q,ce,M,ge){let me=m.filter(A=>u.indexOf(A.type)>-1&&A.title.toLowerCase().indexOf(pe.toLowerCase())>-1&&A.value.toLowerCase().indexOf(Se.toLowerCase())>-1&&A.keys.split(",").filter(R=>R.toLowerCase().indexOf(we.toLowerCase())>-1).length>0).filter(A=>!Q&&!ce||Q&&A.keys.split(",").filter(R=>/^\s*$/gm.test(R)).length>0||ce&&A.useForCharacterCreation==!0&&/^(\s*|Notes go here.)$/gm.test(A.description));return M==="default"?me:me.sort((A,R)=>{switch(M){case"alpha":return(ge?A.title.toLowerCase()<R.title.toLowerCase():R.title.toLowerCase()<A.title.toLowerCase())?1:-1;case"type":return(ge?A.type.toLowerCase()<R.type.toLowerCase():R.type.toLowerCase()<A.type.toLowerCase())?1:-1;case"length":return ge?R.value.length-A.value.length:A.value.length-R.value.length}})}function W(){t(1,p=t(2,d=t(3,j=""))),t(8,u.length=0,u),u.push(...l)}function ee(){t(0,c=[{keys:"",value:"",type:"",description:"",useForCharacterCreation:!0,title:"New Card"},...c]),ue()}let D;function ue(){t(11,l.length=0,l),l.push(...new Set(c.map(m=>m.type))),W()}async function F(){D&&await D[0].text().then(m=>JSON.parse(m)).then(m=>{t(0,c.length=0,c),c.push(...m),ue(),c.length===0&&alert("This file doesn't contain any story cards!  Make sure you have the right file.")}).catch(m=>{t(0,c.length=0,c),W(),alert("There was an error trying to load this file.  Are you sure it's valid?"),console.error("Caught error when updating file",m)})}function C(){const m=document.createElement("a"),pe=URL.createObjectURL(new Blob([JSON.stringify(c)],{type:"application/json"}));m.download=D?D[0].name:"cards.json",m.href=pe,m.click(),URL.revokeObjectURL(pe)}const G=[[]];function _e(){D=this.files,t(10,D)}function B(){p=this.value,t(1,p)}function re(){d=this.value,t(2,d)}function Z(){j=this.value,t(3,j)}function fe(){u=dn(this),t(8,u),t(11,l)}const V=()=>t(8,u.length=0,u);function le(){S=this.__value,t(6,S)}function z(){S=this.__value,t(6,S)}function de(){S=this.__value,t(6,S)}const J=()=>{t(7,b=!b),t(12,i=q())};function be(){g=this.checked,t(4,g)}function U(){_=this.checked,t(5,_)}const ae=m=>{W(),t(3,j=m)},he=()=>t(9,E=!E),H=()=>t(13,s=ie()),Y=()=>t(12,i=q()),L=()=>t(12,i=q()),v=()=>t(12,i=q());return e.$$.update=()=>{e.$$.dirty[0]&1&&t(13,s=xt(c)),e.$$.dirty[0]&255&&t(12,i=X(c,p,d,j,g,_,S,b))},t(11,l=[]),[c,p,d,j,g,_,S,b,u,E,D,l,i,s,ie,q,W,ee,F,C,_e,B,re,Z,fe,V,le,G,z,de,J,be,U,ae,he,H,Y,L,v]}class Hn extends kt{constructor(n){super(),wt(this,n,Fn,Dn,yt,{},null,[-1,-1])}}new Hn({target:document.getElementById("app")});
