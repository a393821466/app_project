var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20190312_syb_scopedata*/window.__wcc_version__='v0.5vv_20190312_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'openPage']],[[4],[[5],[1,'$event']]]]]]]]]]])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[4],[[5],[[5],[1,'uni-icon']],[[2,'+'],[1,'uni-icon-'],[[7],[3,'type']]]]])
Z([[2,'+'],[[2,'+'],[1,'color:'],[[7],[3,'color']]],[1,';']])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'hot_activity'])
Z([3,'activity_title'])
Z([3,'activity_text'])
Z([3,'热门活动'])
Z([3,'activity_image'])
Z([3,'快速上手让你盈利不停'])
Z([3,'activity_box'])
Z([3,'idx'])
Z([3,'item'])
Z([[7],[3,'activityArr']])
Z([3,'id'])
Z([3,'activity_list'])
Z([[2,'+'],[[2,'+'],[1,'background-image:'],[[2,'+'],[[2,'+'],[1,'url('],[[6],[[7],[3,'item']],[3,'imgUrl']]],[1,')']]],[1,';']])
Z([3,'activity activity_money'])
Z([3,'money_num'])
Z([[2,'+'],[[2,'+'],[1,'color:'],[[6],[[7],[3,'item']],[3,'moneyColor']]],[1,';']])
Z([a,[[6],[[7],[3,'item']],[3,'moneyNum']]])
Z([3,'activity activity_type'])
Z([3,'day_money'])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'color:'],[[6],[[7],[3,'item']],[3,'activityUiTextColor']]],[1,';']],[[2,'+'],[[2,'+'],[1,'background-color:'],[[6],[[7],[3,'item']],[3,'activityUiBgColor']]],[1,';']]])
Z([a,[[2,'+'],[[2,'+'],[1,''],[[6],[[7],[3,'item']],[3,'activityType']]],[1,'']]])
Z([3,'box_money_unit'])
Z([3,'元'])
Z([3,'activity activity_task'])
Z([3,'task'])
Z([[2,'+'],[[2,'+'],[1,'color:'],[[6],[[7],[3,'item']],[3,'taskTextColor']]],[1,';']])
Z([[6],[[7],[3,'item']],[3,'taskText']])
Z([3,'__e'])
Z([3,'to_detail'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goTask']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'color:'],[[6],[[7],[3,'item']],[3,'taskBtnColor']]],[1,';']],[[2,'+'],[[2,'+'],[1,'background:'],[[2,'+'],[[2,'+'],[1,'linear-gradient(-180deg,#fdfbf6,'],[[6],[[7],[3,'item']],[3,'linearColor']]],[1,')']]],[1,';']]])
Z([3,'立即参与'])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([1,true])
Z(z[0])
Z([3,'banner'])
Z([1,500])
Z([3,'#ffffff'])
Z([3,'rgba(255, 255, 255, .3)'])
Z(z[0])
Z([1,5000])
Z(z[2])
Z([3,'http://n.sinaimg.cn/sinacn20111/765/w1067h498/20190823/be7d-icqznha0469343.jpg'])
Z(z[2])
Z([3,'http://img5.imgtn.bdimg.com/it/u\x3d538384195,3019699462\x26fm\x3d26\x26gp\x3d0.jpg'])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'category_home'])
Z([3,'idx'])
Z([3,'item'])
Z([[7],[3,'categoryData']])
Z([3,'id'])
Z([[4],[[5],[[5],[1,'category_list']],[[2,'?:'],[[2,'&&'],[[2,'==='],[[7],[3,'idx']],[[2,'-'],[[6],[[7],[3,'categoryData']],[3,'length']],[1,1]]],[[2,'=='],[[2,'%'],[[6],[[7],[3,'categoryData']],[3,'length']],[1,2]],[1,1]]],[1,'upside_list_class'],[1,'']]]])
Z([[2,'+'],[[2,'+'],[1,'background-color:'],[[2,'?:'],[[2,'!'],[[6],[[7],[3,'item']],[3,'color']]],[1,'#999'],[[6],[[7],[3,'item']],[3,'color']]]],[1,';']])
Z([3,'category_text'])
Z([a,[[6],[[7],[3,'item']],[3,'templateName']]])
Z([[4],[[5],[[2,'?:'],[[2,'&&'],[[2,'==='],[[7],[3,'idx']],[[2,'-'],[[6],[[7],[3,'categoryData']],[3,'length']],[1,1]]],[[2,'=='],[[2,'%'],[[6],[[7],[3,'categoryData']],[3,'length']],[1,2]],[1,1]]],[1,'img'],[1,'category_backgorund']]]])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'news_prople'])
Z([3,'news_title'])
Z([3,'新手引导'])
Z([3,'news_images'])
Z([3,'news_text'])
Z([3,'新手引导-快速上手-日进斗金'])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'noticeBox'])
Z([3,'notice_box'])
Z([3,'notice_icon'])
Z([3,'__l'])
Z([3,'laba'])
Z([3,'1'])
Z([3,'notice'])
Z(z[3])
Z([3,'slide'])
Z([3,'2'])
Z([[4],[[5],[1,'default']]])
Z([3,'text'])
Z([a,[[6],[[7],[3,'text']],[3,'val']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'service'])
Z([3,'service-input'])
Z([3,'__l'])
Z([3,'kefu'])
Z([3,'1'])
Z([3,'service-text'])
Z([3,'联系客服'])
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[4],[[5],[[5],[1,'page']],[[7],[3,'className']]]])
Z([3,'__l'])
Z([3,'1'])
Z(z[1])
Z([3,'2'])
Z(z[1])
Z([3,'vue-ref'])
Z([3,'eventNotice'])
Z([[7],[3,'getAnnountList']])
Z([3,'3'])
Z(z[1])
Z([[7],[3,'temList']])
Z([3,'4'])
Z(z[1])
Z([3,'5'])
Z(z[1])
Z([3,'6'])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[4],[[5],[[5],[1,'login']],[[7],[3,'className']]]])
Z([3,'logo'])
Z([3,'logo_img'])
Z([3,'../../static/images/yh1.png'])
Z([3,'logo_txt'])
Z([3,'欢迎来到期货交易通'])
Z([3,'login_form'])
Z([3,'login_form_node login_form_userPhone'])
Z([3,'loginsIcon'])
Z([3,'__l'])
Z([3,'#666'])
Z([3,'huiyuanzhongxin'])
Z([3,'1'])
Z([3,'loginInput userPhone'])
Z([3,'11'])
Z([3,'请输入手机号码'])
Z([3,'number'])
Z([[6],[[7],[3,'ruleForm']],[3,'username']])
Z([3,'login_form_node login_form_userPassword'])
Z(z[8])
Z(z[9])
Z(z[10])
Z([3,'suo'])
Z([3,'2'])
Z([3,'loginInput userPassword'])
Z([3,'请输入密码'])
Z([3,'password'])
Z([3,''])
Z([3,'login_hide_pwd'])
Z(z[9])
Z([3,'__e'])
Z(z[10])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'onClickEye']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'yanjing1'])
Z([3,'3'])
Z([3,'login_form_forgetPassword'])
Z([3,'boxCheckBoxView'])
Z([3,'checkBoxStyle'])
Z([3,'transform:scale(0.8);'])
Z(z[27])
Z([3,'checkBoxText'])
Z([3,'记住密码?'])
Z([3,'forget_password'])
Z([3,'忘记密码?'])
Z([3,'login_submit'])
Z(z[30])
Z([3,'login_submit_int'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'login_btn']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'btnLoading']])
Z([3,'primary'])
Z([3,'登陆'])
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'行情'])
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'我的'])
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
function gz$gwx_13(){
if( __WXML_GLOBAL__.ops_cached.$gwx_13)return __WXML_GLOBAL__.ops_cached.$gwx_13
__WXML_GLOBAL__.ops_cached.$gwx_13=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'资讯'])
})(__WXML_GLOBAL__.ops_cached.$gwx_13);return __WXML_GLOBAL__.ops_cached.$gwx_13
}
function gz$gwx_14(){
if( __WXML_GLOBAL__.ops_cached.$gwx_14)return __WXML_GLOBAL__.ops_cached.$gwx_14
__WXML_GLOBAL__.ops_cached.$gwx_14=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'交易'])
})(__WXML_GLOBAL__.ops_cached.$gwx_14);return __WXML_GLOBAL__.ops_cached.$gwx_14
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./components/page-link/page-link.wxml','./components/ui-font/index.wxml','./pages/index/homeComponent/activity.wxml','./pages/index/homeComponent/banner.wxml','./pages/index/homeComponent/category.wxml','./pages/index/homeComponent/guide.wxml','./pages/index/homeComponent/notice.wxml','./pages/index/homeComponent/serviceInt.wxml','./pages/index/index.wxml','./pages/login/login.wxml','./pages/market/market.wxml','./pages/my/my.wxml','./pages/news/news.wxml','./pages/trade/trade.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_mz(z,'view',['bindtap',0,'data-event-opts',1],[],e,s,gg)
var xC=_n('slot')
_(oB,xC)
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var fE=_mz(z,'view',['class',0,'style',1],[],e,s,gg)
_(r,fE)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
var hG=_n('view')
_rz(z,hG,'class',0,e,s,gg)
var oH=_n('view')
_rz(z,oH,'class',1,e,s,gg)
var cI=_n('text')
_rz(z,cI,'class',2,e,s,gg)
var oJ=_oz(z,3,e,s,gg)
_(cI,oJ)
_(oH,cI)
var lK=_n('view')
_rz(z,lK,'class',4,e,s,gg)
var aL=_n('text')
var tM=_oz(z,5,e,s,gg)
_(aL,tM)
_(lK,aL)
_(oH,lK)
_(hG,oH)
var eN=_n('view')
_rz(z,eN,'class',6,e,s,gg)
var bO=_v()
_(eN,bO)
var oP=function(oR,xQ,fS,gg){
var hU=_mz(z,'view',['class',11,'style',1],[],oR,xQ,gg)
var oV=_n('view')
_rz(z,oV,'class',13,oR,xQ,gg)
var cW=_mz(z,'text',['class',14,'style',1],[],oR,xQ,gg)
var oX=_oz(z,16,oR,xQ,gg)
_(cW,oX)
_(oV,cW)
_(hU,oV)
var lY=_n('view')
_rz(z,lY,'class',17,oR,xQ,gg)
var aZ=_mz(z,'view',['class',18,'style',1],[],oR,xQ,gg)
var t1=_oz(z,20,oR,xQ,gg)
_(aZ,t1)
_(lY,aZ)
var e2=_n('text')
_rz(z,e2,'class',21,oR,xQ,gg)
var b3=_oz(z,22,oR,xQ,gg)
_(e2,b3)
_(lY,e2)
_(hU,lY)
var o4=_n('view')
_rz(z,o4,'class',23,oR,xQ,gg)
var x5=_mz(z,'view',['class',24,'style',1],[],oR,xQ,gg)
var o6=_n('rich-text')
_rz(z,o6,'nodes',26,oR,xQ,gg)
_(x5,o6)
_(o4,x5)
var f7=_mz(z,'view',['bindtap',27,'class',1,'data-event-opts',2,'style',3],[],oR,xQ,gg)
var c8=_oz(z,31,oR,xQ,gg)
_(f7,c8)
_(o4,f7)
_(hU,o4)
_(fS,hU)
return fS
}
bO.wxXCkey=2
_2z(z,9,oP,e,s,gg,bO,'item','idx','id')
_(hG,eN)
_(r,hG)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
var o0=_mz(z,'swiper',['autoplay',0,'circular',1,'class',1,'duration',2,'indicatorActiveColor',3,'indicatorColor',4,'indicatorDots',5,'interval',6],[],e,s,gg)
var cAB=_n('swiper-item')
var oBB=_mz(z,'image',['class',8,'src',1],[],e,s,gg)
_(cAB,oBB)
_(o0,cAB)
var lCB=_n('swiper-item')
var aDB=_mz(z,'image',['class',10,'src',1],[],e,s,gg)
_(lCB,aDB)
_(o0,lCB)
_(r,o0)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
var eFB=_n('view')
_rz(z,eFB,'class',0,e,s,gg)
var bGB=_v()
_(eFB,bGB)
var oHB=function(oJB,xIB,fKB,gg){
var hMB=_mz(z,'view',['class',5,'style',1],[],oJB,xIB,gg)
var oNB=_n('text')
_rz(z,oNB,'class',7,oJB,xIB,gg)
var cOB=_oz(z,8,oJB,xIB,gg)
_(oNB,cOB)
_(hMB,oNB)
var oPB=_n('view')
_rz(z,oPB,'class',9,oJB,xIB,gg)
_(hMB,oPB)
_(fKB,hMB)
return fKB
}
bGB.wxXCkey=2
_2z(z,3,oHB,e,s,gg,bGB,'item','idx','id')
_(r,eFB)
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
var aRB=_n('view')
_rz(z,aRB,'class',0,e,s,gg)
var tSB=_n('view')
_rz(z,tSB,'class',1,e,s,gg)
var eTB=_n('text')
var bUB=_oz(z,2,e,s,gg)
_(eTB,bUB)
_(tSB,eTB)
_(aRB,tSB)
var oVB=_n('view')
_rz(z,oVB,'class',3,e,s,gg)
var xWB=_n('text')
_rz(z,xWB,'class',4,e,s,gg)
var oXB=_oz(z,5,e,s,gg)
_(xWB,oXB)
_(oVB,xWB)
_(aRB,oVB)
_(r,aRB)
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
var cZB=_n('view')
_rz(z,cZB,'class',0,e,s,gg)
var h1B=_n('view')
_rz(z,h1B,'class',1,e,s,gg)
var o2B=_n('view')
_rz(z,o2B,'class',2,e,s,gg)
var c3B=_mz(z,'fonts-icon',['bind:__l',3,'type',1,'vueId',2],[],e,s,gg)
_(o2B,c3B)
_(h1B,o2B)
var o4B=_n('view')
_rz(z,o4B,'class',6,e,s,gg)
var l5B=_mz(z,'transition',['bind:__l',7,'name',1,'vueId',2,'vueSlots',3],[],e,s,gg)
var a6B=_n('view')
_rz(z,a6B,'class',11,e,s,gg)
var t7B=_oz(z,12,e,s,gg)
_(a6B,t7B)
_(l5B,a6B)
_(o4B,l5B)
_(h1B,o4B)
_(cZB,h1B)
_(r,cZB)
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
var b9B=_n('view')
_rz(z,b9B,'class',0,e,s,gg)
var o0B=_n('view')
_rz(z,o0B,'class',1,e,s,gg)
var xAC=_mz(z,'fonts-icon',['bind:__l',2,'type',1,'vueId',2],[],e,s,gg)
_(o0B,xAC)
var oBC=_n('text')
_rz(z,oBC,'class',5,e,s,gg)
var fCC=_oz(z,6,e,s,gg)
_(oBC,fCC)
_(o0B,oBC)
_(b9B,o0B)
_(r,b9B)
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
var hEC=_n('view')
_rz(z,hEC,'class',0,e,s,gg)
var oFC=_mz(z,'banner',['bind:__l',1,'vueId',1],[],e,s,gg)
_(hEC,oFC)
var cGC=_mz(z,'service-int',['bind:__l',3,'vueId',1],[],e,s,gg)
_(hEC,cGC)
var oHC=_mz(z,'notice',['bind:__l',5,'class',1,'data-ref',2,'noticeListData',3,'vueId',4],[],e,s,gg)
_(hEC,oHC)
var lIC=_mz(z,'category',['bind:__l',10,'categoryList',1,'vueId',2],[],e,s,gg)
_(hEC,lIC)
var aJC=_mz(z,'guide',['bind:__l',13,'vueId',1],[],e,s,gg)
_(hEC,aJC)
var tKC=_mz(z,'activity',['bind:__l',15,'vueId',1],[],e,s,gg)
_(hEC,tKC)
_(r,hEC)
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
var bMC=_n('view')
_rz(z,bMC,'class',0,e,s,gg)
var oNC=_n('view')
_rz(z,oNC,'class',1,e,s,gg)
var xOC=_mz(z,'image',['class',2,'src',1],[],e,s,gg)
_(oNC,xOC)
var oPC=_n('text')
_rz(z,oPC,'class',4,e,s,gg)
var fQC=_oz(z,5,e,s,gg)
_(oPC,fQC)
_(oNC,oPC)
_(bMC,oNC)
var cRC=_n('view')
_rz(z,cRC,'class',6,e,s,gg)
var hSC=_n('view')
_rz(z,hSC,'class',7,e,s,gg)
var oTC=_n('view')
_rz(z,oTC,'class',8,e,s,gg)
var cUC=_mz(z,'fonts-icon',['bind:__l',9,'color',1,'type',2,'vueId',3],[],e,s,gg)
_(oTC,cUC)
_(hSC,oTC)
var oVC=_mz(z,'input',['class',13,'maxlength',1,'placeholder',2,'type',3,'value',4],[],e,s,gg)
_(hSC,oVC)
_(cRC,hSC)
var lWC=_n('view')
_rz(z,lWC,'class',18,e,s,gg)
var aXC=_n('view')
_rz(z,aXC,'class',19,e,s,gg)
var tYC=_mz(z,'fonts-icon',['bind:__l',20,'color',1,'type',2,'vueId',3],[],e,s,gg)
_(aXC,tYC)
_(lWC,aXC)
var eZC=_mz(z,'input',['class',24,'placeholder',1,'type',2,'value',3],[],e,s,gg)
_(lWC,eZC)
var b1C=_n('view')
_rz(z,b1C,'class',28,e,s,gg)
var o2C=_mz(z,'fonts-icon',['bind:__l',29,'bindtap',1,'color',2,'data-event-opts',3,'type',4,'vueId',5],[],e,s,gg)
_(b1C,o2C)
_(lWC,b1C)
_(cRC,lWC)
var x3C=_n('view')
_rz(z,x3C,'class',35,e,s,gg)
var o4C=_n('label')
_rz(z,o4C,'class',36,e,s,gg)
var f5C=_n('view')
_rz(z,f5C,'class',37,e,s,gg)
var c6C=_mz(z,'checkbox',['checked',-1,'style',38,'value',1],[],e,s,gg)
_(f5C,c6C)
_(o4C,f5C)
var h7C=_n('view')
_rz(z,h7C,'class',40,e,s,gg)
var o8C=_oz(z,41,e,s,gg)
_(h7C,o8C)
_(o4C,h7C)
_(x3C,o4C)
var c9C=_n('view')
_rz(z,c9C,'class',42,e,s,gg)
var o0C=_oz(z,43,e,s,gg)
_(c9C,o0C)
_(x3C,c9C)
_(cRC,x3C)
var lAD=_n('view')
_rz(z,lAD,'class',44,e,s,gg)
var aBD=_mz(z,'button',['bindtap',45,'class',1,'data-event-opts',2,'loading',3,'type',4],[],e,s,gg)
var tCD=_oz(z,50,e,s,gg)
_(aBD,tCD)
_(lAD,aBD)
_(cRC,lAD)
_(bMC,cRC)
_(r,bMC)
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
var bED=_n('view')
var oFD=_oz(z,0,e,s,gg)
_(bED,oFD)
_(r,bED)
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
var oHD=_n('view')
var fID=_oz(z,0,e,s,gg)
_(oHD,fID)
_(r,oHD)
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
d_[x[12]]={}
var m12=function(e,s,r,gg){
var z=gz$gwx_13()
var hKD=_n('view')
var oLD=_oz(z,0,e,s,gg)
_(hKD,oLD)
_(r,hKD)
return r
}
e_[x[12]]={f:m12,j:[],i:[],ti:[],ic:[]}
d_[x[13]]={}
var m13=function(e,s,r,gg){
var z=gz$gwx_14()
var oND=_n('view')
var lOD=_oz(z,0,e,s,gg)
_(oND,lOD)
_(r,oND)
return r
}
e_[x[13]]={f:m13,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],["@charset \x22UTF-8\x22;\n.",[1],"daytime { background-color: #fff; }\n.",[1],"daytime .",[1],"uni-icon-kefu { color: #2580EF !important; margin-top: ",[0,2],"; }\n.",[1],"daytime .",[1],"uni-icon-kefu { color: #2580EF !important; margin-top: ",[0,2],"; }\n.",[1],"daytime .",[1],"service-icon, .",[1],"daytime .",[1],"service-text { color: #2580EF; }\n.",[1],"daytime .",[1],"notice_box { background: #ccc; }\n.",[1],"daytime .",[1],"text, .",[1],"daytime .",[1],"notice_icon { color: #333; }\n.",[1],"daytime .",[1],"category_home .",[1],"category_list { opacity: 1; }\n.",[1],"daytime .",[1],"news_prople .",[1],"news_images { -webkit-box-shadow: 0 ",[0,-4]," ",[0,3]," ",[0,2]," rgba(0, 0, 0, 0.05), 0 ",[0,5]," ",[0,5]," 0 #afbae5; box-shadow: 0 ",[0,-4]," ",[0,3]," ",[0,2]," rgba(0, 0, 0, 0.05), 0 ",[0,5]," ",[0,5]," 0 #afbae5; }\n.",[1],"daytime .",[1],"news_prople .",[1],"news_title, .",[1],"daytime .",[1],"news_prople .",[1],"news_text { color: #666; }\n.",[1],"daytime .",[1],"hot_activity .",[1],"activity_title { color: #666; }\n.",[1],"daytime .",[1],"login_submit_int { background: #2580EF !important; color: #eee !important; }\n.",[1],"evening { background: #000; }\n.",[1],"evening .",[1],"uni-icon-kefu { color: #ccc !important; margin-top: ",[0,2],"; }\n.",[1],"evening .",[1],"uni-icon-laba { color: #ccc !important; }\n.",[1],"evening .",[1],"service-icon, .",[1],"evening .",[1],"service-text { color: #ccc; }\n.",[1],"evening .",[1],"notice_box { background: #222; }\n.",[1],"evening .",[1],"text, .",[1],"evening .",[1],"notice_icon { color: #ccc; }\n.",[1],"evening .",[1],"category_home .",[1],"category_list { opacity: 0.7; }\n.",[1],"evening .",[1],"news_prople .",[1],"news_images { -webkit-box-shadow: none; box-shadow: none; }\n.",[1],"evening .",[1],"news_prople .",[1],"news_title, .",[1],"evening .",[1],"news_prople .",[1],"news_text { color: #ccc; }\n.",[1],"evening .",[1],"hot_activity .",[1],"activity_title { color: #ccc; }\n.",[1],"evening .",[1],"activity_box .",[1],"activity_list { background-image: none !important; background-color: #222; }\n.",[1],"evening .",[1],"activity_box .",[1],"day_money { color: #ccc !important; background-color: #222 !important; }\n.",[1],"evening .",[1],"activity_box .",[1],"to_detail { background: none !important; }\n",],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],undefined,{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],undefined,{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['components/page-link/page-link.wxss']=undefined;    
__wxAppCode__['components/page-link/page-link.wxml']=$gwx('./components/page-link/page-link.wxml');

__wxAppCode__['components/ui-font/index.wxss']=setCssToHead(["@font-face { font-family: uniicons; font-weight: normal; font-style: normal; src: url(data:font/truetype;charset\x3dutf-8;base64,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aQBjAG8AbgBmAG8AbgB0AAoAaQBjAG8AbgBmAG8AbgB0AFIAZQBnAHUAbABhAHIAaQBjAG8AbgBmAG8AbgB0AGkAYwBvAG4AZgBvAG4AdABWAGUAcgBzAGkAbwBuACAAMQAuADAAaQBjAG8AbgBmAG8AbgB0AEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwAOc2hvdWppeWFuemhlbmcIbGFqaXRvbmcVd2VpYmFuZ2Rpbmd5aW54aW5ncWlhCGNob25nemhpD3R1aWd1YW5neW9uZ2ppbhdqaW5yb25ndHViaWFveGlhamlqaWdvdQdxaWFuYmFvD3NoaW1pbmdyZW56aGVuZw90dWlndWFuZ2Vyd2VpbWEGd2VpemhpBWppZmVuD2h1aXl1YW56aG9uZ3hpbg9yZWQtcGFja2V0X2ljb24Gc2hlemhpEHNoaW1pbmdyZW56aGVuZzEEbGFiYQZ0aXhpYW4HamluZ2dhbwRrZWZ1E2ppYW95aS1taW5neGljaGF4dW4Hc2h1YXhpbgp5YW56aGVuZ21hDGppYW50b3UtY29weQVpbWFnZQVrZWZ1MRR3b2Rlc2hpbWluZ3JlbnpoZW5neAphcnJvd3MtNS0xBWthaWh1A2ppYQp0aXhpYW5qaWx1JXhpYWppYW5neGlhamlhbnRvdXhpYW5neGlhZGlleGlhbnhpbmcEcmlxaQt5YW56aGVuZ21hMQp4aWFqaWFudG91C3RpeGlhbmppbHUxCWljb24tdGVzdAp5aW5oYW5ncWlhC3RpeGlhbmppbHUyBXdlbnRpCWNob25nemhpMQNzdW8EamlhbgRtbmtzCHlvdXhpYW5nB3lhbmppbmcEVklQeBB0dWlndWFuZ3lvdWppYW5nBG1vbmkHeGlhbmppbhR5b3VxaW5nbGlhbmppZWd1YW5saQh5YW5qaW5nMQpzaGFuZ3poYW5nBnhpYWRpZQ5kaW5nZGFuZ3VhbmxpLQh0dWlndWFuZwxsZWlqaXlpbmdrdWkmeGlhamlhbmd4aWFqaWFudG91eGlhbmd4aWFkaWV4aWFueGluZzEAAA\x3d\x3d)\n    format(\x27truetype\x27); }\n.",[1],"uni-icon { font-family: uniicons; font-size: ",[0,38],"; font-style: normal; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n.",[1],"uni-icon-shoujiyanzheng:before { content: \x27\\E71A\x27; }\n.",[1],"uni-icon-lajitong:before { content: \x27\\E612\x27; }\n.",[1],"uni-icon-weibangdingyinxingqia:before { content: \x27\\E647\x27; }\n.",[1],"uni-icon-chongzhi:before { content: \x27\\E7C7\x27; }\n.",[1],"uni-icon-tuiguangyongjin:before { content: \x27\\E70B\x27; }\n.",[1],"uni-icon-jinrongtubiaoxiajijigou:before { content: \x27\\E8D9\x27; }\n.",[1],"uni-icon-qianbao:before { content: \x27\\E60E\x27; }\n.",[1],"uni-icon-shimingrenzheng:before { content: \x27\\E667\x27; }\n.",[1],"uni-icon-tuiguangerweima:before { content: \x27\\E692\x27; }\n.",[1],"uni-icon-weizhi:before { content: \x27\\E614\x27; }\n.",[1],"uni-icon-jifen:before { content: \x27\\E629\x27; }\n.",[1],"uni-icon-huiyuanzhongxin:before { content: \x27\\E623\x27; }\n.",[1],"uni-icon-red-packet_icon:before { content: \x27\\E668\x27; }\n.",[1],"uni-icon-shezhi:before { content: \x27\\E64B\x27; }\n.",[1],"uni-icon-shimingrenzheng1:before { content: \x27\\E60A\x27; }\n.",[1],"uni-icon-laba:before { content: \x27\\E6A8\x27; }\n.",[1],"uni-icon-tixian:before { content: \x27\\E72A\x27; }\n.",[1],"uni-icon-jinggao:before { content: \x27\\E6A5\x27; }\n.",[1],"uni-icon-kefu:before { content: \x27\\E644\x27; }\n.",[1],"uni-icon-jiaoyi-mingxichaxun:before { content: \x27\\E633\x27; }\n.",[1],"uni-icon-shuaxin:before { content: \x27\\E853\x27; }\n.",[1],"uni-icon-yanzhengma:before { content: \x27\\E660\x27; }\n.",[1],"uni-icon-jiantou-copy:before { content: \x27\\E600\x27; }\n.",[1],"uni-icon-image:before { content: \x27\\E6AC\x27; }\n.",[1],"uni-icon-kefu1:before { content: \x27\\E664\x27; }\n.",[1],"uni-icon-wodeshimingrenzhengx:before { content: \x27\\E690\x27; }\n.",[1],"uni-icon-arrows-5-1:before { content: \x27\\E601\x27; }\n.",[1],"uni-icon-kaihu:before { content: \x27\\E602\x27; }\n.",[1],"uni-icon-jia:before { content: \x27\\E6C0\x27; }\n.",[1],"uni-icon-tixianjilu:before { content: \x27\\E65D\x27; }\n.",[1],"uni-icon-xiajiangxiajiantouxiangxiadiexianxing:before { content: \x27\\E8FD\x27; }\n.",[1],"uni-icon-riqi:before { content: \x27\\E634\x27; }\n.",[1],"uni-icon-yanzhengma1:before { content: \x27\\E876\x27; }\n.",[1],"uni-icon-xiajiantou:before { content: \x27\\E617\x27; }\n.",[1],"uni-icon-tixianjilu1:before { content: \x27\\E620\x27; }\n.",[1],"uni-icon-icon-test:before { content: \x27\\E604\x27; }\n.",[1],"uni-icon-yinhangqia:before { content: \x27\\E691\x27; }\n.",[1],"uni-icon-tixianjilu2:before { content: \x27\\E60B\x27; }\n.",[1],"uni-icon-wenti:before { content: \x27\\E61A\x27; }\n.",[1],"uni-icon-chongzhi1:before { content: \x27\\E66F\x27; }\n.",[1],"uni-icon-suo:before { content: \x27\\E639\x27; }\n.",[1],"uni-icon-jian:before { content: \x27\\E64E\x27; }\n.",[1],"uni-icon-mnks:before { content: \x27\\E6BB\x27; }\n.",[1],"uni-icon-youxiang:before { content: \x27\\E6D1\x27; }\n.",[1],"uni-icon-yanjing:before { content: \x27\\E603\x27; }\n.",[1],"uni-icon-VIPx:before { content: \x27\\E628\x27; }\n.",[1],"uni-icon-tuiguangyoujiang:before { content: \x27\\E60F\x27; }\n.",[1],"uni-icon-moni:before { content: \x27\\E607\x27; }\n.",[1],"uni-icon-xianjin:before { content: \x27\\E618\x27; }\n.",[1],"uni-icon-youqinglianjieguanli:before { content: \x27\\E64A\x27; }\n.",[1],"uni-icon-yanjing1:before { content: \x27\\E62A\x27; }\n.",[1],"uni-icon-shangzhang:before { content: \x27\\E610\x27; }\n.",[1],"uni-icon-xiadie:before { content: \x27\\E611\x27; }\n.",[1],"uni-icon-dingdanguanli-:before { content: \x27\\E619\x27; }\n.",[1],"uni-icon-tuiguang:before { content: \x27\\E6B6\x27; }\n.",[1],"uni-icon-leijiyingkui:before { content: \x27\\E653\x27; }\n.",[1],"uni-icon-xiajiangxiajiantouxiangxiadiexianxing1:before { content: \x27\\E605\x27; }\n",],undefined,{path:"./components/ui-font/index.wxss"});    
__wxAppCode__['components/ui-font/index.wxml']=$gwx('./components/ui-font/index.wxml');

__wxAppCode__['pages/index/homeComponent/activity.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"hot_activity { margin-top: ",[0,20],"; }\n.",[1],"hot_activity .",[1],"activity_title { width: 100%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n.",[1],"hot_activity .",[1],"activity_text { font-size: ",[0,30],"; padding-top: ",[0,8],"; }\n.",[1],"hot_activity .",[1],"activity_image { width: ",[0,320],"; height: ",[0,50],"; background: url(data:image/png;base64,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\x3d\x3d) no-repeat; background-size: 100% 100%; font-size: ",[0,26],"; text-align: center; color: #fff; line-height: ",[0,50],"; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity_list { width: 100%; height: ",[0,176],"; background-size: 100% 100%; margin: ",[0,20]," 0 ",[0,10]," 0; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity .",[1],"money_num { font-size: ",[0,92],"; line-height: ",[0,176],"; text-align: center; display: block; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity .",[1],"day_money { font-size: ",[0,28],"; width: ",[0,160],"; text-align: center; margin-top: ",[0,50],"; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity .",[1],"box_money_unit { font-size: ",[0,36],"; color: #fff; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity .",[1],"task { font-size: ",[0,28],"; margin: ",[0,20]," 0 ",[0,10]," 0; text-align: center; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity wx-text { display: block; }\n.",[1],"hot_activity .",[1],"activity_box .",[1],"activity .",[1],"to_detail { width: ",[0,140],"; height: ",[0,50],"; color: #dda643; background-color: #fdfbf6; border-radius: ",[0,100],"; background: -webkit-gradient(linear, left top, left bottom, from(#fdfbf6), to(#fbe3ad)); background: -o-linear-gradient(top, #fdfbf6, #fbe3ad); background: linear-gradient(-180deg, #fdfbf6, #fbe3ad); font-size: ",[0,28],"; line-height: ",[0,50],"; text-align: center; margin: 0 auto; cursor: pointer; }\n",],undefined,{path:"./pages/index/homeComponent/activity.wxss"});    
__wxAppCode__['pages/index/homeComponent/activity.wxml']=$gwx('./pages/index/homeComponent/activity.wxml');

__wxAppCode__['pages/index/homeComponent/banner.wxss']=setCssToHead([".",[1],"banner { width: 100%; height: ",[0,320],"; }\n",],undefined,{path:"./pages/index/homeComponent/banner.wxss"});    
__wxAppCode__['pages/index/homeComponent/banner.wxml']=$gwx('./pages/index/homeComponent/banner.wxml');

__wxAppCode__['pages/index/homeComponent/category.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"category_home { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"category_home .",[1],"category_list { width: ",[0,345],"; height: ",[0,100],"; position: relative; border-radius: ",[0,10],"; -webkit-box-flex: 0; -webkit-flex: 0 0 ",[0,345],"; -ms-flex: 0 0 ",[0,345],"; flex: 0 0 ",[0,345],"; margin-bottom: ",[0,20],"; }\n.",[1],"category_home .",[1],"category_list:nth-child(even) { margin-left: ",[0,20],"; }\n.",[1],"category_home .",[1],"category_list .",[1],"category_text { text-align: center; line-height: ",[0,100],"; font-size: ",[0,30],"; text-align: center; display: block; color: #fff; }\n.",[1],"category_home .",[1],"category_list .",[1],"category_backgorund { position: absolute; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU4AAABqCAMAAADkx0jPAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAE3RSTlMAO2g4MgcuIxEfAikUGgRfSFRAKkSlAwAAAutJREFUeNrs2l1uhDAMBOAZOT8QCPc/bgXlAVXd7VL8YCnzHWGE48QGw5v5T5bK0jPkqhkfSbMSvVj5lM0Nclr4nK2Qw0YXM2S30seigt9VOlkgQCKpeveS6Uf9CBP9mI7PTlLlHq8T7Wz491GhPs+QjX2XMLhEV6NXu9FVx9j4TU+jkHEWjM1I9aKwrcgwtkRfGFtRnGEfmYqzK86oAzrFiaw4Ebi1Y3BVcUZcDCvOw6Y4Ee2nmp0mSq7Vrt3woRk9aDV8mulBq7fTZnRiGwSVTioEyMan9NeC61hJa8yLluggqa17jukmyKmqD3lqhQ8VlfpFNnX1QMenDs4fVo0+otw+deP8RVeaEepdlf7CZLzN1IVeyoU3Fd2Q3miVt1Td3t+bEj+WVOh/at34Eev6NL/au5tdBWEgCsA5dOgPU0F8/4e9MdcoqG1HjBs4395Nc5ySMkwt+uDQ5AKrptWYHKpc4nuhTwxZUaSZf/OPjTkIXkjIDOZWfTwFL+IAJ+LDKbJgEhEREREREdH1wEAfJwbKI4Otxhg83vIhHvdEKyb9D5emaE9l8qjyR5wGPuTgsOCC5dS5P3kY+KNNrM+CF5JbaVaY6YHeo8ZS6YvNH9n5oyxoQFFox9nOH6FBalRU6Fjr52FXz7NeUCWvKzAkbLbzOypGQYOMhk4e9vaYBw5os8+MnWc3AQahWDVZQVciTGK1R5ddux8OCfSLjnx+YVuUYZQ568FAYCTDvdByPEGRwyfxVIBzh2oEVuGWTeazwsPKPeom62eJwkyxwP39yy8RzzOecejD5vmql27CGuflfLEXTaXl5NyHpQSTues63HF7/24MxrlbLyfL5zfxvEyl5eREpw0TLOfuCkt8+izIhl39asIv7O9Wr4SG6YfLucN7k7S5D13NeMGpwe8Maghnd8ZP7PEeqtQOZ4dnfFgqyq4VzhlPWD0rhuTq4TxjjfGs65NUwjnhHZ7M1/Qn9eKwdKmGk8+eK39DGiprJrrBPwAAAABJRU5ErkJggg\x3d\x3d) no-repeat; width: 100%; height: 100%; background-size: cover; top: 0; left: 0; }\n.",[1],"category_home .",[1],"upside_list_class { width: 100%; -webkit-box-flex: 0; -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; }\n.",[1],"category_home .",[1],"upside_list_class .",[1],"img { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAABqCAMAAAB3VULZAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFXRSTlMAO2g3Ex8aMTQpAgUkLgsID0ljXVQe6OSVAAAEbklEQVR42uzdB47bMBAFUH4Pu6iScv+zJkjBBtlikZSXJua/AxgL7bc0HMpDQ/csgoeQxejReBElrsnvhipZPIQ1inh0CE7Tt/sSDg/gjCYBXcRlQxXyisutqv4HG3qJqodSv11wMdFVoBU+lj7bIbiUbEYVwQWSqgfTsy3BlD3lNlwiGapgmdh2nkvWE572sv/kjTKJ3/WTnvQ+q+66Z8FFhOVsFSsA2K2pt7GbXeHp+gZyGHUsd7mH2Vd0WnX1Y39z3DQcJzt00bnvWHCdYKiSFZaxtVZcSONjqtNS0KhorcMCwA7hUEdAg6Bw3fVHxC/cAhsne0El8Sqr2N8EF1oNNYaWgT0NV4qGWkMbcVLUHdiLIyuGmh1FcJcUvTXsX4IrGeqQbRJ8QJJVfoP9YPnFyI6y+bdjK8kre4/7ZJOLkX0G++FLWkMUQGJYU/EHO94vVkaW5lIYWZqLY2RpLpaRpblsjCzNJQsjS3NJjCzNxTOyNJeNkaXJCCNLcymMLM1lY2RpMoGRpbl4RpbmsggjS3NxjCzNZRFGlubiGFmaS46MLM3FMrI0mcTI0lx2YWRpLpaRpckURpbmkldGluayREaW5rJHtOKwThpiE7RRemA1jbdFdIhMLN33RLVB5HQ+GmBZ0WjVeqYPDZYLmhTOl6ZRrKCaWDPGcnhX0r/zg1Nx/uAdX5c9oVIaUMYu1pVV8A5Zi7MMrh42okK05pMttgScEApjq0V2gpPEZfOpDhdQITgeO6TD4uRcYBdz325d+lttJmd302xzEdWiY8dYhcUH3BH8/cBmW+KrDBWbG/+iRsGzQlBhK4J3Sdk6PkHKZurYhC7JGtLg1dFpNQenHQkfSEdNYFd0WxlaJfJmXXnpfBZnt1zVLOtvjtmASwSGlt6VHU5wueoU7X7RG6K37AGnhN3ccQRcKrDpRW+wctFe71JwucLuAXXN//QffZDgAYTVAXXN+HLmHVvAgwRuLlDPVDpX/Tn9nCFqnwruO9425zvpNGLujDX/OwQPJmwdUPt0L9lPFQUsDuhyOaBJyOeKAhYH9MfwgeCu44e+/FkwNdvRbG8cAcJxITRotHI6v/DiIowugw5HU8ehH9/uUg0dUltXtx+3bzVDj+1sYplZeo7IloqqgLUBPUFkJR8YhGswtdDFCc5jr4vGR/Y7hhHuKSiFHl+/YpzIvVudBO2+3W4YaDWkUeyoCm632xdU43td1GVFqy+3n+qLWbYNfrRvRzkMgzAMQAk0pdBN1ej977pp2vfUpB9Est8ZIssEoFlvDEb+OGWmwjoLaPUX2fkjyzqL6HAX2a8hZqyzdE91FtkYIyu8UcCjzlrwI5PVRGj24grZKCPLR12AVOxyjlIMuDUA1ItYnYFGVh6J0Cy+WhBhycULBVAqNiPWyPIEBqi5Qnb+hS1PYLB6c4ZsfkkAWyI8agvZODsu/gSDtRTDuiDSwoBtFlbXcjFko1VZxiysXeulkI1WZfmiC9mxtudW/odsvCrLmEXyBk9bSMws+j2YAAAAAElFTkSuQmCC) no-repeat; }\n",],undefined,{path:"./pages/index/homeComponent/category.wxss"});    
__wxAppCode__['pages/index/homeComponent/category.wxml']=$gwx('./pages/index/homeComponent/category.wxml');

__wxAppCode__['pages/index/homeComponent/guide.wxss']=setCssToHead([".",[1],"news_prople .",[1],"news_title{ font-size:",[0,30],"; }\n.",[1],"news_prople .",[1],"news_images{ width:100%; height:",[0,52],"; background:url(data:image/png;base64,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\x3d) no-repeat; background-size:cover; margin-top:",[0,15],"; }\n.",[1],"news_prople .",[1],"news_text{ font-size:",[0,26],"; line-height:",[0,52],"; text-align:center; display:block; }\n",],undefined,{path:"./pages/index/homeComponent/guide.wxss"});    
__wxAppCode__['pages/index/homeComponent/guide.wxml']=$gwx('./pages/index/homeComponent/guide.wxml');

__wxAppCode__['pages/index/homeComponent/notice.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"noticeBox { padding: 0 ",[0,20],"; position: relative; text-align: left; height: ",[0,80],"; margin-bottom: ",[0,20],"; }\n.",[1],"noticeBox .",[1],"notice_box { width: 100%; overflow: hidden; height: ",[0,80],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; border-radius: ",[0,10],"; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice_icon { width: ",[0,80],"; text-align: center; position: relative; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice_icon .",[1],"uni-icon-laba { position: absolute; top: ",[0,20],"; left: ",[0,22],"; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice { width: ",[0,620],"; -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice .",[1],"text { width: 100%; font-size: ",[0,28],"; line-height: ",[0,80],"; }\n.",[1],"slide-enter-active, .",[1],"slide-leave-active { -webkit-transition: all 0.5s linear; -o-transition: all 0.5s linear; transition: all 0.5s linear; }\n.",[1],"slide-enter { opacity: 1; }\n.",[1],"slide-leave-to { opacity: 0; }\n",],undefined,{path:"./pages/index/homeComponent/notice.wxss"});    
__wxAppCode__['pages/index/homeComponent/notice.wxml']=$gwx('./pages/index/homeComponent/notice.wxml');

__wxAppCode__['pages/index/homeComponent/serviceInt.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"service { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: reverse; -webkit-flex-direction: row-reverse; -ms-flex-direction: row-reverse; flex-direction: row-reverse; height: ",[0,70],"; }\n.",[1],"service .",[1],"service-input { -webkit-align-self: center; -ms-flex-item-align: center; align-self: center; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n.",[1],"service .",[1],"service-input .",[1],"service-text { font-size: ",[0,30],"; -webkit-box-flex: 0; -webkit-flex: 0 0 ",[0,120],"; -ms-flex: 0 0 ",[0,120],"; flex: 0 0 ",[0,120],"; width: ",[0,120],"; line-height: ",[0,45],"; padding-left: ",[0,10],"; }\n",],undefined,{path:"./pages/index/homeComponent/serviceInt.wxss"});    
__wxAppCode__['pages/index/homeComponent/serviceInt.wxml']=$gwx('./pages/index/homeComponent/serviceInt.wxml');

__wxAppCode__['pages/index/index.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"noticeBox { padding: 0 ",[0,20],"; position: relative; text-align: left; height: ",[0,80],"; margin-bottom: ",[0,20],"; }\n.",[1],"noticeBox .",[1],"notice_box { width: 100%; overflow: hidden; height: ",[0,80],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; border-radius: ",[0,10],"; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice_icon { width: ",[0,80],"; text-align: center; position: relative; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice_icon .",[1],"uni-icon-laba { position: absolute; top: ",[0,20],"; left: ",[0,22],"; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice { width: ",[0,620],"; -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }\n.",[1],"noticeBox .",[1],"notice_box .",[1],"notice .",[1],"text { width: 100%; font-size: ",[0,28],"; line-height: ",[0,80],"; }\n.",[1],"slide-enter-active, .",[1],"slide-leave-active { -webkit-transition: all 0.5s linear; -o-transition: all 0.5s linear; transition: all 0.5s linear; }\n.",[1],"slide-enter { opacity: 1; }\n.",[1],"slide-leave-to { opacity: 0; }\n@charset \x22UTF-8\x22;\n.",[1],"service, .",[1],"notice_annount, .",[1],"category_home, .",[1],"news_prople, .",[1],"hot_activity { padding: 0 ",[0,20],"; }\n.",[1],"test { font-family: iconfont; margin-left: ",[0,20],"; }\n.",[1],"page{ }\n",],undefined,{path:"./pages/index/index.wxss"});    
__wxAppCode__['pages/index/index.wxml']=$gwx('./pages/index/index.wxml');

__wxAppCode__['pages/login/login.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"login .",[1],"logo { text-laign: center; margin-bottom: ",[0,30],"; }\n.",[1],"login .",[1],"logo .",[1],"logo_img { width: ",[0,180],"; height: ",[0,180],"; margin: ",[0,70]," auto ",[0,30],"; display: block; border-radius: 100%; }\n.",[1],"login .",[1],"logo .",[1],"logo_txt { display: block; text-align: center; font-size: ",[0,40],"; font-weight: 600; color: #666; }\n.",[1],"login .",[1],"login_form { width: ",[0,600],"; margin: ",[0,120]," auto 0; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_node { position: relative; height: ",[0,80],"; margin-bottom: ",[0,30],"; padding: ",[0,15]," ",[0,70]," 0; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_node.",[1],"login_form_userPhone, .",[1],"login .",[1],"login_form .",[1],"login_form_node.",[1],"login_form_userPassword { border-bottom: ",[0,1]," solid  #ccc; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_node .",[1],"loginsIcon { position: absolute; left: ",[0,15],"; top: ",[0,20],"; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_node .",[1],"loginInput { width: 100%; height: ",[0,60],"; font-size: ",[0,28],"; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_node .",[1],"login_hide_pwd { position: absolute; right: ",[0,15],"; top: ",[0,10],"; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_forgetPassword { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_forgetPassword .",[1],"boxCheckBoxView { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_forgetPassword .",[1],"boxCheckBoxView .",[1],"checkBoxStyle, .",[1],"login .",[1],"login_form .",[1],"login_form_forgetPassword .",[1],"boxCheckBoxView .",[1],"checkBoxText { display: inline-block; font-size: ",[0,30],"; color: #666; }\n.",[1],"login .",[1],"login_form .",[1],"login_form_forgetPassword .",[1],"forget_password { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; text-align: right; font-size: ",[0,30],"; color: #666; }\n.",[1],"login .",[1],"login_form .",[1],"login_submit_int { border-radius: ",[0,100],"; margin-top: ",[0,50],"; }\n",],undefined,{path:"./pages/login/login.wxss"});    
__wxAppCode__['pages/login/login.wxml']=$gwx('./pages/login/login.wxml');

__wxAppCode__['pages/market/market.wxss']=undefined;    
__wxAppCode__['pages/market/market.wxml']=$gwx('./pages/market/market.wxml');

__wxAppCode__['pages/my/my.wxss']=undefined;    
__wxAppCode__['pages/my/my.wxml']=$gwx('./pages/my/my.wxml');

__wxAppCode__['pages/news/news.wxss']=undefined;    
__wxAppCode__['pages/news/news.wxml']=$gwx('./pages/news/news.wxml');

__wxAppCode__['pages/trade/trade.wxss']=undefined;    
__wxAppCode__['pages/trade/trade.wxml']=$gwx('./pages/trade/trade.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();
