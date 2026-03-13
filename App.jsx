import { useState, useEffect } from "react";

const G = document.createElement("style");
G.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#FAF7F1;--bg2:#F3EDE3;--white:#FFFFFF;
  --sage:#5E8C6A;--sage-l:#EBF4ED;--sage-d:#3D6648;
  --terra:#C07850;--terra-l:#FBF0E8;--terra-d:#9A5C38;
  --amber:#C8973F;--amber-l:#FDF6EC;--amber-d:#A07830;
  --rose:#C47A6A;--rose-l:#FAEEED;
  --ink:#2A2218;--ink2:#5A4F3E;--muted:#9A8F80;
  --border:#E8E0D4;--border2:#D8CCBE;
  --shadow:rgba(42,34,24,.08);--shadow2:rgba(42,34,24,.15);
  --r:14px;
}
html,body,#root{height:100%;background:var(--bg)}
body{font-family:'Nunito',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg2)}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}

/* ── Layout shells ── */
.app-top{display:flex;flex-direction:column;min-height:100vh}
.app-side{display:flex;min-height:100vh}

/* ── Top nav ── */
.topnav{position:sticky;top:0;z-index:100;background:rgba(250,247,241,.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);padding:0 1.5rem;display:flex;align-items:center;height:56px;gap:.5rem}
.brand{font-family:'Cormorant Garamond',serif;font-size:1.32rem;color:var(--ink);letter-spacing:.01em;margin-right:1.5rem;flex-shrink:0;cursor:pointer}
.brand span{color:var(--sage)}
.top-links{display:flex;align-items:center;gap:.1rem;flex:1}
.tnl{background:none;border:none;padding:.4rem .8rem;border-radius:20px;font-family:'Nunito',sans-serif;font-size:.79rem;color:var(--muted);cursor:pointer;transition:all .18s;white-space:nowrap}
.tnl:hover{color:var(--ink);background:var(--bg2)}
.tnl.act{color:var(--sage-d);background:var(--sage-l);font-weight:700}
.nav-right{display:flex;align-items:center;gap:.6rem;margin-left:auto;flex-shrink:0}


/* ── Location pin button ── */
.loc-pin{display:flex;align-items:center;justify-content:center;width:46px;height:28px;border-radius:20px;border:1px solid var(--border);background:var(--bg2);cursor:pointer;transition:all .2s;flex-shrink:0}
.loc-pin:hover{border-color:var(--border2);background:var(--border)}
.loc-pin.active{background:var(--sage-l);border-color:rgba(94,140,106,.4)}
.loc-pin svg{display:block}
/* ── Journey button ── */
.journey-btn{background:var(--sage);color:#fff;border:none;padding:.42rem 1.05rem;border-radius:24px;font-family:'Nunito',sans-serif;font-size:.79rem;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.journey-btn:hover{background:var(--sage-d)}
.journey-btn.has-pet{background:var(--terra)}
.journey-btn.has-pet:hover{background:var(--terra-d)}

/* ── Main content area ── */
.main-scroll{flex:1;overflow-y:auto;background:var(--bg)}
.page{max-width:740px;margin:0 auto;padding:2rem 1.5rem 3.5rem}
.page-wide{max-width:920px;margin:0 auto;padding:2rem 1.5rem 3.5rem}

/* ── Page header ── */
.ph{margin-bottom:1.75rem}
.ph-eye{font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);margin-bottom:.4rem;font-weight:700}
.ph-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.65rem,3vw,2.2rem);color:var(--ink);font-weight:400;line-height:1.15}
.ph-title em{color:var(--terra);font-style:italic}
.ph-desc{margin-top:.65rem;font-size:.87rem;color:var(--muted);line-height:1.75}

/* ── Cards ── */
.card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:1.35rem;margin-bottom:1rem;box-shadow:0 2px 10px var(--shadow)}
.card-sage{border-color:rgba(94,140,106,.3);background:var(--sage-l)}
.card-terra{border-color:rgba(192,120,80,.25);background:var(--terra-l)}
.card-amber{border-color:rgba(200,151,63,.25);background:var(--amber-l)}
.card-rose{border-color:rgba(196,122,106,.25);background:var(--rose-l)}
.ct{font-family:'Cormorant Garamond',serif;font-size:1.08rem;color:var(--ink);margin-bottom:.25rem}
.cs{font-size:.79rem;color:var(--muted);line-height:1.55;margin-bottom:.85rem}

/* ── Buttons ── */
.btn{display:inline-flex;align-items:center;gap:.4rem;padding:.52rem 1.25rem;border-radius:24px;font-family:'Nunito',sans-serif;font-size:.81rem;cursor:pointer;border:none;transition:all .2s;font-weight:600}
.btn-sage{background:var(--sage);color:#fff}.btn-sage:hover{background:var(--sage-d)}
.btn-terra{background:var(--terra);color:#fff}.btn-terra:hover{background:var(--terra-d)}
.btn-amber{background:var(--amber);color:#fff}.btn-amber:hover{background:var(--amber-d)}
.btn-ghost{background:transparent;border:1.5px solid var(--border);color:var(--muted)}.btn-ghost:hover{border-color:var(--sage);color:var(--sage-d)}
.btn-rose{background:var(--rose);color:#fff}
.btn-sm{padding:.33rem .82rem;font-size:.74rem}
.btn-xs{padding:.22rem .6rem;font-size:.69rem}
.btn:disabled{opacity:.5;cursor:default}

/* ── Fields ── */
.field{width:100%;padding:.68rem .9rem;border:1.5px solid var(--border);border-radius:10px;font-family:'Nunito',sans-serif;font-size:.87rem;background:var(--white);color:var(--ink);outline:none;transition:border-color .2s;line-height:1.6}
.field:focus{border-color:var(--sage)}.field::placeholder{color:var(--muted)}
textarea.field{resize:vertical;min-height:80px}

/* ── Grids ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:.9rem}

/* ── Animations ── */
@keyframes fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade{animation:fadeup .4s ease both}
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes flicker{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.75;transform:scale(.96)}}

/* ── Divider ── */
hr.dv{border:none;border-top:1px solid var(--border);margin:1.2rem 0}

/* ── Pills ── */
.pill{display:inline-flex;align-items:center;gap:.3rem;padding:.22rem .62rem;border-radius:20px;font-size:.67rem;font-weight:700}
.pill-sage{background:var(--sage-l);color:var(--sage-d);border:1px solid rgba(94,140,106,.3)}
.pill-terra{background:var(--terra-l);color:var(--terra-d);border:1px solid rgba(192,120,80,.25)}
.pill-amber{background:var(--amber-l);color:var(--amber-d);border:1px solid rgba(200,151,63,.25)}

/* ── AI response ── */
.ai-box{background:var(--sage-l);border:1px solid rgba(94,140,106,.3);border-left:3px solid var(--sage);border-radius:0 12px 12px 0;padding:1.1rem 1.3rem;margin-top:.85rem;font-size:.9rem;line-height:1.8;color:var(--ink);animation:fadeup .5s ease;white-space:pre-wrap}

/* ── Saved ── */
.saved{display:inline-flex;align-items:center;gap:.35rem;background:var(--sage-l);border:1px solid rgba(94,140,106,.3);border-radius:20px;padding:.25rem .78rem;font-size:.69rem;color:var(--sage-d);animation:fadeup .3s ease;font-weight:600}

/* ── Hero ── */
.hero{background:linear-gradient(155deg,#F8F2E8 0%,#EBF4ED 55%,#F5F0E8 100%);border-bottom:1px solid var(--border);padding:4rem 2rem 3.5rem;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 22% 55%,rgba(192,120,80,.06) 0%,transparent 60%),radial-gradient(ellipse at 78% 28%,rgba(94,140,106,.07) 0%,transparent 55%)}
.hero-eye{font-size:.67rem;letter-spacing:.14em;text-transform:uppercase;color:var(--terra);font-weight:700;margin-bottom:.85rem}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.3rem,5vw,3.5rem);color:var(--ink);font-weight:400;line-height:1.1;margin-bottom:1rem}
.hero-title em{color:var(--sage);font-style:italic}
.hero-desc{font-size:.94rem;color:var(--ink2);max-width:500px;margin:0 auto 1.75rem;line-height:1.75}
.hero-actions{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
.hero-note{font-size:.72rem;color:var(--muted);margin-top:.9rem;font-style:italic}

/* ── Memorial strip (home ticker) ── */
.mem-strip{padding:1.4rem 0;overflow:hidden;position:relative;background:var(--white);border-bottom:1px solid var(--border)}
.mem-strip::before,.mem-strip::after{content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none}
.mem-strip::before{left:0;background:linear-gradient(to right,var(--white),transparent)}
.mem-strip::after{right:0;background:linear-gradient(to left,var(--white),transparent)}
.mem-strip-inner{display:flex;gap:1rem;animation:mslide 60s linear infinite;width:max-content;padding:0 1.5rem}
@keyframes mslide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mem-mini{flex-shrink:0;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:.72rem 1rem;display:flex;gap:.62rem;align-items:center;min-width:175px;cursor:pointer;transition:border-color .18s}
.mem-mini:hover{border-color:var(--sage)}
.mem-mini-avatar{width:36px;height:36px;border-radius:50%;background:var(--white);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.mem-mini-name{font-size:.82rem;font-weight:700;color:var(--ink)}
.mem-mini-sub{font-size:.68rem;color:var(--muted)}

/* ── Section label ── */
.sec-label{margin-bottom:1.4rem}
.sec-label .eye{font-size:.63rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);font-weight:700;display:block;margin-bottom:.32rem}
.sec-label h2{font-family:'Cormorant Garamond',serif;font-size:1.75rem;color:var(--ink);font-weight:400}
.sec-label p{font-size:.84rem;color:var(--muted);margin-top:.35rem;line-height:1.65}

/* ── Community posts ── */
.post-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:1rem 1.1rem;display:flex;gap:.85rem;margin-bottom:.65rem;transition:border-color .18s}
.post-card:hover{border-color:var(--border2)}
.post-avatar{width:38px;height:38px;border-radius:50%;background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;border:1.5px solid var(--border)}
.post-author{font-size:.76rem;font-weight:700;color:var(--ink)}
.post-loc{font-size:.66rem;color:var(--muted);margin-left:.3rem}
.post-text{font-size:.84rem;color:var(--ink2);line-height:1.55;margin-top:.15rem}
.post-meta{font-size:.67rem;color:var(--muted);margin-top:.28rem;display:flex;gap:.65rem;align-items:center}
.heart-btn{background:none;border:none;cursor:pointer;font-size:.81rem;color:var(--muted);padding:0;transition:color .15s}
.heart-btn.liked,.heart-btn:hover{color:var(--rose)}

/* ── Shop ── */
.shop-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:all .22s;cursor:pointer}
.shop-card:hover{box-shadow:0 6px 20px var(--shadow2);transform:translateY(-3px)}
.shop-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;border-bottom:1px solid var(--border)}
.shop-body{padding:.8rem .95rem}
.shop-name{font-family:'Cormorant Garamond',serif;font-size:.96rem;color:var(--ink);margin-bottom:.18rem;line-height:1.3}
.shop-desc{font-size:.71rem;color:var(--muted);line-height:1.4;margin-bottom:.55rem}
.shop-price{font-size:.84rem;font-weight:700;color:var(--sage-d)}
.shop-badge-tag{display:inline-block;background:var(--terra-l);border:1px solid rgba(192,120,80,.25);border-radius:20px;padding:.12rem .48rem;font-size:.61rem;font-weight:700;color:var(--terra-d);margin-bottom:.38rem}

/* ── Resources ── */
.res-item{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:.9rem 1.05rem;display:flex;gap:.82rem;cursor:pointer;transition:border-color .18s;margin-bottom:.55rem}
.res-item:hover{border-color:var(--sage)}
.res-icon{font-size:1.3rem;flex-shrink:0;margin-top:.05rem}
.res-title{font-size:.87rem;font-weight:700;color:var(--ink)}
.res-desc{font-size:.74rem;color:var(--muted);line-height:1.45;margin-top:.1rem}

/* ── Grief journey ── */
.gj-wrap{min-height:calc(100vh - 56px);background:linear-gradient(160deg,#F0EDE6 0%,#E8F0EA 100%)}
.gj-inner{max-width:510px;margin:0 auto;padding:3rem 1.5rem 4rem}
.gj-stage-opt{border:2px solid var(--border);border-radius:14px;padding:.95rem 1.05rem;cursor:pointer;transition:all .2s;background:var(--white);text-align:left;width:100%;font-family:'Nunito',sans-serif;margin-bottom:.5rem;display:flex;align-items:center;gap:.82rem}
.gj-stage-opt:hover{border-color:var(--sage);background:var(--sage-l)}
.gj-stage-opt.sel{border-color:var(--sage);background:var(--sage-l)}
.gj-moon{font-size:1.4rem;flex-shrink:0}
.gj-sname{font-size:.88rem;font-weight:700;color:var(--ink);display:block}
.gj-sdesc{font-size:.73rem;color:var(--muted);display:block;margin-top:.08rem}
.emoji-row{display:flex;flex-wrap:wrap;gap:.42rem;margin:.5rem 0 1rem}
.eo{width:40px;height:40px;border-radius:9px;background:var(--bg2);border:2px solid var(--border);font-size:1.25rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.eo.s{border-color:var(--sage);background:var(--sage-l)}
.prog{display:flex;gap:.4rem;margin:.5rem 0 1.5rem}
.pd{height:4px;border-radius:2px;background:var(--border);transition:all .3s}
.pd.done{background:var(--sage)}

/* ── Tool grid ── */
.tool-grid{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;margin-bottom:1.4rem}
.tool-pill{background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.88rem .98rem;cursor:pointer;transition:all .2s;text-align:left;width:100%;font-family:'Nunito',sans-serif}
.tool-pill:hover{border-color:var(--sage);background:var(--sage-l)}
.tool-pill.locked{opacity:.45;cursor:not-allowed}.tool-pill.locked:hover{border-color:var(--border);background:var(--white)}
.tp-icon{font-size:1.15rem;display:block;margin-bottom:.28rem}
.tp-name{font-size:.8rem;font-weight:700;color:var(--ink);display:block}
.tp-sub{font-size:.67rem;color:var(--muted);display:block;margin-top:.06rem}

/* ── Check items ── */
.ck-item{display:flex;gap:.72rem;align-items:flex-start;padding:.72rem .88rem;border:1px solid var(--border);border-radius:10px;margin-bottom:.4rem;cursor:pointer;transition:all .15s;background:var(--white)}
.ck-item:hover{border-color:var(--sage)}.ck-item.done{background:var(--sage-l);border-color:rgba(94,140,106,.35)}
.ck-box{width:19px;height:19px;border-radius:50%;border:1.5px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:.12rem;transition:all .2s}
.ck-item.done .ck-box{background:var(--sage);border-color:var(--sage)}

/* ── Timeline ── */
.tl{position:relative;padding-left:1.35rem}
.tl::before{content:'';position:absolute;left:.38rem;top:.4rem;bottom:0;width:2px;background:var(--border)}
.tl-item{position:relative;margin-bottom:.95rem}
.tl-dot{position:absolute;left:-1.1rem;top:.22rem;width:11px;height:11px;border-radius:50%;background:var(--sage);border:2px solid #fff;box-shadow:0 0 0 2px var(--sage)}
.tl-date{font-size:.67rem;color:var(--muted);margin-bottom:.1rem}
.tl-text{font-size:.85rem;color:var(--ink);line-height:1.5}

/* ── Letter ── */
.letter-wrap{background:linear-gradient(180deg,#FEFCF8,#FAF6EE);border:1px solid var(--border);border-radius:var(--r);padding:1.65rem;position:relative}
.letter-wrap::before{content:'';position:absolute;left:2.8rem;top:0;bottom:0;width:1px;background:rgba(94,140,106,.1)}
.letter-to{font-family:'Cormorant Garamond',serif;font-size:1.08rem;color:var(--sage-d);font-style:italic;margin-bottom:.95rem}
.letter-body{background:transparent;border:none;width:100%;min-height:200px;resize:none;font-family:'Nunito',sans-serif;font-size:.87rem;color:var(--ink);line-height:1.9;outline:none;padding:0}
.letter-body::placeholder{color:var(--muted);font-style:italic}

/* ── Permission slip ── */
.slip{background:linear-gradient(135deg,#F5FAF6,#FDFAF5);border:1px solid rgba(94,140,106,.3);border-radius:16px;padding:2.2rem 1.85rem;text-align:center;position:relative;overflow:hidden}
.slip::before{content:'';position:absolute;inset:9px;border:1px dashed rgba(94,140,106,.18);border-radius:9px;pointer-events:none}
.slip-label{font-size:.61rem;letter-spacing:.18em;text-transform:uppercase;color:var(--sage-d);margin-bottom:1.1rem;font-weight:700}
.slip-body{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:var(--ink);line-height:1.8;font-style:italic}
.slip-body strong{color:var(--sage-d);font-style:normal}

/* ── Affirmations ── */
.aff-item{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:.82rem .98rem;margin-bottom:.48rem;display:flex;gap:.78rem;animation:fadeup .4s ease both;font-size:.87rem;line-height:1.7;color:var(--ink)}
.aff-n{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--sage);flex-shrink:0;line-height:1.1;margin-top:.1rem}

/* ── Day companion ── */
.day-dot{width:27px;height:27px;border-radius:6px;border:none;cursor:pointer;font-size:.69rem;font-weight:700;transition:all .15s}

/* ── Mood ── */
.mood-row{display:flex;gap:.42rem;flex-wrap:wrap;margin:.45rem 0}
.mood-btn{padding:.38rem .9rem;border-radius:20px;border:1.5px solid var(--border);background:var(--white);font-size:.78rem;cursor:pointer;color:var(--muted);font-family:'Nunito',sans-serif;transition:all .2s}
.mood-btn:hover,.mood-btn.sel{border-color:var(--sage);background:var(--sage-l);color:var(--sage-d)}

/* ── Community ── */
.dp-banner{background:linear-gradient(135deg,var(--sage-l),#EBF0EC);border:1px solid rgba(94,140,106,.28);border-radius:var(--r);padding:1.35rem 1.5rem;margin-bottom:1.2rem;text-align:center}
.dp-label{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--sage-d);font-weight:700;margin-bottom:.38rem}
.dp-q{font-family:'Cormorant Garamond',serif;font-size:1.18rem;color:var(--ink);line-height:1.4}

/* ── Num cards ── */
.num-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:.95rem;text-align:center}
.num-big{font-family:'Cormorant Garamond',serif;font-size:1.85rem;color:var(--sage-d);line-height:1;margin-bottom:.18rem}
.num-label{font-size:.68rem;color:var(--muted);line-height:1.35}

/* ── Modal ── */
.modal-bg{position:fixed;inset:0;background:rgba(42,34,24,.35);z-index:300;display:flex;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(5px)}
.modal{background:var(--white);border-radius:20px;padding:2rem;max-width:420px;width:100%;box-shadow:0 16px 48px var(--shadow2);animation:fadeup .3s ease}

/* ── Remember section specific ── */
.mem-detail{background:linear-gradient(135deg,#EFF7F1,#F8F4EE);border:1px solid var(--border);border-radius:var(--r);padding:1.85rem;text-align:center;margin-bottom:1rem}
.mem-detail-avatar{width:82px;height:82px;border-radius:50%;border:3px solid var(--sage);background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:2.3rem;margin:0 auto .82rem}
.mem-detail-name{font-family:'Cormorant Garamond',serif;font-size:1.9rem;color:var(--ink)}
.mem-detail-dates{font-size:.79rem;color:var(--muted);margin-top:.22rem}
.candle-wrap{background:var(--amber-l);border:1px solid rgba(200,151,63,.25);border-radius:12px;padding:1.1rem;text-align:center;margin-bottom:1rem}
.candle{font-size:1.4rem;animation:flicker 2.2s ease-in-out infinite;display:inline-block}
.candle:nth-child(2n){animation-delay:.35s}.candle:nth-child(3n){animation-delay:.7s}.candle:nth-child(4n){animation-delay:1.1s}
.reaction-row{display:flex;gap:.38rem;flex-wrap:wrap;margin:.6rem 0}
.rxn-btn{background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:.32rem .78rem;font-size:.83rem;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:.28rem;color:var(--ink)}
.rxn-btn.sel{background:var(--sage-l);border-color:rgba(94,140,106,.4)}
.rxn-btn:hover{transform:scale(1.05)}
.gb-entry{background:var(--bg2);border-radius:10px;padding:.8rem .95rem;margin-bottom:.45rem;border-left:3px solid rgba(94,140,106,.4)}
.gb-author{font-size:.77rem;font-weight:700;color:var(--sage-d)}
.gb-msg{font-size:.85rem;color:var(--ink);line-height:1.5;margin-top:.12rem}
.gb-date{font-size:.67rem;color:var(--muted);margin-top:.18rem}
.share-box{background:var(--bg2);border:1.5px dashed var(--border2);border-radius:10px;padding:.72rem 1rem;display:flex;align-items:center;gap:.75rem}
.share-url{flex:1;font-size:.77rem;color:var(--muted);word-break:break-all}
.poem-box{background:linear-gradient(135deg,var(--amber-l),#FBF6EC);border:1px solid rgba(200,151,63,.3);border-radius:12px;padding:1.2rem;font-family:'Cormorant Garamond',serif;font-size:1.02rem;line-height:1.9;color:var(--ink);font-style:italic;white-space:pre-wrap}
.mem-tab-row{display:flex;gap:.42rem;flex-wrap:wrap;margin-bottom:1.2rem}
.mem-tab{background:var(--white);border:1.5px solid var(--border);border-radius:22px;padding:.4rem 1rem;font-size:.78rem;cursor:pointer;color:var(--muted);font-family:'Nunito',sans-serif;transition:all .2s}
.mem-tab.act{background:var(--sage);border-color:var(--sage);color:#fff}

/* ── Stat row ── */
.stat-row{display:flex;gap:.55rem;flex-wrap:wrap;margin-bottom:1.2rem}
.stat{background:var(--white);border:1px solid var(--border);border-radius:20px;padding:.28rem .82rem;font-size:.73rem;color:var(--muted);display:flex;gap:.3rem;align-items:center}
.stat strong{color:var(--ink)}

/* ── City circles ── */
.city-circle{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:.95rem;cursor:pointer;transition:all .2s;text-align:center}
.city-circle:hover{border-color:var(--sage);background:var(--sage-l)}

/* ── Grief journey CTA banner ── */
.gj-cta{background:linear-gradient(135deg,#EBF4ED,#F8F2E8);border:1px solid rgba(94,140,106,.28);border-radius:20px;padding:2.2rem 2rem;text-align:center;margin:2rem 0}
.gj-cta h2{font-family:'Cormorant Garamond',serif;font-size:1.75rem;color:var(--ink);font-weight:400;margin-bottom:.55rem;line-height:1.2}
.gj-cta p{font-size:.86rem;color:var(--muted);max-width:380px;margin:0 auto 1.4rem;line-height:1.7}

/* ── Send a Gesture ── */
.gest-wrap{min-height:60vh;display:flex;align-items:flex-start;justify-content:center;padding:3rem 1.5rem}
.gest-inner{width:100%;max-width:560px}
.gest-q{font-family:'Cormorant Garamond',serif;font-size:1.62rem;color:var(--ink);line-height:1.2;margin-bottom:.45rem}
.gest-sub{font-size:.85rem;color:var(--muted);line-height:1.65;margin-bottom:1.5rem}
.gest-opts{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.5rem}
.gest-opt{display:flex;align-items:center;gap:.85rem;padding:.9rem 1.1rem;background:var(--white);border:1.5px solid var(--border);border-radius:12px;cursor:pointer;transition:all .18s;text-align:left;font-family:'Nunito',sans-serif;width:100%}
.gest-opt:hover{border-color:var(--sage);background:var(--sage-l)}
.gest-opt.sel{border-color:var(--sage);background:var(--sage-l);box-shadow:0 0 0 2px rgba(94,140,106,.18)}
.gest-opt-icon{font-size:1.5rem;flex-shrink:0;width:40px;text-align:center}
.gest-opt-text{display:flex;flex-direction:column;gap:.1rem}
.gest-opt-label{font-size:.9rem;font-weight:700;color:var(--ink)}
.gest-opt-desc{font-size:.75rem;color:var(--muted)}
.gest-prog{display:flex;gap:.4rem;margin-bottom:2rem}
.gest-pd{height:3px;border-radius:3px;flex:1;background:var(--border);transition:background .3s}
.gest-pd.done{background:var(--sage)}
.gest-pd.active{background:var(--terra)}
.gest-result{background:var(--white);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:.85rem;transition:all .22s}
.gest-result:hover{box-shadow:0 6px 20px var(--shadow2);border-color:var(--border2)}
.gest-result-header{padding:1.1rem 1.2rem .7rem;display:flex;gap:.85rem;align-items:flex-start}
.gest-result-icon{font-size:1.7rem;flex-shrink:0;width:44px;text-align:center}
.gest-result-title{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--ink);margin-bottom:.18rem}
.gest-result-desc{font-size:.8rem;color:var(--muted);line-height:1.55}
.gest-result-footer{padding:.65rem 1.2rem .9rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:.5rem;background:var(--bg)}
.gest-badge{font-size:.66rem;font-weight:700;padding:.2rem .6rem;border-radius:20px;background:var(--sage-l);color:var(--sage-d);border:1px solid rgba(94,140,106,.25)}
.gest-badge-amber{background:var(--amber-l);color:var(--amber-d);border-color:rgba(200,151,63,.25)}
.gest-badge-rose{background:var(--rose-l);color:var(--rose);border-color:rgba(196,122,106,.2)}
.gest-note{font-size:.8rem;color:var(--muted);line-height:1.6;background:var(--bg2);border-radius:10px;padding:.85rem 1rem;margin-bottom:1.2rem;border:1px solid var(--border)}

/* ── My Space ── */
.ms-header{display:flex;align-items:flex-start;gap:1rem;margin-bottom:2rem}
.ms-header-icon{font-size:2.5rem;flex-shrink:0;margin-top:.2rem}
.ms-empty{text-align:center;background:var(--white);border:1.5px dashed var(--border2);border-radius:var(--r);padding:3rem 2rem;margin:2rem 0}
.ms-pets-shelf{display:flex;gap:.85rem;flex-wrap:wrap;margin-bottom:2rem}
.ms-pet-card{background:var(--white);border:1.5px solid var(--border);border-radius:14px;padding:1.2rem 1rem;min-width:130px;max-width:160px;text-align:center;cursor:pointer;transition:all .22s;display:flex;flex-direction:column;align-items:center;gap:.18rem}
.ms-pet-card:hover{border-color:var(--sage);box-shadow:0 4px 16px var(--shadow2);transform:translateY(-2px)}
.ms-pet-emoji{font-size:2.2rem;margin-bottom:.3rem}
.ms-pet-name{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--ink);font-weight:600}
.ms-pet-breed{font-size:.68rem;color:var(--muted)}
.ms-pet-years{font-size:.68rem;color:var(--sage-d);font-weight:700;margin-top:.1rem}
.ms-pet-link{font-size:.66rem;color:var(--sage);margin-top:.4rem}
.ms-pet-add{background:var(--bg2);border:1.5px dashed var(--border2);border-radius:14px;padding:1.2rem 1rem;min-width:110px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .2s;font-family:'Nunito',sans-serif}
.ms-pet-add:hover{border-color:var(--sage);background:var(--sage-l)}
.ms-section-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:1.3rem 1.35rem;margin-bottom:1.2rem;box-shadow:0 2px 10px var(--shadow)}
.ms-timeline{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:1.3rem 1.35rem;margin-bottom:2rem;box-shadow:0 2px 10px var(--shadow)}
.ms-artifacts-list{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.5rem}
.ms-artifact-item{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:.85rem 1rem;display:flex;gap:.75rem;align-items:flex-start}
.ms-artifact-icon{font-size:1.3rem;flex-shrink:0}
.ms-artifact-title{font-size:.84rem;font-weight:700;color:var(--ink)}
.ms-artifact-sub{font-size:.72rem;color:var(--muted);margin-top:.1rem}

.honour-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1rem;margin-bottom:1.5rem}
.honour-card{background:var(--white);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;transition:all .22s;display:flex;flex-direction:column}
.honour-card:hover{box-shadow:0 6px 20px var(--shadow2);transform:translateY(-2px);border-color:var(--sage)}
.honour-card-top{padding:1.3rem 1.1rem .75rem;flex:1}
.honour-card-icon{font-size:2rem;margin-bottom:.65rem}
.honour-card-title{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--ink);margin-bottom:.28rem;line-height:1.3}
.honour-card-desc{font-size:.75rem;color:var(--muted);line-height:1.55}
.honour-card-partner{font-size:.64rem;color:var(--sage-d);font-weight:700;margin-top:.45rem;letter-spacing:.02em}
.honour-card-foot{padding:.65rem 1.1rem .85rem;border-top:1px solid var(--border);background:var(--bg);display:flex;align-items:center;justify-content:space-between;gap:.5rem}
.honour-price{font-size:.9rem;font-weight:700;color:var(--ink)}
.honour-badge{font-size:.62rem;padding:.18rem .55rem;border-radius:20px;font-weight:700;background:var(--sage-l);color:var(--sage-d);border:1px solid rgba(94,140,106,.25)}
.honour-done{background:var(--sage-l)!important;border-color:rgba(94,140,106,.3)!important;transform:none!important;box-shadow:none!important}
.honour-cert{background:linear-gradient(135deg,#EBF4ED,#F8F2E8);border:1.5px solid rgba(94,140,106,.35);border-radius:14px;padding:1.75rem 1.5rem;text-align:center;margin-top:1.25rem;animation:fadeup .4s ease}
.honour-cert-seal{font-size:2.5rem;margin-bottom:.6rem}
.honour-cert-title{font-family:'Cormorant Garamond',serif;font-size:1.45rem;color:var(--ink);margin-bottom:.35rem;line-height:1.2}
.honour-cert-body{font-size:.83rem;color:var(--muted);line-height:1.7;margin-bottom:.9rem}
.honour-cert-stamp{display:inline-flex;align-items:center;gap:.35rem;font-size:.68rem;font-weight:700;color:var(--sage-d);background:var(--white);border:1px solid rgba(94,140,106,.3);border-radius:20px;padding:.3rem .85rem}

/* ── Footer ── */
.site-footer{background:var(--bg2);border-top:1px solid var(--border);padding:3rem 2rem 0}
.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:2.5rem;max-width:1100px;margin:0 auto;padding-bottom:2.5rem}
@media(max-width:720px){.footer-grid{grid-template-columns:1fr 1fr;gap:1.75rem}}
@media(max-width:420px){.footer-grid{grid-template-columns:1fr}}
.footer-brand-icon{width:42px;height:42px;border-radius:50%;background:var(--terra);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:.65rem;flex-shrink:0}
.footer-brand-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--ink);font-weight:600}
.footer-tagline{font-size:.78rem;color:var(--muted);line-height:1.65;margin-top:.5rem;max-width:220px}
.footer-socials{display:flex;gap:.75rem;margin-top:1.1rem}
.footer-social-btn{width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .18s;color:var(--muted)}
.footer-social-btn:hover{border-color:var(--terra);color:var(--terra)}
.footer-col-title{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--ink);margin-bottom:1rem}
.footer-link{display:block;font-size:.82rem;color:var(--muted);margin-bottom:.62rem;cursor:pointer;transition:color .18s;background:none;border:none;padding:0;font-family:'Nunito',sans-serif;text-align:left}
.footer-link:hover{color:var(--terra)}
.footer-email-row{display:flex;gap:.5rem;margin-top:.85rem}
.footer-email-input{flex:1;padding:.55rem .85rem;border:1px solid var(--border);border-radius:10px;font-family:'Nunito',sans-serif;font-size:.82rem;background:var(--white);color:var(--ink);outline:none}
.footer-email-input:focus{border-color:var(--terra)}
.footer-email-btn{width:40px;height:40px;border-radius:10px;background:var(--terra);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .18s}
.footer-email-btn:hover{background:var(--terra-d)}
.footer-bottom{border-top:1px solid var(--border);padding:1.1rem 2rem;max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
.footer-bottom-left{font-size:.75rem;color:var(--muted);display:flex;align-items:center;gap:.3rem}
.footer-bottom-right{display:flex;gap:1.25rem}
.footer-bottom-link{font-size:.75rem;color:var(--muted);cursor:pointer;background:none;border:none;font-family:'Nunito',sans-serif;transition:color .18s}
.footer-bottom-link:hover{color:var(--ink)}
`;
/* ─── Helpers ────────────────────────────────────────────────────────────── */
const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE"; // ← paste your key from console.anthropic.com

const api = async (prompt, tokens=500) => {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version":"2023-06-01",
      "anthropic-dangerous-direct-browser-access":"true"
    },
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:tokens,
      messages:[{role:"user",content:prompt}] })
  });
  const d = await r.json();
  return d.content?.map(c=>c.text||"").join("")||"";
};
const sv = async(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const ld = async(k,fb=null)=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):fb}catch{return fb}};

function Saved(){return <span className="saved">✓ Saved</span>;}
function Spinner(){return <span className="spinner"/>;}

/* ─── Nav config ─────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {id:"home",      icon:"🏡", label:"Home",           sub:"Welcome"},
  {id:"remember",  icon:"🌿", label:"Memorials",      sub:"Remember them"},
  {id:"community", icon:"🤝", label:"Community",      sub:"Memory wall"},
  {id:"gesture",   icon:"🎁", label:"Send a gesture", sub:"Support a friend"},
  {id:"shop",      icon:"🛍", label:"Shop",           sub:"Keepsakes"},
  {id:"resources", icon:"📚", label:"Resources",      sub:"Support & guides"},
];

/* ─── Grief stages ───────────────────────────────────────────────────────── */
const STAGES = [
  {id:"raw",         moon:"🌑", name:"It just happened",              desc:"I'm barely holding on right now.",          unlock:["guilt","letter","slip"]},
  {id:"active",      moon:"🌒", name:"I'm in the thick of it",        desc:"Taking it one day at a time.",              unlock:["guilt","letter","slip","theykew","firsts","30days"]},
  {id:"integration", moon:"🌓", name:"Slowly finding my footing",     desc:"Some days are better than others.",         unlock:["guilt","letter","slip","theykew","firsts","30days","taught","peer"]},
  {id:"remembrance", moon:"🌕", name:"More remembering than grieving", desc:"Grateful for what we had.",               unlock:["guilt","letter","slip","theykew","firsts","30days","taught","peer"]},
];
const GREETING = {raw:"You don't have to do anything today. You are held.", active:"One day at a time. You're doing it.", integration:"You're finding your way. That's everything.", remembrance:"The love doesn't leave. It just changes shape."};
const TOOLS = [
  {id:"guilt",  icon:"💬", name:"The Guilt Release",    sub:"Say the unsaid thing"},
  {id:"letter", icon:"✉️", name:"Write to Them",        sub:"A private letter"},
  {id:"slip",   icon:"🌿", name:"Permission Slip",      sub:"Your grief is real"},
  {id:"theykew",icon:"✨", name:"They Knew",             sub:"Affirmations of love"},
  {id:"firsts", icon:"🌱", name:"The Firsts",           sub:"Name each milestone"},
  {id:"30days", icon:"📅", name:"30-Day Companion",     sub:"Day by day support"},
  {id:"taught", icon:"🌻", name:"What They Taught Me",  sub:"Their legacy in you"},
  {id:"peer",   icon:"🤝", name:"Find a Peer",          sub:"Someone on the same day"},
];
const DAYS = [
  {type:"Permission",h:"You don't have to be okay today.",body:"The world keeps moving. You don't have to move with it. Today you just need to exist — that's the whole task.",p:"What does grief feel like in your body right now?"},
  {type:"Memory",h:"It's the ordinary moments we miss most.",body:"Not the big occasions. The Tuesday routine. The sound of them. The unremarkable weight of them beside you.",p:"Name one completely ordinary moment you'd give anything to have back."},
  {type:"Guilt",h:"You made the most loving decision you could.",body:"If you're carrying guilt — about timing, the last day, whether they knew — that guilt is love with nowhere to go. You loved them. That is the whole story.",p:"Write down the fear underneath the guilt. Just name it."},
  {type:"Rest",h:"Grief is exhausting work.",body:"Your nervous system has been through something real. Sleep more than you think you should. Your body is doing enormous invisible work right now.",p:"What does your body need today that you keep denying it?"},
  {type:"Memory",h:"Who did they think you were?",body:"They held a version of you — the patient one, the tender one. To them you were simply their person. That version of you is real, and it remains.",p:"Who did they see when they looked at you?"},
  {type:"Ritual",h:"Create a small ritual to mark the days.",body:"Grief without ritual becomes endless fog. A candle, a walk on their route, a quiet moment in their favourite spot. Ritual gives grief a shape.",p:"What small ritual could you create today in their name?"},
  {type:"Milestone",h:"You have made it through one week.",body:"Seven days carrying this. You did it even on the days it didn't feel possible. That matters more than you know.",p:"What surprised you about the first week?"},
  {type:"Memory",h:"The funny ones deserve to live too.",body:"The silly chaos, the weird habits, the things only your household laughed at — those memories are just as sacred. Let yourself laugh today if it comes.",p:"Tell the funniest story about them."},
  {type:"Meaning",h:"Their love changed you.",body:"You are a different person for having loved them — more patient, more present, more aware of what pure love feels like. That change doesn't leave when they do.",p:"Name one way loving them made you a better version of yourself."},
  {type:"Closing",h:"One month. You carried it.",body:"Thirty days with a hole in your life. You didn't think you could and you did. You've already done the hardest thing.",p:"Write yourself a note from Day 30. What do you want to remember?"},
];

/* ─── Static data ────────────────────────────────────────────────────────── */
const PUBLIC_MEMS = [
  {emoji:"🐶",name:"Bruno",loc:"São Paulo",years:12,candles:24},
  {emoji:"🐱",name:"Mia",loc:"London",years:9,candles:41},
  {emoji:"🐕",name:"Simba",loc:"Toronto",years:7,candles:18},
  {emoji:"🐈",name:"Luna",loc:"Melbourne",years:14,candles:67},
  {emoji:"🐰",name:"Coco",loc:"Paris",years:4,candles:12},
  {emoji:"🐦",name:"Mithu",loc:"Nairobi",years:11,candles:29},
  {emoji:"🐶",name:"Max",loc:"New York",years:10,candles:53},
  {emoji:"🐱",name:"Ginger",loc:"Berlin",years:8,candles:35},
];
const SEED_POSTS = [
  {emoji:"🐶",name:"Ananya S.",pet:"Bruno",loc:"São Paulo",text:"Bruno used to sit by the door at exactly 7pm every evening — like clockwork. I still look up at 7pm. He trained me better than any reminder app ever could.",likes:62,time:"2h ago"},
  {emoji:"🐱",name:"Rohan M.",pet:"Mia",loc:"London",text:"What nobody tells you about losing a cat is that their absence is loudest in the silence. Mia never made much noise. But her silence now is completely different.",likes:89,time:"5h ago"},
  {emoji:"🐕",name:"Priya K.",pet:"Simba",loc:"Toronto",text:"People told me 'he was just a dog' and I nodded politely. But Simba got me through a really dark year without knowing he was doing it. That's not 'just' anything.",likes:114,time:"1d ago"},
];
const SHOP_ITEMS = [
  {icon:"📖",name:"Their Story — A Custom Picture Book",desc:"Beautifully illustrated by hand. Your pet's life, told in full-colour pages for families to keep forever.",priceINR:3499,priceUSD:42,bg:"#EBF4ED",badge:"⭐ Bestseller"},
  {icon:"🫙",name:"The Memory Keepsake Kit",desc:"A curated box with prompt cards, plantable seed paper, a keepsake vial, and a private letter envelope.",priceINR:1999,priceUSD:24,bg:"#FBF0E8",badge:"✦ Exclusive"},
  {icon:"💍",name:"Paw Print Pendant",desc:"Sterling silver, cast from your pet's actual paw print. Worn close to the heart, always.",priceINR:5499,priceUSD:66,bg:"#FAEEED",badge:"❤️ Most Loved"},
  {icon:"🎨",name:"Custom Illustrated Portrait",desc:"A watercolour-style portrait from your photos, printed on archival art paper.",priceINR:2999,priceUSD:36,bg:"#EEF3F8",badge:"🎨 Artist Edition"},
  {icon:"⭐",name:"Named Star Certificate",desc:"Name a star in their honour. A personalised sky map showing exactly where it sits, beautifully printed.",priceINR:1599,priceUSD:19,bg:"#F8F4EE",badge:""},
];
const RESOURCES = [
  {icon:"📞",type:"Helpline",title:"Crisis Text & Phone Support",desc:"Free, confidential mental health support available in multiple languages. Grief counsellors trained in animal bereavement.",local:true,tags:["Free","Available Now"]},
  {icon:"🌐",type:"Organisation",title:"Association for Pet Loss & Bereavement (APLB)",desc:"Free support groups, peer communities, and trained counsellors — all online and accessible worldwide.",local:false,tags:["Free","Online","Global"]},
  {icon:"🌐",type:"Community",title:"Local Pet Loss Support Groups",desc:"Find a facilitator-led group near you. These meet monthly and are run by people who've been through the same loss.",local:true,tags:["Near You","Free","In Person"]},
  {icon:"📗",type:"Book",title:"The Loss of a Pet — Wallace Sife",desc:"The most recommended book in pet grief counselling worldwide. Warm, honest, non-clinical.",local:false,tags:["Universal"]},
  {icon:"📗",type:"Book",title:"Goodbye, Friend — Gary Kowalski",desc:"The spiritual bond between humans and animals. Profound and gentle.",local:false,tags:["Universal"]},
  {icon:"📄",type:"Guide",title:"Talking to Children About Pet Loss",desc:"Age-appropriate language and honest approaches for explaining pet death to children of all ages.",local:false,tags:["Families","Free"]},
  {icon:"📄",type:"Guide",title:"When Is It Time to Get Another Pet?",desc:"A non-pressuring, honest guide to making this decision on your own timeline — no one else's.",local:false,tags:["Free","Guide"]},
  {icon:"🎙️",type:"Podcast",title:"Grief Out Loud",desc:"Episodes covering animal loss. Honest conversations with people who've been there.",local:false,tags:["Podcast","Audio"]},
];
const DAILY_PROMPTS=["What's one thing your pet did that you'll never stop smiling about?","If they could send you one message right now, what do you think it would say?","What routine did they make better just by being in it?","Describe their personality in three words — then one sentence.","What did loving them teach you about love itself?"];

const HONOUR_ACTS = [
  {id:"feed",    icon:"🍚", title:"Feed a shelter resident",         desc:"Covers one animal's food for a full month at a partner rescue centre. A small act that keeps a life going.",                    partner:"Blue Cross of India", priceINR:500,  priceUSD:6,  badge:"Most accessible", link:"https://bluecrossofindia.org"},
  {id:"sponsor", icon:"🏠", title:"Sponsor a shelter resident",      desc:"Your support covers the full monthly care of one named animal waiting to find a home — food, shelter, and basic medical.",       partner:"CUPA, Bangalore",     priceINR:3000, priceUSD:36, badge:"Creates a bond",   link:"https://cupa.org.in"},
  {id:"vet",     icon:"🏥", title:"Fund an emergency vet visit",     desc:"Covers one animal's treatment at a rescue trauma centre. Street animals and shelter residents often go without urgent care.",      partner:"CUPA, Bangalore",     priceINR:1000, priceUSD:12, badge:"Urgent impact",   link:"https://cupa.org.in"},
  {id:"chip",    icon:"💉", title:"Gift a microchip",                desc:"Pays for one stray or rescue animal to be microchipped — the single biggest step toward them finding or returning to a home.",     partner:"Blue Cross of India", priceINR:400,  priceUSD:5,  badge:"One-time act",    link:"https://bluecrossofindia.org"},
  {id:"tree",    icon:"🌱", title:"Plant a memorial tree",           desc:"A named tree planted in their memory through SankalpTaru. You receive GPS coordinates and a digital certificate to keep.",           partner:"SankalpTaru",         priceINR:350,  priceUSD:4,  badge:"Living legacy",   link:"https://sankalptaru.org"},
  {id:"foodbank",icon:"🐾", title:"Donate to a pet food bank",       desc:"Helps families who can't afford pet food keep their animals. Keeping pets in homes prevents them from entering shelters.",          partner:"Blue Cross of India", priceINR:700,  priceUSD:8,  badge:"Keeps families together", link:"https://bluecrossofindia.org"},
];
const SAMPLE_GB = [
  {author:"Sarah M.",msg:"Bruno always greeted me with that tail. The house isn't the same — but he lives on in everyone who loved him.",date:"Nov 5"},
  {author:"Dr. Kavya (vet)",msg:"Bruno was always the patient who made everyone in the clinic smile. A truly special soul.",date:"Nov 4"},
];
const RXNS = ["❤️","🐾","🕯️","🌈","🌻","😢"];

/* ─── Healing Tool content ───────────────────────────────────────────────── */
function HealingTool({id, pet, onBack}) {
  const pn = pet?.name||"them"; const breed = pet?.breed||"pet";
  const [gT,setGT]=useState(""); const [gR,setGR]=useState(""); const [gL,setGL]=useState(false);
  const [letter,setLetter]=useState(""); const [lS,setLS]=useState(false);
  const [slipN,setSlipN]=useState(""); const [slipD,setSlipD]=useState(false);
  const [affD,setAffD]=useState(""); const [aff,setAff]=useState([]); const [affL,setAffL]=useState(false);
  const [firsts,setFirsts]=useState({});
  const [day,setDay]=useState(1); const [dR,setDR]=useState({}); const [dDraft,setDDraft]=useState(""); const [dS,setDS]=useState(false);
  const TAUGHT=[{id:"present",q:`What did ${pn} teach you about being present?`},{id:"love",q:`What did ${pn} teach you about unconditional love?`},{id:"joy",q:`What did ${pn} teach you about joy in small things?`},{id:"trust",q:`What did ${pn} teach you about trust?`}];
  const [tA,setTA]=useState({}); const [leg,setLeg]=useState(""); const [tL,setTL]=useState(false);
  const FIRSTS=[{id:"morning",n:"First morning without them",s:"When you woke up and remembered."},{id:"dinner",n:"First dinner alone",s:"No one waiting for a bite."},{id:"walk",n:"First walk on their route",s:"The path that was theirs."},{id:"weekend",n:"First weekend",s:"Days that were shaped around them."},{id:"bowl",n:"Put away their bowl",s:"Or couldn't bring yourself to."},{id:"laugh",n:"First full laugh since",s:"A real one. They would've loved it."}];

  useEffect(()=>{
    ld(`gR:${pn}`).then(r=>r&&setGR(r)); ld(`gT:${pn}`).then(r=>r&&setGT(r));
    ld(`letter:${pn}`).then(r=>r&&setLetter(r)); ld(`aff:${pn}`).then(r=>r&&setAff(r||[]));
    ld(`firsts:${pn}`).then(r=>r&&setFirsts(r||{})); ld(`dR:${pn}`).then(r=>r&&setDR(r||{}));
    ld(`leg:${pn}`).then(r=>r&&setLeg(r));
  },[pn]);
  useEffect(()=>{setDDraft(dR[day]||"");setDS(false);},[day,dR]);

  const subGuilt=async()=>{if(!gT.trim())return;setGL(true);const r=await api(`A pet parent lost their ${breed} named ${pn}. They share something they feel guilty about. Respond with deep warmth and validation like a wise loving friend — 3-4 intimate paragraphs, no bullet points, no therapy-speak. Their words: "${gT}"`,600);setGR(r);await sv(`gR:${pn}`,r);await sv(`gT:${pn}`,gT);setGL(false);};
  const genAff=async()=>{setAffL(true);const r=await api(`Generate 6 deeply personal affirmations for a pet parent who lost their ${breed} named ${pn}. Each begins with "${pn} knew…" and names a specific, tender, everyday act of love. ${affD?`Context: "${affD}"`:""}  Return ONLY the 6 affirmations, one per line.`,400);const lines=r.split("\n").filter(l=>l.trim()).slice(0,6);setAff(lines);await sv(`aff:${pn}`,lines);setAffL(false);};
  const saveLet=async()=>{await sv(`letter:${pn}`,letter);setLS(true);setTimeout(()=>setLS(false),3000);};
  const togFirst=async(fid)=>{const u={...firsts,[fid]:!firsts[fid]};setFirsts(u);await sv(`firsts:${pn}`,u);};
  const saveDay=async()=>{const u={...dR,[day]:dDraft};setDR(u);setDS(true);await sv(`dR:${pn}`,u);};
  const genLeg=async()=>{const f=TAUGHT.filter(t=>tA[t.id]?.trim());if(!f.length)return;setTL(true);const text=f.map(t=>`${t.q}\n${tA[t.id]}`).join("\n\n");const r=await api(`Pet parent reflects on what their ${breed} ${pn} taught them. Write a beautiful legacy card (3-4 paragraphs, second person, flowing prose, no headers):\n${text}`,600);setLeg(r);await sv(`leg:${pn}`,r);setTL(false);};

  const dc=DAYS[Math.min(day-1,DAYS.length-1)];
  const tc={Permission:"var(--sage)",Memory:"var(--amber)",Guilt:"var(--rose)",Ritual:"var(--terra)",Milestone:"#7A9EB8",Meaning:"var(--sage)",Closing:"var(--amber)"};

  return(
    <div className="page fade">
      <button className="btn btn-ghost btn-sm" style={{marginBottom:"1.25rem"}} onClick={onBack}>← Back</button>
      {id==="guilt"&&<><div className="ph"><div className="ph-eye">The Guilt Release</div><h1 className="ph-title">Say the thing you <em>haven't</em> said out loud.</h1><p className="ph-desc">Private. No one else sees this. Write whatever you're carrying.</p></div><div className="card"><textarea className="field" rows={6} placeholder={`What are you feeling guilty about? Write it honestly…`} value={gT} onChange={e=>setGT(e.target.value)}/></div><div style={{display:"flex",gap:".5rem"}}><button className="btn btn-sage" onClick={subGuilt} disabled={gL||!gT.trim()}>{gL?<><Spinner/>Finding words…</>:"Let it be heard"}</button>{gR&&<button className="btn btn-ghost btn-sm" onClick={()=>{setGR("");setGT("");}}>Start over</button>}</div>{gR&&<div className="ai-box">{gR}</div>}</>}
      {id==="letter"&&<><div className="ph"><div className="ph-eye">Write to Them</div><h1 className="ph-title">Not about them. <em>To</em> them.</h1><p className="ph-desc">Private, always. Never shown to anyone else.</p></div><div className="letter-wrap"><div className="letter-to">Dear {pn},</div><textarea className="letter-body" value={letter} onChange={e=>{setLetter(e.target.value);setLS(false);}} placeholder="Start wherever you are. There's no right way to begin…"/><div style={{marginTop:"1rem",paddingTop:".85rem",borderTop:"1px solid var(--border)",fontSize:".84rem",fontStyle:"italic",color:"var(--muted)"}}>With all my love, always.</div></div><div style={{display:"flex",gap:".5rem",alignItems:"center",marginTop:".82rem"}}><button className="btn btn-sage" onClick={saveLet} disabled={!letter.trim()}>Save this letter</button>{lS&&<Saved/>}</div><p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".42rem"}}>This is yours alone. Forever.</p></>}
      {id==="slip"&&<><div className="ph"><div className="ph-eye">Permission Slip</div><h1 className="ph-title">Your grief is <em>not too much.</em></h1><p className="ph-desc">The permission you shouldn't have needed. Given anyway.</p></div>{!slipD?<div className="card"><div className="ct" style={{fontSize:".9rem"}}>Add your name (optional)</div><input className="field" style={{marginTop:".5rem"}} placeholder="Your first name" value={slipN} onChange={e=>setSlipN(e.target.value)}/><div style={{marginTop:".75rem"}}><button className="btn btn-sage" onClick={()=>setSlipD(true)}>Create my permission slip</button></div></div>:<><div className="slip"><div className="slip-label">A Permission Slip</div><div className="slip-body">{slipN&&<>{slipN},<br/><br/></>}Losing <strong>{pn}</strong> was a real loss.<br/>Your grief is not disproportionate,<br/>not something to explain or justify.<br/><br/>You loved someone completely.<br/>They are gone.<br/><strong>What you feel is exactly right.</strong><br/><br/>You are allowed to be undone by this.<br/>You are allowed to take your time.<br/><br/><strong>{pn} mattered.</strong> And so does this.</div><div style={{fontSize:".61rem",letterSpacing:".1em",color:"var(--sage-d)",textTransform:"uppercase",marginTop:"1.2rem"}}>RememFur · In memory of {pn} {pet?.emoji||"🐾"}</div></div><div style={{display:"flex",gap:".5rem",marginTop:".82rem"}}><button className="btn btn-ghost btn-sm" onClick={()=>window.print()}>🖨 Print</button><button className="btn btn-ghost btn-sm" onClick={()=>setSlipD(false)}>Edit</button></div></>}</>}
      {id==="theykew"&&<><div className="ph"><div className="ph-eye">They Knew</div><h1 className="ph-title"><em>{pn}</em> knew how loved they were.</h1><p className="ph-desc">The fear underneath pet grief: did they know? They did. Let's name the ways.</p></div>{aff.length===0&&<div className="card"><div className="ct" style={{fontSize:".9rem"}}>Tell us about your life together</div><textarea className="field" style={{marginTop:".5rem"}} rows={3} placeholder="Routines, habits, things only the two of you shared…" value={affD} onChange={e=>setAffD(e.target.value)}/><div style={{marginTop:".75rem"}}><button className="btn btn-sage" onClick={genAff} disabled={affL}>{affL?<><Spinner/>Writing…</>:"Generate affirmations"}</button></div></div>}{aff.map((a,i)=><div key={i} className="aff-item" style={{animationDelay:`${i*.07}s`}}><div className="aff-n">{i+1}</div><div>{a.startsWith(pn)?a:`${pn} knew ${a}`}</div></div>)}{aff.length>0&&<button className="btn btn-ghost btn-sm" style={{marginTop:".5rem"}} onClick={()=>setAff([])}>Regenerate</button>}</>}
      {id==="firsts"&&<><div className="ph"><div className="ph-eye">The Firsts</div><h1 className="ph-title">Every first <em>deserves to be named.</em></h1><p className="ph-desc">Mark them as they happen. No one else may notice. You do.</p></div>{FIRSTS.map(f=><div key={f.id} className={`ck-item ${firsts[f.id]?"done":""}`} onClick={()=>togFirst(f.id)}><div className="ck-box">{firsts[f.id]&&<span style={{color:"#fff",fontSize:".68rem"}}>✓</span>}</div><div><div style={{fontSize:".85rem",color:firsts[f.id]?"var(--sage-d)":"var(--ink)"}}>{f.n}</div><div style={{fontSize:".71rem",color:"var(--muted)",fontStyle:"italic",marginTop:".1rem"}}>{f.s}</div></div></div>)}</>}
      {id==="30days"&&<><div className="ph"><div className="ph-eye">30-Day Companion</div><h1 className="ph-title">One day. <em>One moment at a time.</em></h1></div><div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem",flexWrap:"wrap"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",color:"var(--sage-d)",lineHeight:1}}>{String(day).padStart(2,"0")}</div><div style={{display:"flex",gap:".32rem"}}><button onClick={()=>setDay(d=>Math.max(1,d-1))} style={{width:"26px",height:"26px",borderRadius:"50%",border:"1px solid var(--border)",background:"var(--white)",cursor:"pointer"}}>←</button><button onClick={()=>setDay(d=>Math.min(10,d+1))} style={{width:"26px",height:"26px",borderRadius:"50%",border:"1px solid var(--border)",background:"var(--white)",cursor:"pointer"}}>→</button></div><div style={{display:"flex",flexWrap:"wrap",gap:".28rem"}}>{Array.from({length:10},(_,i)=>i+1).map(d=><button key={d} className="day-dot" onClick={()=>setDay(d)} style={{background:d===day?"var(--sage)":dR[d]?"var(--sage-l)":"var(--bg2)",color:d===day?"#fff":dR[d]?"var(--sage-d)":"var(--muted)",border:d===day?"none":"1px solid var(--border)"}}>{d}</button>)}</div></div><div className="card"><div style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",color:tc[dc.type]||"var(--sage)",marginBottom:".38rem",fontWeight:700}}>{dc.type}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.18rem",color:"var(--ink)",marginBottom:".6rem"}}>{dc.h}</div><div style={{fontSize:".87rem",color:"var(--ink2)",lineHeight:1.75,marginBottom:"1rem"}}>{dc.body}</div><hr className="dv"/><div style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:".42rem",fontWeight:700}}>Today's prompt</div><div style={{fontSize:".83rem",fontStyle:"italic",color:"var(--muted)",marginBottom:".62rem"}}>{dc.p}</div><textarea className="field" rows={4} placeholder="Write here — just for you…" value={dDraft} onChange={e=>{setDDraft(e.target.value);setDS(false);}}/><div style={{display:"flex",gap:".5rem",alignItems:"center",marginTop:".58rem"}}><button className="btn btn-sage btn-sm" onClick={saveDay} disabled={!dDraft.trim()}>Save reflection</button>{dS&&<Saved/>}</div></div></>}
      {id==="taught"&&<><div className="ph"><div className="ph-eye">What They Taught Me</div><h1 className="ph-title"><em>{pn}</em> left something inside you.</h1><p className="ph-desc">Answer a few questions. We'll weave them into a legacy card.</p></div>{!leg?<>{TAUGHT.map(t=><div className="card" key={t.id}><div className="ct" style={{fontSize:".9rem"}}>{t.q}</div><textarea className="field" style={{marginTop:".5rem"}} rows={3} placeholder="Take your time…" value={tA[t.id]||""} onChange={e=>setTA(a=>({...a,[t.id]:e.target.value}))}/></div>)}<button className="btn btn-sage" onClick={genLeg} disabled={tL||!Object.values(tA).some(v=>v?.trim())}>{tL?<><Spinner/>Creating…</>:`Create ${pn}'s legacy card`}</button></>:<><div style={{background:"linear-gradient(135deg,var(--sage-l),#EBF0EC)",border:"1px solid rgba(94,140,106,.3)",borderRadius:"var(--r)",padding:"1.65rem"}}><div style={{fontSize:".62rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--sage-d)",marginBottom:".95rem",fontWeight:700}}>The legacy of {pn} {pet?.emoji||"🐾"}</div><div style={{fontStyle:"italic",lineHeight:1.85,color:"var(--ink)",fontSize:".9rem",whiteSpace:"pre-wrap"}}>{leg}</div></div><div style={{display:"flex",gap:".5rem",marginTop:".82rem"}}><button className="btn btn-ghost btn-sm" onClick={()=>navigator.clipboard?.writeText(leg)}>Copy</button><button className="btn btn-ghost btn-sm" onClick={()=>setLeg("")}>Rewrite</button></div></>}</>}
    </div>
  );
}

/* ─── VIEW: Home ─────────────────────────────────────────────────────────── */
function HomeView({onNav}) {
  const [liked,setLiked]=useState({});

  return(
    <>
      <div className="hero">
        <div className="hero-eye">🐾 Memorial · Grief · Community</div>
        <h1 className="hero-title">A place to <em>remember</em>,<br/>heal, and celebrate<br/>the love they gave.</h1>
        <p className="hero-desc">RememFur is a warm, gentle space for pet parents navigating grief — memorials, community, healing tools, and keepsakes, all in one place.</p>
        <div className="hero-actions">
          <button className="btn btn-sage" style={{fontSize:".9rem",padding:".62rem 1.7rem"}} onClick={()=>onNav({view:"remember",mode:"list"})}>Browse memorials</button>
          <button className="btn btn-terra" style={{fontSize:".9rem",padding:".62rem 1.7rem"}} onClick={()=>onNav({view:"remember",mode:"create"})}>+ Create a memorial</button>
          <button className="btn btn-ghost" style={{fontSize:".9rem",padding:".62rem 1.7rem"}} onClick={()=>onNav("community")}>Read community stories</button>
        </div>
        <p className="hero-note">No account needed to browse · Free to explore</p>
      </div>

      <div className="page-wide">
        {/* Recently remembered — scrolling strip */}
        <div style={{marginBottom:"2.5rem"}}>
          <div className="sec-label" style={{padding:"0 1.5rem"}}>
            <span className="eye">Recently remembered</span>
            <h2>Lights that are still burning.</h2>
            <p>Memorials created by pet parents around the world.</p>
          </div>
          <div className="mem-strip">
            <div className="mem-strip-inner">
              {[...PUBLIC_MEMS,...PUBLIC_MEMS].map((m,i)=>(
                <div key={i} className="mem-mini" onClick={()=>onNav("remember")}>
                  <div className="mem-mini-avatar">{m.emoji}</div>
                  <div>
                    <div className="mem-mini-name">{m.name}</div>
                    <div className="mem-mini-sub">{m.loc} · {m.years} years loved</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community posts */}
        <div style={{marginBottom:"2.5rem"}}>
          <div className="sec-label">
            <span className="eye">Community</span>
            <h2>Stories from pet parents everywhere.</h2>
            <p>Real people, real loss, real love. A quiet corner of the internet.</p>
          </div>
          {SEED_POSTS.map((p,i)=>(
            <div key={i} className="post-card fade" style={{animationDelay:`${i*.08}s`}}>
              <div className="post-avatar">{p.emoji}</div>
              <div style={{flex:1}}>
                <div><span className="post-author">{p.name}</span><span className="post-loc">· {p.loc}</span><span style={{fontSize:".66rem",color:"var(--muted)",marginLeft:".3rem"}}>in memory of {p.pet}</span></div>
                <div className="post-text">{p.text}</div>
                <div className="post-meta"><span>{p.time}</span><button className={`heart-btn ${liked[i]?"liked":""}`} onClick={()=>setLiked(l=>({...l,[i]:!l[i]}))}>{liked[i]?"❤️":"🤍"} {p.likes+(liked[i]?1:0)}</button></div>
              </div>
            </div>
          ))}
          <div style={{textAlign:"center",marginTop:".85rem"}}>
            <button className="btn btn-ghost" onClick={()=>onNav("community")}>See all stories →</button>
          </div>
        </div>

        {/* Grief journey CTA — ABOVE shop */}
        <div className="gj-cta">
          <div style={{fontSize:"2rem",marginBottom:".65rem"}}>🕯️</div>
          <h2>When you're ready,<br/>we're here.</h2>
          <p>A private, adaptive grief companion built specifically for pet loss. Eight tools for the real emotional terrain — guilt, the firsts, the need to write to them. Go at your pace. Nothing here expires.</p>
          <button className="btn btn-sage" style={{fontSize:".9rem",padding:".62rem 1.7rem"}} onClick={()=>onNav("journey")}>Begin my grief journey</button>
          <p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".65rem",fontStyle:"italic"}}>Free · Private · No account needed</p>
        </div>

        {/* Send a Gesture CTA */}
        <div style={{background:"linear-gradient(135deg,var(--terra-l),var(--amber-l))",border:"1px solid rgba(192,120,80,.2)",borderRadius:"var(--r)",padding:"2rem 1.75rem",textAlign:"center",marginBottom:"2.5rem"}}>
          <div style={{fontSize:"1.8rem",marginBottom:".6rem"}}>🎁</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.65rem",color:"var(--ink)",fontWeight:400,marginBottom:".5rem"}}>Know someone who's grieving?</h2>
          <p style={{fontSize:".86rem",color:"var(--muted)",maxWidth:"380px",margin:"0 auto 1.4rem",lineHeight:1.7}}>Not sure what to do or say? We'll ask you three questions and suggest exactly the right gesture — something that lands well, and doesn't accidentally make things harder.</p>
          <button className="btn btn-terra" style={{fontSize:".9rem",padding:".62rem 1.7rem"}} onClick={()=>onNav("gesture")}>Find the right gesture →</button>
          <p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".65rem",fontStyle:"italic"}}>Three questions · Under a minute</p>
        </div>

        {/* Shop preview */}
        <div style={{marginBottom:"1.5rem"}}>
          <div className="sec-label">
            <span className="eye">Shop · Keepsakes & Memorials</span>
            <h2>Hold something of theirs.</h2>
            <p>Thoughtfully made. Every piece personalised with their name.</p>
          </div>
          <div className="g3">
            {SHOP_ITEMS.slice(0,3).map((item,i)=>(
              <div key={i} className="shop-card fade" style={{animationDelay:`${i*.07}s`}}>
                <div className="shop-img" style={{background:item.bg}}>{item.icon}</div>
                <div className="shop-body">
                  {item.badge&&<div className="shop-badge-tag">{item.badge}</div>}
                  <div className="shop-name">{item.name}</div>
                  <div className="shop-desc">{item.desc}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span className="shop-price">from ${item.priceUSD}</span>
                    <button className="btn btn-ghost btn-xs" onClick={()=>onNav("shop")}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"1rem"}}>
            <button className="btn btn-ghost" onClick={()=>onNav("shop")}>See all keepsakes →</button>
          </div>
        </div>

        {/* In Their Honour — home page section */}
        <div style={{marginBottom:"2.5rem"}}>
          <div className="sec-label">
            <span className="eye">In Their Honour</span>
            <h2>Let their love <em>ripple outward.</em></h2>
            <p>Small acts of kindness done in your pet's name — each one goes directly to verified animal welfare organisations in India. Starting from ₹350.</p>
          </div>
          <InTheirHonour currency="₹" compact={true}/>
          <div style={{textAlign:"center",marginTop:".75rem"}}>
            <button className="btn btn-ghost" onClick={()=>onNav("shop")}>See all acts of honour →</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── All memorials data (browsable list) ────────────────────────────────── */
const ALL_MEMORIALS = [
  {id:"bruno",   emoji:"🐶", name:"Bruno",   breed:"Labrador Retriever", loc:"São Paulo",    years:12, born:"2010-05-12", passed:"2024-11-02", candles:24, msgs:8,  story:"Bruno was more than a dog — he was the warmest hello at the end of every hard day. He loved muddy puddles, stolen socks, and sleeping with his head on your feet. Fourteen years of pure, golden love.", owner:"The Sharma Family", species:"dog"},
  {id:"mia",     emoji:"🐱", name:"Mia",     breed:"Siamese",            loc:"London",       years:9,  born:"2014-03-18", passed:"2023-11-05", candles:41, msgs:12, story:"Mia had opinions about everything — the temperature of her food, which spot on the sofa was hers, and exactly how much attention was appropriate at any given moment. She was never wrong.", owner:"Emma & James W.", species:"cat"},
  {id:"simba",   emoji:"🐕", name:"Simba",   breed:"Golden Retriever",   loc:"Toronto",      years:7,  born:"2016-07-04", passed:"2023-08-22", candles:18, msgs:6,  story:"Simba arrived as a puppy and immediately decided he was in charge of everyone's happiness. He was right. Seven years of tail wags and unconditional love that we'll never stop being grateful for.", owner:"The Nair Family", species:"dog"},
  {id:"luna",    emoji:"🐈", name:"Luna",    breed:"Ragdoll",            loc:"Melbourne",    years:14, born:"2008-12-01", passed:"2023-07-14", candles:67, msgs:21, story:"Luna was the quiet heartbeat of our home for fourteen years. She had a gift for arriving exactly when you needed her most — settling herself beside you without a word, warm and present.", owner:"Sophie K.", species:"cat"},
  {id:"coco",    emoji:"🐰", name:"Coco",    breed:"Holland Lop",        loc:"Paris",        years:4,  born:"2019-05-22", passed:"2023-09-30", candles:12, msgs:4,  story:"Four years wasn't nearly enough. Coco was tiny but she filled every corner of our apartment with her personality. She binky'd every morning like the day was a gift. It was.", owner:"Léa & Marc D.", species:"other"},
  {id:"mithu",   emoji:"🐦", name:"Mithu",   breed:"Indian Ringneck",    loc:"Nairobi",      years:11, born:"2011-01-10", passed:"2022-12-18", candles:29, msgs:9,  story:"Mithu talked constantly and had something to say about everything. His 'chai?' every morning is the thing we hear in the quiet. Eleven years of colour and noise and joy.", owner:"The Patel Family", species:"bird"},
  {id:"max",     emoji:"🐶", name:"Max",     breed:"Border Collie",      loc:"New York",     years:10, born:"2013-06-15", passed:"2023-10-01", candles:53, msgs:17, story:"Max understood everything. You could feel him reading the room, adjusting, deciding what you needed. He herded the whole family for ten years — gently, persistently, with absolute love.", owner:"The Riviera Family", species:"dog"},
  {id:"ginger",  emoji:"🐱", name:"Ginger",  breed:"Domestic Shorthair", loc:"Berlin",       years:8,  born:"2015-08-30", passed:"2023-06-12", candles:35, msgs:11, story:"Ginger was suspicious of everyone who wasn't us, and absolutely devoted to everyone who was. She made our flat a home the moment she arrived. The silence now is enormous.", owner:"Anya & Tobias F.", species:"cat"},
  {id:"biscuit", emoji:"🐕", name:"Biscuit", breed:"Beagle",             loc:"Mumbai",       years:13, born:"2009-04-02", passed:"2022-11-28", candles:48, msgs:15, story:"Biscuit's nose led us on more adventures than we can count. Thirteen years of stubbornness, curiosity, and the most expressive eyes we've ever seen on a creature. We'd do it all again.", owner:"Arjun & Priya M.", species:"dog"},
  {id:"daisy",   emoji:"🐱", name:"Daisy",   breed:"Persian",            loc:"Dubai",        years:6,  born:"2017-02-14", passed:"2023-03-20", candles:22, msgs:7,  story:"Daisy arrived on Valentine's Day and that felt right — she was entirely about love. Six years of soft fur and loud purring and a look she had that made you feel completely seen.", owner:"Fatima A.", species:"cat"},
  {id:"rocky",   emoji:"🐶", name:"Rocky",   breed:"German Shepherd",    loc:"Johannesburg", years:9,  born:"2013-11-05", passed:"2022-12-10", candles:31, msgs:10, story:"Rocky took his job seriously. He protected everyone and everything in his care with a calm certainty that made us all feel safe. Nine years of presence we'll never stop missing.", owner:"The Dlamini Family", species:"dog"},
  {id:"whisper", emoji:"🐈", name:"Whisper", breed:"Russian Blue",       loc:"Toronto",      years:15, born:"2007-09-03", passed:"2022-08-19", candles:88, msgs:29, story:"Fifteen years. She saw us through three homes, two children, one pandemic, and more ordinary Tuesdays than we can count. Whisper knew everything about us and loved us anyway.", owner:"The Okafor Family", species:"cat"},
];

/* ─── Memorial Detail (shared between browse and create confirmation) ─────── */
function MemorialDetail({ memorial, onBack, onCreateAnother }) {
  const M = memorial;
  const [activeTab,setActiveTab]=useState("candle");
  const [candles,setCandles]=useState([]); const [litMine,setLitMine]=useState(false);
  const [rxn,setRxn]=useState(null); const [rxnCounts,setRxnCounts]=useState({});
  const [gb,setGb]=useState(M.id==="bruno"?SAMPLE_GB:[]); const [gbAuthor,setGbAuthor]=useState(""); const [gbMsg,setGbMsg]=useState(""); const [gbSubmitted,setGbSubmitted]=useState(false);
  const [mems,setMems]=useState(M.id==="bruno"?[{date:"First day home",text:"Came home at 8 weeks and immediately stole a sock. Never gave it back."},{date:"Summer 2014",text:"First beach trip — ran straight into the waves and refused to come back for an hour."},{date:"Christmas 2022",text:"Learned to 'shake' after 12 years. Proudest day of our lives."}]:[]);
  const [mDate,setMDate]=useState(""); const [mText,setMText]=useState("");
  const [poem,setPoem]=useState(""); const [pLoad,setPLoad]=useState(false);
  const [shareUrl]=useState(`rememfur.app/memorial/${M.id}-${Math.floor(Math.random()*90000+10000)}`);
  const [copied,setCopied]=useState(false);
  const ck = `mem-${M.id}`;

  useEffect(()=>{
    ld(`${ck}-candles`).then(r=>r&&setCandles(r));
    ld(`${ck}-rxn`).then(r=>r&&setRxnCounts(r||{}));
    ld(`${ck}-gb`).then(r=>r&&setGb(g=>[...g,...(r||[])]));
    ld(`${ck}-lit`).then(r=>r&&setLitMine(true));
  },[M.id]);

  const lightCandle=async()=>{if(litMine)return;const u=[...candles,{ts:Date.now()}];setCandles(u);setLitMine(true);await sv(`${ck}-candles`,u);await sv(`${ck}-lit`,true);};
  const doRxn=async(e)=>{if(rxn===e)return;const prev=rxn;const u={...rxnCounts};if(prev)u[prev]=Math.max(0,(u[prev]||0)-1);u[e]=(u[e]||0)+1;setRxnCounts(u);setRxn(e);await sv(`${ck}-rxn`,u);};
  const addGb=async()=>{if(!gbAuthor.trim()||!gbMsg.trim())return;const e={author:gbAuthor,msg:gbMsg,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})};const u=[...gb,e];setGb(u);setGbAuthor("");setGbMsg("");setGbSubmitted(true);const stored=u.filter((_,i)=>i>=(M.id==="bruno"?SAMPLE_GB.length:0));await sv(`${ck}-gb`,stored);setTimeout(()=>setGbSubmitted(false),3000);};
  const addMem=()=>{if(!mText.trim())return;setMems(m=>[...m,{date:mDate||"A treasured moment",text:mText}]);setMDate("");setMText("");};
  const genPoem=async()=>{setPLoad(true);const born=new Date(M.born).getFullYear();const died=new Date(M.passed).getFullYear();const r=await api(`Write a short heartfelt tribute poem (4-5 stanzas) for a ${M.breed} named ${M.name} who lived ${born}–${died}. Their story: "${M.story}". Warm, personal, not generic. Just the poem.`,400);setPoem(r);setPLoad(false);};
  const copy=()=>{navigator.clipboard?.writeText(`https://${shareUrl}`).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);};
  const daysLived=Math.round((new Date(M.passed)-new Date(M.born))/86400000);
  const totalCandles=(candles.length||0)+(M.candles||0);
  const totalRxns=Object.values(rxnCounts).reduce((a,b)=>a+b,0)+(M.id!=="mine"?8:0);

  return(
    <div className="page fade">
      <button className="btn btn-ghost btn-sm" style={{marginBottom:"1.25rem"}} onClick={onBack}>← All memorials</button>

      <div className="mem-detail">
        <div className="mem-detail-avatar">{M.emoji}</div>
        <div className="mem-detail-name">{M.name}</div>
        <div style={{fontSize:".79rem",color:"var(--muted)",marginTop:".15rem"}}>{M.breed}</div>
        <div className="mem-detail-dates">{new Date(M.born).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})} — {new Date(M.passed).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
        <div style={{fontSize:".74rem",color:"var(--sage-d)",marginTop:".35rem",fontWeight:700}}>{daysLived.toLocaleString()} days of love · {M.owner}</div>
      </div>

      <div className="stat-row">
        <div className="stat">🕯️ <strong>{totalCandles}</strong> candles lit</div>
        <div className="stat">💌 <strong>{gb.length+(M.msgs||0)}</strong> messages</div>
        <div className="stat">❤️ <strong>{totalRxns}</strong> reactions</div>
        <div className="stat">📍 {M.loc}</div>
      </div>

      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",color:"var(--ink)",lineHeight:1.8,fontStyle:"italic",borderLeft:"3px solid var(--terra)",paddingLeft:"1rem",marginBottom:"1.35rem"}}>{M.story}</p>

      <div className="mem-tab-row">
        {[["candle","🕯️ Candles"],["react","❤️ React"],["guestbook","💌 Guest Book"],["timeline","🗓 Memories"],["poem","✨ AI Tribute"],["share","🔗 Share"]].map(([id,label])=>(
          <button key={id} className={`mem-tab ${activeTab===id?"act":""}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {activeTab==="candle"&&<div className="candle-wrap">
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",marginBottom:".25rem"}}>Candles burning for {M.name}</div>
        <div style={{fontSize:".78rem",color:"var(--amber-d)",marginBottom:".82rem",fontWeight:600}}>{totalCandles} light{totalCandles!==1?"s":""} burning</div>
        {totalCandles>0&&<div style={{display:"flex",flexWrap:"wrap",gap:".4rem",justifyContent:"center",marginBottom:".82rem"}}>{Array.from({length:Math.min(totalCandles,16)}).map((_,i)=><span key={i} className="candle" style={{animationDelay:`${i*.2}s`}}>🕯️</span>)}{totalCandles>16&&<span style={{fontSize:".75rem",color:"var(--muted)",alignSelf:"center"}}>+{totalCandles-16} more</span>}</div>}
        <button className={`btn ${litMine?"btn-ghost":"btn-amber"}`} onClick={lightCandle} disabled={litMine}>{litMine?"✨ Your candle is burning":"🕯️ Light a candle"}</button>
      </div>}

      {activeTab==="react"&&<div className="card">
        <div className="ct" style={{fontSize:".9rem"}}>Send your love to {M.name}</div>
        <div className="reaction-row">{RXNS.map(e=><button key={e} className={`rxn-btn ${rxn===e?"sel":""}`} onClick={()=>doRxn(e)}>{e} <span style={{fontSize:".75rem",color:"var(--muted)"}}>{rxnCounts[e]||0}</span></button>)}</div>
        {rxn&&<div style={{fontSize:".8rem",color:"var(--sage-d)",marginTop:".5rem"}}>Your {rxn} has been sent.</div>}
      </div>}

      {activeTab==="guestbook"&&<div>
        <div style={{maxHeight:"260px",overflowY:"auto",marginBottom:".75rem"}}>{gb.map((m,i)=><div key={i} className="gb-entry"><div className="gb-author">{m.author}</div><div className="gb-msg">{m.msg}</div><div className="gb-date">{m.date}</div></div>)}</div>
        {gbSubmitted&&<div className="saved" style={{marginBottom:".5rem"}}>✓ Your message has been added — thank you 🐾</div>}
        <div style={{display:"flex",flexDirection:"column",gap:".45rem"}}>
          <input className="field" placeholder="Your name" value={gbAuthor} onChange={e=>setGbAuthor(e.target.value)}/>
          <textarea className="field" rows={3} placeholder={`Share a memory or kind words for ${M.name}…`} value={gbMsg} onChange={e=>setGbMsg(e.target.value)}/>
          <button className="btn btn-sage btn-sm" style={{alignSelf:"flex-start"}} onClick={addGb} disabled={!gbAuthor.trim()||!gbMsg.trim()}>Leave a message</button>
        </div>
      </div>}

      {activeTab==="timeline"&&<div>
        {mems.length>0?<div className="tl">{mems.map((m,i)=><div key={i} className="tl-item"><div className="tl-dot"/><div className="tl-date">{m.date}</div><div className="tl-text">{m.text}</div></div>)}</div>:<p style={{fontSize:".85rem",color:"var(--muted)",fontStyle:"italic",marginBottom:"1rem"}}>No memories added yet. Be the first.</p>}
        <hr className="dv"/>
        <div style={{display:"flex",flexDirection:"column",gap:".42rem"}}>
          <input className="field" placeholder="When? (e.g. Summer 2018, First Christmas…)" value={mDate} onChange={e=>setMDate(e.target.value)}/>
          <textarea className="field" rows={2} placeholder="Describe the memory…" value={mText} onChange={e=>setMText(e.target.value)}/>
          <button className="btn btn-ghost btn-sm" style={{alignSelf:"flex-start"}} onClick={addMem}>+ Add memory</button>
        </div>
      </div>}

      {activeTab==="poem"&&<div>
        <div className="ct" style={{marginBottom:".25rem"}}>✨ AI-Written Tribute Poem</div>
        <p style={{fontSize:".8rem",color:"var(--muted)",marginBottom:".82rem"}}>A personalised poem for {M.name} — one click, forever yours.</p>
        {!poem&&<button className="btn btn-amber" onClick={genPoem} disabled={pLoad}>{pLoad?<><Spinner/>Crafting tribute…</>:"Generate tribute poem"}</button>}
        {poem&&<><div className="poem-box">{poem}</div><div style={{display:"flex",gap:".5rem",marginTop:".75rem"}}><button className="btn btn-ghost btn-sm" onClick={()=>navigator.clipboard?.writeText(poem)}>📋 Copy</button><button className="btn btn-ghost btn-sm" onClick={()=>setPoem("")}>🔄 Regenerate</button></div></>}
      </div>}

      {activeTab==="share"&&<div>
        <div className="ct" style={{marginBottom:".25rem"}}>🔗 Shareable link</div>
        <p style={{fontSize:".8rem",color:"var(--muted)",marginBottom:".75rem"}}>Share {M.name}'s memorial with family and friends — no account needed to view or leave a message.</p>
        <div className="share-box"><span className="share-url">{shareUrl}</span><button className="btn btn-sage btn-sm" onClick={copy}>{copied?"✓ Copied!":"Copy"}</button></div>
        <div style={{display:"flex",gap:".5rem",marginTop:".75rem",flexWrap:"wrap"}}>{["📧 Email","💬 Message","📘 Facebook","🐦 Twitter"].map(s=><button key={s} className="btn btn-ghost btn-sm">{s}</button>)}</div>
      </div>}

      {onCreateAnother&&<div style={{marginTop:"2rem",borderTop:"1px solid var(--border)",paddingTop:"1.5rem",textAlign:"center"}}>
        <div style={{fontSize:".85rem",color:"var(--muted)",marginBottom:".65rem"}}>Want to create another memorial?</div>
        <button className="btn btn-terra" onClick={onCreateAnother}>+ Create a new memorial</button>
      </div>}
    </div>
  );
}

/* ─── Memorial List (browse) ─────────────────────────────────────────────── */
function MemorialListView({ memorials, onSelect, onCreate }) {
  const [search,setSearch]=useState("");
  const [species,setSpecies]=useState("all");
  const [sort,setSort]=useState("recent");

  const filtered = (memorials||ALL_MEMORIALS).filter(m=>{
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.loc.toLowerCase().includes(search.toLowerCase()) || m.breed.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = species==="all" || m.species===species;
    return matchSearch && matchSpecies;
  }).sort((a,b)=>{
    if(sort==="candles") return b.candles-a.candles;
    if(sort==="messages") return b.msgs-a.msgs;
    return new Date(b.passed)-new Date(a.passed);
  });

  return(
    <div className="page fade">
      <div className="ph">
        <div className="ph-eye">Memorials</div>
        <h1 className="ph-title">A place where<br/><em>they still live.</em></h1>
        <p className="ph-desc">Browse memorials created by pet parents around the world. Light a candle, leave a message, or share in the love.</p>
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:".65rem",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap"}}>
        <button className="btn btn-terra" style={{flexShrink:0}} onClick={onCreate}>+ Create a memorial</button>
        <input className="field" style={{flex:1,minWidth:"160px",fontSize:".82rem"}} placeholder="Search by name, city, or breed…" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1.25rem",alignItems:"center"}}>
        <span style={{fontSize:".72rem",color:"var(--muted)",marginRight:".2rem"}}>Species:</span>
        {[["all","All"],["dog","🐕 Dogs"],["cat","🐈 Cats"],["bird","🐦 Birds"],["other","🐾 Other"]].map(([v,l])=>(
          <button key={v} className={`btn btn-xs ${species===v?"btn-sage":"btn-ghost"}`} onClick={()=>setSpecies(v)}>{l}</button>
        ))}
        <span style={{fontSize:".72rem",color:"var(--muted)",marginLeft:".5rem",marginRight:".2rem"}}>Sort:</span>
        {[["recent","Most recent"],["candles","Most candles"],["messages","Most messages"]].map(([v,l])=>(
          <button key={v} className={`btn btn-xs ${sort===v?"btn-sage":"btn-ghost"}`} onClick={()=>setSort(v)}>{l}</button>
        ))}
      </div>

      {/* Results count */}
      <div style={{fontSize:".74rem",color:"var(--muted)",marginBottom:"1rem"}}>{filtered.length} memorial{filtered.length!==1?"s":""} {search?`matching "${search}"`:"found"}</div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem"}}>
        {filtered.map((m,i)=>{
          const daysLived=Math.round((new Date(m.passed)-new Date(m.born))/86400000);
          return(
            <div key={m.id} className="card fade" style={{padding:0,overflow:"hidden",cursor:"pointer",animationDelay:`${i*.04}s`,transition:"all .22s"}} onClick={()=>onSelect(m)}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
              <div style={{background:"linear-gradient(135deg,var(--sage-l),var(--amber-l))",height:"90px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.5rem",borderBottom:"1px solid var(--border)"}}>
                {m.emoji}
              </div>
              <div style={{padding:".9rem 1rem"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.12rem",color:"var(--ink)",marginBottom:".1rem"}}>{m.name}</div>
                <div style={{fontSize:".7rem",color:"var(--muted)",marginBottom:".55rem"}}>{m.breed} · {m.loc}</div>
                <div style={{fontSize:".7rem",color:"var(--muted)",marginBottom:".55rem"}}>{new Date(m.born).getFullYear()} — {new Date(m.passed).getFullYear()} · {Math.round(daysLived/365)} years loved</div>
                <div style={{display:"flex",gap:".55rem",fontSize:".7rem",color:"var(--ink2)",borderTop:"1px solid var(--border)",paddingTop:".55rem"}}>
                  <span>🕯️ {m.candles}</span>
                  <span>💌 {m.msgs}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length===0&&<div style={{textAlign:"center",padding:"3rem 1rem",color:"var(--muted)"}}>
        <div style={{fontSize:"2rem",marginBottom:".75rem"}}>🔍</div>
        <div style={{fontSize:".9rem"}}>No memorials match your search.</div>
        <button className="btn btn-ghost btn-sm" style={{marginTop:".75rem"}} onClick={()=>{setSearch("");setSpecies("all");}}>Clear filters</button>
      </div>}

      <div style={{marginTop:"2rem",background:"linear-gradient(135deg,var(--terra-l),var(--amber-l))",borderRadius:"var(--r)",padding:"1.5rem",textAlign:"center",border:"1px solid rgba(192,120,80,.2)"}}>
        <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>🕯️</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",color:"var(--ink)",marginBottom:".4rem"}}>Create a memorial for your pet</div>
        <div style={{fontSize:".83rem",color:"var(--muted)",marginBottom:"1rem"}}>Free forever. A page where their memory lives — for family, for friends, for you.</div>
        <button className="btn btn-terra" onClick={onCreate}>+ Create a free memorial</button>
      </div>
    </div>
  );
}

/* ─── Create Memorial Flow ───────────────────────────────────────────────── */
function CreateMemorialView({ onDone, onBack }) {
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:"",emoji:"🐶",breed:"",born:"",passed:"",owner:"",story:"",memory1:"",memory2:""});
  const [created,setCreated]=useState(null);
  const [aiStory,setAiStory]=useState(""); const [aiLoad,setAiLoad]=useState(false);
  const EMOJIS=["🐶","🐱","🐰","🐹","🐦","🐠","🐢","🐴","🦜","🐇","🐈","🐕","🦎","🐓","🐩","🦊","🐻","🐼"];
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Their details","Their story","Preview","Done"];

  const genStory=async()=>{
    if(!form.name||!form.breed)return; setAiLoad(true);
    const r=await api(`Write a warm, personal, 3-sentence tribute for a ${form.breed} named ${form.name}. ${form.memory1?`A memory: "${form.memory1}".`:""} ${form.memory2?`Another memory: "${form.memory2}".`:""} Write in the first person plural ("we", "our"). Warm, specific, not generic.`,300);
    setAiStory(r); setAiLoad(false);
  };

  const publish=async()=>{
    const finalStory=form.story.trim()||aiStory;
    const mem={
      id:"mine",emoji:form.emoji,name:form.name,breed:form.breed||"Beloved pet",
      loc:"",born:form.born||"2010-01-01",passed:form.passed||"2024-01-01",
      story:finalStory||`${form.name} was loved deeply and will be forever remembered.`,
      owner:form.owner||"Their family",candles:1,msgs:0,species:"dog"
    };
    await sv("my-memorial",mem);
    setCreated(mem); setStep(4);
  };

  const bornYear = form.born ? new Date(form.born).getFullYear() : "—";
  const passedYear = form.passed ? new Date(form.passed).getFullYear() : "—";
  const daysLived = (form.born&&form.passed) ? Math.round((new Date(form.passed)-new Date(form.born))/86400000) : null;

  if(step===4&&created) return <MemorialDetail memorial={created} onBack={()=>onDone(created)} onCreateAnother={()=>{setStep(1);setForm({name:"",emoji:"🐶",breed:"",born:"",passed:"",owner:"",story:"",memory1:"",memory2:""});setCreated(null);setAiStory("");}}/>;

  return(
    <div className="page fade">
      <button className="btn btn-ghost btn-sm" style={{marginBottom:"1.25rem"}} onClick={step===1?onBack:()=>setStep(s=>s-1)}>← {step===1?"All memorials":"Back"}</button>

      {/* Progress */}
      <div style={{display:"flex",gap:".5rem",alignItems:"center",marginBottom:"1.75rem"}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:".4rem"}}>
            <div style={{width:"24px",height:"24px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",fontWeight:700,background:i+1<step?"var(--sage)":i+1===step?"var(--terra)":"var(--bg2)",color:i+1<=step?"#fff":"var(--muted)",flexShrink:0,transition:"all .3s"}}>{i+1<step?"✓":i+1}</div>
            <span style={{fontSize:".74rem",color:i+1===step?"var(--terra-d)":i+1<step?"var(--sage-d)":"var(--muted)",fontWeight:i+1===step?700:400,whiteSpace:"nowrap"}}>{s}</span>
            {i<steps.length-1&&<div style={{width:"20px",height:"1px",background:"var(--border)",flexShrink:0}}/>}
          </div>
        ))}
      </div>

      {/* Step 1: Their details */}
      {step===1&&<>
        <div className="ph">
          <div className="ph-eye">Step 1 of 3</div>
          <h1 className="ph-title">Tell us about <em>who they were.</em></h1>
          <p className="ph-desc">Just the basics. You can add more later.</p>
        </div>

        <div style={{marginBottom:"1.1rem"}}>
          <div style={{fontSize:".74rem",color:"var(--ink2)",fontWeight:700,marginBottom:".5rem"}}>Choose their emoji</div>
          <div className="emoji-row">{EMOJIS.map(e=><button key={e} className={`eo ${form.emoji===e?"s":""}`} onClick={()=>sf("emoji",e)}>{e}</button>)}</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:".65rem",marginBottom:"1.35rem"}}>
          <div>
            <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Their name *</label>
            <input className="field" placeholder="e.g. Bruno, Mia, Max…" value={form.name} onChange={e=>sf("name",e.target.value)}/>
          </div>
          <div>
            <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Breed or species</label>
            <input className="field" placeholder="e.g. Labrador Retriever, Siamese, Holland Lop…" value={form.breed} onChange={e=>sf("breed",e.target.value)}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".65rem"}}>
            <div>
              <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Date of birth</label>
              <input className="field" type="date" value={form.born} onChange={e=>sf("born",e.target.value)}/>
            </div>
            <div>
              <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Date they passed</label>
              <input className="field" type="date" value={form.passed} onChange={e=>sf("passed",e.target.value)}/>
            </div>
          </div>
          <div>
            <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Your name or family name (shown on the memorial)</label>
            <input className="field" placeholder="e.g. The Johnson Family, Emma & Tom…" value={form.owner} onChange={e=>sf("owner",e.target.value)}/>
          </div>
        </div>

        <button className="btn btn-terra" onClick={()=>setStep(2)} disabled={!form.name.trim()}>Continue →</button>
      </>}

      {/* Step 2: Their story */}
      {step===2&&<>
        <div className="ph">
          <div className="ph-eye">Step 2 of 3</div>
          <h1 className="ph-title">Tell us their <em>story.</em></h1>
          <p className="ph-desc">This is the heart of their memorial. Write whatever feels true — a paragraph is plenty.</p>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:".65rem",marginBottom:"1.1rem"}}>
          <div>
            <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Share a memory (optional — helps the AI)</label>
            <input className="field" placeholder={`Something only you'd know about ${form.name||"them"}…`} value={form.memory1} onChange={e=>sf("memory1",e.target.value)}/>
          </div>
          <div>
            <input className="field" placeholder="Another memory (optional)…" value={form.memory2} onChange={e=>sf("memory2",e.target.value)}/>
          </div>
        </div>

        <div style={{display:"flex",gap:".5rem",marginBottom:"1rem",alignItems:"center",flexWrap:"wrap"}}>
          <button className="btn btn-ghost btn-sm" onClick={genStory} disabled={aiLoad||!form.name}>{aiLoad?<><Spinner/>Writing…</>:"✨ Write it for me with AI"}</button>
          {aiStory&&<span style={{fontSize:".72rem",color:"var(--sage-d)"}}>✓ Draft ready below</span>}
        </div>

        {aiStory&&<div className="ai-box" style={{marginBottom:".75rem"}}>{aiStory}<div style={{marginTop:".5rem"}}><button className="btn btn-ghost btn-xs" onClick={()=>{sf("story",aiStory);setAiStory("");}}>Use this →</button></div></div>}

        <div>
          <label style={{fontSize:".74rem",fontWeight:700,color:"var(--ink2)",display:"block",marginBottom:".28rem"}}>Their tribute *</label>
          <textarea className="field" rows={6} placeholder={`Write about ${form.name||"them"} — their personality, your favourite moments, what they meant to you…`} value={form.story} onChange={e=>sf("story",e.target.value)}/>
        </div>

        <div style={{display:"flex",gap:".5rem",marginTop:"1.1rem"}}>
          <button className="btn btn-terra" onClick={()=>setStep(3)} disabled={!form.story.trim()&&!aiStory}>Preview memorial →</button>
        </div>
        <p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".45rem",fontStyle:"italic"}}>You can edit this any time after publishing.</p>
      </>}

      {/* Step 3: Preview */}
      {step===3&&<>
        <div className="ph">
          <div className="ph-eye">Step 3 of 3</div>
          <h1 className="ph-title">Here's <em>{form.name}'s</em> memorial.</h1>
          <p className="ph-desc">This is exactly how it will appear. Publish when you're ready.</p>
        </div>

        <div className="mem-detail">
          <div className="mem-detail-avatar">{form.emoji}</div>
          <div className="mem-detail-name">{form.name}</div>
          <div style={{fontSize:".79rem",color:"var(--muted)",marginTop:".15rem"}}>{form.breed||"Beloved pet"}</div>
          <div className="mem-detail-dates">
            {form.born?new Date(form.born).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}):"—"} — {form.passed?new Date(form.passed).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}):"—"}
          </div>
          {daysLived&&<div style={{fontSize:".74rem",color:"var(--sage-d)",marginTop:".35rem",fontWeight:700}}>{daysLived.toLocaleString()} days of love · {form.owner||"Their family"}</div>}
        </div>

        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",color:"var(--ink)",lineHeight:1.8,fontStyle:"italic",borderLeft:"3px solid var(--terra)",paddingLeft:"1rem",marginBottom:"1.35rem"}}>
          {form.story||aiStory||`${form.name} was loved deeply and will be forever remembered.`}
        </p>

        <div className="card card-sage" style={{marginBottom:"1.1rem"}}>
          <div style={{fontSize:".8rem",color:"var(--sage-d)",lineHeight:1.6}}>
            ✓ Your memorial will be live instantly<br/>
            ✓ Anyone with the link can visit, light a candle, or leave a message<br/>
            ✓ You can edit or add memories any time<br/>
            ✓ Free forever
          </div>
        </div>

        <div style={{display:"flex",gap:".65rem",flexWrap:"wrap"}}>
          <button className="btn btn-terra" style={{fontSize:".9rem",padding:".62rem 1.5rem"}} onClick={publish}>🕯️ Publish {form.name}'s memorial</button>
          <button className="btn btn-ghost" onClick={()=>setStep(2)}>← Edit story</button>
        </div>
      </>}
    </div>
  );
}

/* ─── VIEW: Remember — master router ─────────────────────────────────────── */
function RememberView({ initialMode, onModeChange }) {
  const [mode,setMode]=useState(initialMode||"list"); // "list" | "detail" | "create"
  const [selectedMem,setSelectedMem]=useState(null);
  const [userMem,setUserMem]=useState(null);

  useEffect(()=>{ setMode(initialMode||"list"); setSelectedMem(null); },[initialMode]);
  useEffect(()=>{ld("my-memorial").then(r=>r&&setUserMem(r));},[]);

  const openDetail=(mem)=>{setSelectedMem(mem);setMode("detail");onModeChange&&onModeChange("detail");};
  const openCreate=()=>{setMode("create");onModeChange&&onModeChange("create");};
  const backToList=()=>{setMode("list");setSelectedMem(null);onModeChange&&onModeChange("list");};
  const onCreated=(mem)=>{setUserMem(mem);setSelectedMem(mem);setMode("detail");onModeChange&&onModeChange("detail");};

  const allWithUser = userMem ? [{...userMem,owner:userMem.owner||"You",candles:1,msgs:0},...ALL_MEMORIALS] : ALL_MEMORIALS;

  if(mode==="detail"&&selectedMem) return <MemorialDetail memorial={selectedMem} onBack={backToList} onCreateAnother={openCreate}/>;
  if(mode==="create") return <CreateMemorialView onDone={onCreated} onBack={backToList}/>;
  return <MemorialListView memorials={allWithUser} onSelect={openDetail} onCreate={openCreate}/>;
}

/* ─── VIEW: My Grief Journey ─────────────────────────────────────────────── */
function GriefJourneyView({pet,setPet,stage,setStage,journeyStarted,setJourneyStarted}) {
  const [step,setStep]=useState((pet||journeyStarted)?"dashboard":"welcome");

  useEffect(()=>{ window.scrollTo({top:0,behavior:"instant"}); },[]);
  const [wantsPet,setWantsPet]=useState(null);
  const [dPet,setDP]=useState({name:"",emoji:"🐶",breed:"",born:"",passed:""});
  const [dStage,setDS]=useState(stage||null);
  const [activeTool,setActiveTool]=useState(null);
  const [mood,setMood]=useState(null);
  const [showSM,setShowSM]=useState(false);
  const EMOJIS=["🐶","🐱","🐰","🐹","🐦","🐠","🐢","🐴","🦜","🐇","🐈","🐕","🦎","🐓"];
  const setP=(k,v)=>setDP(p=>({...p,[k]:v}));
  const cs=STAGES.find(x=>x.id===stage)||STAGES[0];

  const finish=async()=>{const fp=wantsPet&&dPet.name.trim()?dPet:null;const fs=dStage||"raw";if(fp){await sv("gj-pet",fp);setPet(fp);}await sv("gj-stage",fs);setStage(fs);await sv("gj-started",true);if(setJourneyStarted)setJourneyStarted(true);setStep("dashboard");};
  const pn=pet?.name||"them";
  const daysLived=pet?.born&&pet?.passed?Math.round((new Date(pet.passed)-new Date(pet.born))/86400000):null;
  const MOODS=["😔 Heavy","😐 Numb","🌤 Okay-ish","💛 Grateful today"];
  const MREPLY={"😔 Heavy":"That's okay. Today is just about existing.","😐 Numb":"Numbness is its own kind of protection. Be gentle with yourself.","🌤 Okay-ish":"You're allowed to feel okay. The grief and the okay live alongside each other.","💛 Grateful today":`Gratitude and grief share the same space. ${pn} gave you something real.`};

  if(activeTool) return <HealingTool id={activeTool} pet={pet} onBack={()=>setActiveTool(null)}/>;

  if(step==="welcome") return(
    <div className="gj-wrap"><div className="gj-inner fade">
      <div style={{fontSize:"2.4rem",marginBottom:".82rem"}}>🕯️</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.95rem",color:"var(--ink)",lineHeight:1.15,marginBottom:".6rem"}}>My Grief Journey</div>
      <p style={{fontSize:".88rem",color:"var(--muted)",lineHeight:1.75,marginBottom:"2rem"}}>A private, gentle space built for pet loss. Eight tools for the real emotional territory — the guilt, the firsts, the need to write to them. Go at your own pace. Nothing here expires.</p>
      <button className="btn btn-sage" style={{width:"100%",justifyContent:"center",fontSize:".9rem",padding:".68rem"}} onClick={()=>setStep("stage")}>I'm ready to begin</button>
      <p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".72rem",fontStyle:"italic",textAlign:"center"}}>We'll start by asking one question. Just one.</p>
    </div></div>
  );

  if(step==="stage") return(
    <div className="gj-wrap"><div className="gj-inner fade">
      <div style={{fontSize:".63rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--sage)",fontWeight:700,marginBottom:".45rem"}}>Step 1 of 2</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.65rem",color:"var(--ink)",marginBottom:".48rem",lineHeight:1.15}}>Where are you<br/>in your grief today?</div>
      <p style={{fontSize:".83rem",color:"var(--muted)",marginBottom:"1.4rem"}}>This shapes everything. You can update it any time — grief is not linear.</p>
      {STAGES.map(st=><button key={st.id} className={`gj-stage-opt ${dStage===st.id?"sel":""}`} onClick={()=>setDS(st.id)}><span className="gj-moon">{st.moon}</span><div><span className="gj-sname">{st.name}</span><span className="gj-sdesc">{st.desc}</span></div></button>)}
      <button className="btn btn-sage" style={{width:"100%",justifyContent:"center",marginTop:"1rem"}} onClick={()=>dStage&&setStep("petq")} disabled={!dStage}>Continue</button>
      <div className="prog" style={{marginTop:"1.2rem"}}>{[1,2].map(i=><div key={i} className={`pd ${i===1?"done":""}`} style={{flex:i===1?2:1}}/>)}</div>
    </div></div>
  );

  if(step==="petq") return(
    <div className="gj-wrap"><div className="gj-inner fade">
      <div style={{fontSize:".63rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--sage)",fontWeight:700,marginBottom:".45rem"}}>Step 2 of 2</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.65rem",color:"var(--ink)",marginBottom:".48rem",lineHeight:1.15}}>Would you like to tell us<br/>about who you lost?</div>
      <p style={{fontSize:".83rem",color:"var(--muted)",marginBottom:"1.4rem"}}>Everything personalises around their name — affirmations, letters, poems. Completely optional. The tools work either way.</p>
      <div style={{display:"flex",flexDirection:"column",gap:".55rem",marginBottom:"1.2rem"}}>
        <button className={`gj-stage-opt ${wantsPet===true?"sel":""}`} onClick={()=>setWantsPet(true)} style={{padding:".82rem 1.05rem"}}><span className="gj-moon">🐾</span><div><span className="gj-sname">Yes — I'd like to tell you about them</span><span className="gj-sdesc">Makes everything more personal</span></div></button>
        <button className={`gj-stage-opt ${wantsPet===false?"sel":""}`} onClick={()=>setWantsPet(false)} style={{padding:".82rem 1.05rem"}}><span className="gj-moon">🌿</span><div><span className="gj-sname">Not right now — just get me started</span><span className="gj-sdesc">You can add this any time</span></div></button>
      </div>
      {wantsPet&&<><div className="emoji-row">{EMOJIS.map(e=><button key={e} className={`eo ${dPet.emoji===e?"s":""}`} onClick={()=>setP("emoji",e)}>{e}</button>)}</div><div style={{display:"flex",flexDirection:"column",gap:".45rem"}}><input className="field" placeholder="Their name" value={dPet.name} onChange={e=>setP("name",e.target.value)}/><input className="field" placeholder="Breed or species (optional)" value={dPet.breed} onChange={e=>setP("breed",e.target.value)}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".45rem"}}><input className="field" type="date" title="Date of birth" value={dPet.born} onChange={e=>setP("born",e.target.value)}/><input className="field" type="date" title="Date passed" value={dPet.passed} onChange={e=>setP("passed",e.target.value)}/></div></div></>}
      <button className="btn btn-sage" style={{width:"100%",justifyContent:"center",marginTop:"1.2rem"}} onClick={finish} disabled={wantsPet===null||(wantsPet&&!dPet.name.trim())}>{wantsPet&&dPet.name?`Enter ${dPet.name}'s space →`:"Begin my journey →"}</button>
      <div className="prog" style={{marginTop:"1.2rem"}}>{[1,2].map(i=><div key={i} className="pd done" style={{flex:1}}/>)}</div>
    </div></div>
  );

  /* Dashboard */
  return(
    <div className="page fade">
      {showSM&&<div className="modal-bg" onClick={()=>setShowSM(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.38rem",color:"var(--ink)",marginBottom:"1rem"}}>Where are you today?</div>
        {STAGES.map(st=><button key={st.id} className={`gj-stage-opt ${stage===st.id?"sel":""}`} onClick={async()=>{setStage(st.id);await sv("gj-stage",st.id);setShowSM(false);}}><span className="gj-moon">{st.moon}</span><div><span className="gj-sname">{st.name}</span><span className="gj-sdesc">{st.desc}</span></div></button>)}
      </div></div>}

      <div className="ph">
        <div className="ph-eye">{cs.moon} My Grief Journey {pet?`· ${pet.emoji} ${pet.name}`:""}</div>
        <h1 className="ph-title" style={{fontSize:"1.65rem"}}>{GREETING[stage]||GREETING.raw}</h1>
        <button className="btn btn-ghost btn-xs" style={{marginTop:".5rem"}} onClick={()=>setShowSM(true)}>Update where I am ↻</button>
      </div>

      <div className="card card-sage">
        <div className="ct" style={{fontSize:".88rem"}}>How are you feeling right now?</div>
        <div className="mood-row">{MOODS.map(m=><button key={m} className={`mood-btn ${mood===m?"sel":""}`} onClick={()=>setMood(m)}>{m}</button>)}</div>
        {mood&&<div style={{fontSize:".79rem",color:"var(--sage-d)",marginTop:".38rem"}}>{MREPLY[mood]}</div>}
      </div>

      {daysLived&&<div className="card"><div className="ct">💛 A life in numbers</div><div className="cs">The love lived in every single one of these.</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))",gap:".62rem"}}><div className="num-card"><div className="num-big">{(daysLived/365).toFixed(1)}</div><div className="num-label">years of love</div></div><div className="num-card"><div className="num-big">{daysLived.toLocaleString()}</div><div className="num-label">days you gave them</div></div><div className="num-card"><div className="num-big">{(daysLived*2).toLocaleString()}</div><div className="num-label">meals given with love</div></div></div></div>}

      <div style={{marginBottom:".48rem"}}><div style={{fontSize:".62rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--sage)",fontWeight:700,marginBottom:".82rem"}}>Your grief tools</div>
        <div className="tool-grid">{TOOLS.map(t=>{const ul=cs.unlock.includes(t.id);return(<button key={t.id} className={`tool-pill ${ul?"":"locked"}`} onClick={()=>ul&&setActiveTool(t.id)}><span className="tp-icon">{t.icon}</span><span className="tp-name">{t.name}</span><span className="tp-sub">{ul?t.sub:"Unlocks as you're ready"}</span></button>);})}</div>
        <p style={{fontSize:".72rem",color:"var(--muted)",fontStyle:"italic"}}>More tools unlock as your grief evolves. No rush.</p>
      </div>

      {!pet&&<div className="card card-terra" style={{marginTop:"1rem"}}><div className="ct" style={{fontSize:".88rem"}}>Want to add your pet's details?</div><div className="cs">Makes your affirmations, letters, and poems personal — whenever you feel ready.</div><button className="btn btn-terra btn-sm" onClick={()=>setStep("petq")}>Add their details</button></div>}
    </div>
  );
}

/* ─── VIEW: Community ────────────────────────────────────────────────────── */
function CommunityView() {
  const [tab,setTab]=useState("wall");
  const [posts,setPosts]=useState(SEED_POSTS);
  const [liked,setLiked]=useState({});
  const [myPost,setMyPost]=useState(""); const [myLoc,setMyLoc]=useState(""); const [posted,setPosted]=useState(false);
  const PROMPTS=["What's one thing your pet did that you'll never stop smiling about?","If they could send you one message right now, what do you think it would say?","What routine did they make better just by being in it?","Describe their personality in three words — then one sentence.","What did loving them teach you about love itself?"];
  const today=PROMPTS[new Date().getDay()%PROMPTS.length];
  const addPost=()=>{if(!myPost.trim())return;setPosts(p=>[{emoji:"🐾",name:"You",pet:"your pet",loc:myLoc||"",text:myPost,likes:0,time:"just now"},...p]);setMyPost("");setMyLoc("");setPosted(true);setTimeout(()=>setPosted(false),3000);};

  return(
    <div className="page fade">
      <div className="ph"><div className="ph-eye">Community</div><h1 className="ph-title">You are not <em>alone in this.</em></h1><p className="ph-desc">A quiet, kind corner. Real people, real loss, real love.</p></div>
      <div style={{display:"flex",gap:".42rem",flexWrap:"wrap",marginBottom:"1.2rem"}}>
        {["wall","prompt","peer"].map(t=><button key={t} className={`btn btn-sm ${tab===t?"btn-sage":"btn-ghost"}`} onClick={()=>setTab(t)}>{t==="wall"?"Memory Wall":t==="prompt"?"Today's Prompt":"Same-Day Match"}</button>)}
      </div>
      {tab==="wall"&&<><div className="card card-sage"><div className="ct" style={{fontSize:".88rem"}}>Share a memory with the community</div><div className="cs">Anonymous. Moderated. Safe. One moment — something only you noticed about them.</div><textarea className="field" rows={3} placeholder="Write here…" value={myPost} onChange={e=>setMyPost(e.target.value)}/><div style={{display:"flex",gap:".5rem",marginTop:".52rem",alignItems:"center"}}><button className="btn btn-sage btn-sm" onClick={addPost} disabled={!myPost.trim()}>Share</button>{posted&&<Saved/>}</div></div>{posts.map((p,i)=><div key={i} className="post-card fade" style={{animationDelay:`${i*.06}s`}}><div className="post-avatar">{p.emoji}</div><div style={{flex:1}}><div><span className="post-author">{p.name}</span>{p.loc&&<span className="post-loc">· {p.loc}</span>}<span style={{fontSize:".66rem",color:"var(--muted)",marginLeft:".3rem"}}>in memory of {p.pet}</span></div><div className="post-text">{p.text}</div><div className="post-meta"><span>{p.time}</span><button className={`heart-btn ${liked[i]?"liked":""}`} onClick={()=>setLiked(l=>({...l,[i]:!l[i]}))}>{liked[i]?"❤️":"🤍"} {p.likes+(liked[i]?1:0)}</button></div></div></div>)}</>}
      {tab==="prompt"&&<><div className="dp-banner"><div className="dp-label">Today's prompt · Changes daily</div><div className="dp-q">"{today}"</div></div><div className="card"><div className="cs">Your answer goes to the memory wall — anonymous by default.</div><textarea className="field" rows={4} placeholder="Your answer…" value={myPost} onChange={e=>setMyPost(e.target.value)}/><div style={{display:"flex",gap:".5rem",alignItems:"center",marginTop:".62rem"}}><button className="btn btn-sage btn-sm" onClick={addPost} disabled={!myPost.trim()}>Share</button>{posted&&<Saved/>}</div></div>{posts.slice(0,2).map((p,i)=><div key={i} className="post-card"><div className="post-avatar">{p.emoji}</div><div style={{flex:1}}><div className="post-author">{p.name}</div><div className="post-text">{p.text}</div></div></div>)}</>}
      {tab==="peer"&&<><div className="card card-sage"><div className="ct">🤝 The Same-Day Match</div><div className="cs">We anonymously connect you with one other pet parent on the same numbered day of grief. One message each. No thread, no pressure — just the knowledge that someone else is exactly where you are right now.</div><div style={{display:"flex",gap:".5rem",marginTop:".25rem"}}><input className="field" type="number" placeholder="Days since they passed" style={{maxWidth:"180px"}}/><button className="btn btn-sage btn-sm">Find my match</button></div></div><div className="card card-amber"><div style={{fontSize:"1.2rem",marginBottom:".4rem"}}>💬</div><div className="ct" style={{fontSize:".9rem"}}>Sample match (Day 12)</div><div style={{fontSize:".86rem",color:"var(--ink2)",fontStyle:"italic",lineHeight:1.6,marginTop:".35rem"}}>"I keep forgetting she's gone and then remembering all over again. It hits like the first time, every time. I don't know when that stops. But I'm glad someone else is on Day 12 tonight too."</div><div style={{fontSize:".72rem",color:"var(--muted)",marginTop:".5rem"}}>— Anonymous · in memory of Luna</div></div></>}
    </div>
  );
}


/* ─── VIEW: Send a Gesture ─────────────────────────────────────────────────── */
function GestureView() {
  const [step,setStep]=useState(0); // 0=intro, 1,2,3=questions, 4=results
  const [ans,setAns]=useState({});
  const [sent,setSent]=useState({});

  const Q = [
    {
      id:"relation",
      q:"How well do you know the person grieving?",
      sub:"This helps us get the tone right — what feels natural between close friends is different from a colleague.",
      opts:[
        {val:"close",  icon:"🤗", label:"Very close friend or family", desc:"Someone I talk to regularly"},
        {val:"good",   icon:"🙂", label:"Good friend",                 desc:"We're close but not in constant touch"},
        {val:"colleague",icon:"👋",label:"Colleague or acquaintance",  desc:"We know each other but aren't close"},
      ]
    },
    {
      id:"timing",
      q:"Where do you think they are right now?",
      sub:"Grief changes a lot in the first weeks. The right gesture at the wrong moment can land differently than you intend.",
      opts:[
        {val:"raw",    icon:"🌑", label:"It just happened",           desc:"Within the past week or two"},
        {val:"weeks",  icon:"🌒", label:"A few weeks in",             desc:"The initial shock has settled a little"},
        {val:"ongoing",icon:"🌓", label:"Getting through it",         desc:"Months in — still carrying it"},
      ]
    },
    {
      id:"intent",
      q:"What do you want them to feel when they receive it?",
      sub:"The best gestures send one clear message. Pick what feels most true.",
      opts:[
        {val:"cared",    icon:"🫂", label:"Cared for",              desc:"I see you. I'm thinking of you."},
        {val:"practical",icon:"🍱", label:"Practically supported",  desc:"Here's something useful. You don't have to do anything."},
        {val:"notalone", icon:"🕯️", label:"Not alone",             desc:"Other people loved them too. You're surrounded."},
        {val:"gentle",   icon:"🌿", label:"Gently held",            desc:"No pressure. Just a quiet reminder I'm here."},
      ]
    },
  ];

  const GESTURES = [
    {
      id:"meal",
      icon:"🍱",
      title:"Send a meal delivery credit",
      desc:"A Swiggy or Zomato credit sent directly to their phone. No planning, no cooking on a hard day. The message it sends: \"I didn't know what to say, so I made sure you didn't have to cook tonight.\"",
      effort:"Instant · Digital only",
      badge:"Most practical",
      badgeStyle:"gest-badge-amber",
      cta:"Send a meal credit",
      show:({intent,timing})=> intent==="practical" || timing==="raw",
    },
    {
      id:"donation",
      icon:"🌱",
      title:"Donate in their pet's name",
      desc:"A donation to an animal welfare organisation, with a personalised certificate sent to the griever. It honours the pet without forcing them to engage with loss on your timeline.",
      effort:"Instant · Certificate delivered digitally",
      badge:"Deeply meaningful",
      badgeStyle:"gest-badge",
      cta:"Make a donation",
      show:({intent,relation})=> intent==="notalone" || relation==="close" || relation==="good",
    },
    {
      id:"memories",
      icon:"📖",
      title:"Start a shared memory page",
      desc:"You open a private page, share a link with others who knew the pet, and everyone writes one memory or message. The griever receives access whenever they feel ready — no pressure to open it.",
      effort:"Pure software · No logistics",
      badge:"Most unique",
      badgeStyle:"gest-badge",
      cta:"Start a memory page",
      show:({relation,intent})=> relation==="close" || intent==="notalone",
    },
    {
      id:"card",
      icon:"💌",
      title:"Send a handwritten card",
      desc:"One beautiful printed card mailed to their address. You write the message — we print and post it. The card doesn't have to mention the pet at all. It just says someone is thinking of them.",
      effort:"Ships in 2–3 days",
      badge:"Timeless",
      badgeStyle:"gest-badge",
      cta:"Send a card",
      show:({relation,timing})=> relation!=="colleague" || timing!=="raw",
    },
    {
      id:"unlock",
      icon:"🕯️",
      title:"Gift the grief companion",
      desc:"Unlock RememFur's full grief journey for them — anonymously if you prefer. They receive a gentle notification: \"Someone who loves you left something here. Open it whenever you're ready.\" No pressure. No trigger.",
      effort:"Instant · Private",
      badge:"Gentle & private",
      badgeStyle:"gest-badge",
      cta:"Gift the companion",
      show:({intent,timing})=> intent==="gentle" || intent==="notalone" || timing==="ongoing",
    },
    {
      id:"selfcare",
      icon:"🛁",
      title:"Gift a self-care session",
      desc:"A home spa or massage credit via Urban Company or a local partner. Grief lives in the body. This sends the message: take care of yourself — not as a reminder of loss, but as simple, practical love.",
      effort:"Digital voucher · Instant",
      badge:"Practical care",
      badgeStyle:"gest-badge-amber",
      cta:"Send a self-care credit",
      show:({intent,timing})=> intent==="practical" || intent==="cared" || timing==="ongoing",
    },
  ];

  const results = step===4 ? GESTURES.filter(g=>g.show(ans)).slice(0,3) : [];

  const pick=(qid,val)=>{
    const next={...ans,[qid]:val};
    setAns(next);
    setTimeout(()=>{
      if(step<3) setStep(s=>s+1);
      else setStep(4);
    }, 220);
  };

  if(step===0) return(
    <div className="gest-wrap fade">
      <div className="gest-inner" style={{textAlign:"center"}}>
        <div style={{fontSize:"2.5rem",marginBottom:".75rem"}}>🎁</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:"var(--ink)",lineHeight:1.15,marginBottom:".65rem"}}>Support a friend<br/>who is grieving.</div>
        <p style={{fontSize:".9rem",color:"var(--muted)",lineHeight:1.75,maxWidth:"420px",margin:"0 auto 2rem"}}>Not sure what to do or say? We'll ask you three questions and suggest exactly the right gesture — something that feels considered, not generic, and doesn't accidentally make things harder.</p>
        <button className="btn btn-sage" style={{fontSize:".92rem",padding:".68rem 2rem"}} onClick={()=>setStep(1)}>Help me find the right gesture →</button>
        <p style={{fontSize:".72rem",color:"var(--muted)",marginTop:".75rem",fontStyle:"italic"}}>Three questions · Takes under a minute</p>
      </div>
    </div>
  );

  if(step>=1&&step<=3) {
    const q=Q[step-1];
    return(
      <div className="gest-wrap fade">
        <div className="gest-inner">
          <div className="gest-prog">
            {[1,2,3].map(i=><div key={i} className={`gest-pd ${i<step?"done":i===step?"active":""}`}/>)}
          </div>
          <div style={{fontSize:".63rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--sage)",fontWeight:700,marginBottom:".5rem"}}>Question {step} of 3</div>
          <div className="gest-q">{q.q}</div>
          <div className="gest-sub">{q.sub}</div>
          <div className="gest-opts">
            {q.opts.map(o=>(
              <button key={o.val} className={`gest-opt ${ans[q.id]===o.val?"sel":""}`} onClick={()=>pick(q.id,o.val)}>
                <span className="gest-opt-icon">{o.icon}</span>
                <span className="gest-opt-text">
                  <span className="gest-opt-label">{o.label}</span>
                  <span className="gest-opt-desc">{o.desc}</span>
                </span>
              </button>
            ))}
          </div>
          {step>1&&<button className="btn btn-ghost btn-sm" onClick={()=>setStep(s=>s-1)}>← Back</button>}
          {step===1&&<button className="btn btn-ghost btn-sm" onClick={()=>setStep(0)}>← Back</button>}
        </div>
      </div>
    );
  }

  if(step===4) return(
    <div className="page fade">
      <div className="ph">
        <div className="ph-eye">Send a Gesture</div>
        <h1 className="ph-title">Here's what we'd <em>suggest.</em></h1>
        <p className="ph-desc">Based on what you told us, these are the gestures most likely to land well — considerate, not overwhelming, and genuinely useful.</p>
      </div>

      <div className="gest-note">
        💡 The best gesture right now is one that asks nothing back. No reply needed, no acknowledgement required. Just a quiet signal that someone is holding them in mind.
      </div>

      {results.map(g=>(
        <div key={g.id} className="gest-result fade">
          <div className="gest-result-header">
            <span className="gest-result-icon">{g.icon}</span>
            <div>
              <div className="gest-result-title">{g.title}</div>
              <div className="gest-result-desc">{g.desc}</div>
            </div>
          </div>
          <div className="gest-result-footer">
            <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",alignItems:"center"}}>
              <span className={`gest-badge ${g.badgeStyle||""}`}>{g.badge}</span>
              <span style={{fontSize:".68rem",color:"var(--muted)"}}>{g.effort}</span>
            </div>
            <button className={`btn btn-sage btn-sm ${sent[g.id]?"btn-ghost":""}`} onClick={()=>setSent(s=>({...s,[g.id]:true}))} style={{flexShrink:0}}>
              {sent[g.id]?"✓ Sent":"→ "+g.cta}
            </button>
          </div>
        </div>
      ))}

      <div style={{marginTop:"1.5rem",display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>{setStep(0);setAns({});setSent({});}}>← Start over</button>
        <span style={{fontSize:".75rem",color:"var(--muted)"}}>Want different options?</span>
        <button className="btn btn-ghost btn-sm" onClick={()=>setStep(1)}>Change my answers</button>
      </div>
    </div>
  );

  return null;
}

/* ─── In Their Honour component (used in Shop + Home) ───────────────────── */
function InTheirHonour({currency, petName, compact}) {
  const [done,setDone]=useState({});
  const [cert,setCert]=useState(null);
  const getP=a=>currency==="₹"?`₹${a.priceINR.toLocaleString("en-IN")}`:`$${a.priceUSD}`;
  const acts = compact ? HONOUR_ACTS.slice(0,3) : HONOUR_ACTS;

  const honour=(act)=>{
    setDone(d=>({...d,[act.id]:true}));
    setCert(act);
    window.open(act.link,"_blank","noopener");
  };

  return(
    <div>
      <div className="honour-grid">
        {acts.map((a,i)=>(
          <div key={a.id} className={`honour-card fade ${done[a.id]?"honour-done":""}`} style={{animationDelay:`${i*.06}s`}}>
            <div className="honour-card-top">
              <div className="honour-card-icon">{a.icon}</div>
              <div className="honour-card-title">{a.title}</div>
              <div className="honour-card-desc">{a.desc}</div>
              <div className="honour-card-partner">via {a.partner}</div>
            </div>
            <div className="honour-card-foot">
              <div style={{display:"flex",flexDirection:"column",gap:".18rem"}}>
                <span className="honour-price">{getP(a)}</span>
                <span className="honour-badge">{a.badge}</span>
              </div>
              <button
                className={`btn btn-sm ${done[a.id]?"btn-ghost":"btn-sage"}`}
                onClick={()=>!done[a.id]&&honour(a)}
                disabled={done[a.id]}
              >
                {done[a.id]?"✓ Done":"Honour them →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {cert&&<div className="honour-cert">
        <div className="honour-cert-seal">🌿</div>
        <div className="honour-cert-title">
          {petName?`In memory of ${petName}`:"In their memory"}
        </div>
        <div className="honour-cert-body">
          A {cert.title.toLowerCase()} has been made in their honour through {cert.partner}.<br/>
          Their love ripples outward — into the lives of animals who need it most.
        </div>
        <div className="honour-cert-stamp">✓ Act of love · {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div>
        <div style={{marginTop:"1rem",display:"flex",gap:".5rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>navigator.clipboard?.writeText(`I honoured my pet's memory with a gift through RememFur — ${cert.title} via ${cert.partner}.`)}>📋 Copy to share</button>
          <button className="btn btn-ghost btn-sm" onClick={()=>setCert(null)}>Close</button>
        </div>
      </div>}

      <p style={{fontSize:".72rem",color:"var(--muted)",fontStyle:"italic",textAlign:"center",marginTop:".5rem"}}>
        All acts go directly to verified Indian animal welfare organisations · 80G tax exemption available
      </p>
    </div>
  );
}

/* ─── VIEW: Shop ─────────────────────────────────────────────────────────── */
function ShopView({currency}) {
  const [added,setAdded]=useState({});
  const getP=item=>currency==="₹"?`₹${item.priceINR?.toLocaleString("en-IN")}`:`$${item.priceUSD}`;
  return(
    <div className="page fade">
      <div className="ph"><div className="ph-eye">Shop · Keepsakes</div><h1 className="ph-title">Hold something <em>of theirs.</em></h1><p className="ph-desc">Thoughtfully made. Every piece personalised with their name. Nothing mass-produced.</p></div>
      <div className="card card-terra" style={{marginBottom:"1.2rem"}}><div style={{display:"flex",gap:".82rem",alignItems:"flex-start",flexWrap:"wrap"}}><div style={{fontSize:"1.85rem"}}>🫙</div><div style={{flex:1}}><div style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--terra-d)",fontWeight:700,marginBottom:".18rem"}}>✦ Exclusive</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.08rem",color:"var(--ink)",marginBottom:".22rem"}}>The Memory Keepsake Kit</div><div style={{fontSize:".77rem",color:"var(--muted)",lineHeight:1.5,marginBottom:".48rem"}}>A curated box with 5 prompt cards, plantable seed paper, a keepsake vial, and a private letter envelope. Nothing like it exists.</div><div style={{display:"flex",gap:".5rem",alignItems:"center"}}><span style={{fontSize:".92rem",fontWeight:700,color:"var(--terra-d)"}}>{currency==="₹"?"₹1,999":"$24"}</span><button className={`btn btn-sm ${added["hero"]?"btn-sage":"btn-terra"}`} onClick={()=>setAdded(a=>({...a,hero:true}))}>{added["hero"]?"✓ Added":"Add to bag"}</button></div></div></div></div>
      <div className="g2">{SHOP_ITEMS.slice(0,4).map((item,i)=><div key={i} className="shop-card fade" style={{animationDelay:`${i*.07}s`}}><div className="shop-img" style={{background:item.bg}}>{item.icon}</div><div className="shop-body">{item.badge&&<div className="shop-badge-tag">{item.badge}</div>}<div className="shop-name">{item.name}</div><div className="shop-desc">{item.desc}</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span className="shop-price">{getP(item)}</span><button className={`btn btn-xs ${added[i]?"btn-sage":"btn-ghost"}`} onClick={()=>setAdded(a=>({...a,[i]:true}))}>{added[i]?"✓":"Add"}</button></div></div></div>)}</div>

      {/* In Their Honour section */}
      <hr className="dv" style={{margin:"2rem 0"}}/>
      <div className="sec-label">
        <span className="eye">In Their Honour</span>
        <h2>Let their love <em>ripple outward.</em></h2>
        <p>Acts of kindness done in your pet's name — each one goes directly to verified Indian animal welfare organisations. No inventory. No waiting. Just love made real.</p>
      </div>
      <InTheirHonour currency={currency}/>
    </div>
  );
}

/* ─── VIEW: Resources ────────────────────────────────────────────────────── */
function ResourcesView({hasLocation}) {
  const [filter,setFilter]=useState("All");
  const types=[...new Set(RESOURCES.map(r=>r.type))];
  const filtered=filter==="All"?RESOURCES:RESOURCES.filter(r=>r.type===filter);
  return(
    <div className="page fade">
      <div className="ph"><div className="ph-eye">Resources</div><h1 className="ph-title">Genuine help. <em>No strings.</em></h1><p className="ph-desc">{hasLocation?"Resources near you and globally curated — helplines, support groups, books, and guides. Nothing sponsored.":"Curated resources — helplines, support groups, books, and guides. Nothing sponsored. Allow location to find nearby support."}</p></div>
      {hasLocation&&<div className="card card-sage" style={{marginBottom:"1.1rem"}}><div style={{display:"flex",gap:".75rem",alignItems:"center"}}><div style={{fontSize:"1.3rem"}}>📍</div><div><div style={{fontWeight:700,fontSize:".87rem",color:"var(--ink)"}}>Resources near you</div><div style={{fontSize:".76rem",color:"var(--muted)",marginTop:".12rem"}}>We've highlighted local helplines and in-person groups available in your area.</div></div></div></div>}
      <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1.2rem"}}>{["All",...types].map(t=><button key={t} className={`btn btn-sm ${filter===t?"btn-sage":"btn-ghost"}`} onClick={()=>setFilter(t)}>{t}</button>)}</div>
      {filtered.map((r,i)=><div key={i} className="res-item fade" style={{animationDelay:`${i*.05}s`}}><div className="res-icon">{r.icon}</div><div style={{flex:1}}><div className="res-title">{r.title}{r.local&&hasLocation&&<span style={{marginLeft:".45rem",fontSize:".61rem",background:"var(--sage-l)",color:"var(--sage-d)",border:"1px solid rgba(94,140,106,.28)",borderRadius:"20px",padding:".1rem .42rem",fontWeight:700}}>Near you</span>}</div><div className="res-desc">{r.desc}</div><div style={{display:"flex",gap:".38rem",flexWrap:"wrap",marginTop:".32rem"}}>{r.tags.map((t,j)=><span key={j} className="pill pill-sage">{t}</span>)}</div></div><div style={{fontSize:".71rem",color:"var(--sage-d)",flexShrink:0}}>→</div></div>)}
      <div className="card card-rose" style={{marginTop:"1rem"}}><div style={{fontSize:"1.15rem",marginBottom:".32rem"}}>📞</div><div className="ct" style={{fontSize:".88rem"}}>Need to talk to someone right now?</div><div className="cs">Free, confidential grief counselling is available now. Counsellors trained in pet loss bereavement.</div><button className="btn btn-ghost btn-sm">Find support →</button></div>
    </div>
  );
}

/* ─── Location Modal ─────────────────────────────────────────────────────── */
function LocationModal({onSelect,onSkip}) {
  return(
    <div className="modal-bg">
      <div className="modal fade" style={{maxWidth:"380px",textAlign:"center"}}>
        <div style={{fontSize:"1.6rem",marginBottom:".65rem"}}>📍</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.45rem",color:"var(--ink)",marginBottom:".45rem"}}>Allow location access?</div>
        <p style={{fontSize:".84rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.65}}>This lets us show you nearby grief support groups, local helplines, and in-person resources close to you. We don't store or share your location.</p>
        <div style={{display:"flex",flexDirection:"column",gap:".55rem"}}>
          <button className="btn btn-sage" style={{width:"100%",justifyContent:"center",fontSize:".88rem"}} onClick={()=>onSelect(true)}>📍 Allow location · Personalise my resources</button>
          <button className="btn btn-ghost" style={{width:"100%",justifyContent:"center",fontSize:".84rem"}} onClick={()=>onSelect(false)}>Continue without location</button>
        </div>
        <p style={{fontSize:".7rem",color:"var(--muted)",marginTop:".85rem",fontStyle:"italic"}}>You can change this at any time in Resources.</p>
      </div>
    </div>
  );
}

/* ─── VIEW: My Space ─────────────────────────────────────────────────────── */

// ── Dummy data for preview ──
const DUMMY_PETS = [
  {name:"Bruno",   emoji:"🐶", breed:"Labrador Retriever", born:"2010-05-12", passed:"2024-01-08", candles:24, msgs:8,  id:"bruno"},
  {name:"Mia",     emoji:"🐱", breed:"Siamese",            born:"2014-03-18", passed:"2023-11-05", candles:41, msgs:12, id:"mia"},
  {name:"Coco",    emoji:"🐰", breed:"Holland Lop",        born:"2019-05-22", passed:"2023-09-30", candles:12, msgs:4,  id:"coco"},
];
const DUMMY_ARTIFACTS = [
  {icon:"✉️", title:"Letter to Bruno",           sub:"Written 3 weeks ago · Healing Tool",         tag:"letter",  pet:"Bruno",  date:"Feb 18, 2024"},
  {icon:"✨", title:"AI Tribute Poem for Mia",    sub:"Generated Nov 2023 · Memorial",              tag:"poem",    pet:"Mia",    date:"Nov 12, 2023"},
  {icon:"💬", title:"Guilt Release — Bruno",      sub:"Written 2 months ago · Healing Tool",        tag:"guilt",   pet:"Bruno",  date:"Jan 22, 2024"},
  {icon:"🌿", title:"Permission Slip — Coco",     sub:"Written Oct 2023 · Healing Tool",            tag:"slip",    pet:"Coco",   date:"Oct 5, 2023"},
  {icon:"🌻", title:"What Mia Taught Me",         sub:"Written Dec 2023 · Healing Tool",            tag:"taught",  pet:"Mia",    date:"Dec 1, 2023"},
  {icon:"📅", title:"30-Day Companion — Day 14",  sub:"In progress · Started Jan 2024",             tag:"30days",  pet:"Bruno",  date:"Jan 22, 2024"},
];
const DUMMY_ACTS = [
  {icon:"🍚", title:"Fed a shelter resident",     partner:"Blue Cross of India", date:"Feb 10, 2024", pet:"Bruno",  amount:"₹500"},
  {icon:"🌱", title:"Planted a memorial tree",    partner:"SankalpTaru",         date:"Nov 15, 2023", pet:"Mia",    amount:"₹350"},
  {icon:"💉", title:"Gifted a microchip",         partner:"Blue Cross of India", date:"Oct 8, 2023",  pet:"Coco",   amount:"₹400"},
];
const DUMMY_MILESTONES = [
  {icon:"🕯️", text:"One month since Bruno passed",       date:"Feb 8, 2024",  done:true},
  {icon:"🌑", text:"Started your grief journey",          date:"Jan 15, 2024", done:true},
  {icon:"🌱", text:"First candle lit for Mia",            date:"Nov 5, 2023",  done:true},
  {icon:"💌", text:"First guest book message left",       date:"Nov 12, 2023", done:true},
  {icon:"🌕", text:"One year since Coco passed",          date:"Sep 30, 2024", done:false},
  {icon:"✨", text:"Six months since Bruno passed",       date:"Jul 8, 2024",  done:false},
];
const DUMMY_STAGE = "active";

function MySpaceView({ pet, setPet, stage, setStage, onNav, journeyStarted, setJourneyStarted }) {
  const [section,setSection]=useState("overview");
  const [shareGenerated,setShareGenerated]=useState(false);
  const [shareUrl]=useState("rememfur.app/tribute/priya-83421");
  const [copied,setCopied]=useState(false);
  const [expandArtifact,setExpandArtifact]=useState(null);

  // Use dummy data so the page is always fully populated for preview
  const myPets = DUMMY_PETS;
  const artifacts = DUMMY_ARTIFACTS;
  const acts = DUMMY_ACTS;
  const milestones = DUMMY_MILESTONES;
  const activeStage = DUMMY_STAGE;
  const cs = STAGES.find(s=>s.id===activeStage)||STAGES[1];

  // Journey section — full screen
  if(section==="journey") return(
    <div>
      <div style={{maxWidth:"740px",margin:"0 auto",padding:"1.5rem 1.5rem 0"}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>setSection("overview")}>← My Space</button>
      </div>
      <GriefJourneyView pet={pet} setPet={setPet} stage={stage} setStage={setStage} journeyStarted={journeyStarted} setJourneyStarted={setJourneyStarted}/>
    </div>
  );

  const BAR_COLOURS=["var(--sage)","var(--terra)","var(--amber)","var(--rose)"];
  const allYears = myPets.flatMap(p=>[new Date(p.born).getFullYear(),new Date(p.passed).getFullYear()]);
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const span = maxYear-minYear||1;

  // Stats
  const totalCandles = myPets.reduce((a,p)=>a+p.candles,0);
  const totalMsgs    = myPets.reduce((a,p)=>a+p.msgs,0);
  const totalYears   = myPets.reduce((a,p)=>a+Math.round((new Date(p.passed)-new Date(p.born))/86400000/365),0);

  return(
    <div className="page fade">

      {/* ── Header ── */}
      <div style={{marginBottom:"2rem"}}>
        <div className="ph-eye">My Space · Priya M.</div>
        <h1 className="ph-title" style={{fontSize:"2rem",marginBottom:".4rem"}}>Your sanctuary.</h1>
        <p className="ph-desc">Three beloved animals. A lifetime of love. Everything in one place — private to you.</p>
      </div>

      {/* ── At a glance stats ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:".75rem",marginBottom:"2rem"}}>
        {[
          {n:myPets.length,  label:"pets loved",          icon:"🐾"},
          {n:totalYears,     label:"years of shared life", icon:"💛"},
          {n:totalCandles,   label:"candles lit",          icon:"🕯️"},
          {n:acts.length,    label:"acts in their honour", icon:"🌱"},
          {n:artifacts.length,label:"things created",      icon:"✨"},
          {n:totalMsgs,      label:"guest messages",       icon:"💌"},
        ].map((s,i)=>(
          <div key={i} className="num-card fade" style={{animationDelay:`${i*.05}s`,textAlign:"center"}}>
            <div style={{fontSize:"1.2rem",marginBottom:".2rem"}}>{s.icon}</div>
            <div className="num-big" style={{fontSize:"1.6rem"}}>{s.n}</div>
            <div className="num-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── My Pets ── */}
      <div className="sec-label">
        <span className="eye">My Pets</span>
        <h2>The ones who <em>shaped you.</em></h2>
      </div>
      <div className="ms-pets-shelf">
        {myPets.map((p,i)=>{
          const sy=new Date(p.born).getFullYear();
          const ey=new Date(p.passed).getFullYear();
          return(
            <div key={i} className="ms-pet-card fade" style={{animationDelay:`${i*.07}s`}} onClick={()=>onNav({view:"remember",mode:"list"})}>
              <div className="ms-pet-emoji">{p.emoji}</div>
              <div className="ms-pet-name">{p.name}</div>
              <div className="ms-pet-breed">{p.breed}</div>
              <div className="ms-pet-years">{sy}–{ey}</div>
              <div style={{fontSize:".67rem",color:"var(--muted)",marginTop:".1rem"}}>{ey-sy} years · {p.candles} candles</div>
              <div className="ms-pet-link">View memorial →</div>
            </div>
          );
        })}
        <button className="ms-pet-add" onClick={()=>onNav({view:"remember",mode:"create"})}>
          <div style={{fontSize:"1.6rem",marginBottom:".3rem"}}>+</div>
          <div style={{fontSize:".75rem",color:"var(--muted)"}}>Add a pet</div>
        </button>
      </div>

      {/* ── My Grief Journey ── */}
      <div className="ms-section-card" style={{marginBottom:"2rem"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:".75rem",flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:".62rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--sage)",fontWeight:700,marginBottom:".3rem"}}>My Grief Journey</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.18rem",color:"var(--ink)",marginBottom:".25rem"}}>{cs.moon} {cs.name}</div>
            <div style={{fontSize:".79rem",color:"var(--muted)",lineHeight:1.6,marginBottom:".85rem"}}>{GREETING[activeStage]}</div>
            <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
              {["guilt","letter","30days"].map(id=>{
                const t=TOOLS.find(x=>x.id===id);
                return t?<span key={id} style={{fontSize:".68rem",background:"var(--sage-l)",color:"var(--sage-d)",border:"1px solid rgba(94,140,106,.25)",borderRadius:"20px",padding:".18rem .6rem",fontWeight:700}}>{t.icon} {t.name}</span>:null;
              })}
              <span style={{fontSize:".68rem",color:"var(--muted)",alignSelf:"center"}}>+5 tools unlocked</span>
            </div>
          </div>
          <button className="btn btn-sage btn-sm" style={{flexShrink:0,marginTop:".2rem"}} onClick={()=>setSection("journey")}>Continue →</button>
        </div>
      </div>

      {/* ── My Timeline ── */}
      <div className="sec-label">
        <span className="eye">My Timeline</span>
        <h2>A life <em>with animals.</em></h2>
        <p>Three lives, overlapping. The years you shared the same home.</p>
      </div>
      <div className="ms-timeline" style={{marginBottom:"2rem"}}>
        {myPets.map((p,i)=>{
          const sy=new Date(p.born).getFullYear();
          const ey=new Date(p.passed).getFullYear();
          const left=((sy-minYear)/span)*100;
          const width=Math.max(((ey-sy)/span)*100,4);
          return(
            <div key={i} style={{marginBottom:"1.1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".55rem",marginBottom:".32rem"}}>
                <span style={{fontSize:"1.05rem"}}>{p.emoji}</span>
                <span style={{fontSize:".82rem",fontWeight:700,color:"var(--ink)"}}>{p.name}</span>
                <span style={{fontSize:".71rem",color:"var(--muted)"}}>{sy}–{ey} · {ey-sy} yrs</span>
              </div>
              <div style={{position:"relative",height:"16px",background:"var(--bg2)",borderRadius:"8px",overflow:"visible"}}>
                <div style={{position:"absolute",left:`${left}%`,width:`${width}%`,height:"100%",background:BAR_COLOURS[i],borderRadius:"8px",opacity:.85}}/>
              </div>
            </div>
          );
        })}
        <div style={{display:"flex",justifyContent:"space-between",fontSize:".68rem",color:"var(--muted)",marginTop:"1rem",borderTop:"1px solid var(--border)",paddingTop:".6rem"}}>
          <span>{minYear}</span>
          {Array.from({length:maxYear-minYear+1},((_,i)=>minYear+i)).filter(y=>y%2===0).map(y=>(
            <span key={y} style={{fontSize:".62rem"}}>{y}</span>
          ))}
          <span>{maxYear}</span>
        </div>
        <div style={{marginTop:"1rem",padding:".75rem",background:"var(--bg)",borderRadius:"10px",fontSize:".78rem",color:"var(--muted)",lineHeight:1.65,fontStyle:"italic"}}>
          💛 For 4 years (2019–2023), Bruno, Mia, and Coco shared the same home.
        </div>
      </div>

      {/* ── Milestones ── */}
      <div className="sec-label">
        <span className="eye">Milestones</span>
        <h2>Moments quietly <em>marked.</em></h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:".5rem",marginBottom:"2rem"}}>
        {milestones.map((m,i)=>(
          <div key={i} className="fade" style={{display:"flex",alignItems:"center",gap:".75rem",padding:".7rem .9rem",background:m.done?"var(--white)":"var(--bg2)",border:`1px solid ${m.done?"var(--border)":"var(--border)"}`,borderRadius:"12px",opacity:m.done?1:.6,animationDelay:`${i*.04}s`}}>
            <span style={{fontSize:"1.1rem",flexShrink:0}}>{m.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:".83rem",fontWeight:m.done?700:400,color:m.done?"var(--ink)":"var(--muted)"}}>{m.text}</div>
              <div style={{fontSize:".68rem",color:"var(--muted)",marginTop:".08rem"}}>{m.date}</div>
            </div>
            {m.done?<span style={{fontSize:".65rem",fontWeight:700,color:"var(--sage-d)",background:"var(--sage-l)",border:"1px solid rgba(94,140,106,.25)",borderRadius:"20px",padding:".15rem .5rem"}}>✓ Reached</span>
            :<span style={{fontSize:".65rem",color:"var(--muted)",fontStyle:"italic"}}>upcoming</span>}
          </div>
        ))}
      </div>

      {/* ── My Artifacts ── */}
      <div className="sec-label">
        <span className="eye">My Artifacts</span>
        <h2>Things you've <em>made and written.</em></h2>
        <p>Letters, poems, reflections. Everything created in this space — saved for you.</p>
      </div>
      <div className="ms-artifacts-list" style={{marginBottom:"2rem"}}>
        {artifacts.map((a,i)=>(
          <div key={i} className="ms-artifact-item fade" style={{animationDelay:`${i*.05}s`,cursor:"pointer",transition:"border-color .18s"}}
            onClick={()=>setExpandArtifact(expandArtifact===i?null:i)}>
            <div className="ms-artifact-icon">{a.icon}</div>
            <div style={{flex:1}}>
              <div className="ms-artifact-title">{a.title}</div>
              <div className="ms-artifact-sub">{a.sub}</div>
              {expandArtifact===i&&<div style={{marginTop:".65rem",fontSize:".79rem",color:"var(--ink2)",lineHeight:1.65,fontStyle:"italic",borderLeft:"2px solid var(--border2)",paddingLeft:".75rem"}}>
                {a.tag==="letter"&&`Dear Bruno,\n\nI keep reaching for you in the morning. That instinct, before I'm fully awake, to look toward your bed. Fourteen years of mornings — you'd think I'd remember by now. But grief doesn't work like that…`}
                {a.tag==="poem"&&`She came in winter, quiet as frost,\nAnd settled like she'd never been lost.\nSiamese and certain, watching the room —\nMia, who filled it, and left it too soon.`}
                {a.tag==="guilt"&&`The thing I need to say out loud: I keep wondering if I made the decision too soon. The vet said it was time. You couldn't eat. But those last eyes — you were still looking at me like you had things to say.`}
                {a.tag==="slip"&&`I give myself permission to not be okay today. I give myself permission to cry at the sound of a dog barking outside. I give myself permission to miss Coco in ways that don't make sense to other people.`}
                {a.tag==="taught"&&`Mia taught me that love doesn't require explanation. She never justified her affection. She simply gave it, on her terms, and I learned to receive it that way.`}
                {a.tag==="30days"&&`Day 14 prompt: "The funny ones deserve to live too."\n\nBruno once ate an entire wheel of cheese off the counter and then sat in front of me with the most serene expression I've ever seen on a living creature. No remorse. Complete peace.`}
              </div>}
            </div>
            <div style={{fontSize:".68rem",color:"var(--muted)",flexShrink:0,textAlign:"right"}}>
              <div>{a.date}</div>
              <div style={{marginTop:".2rem",color:"var(--sage-d)"}}>{expandArtifact===i?"collapse ↑":"read ↓"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Acts in Their Honour ── */}
      <div className="sec-label">
        <span className="eye">In Their Honour</span>
        <h2>Love made <em>real.</em></h2>
        <p>Acts of kindness done in their names. A record of love that rippled outward.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:".6rem",marginBottom:"2rem"}}>
        {acts.map((a,i)=>(
          <div key={i} className="ms-artifact-item fade" style={{animationDelay:`${i*.05}s`,background:"linear-gradient(135deg,var(--sage-l),var(--white))"}}>
            <div className="ms-artifact-icon">{a.icon}</div>
            <div style={{flex:1}}>
              <div className="ms-artifact-title">{a.title}</div>
              <div className="ms-artifact-sub">via {a.partner} · In {a.pet}'s name</div>
            </div>
            <div style={{fontSize:".72rem",color:"var(--muted)",textAlign:"right",flexShrink:0}}>
              <div style={{fontWeight:700,color:"var(--sage-d)"}}>{a.amount}</div>
              <div style={{marginTop:".1rem"}}>{a.date}</div>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" style={{alignSelf:"flex-start"}} onClick={()=>onNav("shop")}>+ Do another act →</button>
      </div>

      {/* ── Share Tribute ── */}
      <div className="ms-section-card" style={{textAlign:"center",background:"linear-gradient(135deg,var(--sage-l),var(--white))"}}>
        <div style={{fontSize:"1.6rem",marginBottom:".55rem"}}>🔗</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",color:"var(--ink)",marginBottom:".4rem"}}>Share a tribute page</div>
        <p style={{fontSize:".82rem",color:"var(--muted)",lineHeight:1.7,maxWidth:"380px",margin:"0 auto 1.35rem"}}>
          A beautiful read-only page your family can visit — your pets, their stories, a place to leave a candle. Nothing can be edited by anyone but you.
        </p>
        {shareGenerated?(
          <>
            <div style={{background:"var(--white)",border:"1px solid rgba(94,140,106,.3)",borderRadius:"10px",padding:".85rem 1rem",marginBottom:".75rem",fontSize:".82rem",color:"var(--ink)",wordBreak:"break-all",maxWidth:"420px",margin:"0 auto .75rem"}}>
              {shareUrl}
            </div>
            <div style={{display:"flex",gap:".5rem",justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn btn-sage btn-sm" onClick={()=>{navigator.clipboard?.writeText(`https://${shareUrl}`);setCopied(true);setTimeout(()=>setCopied(false),2500);}}>
                {copied?"✓ Copied!":"📋 Copy link"}
              </button>
              <button className="btn btn-ghost btn-sm">📧 Email to family</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setShareGenerated(false)}>Reset</button>
            </div>
            <p style={{fontSize:".71rem",color:"var(--muted)",marginTop:".85rem",fontStyle:"italic"}}>
              Anyone with this link can view and light a candle — but cannot edit anything.
            </p>
          </>
        ):(
          <button className="btn btn-sage" onClick={()=>setShareGenerated(true)}>Generate tribute link →</button>
        )}
      </div>

    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer({onNav}) {
  const [email,setEmail]=useState("");
  const [subscribed,setSubscribed]=useState(false);
  return(
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".5rem"}}>
            <div className="footer-brand-icon">🐾</div>
            <span className="footer-brand-name">Rememfur</span>
          </div>
          <p className="footer-tagline">A compassionate space to honour and celebrate the pets who've touched our hearts forever.</p>
          <div className="footer-socials">
            {[
              {label:"Facebook", svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>},
              {label:"Twitter", svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>},
              {label:"Instagram", svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>},
            ].map(s=>(
              <button key={s.label} className="footer-social-btn" title={s.label}>{s.svg}</button>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <div className="footer-col-title">Platform</div>
          {[
            {label:"About Us",     dest:null},
            {label:"Community",    dest:"community"},
            {label:"Shop",         dest:"shop"},
            {label:"Create Memorial", dest:{view:"remember",mode:"create"}},
          ].map(l=>(
            <button key={l.label} className="footer-link" onClick={()=>l.dest&&onNav(l.dest)}>{l.label}</button>
          ))}
        </div>

        {/* Support */}
        <div>
          <div className="footer-col-title">Support</div>
          {[
            {label:"FAQ",             dest:null},
            {label:"Grief Resources", dest:"resources"},
            {label:"Contact Us",      dest:null},
            {label:"Help Center",     dest:null},
          ].map(l=>(
            <button key={l.label} className="footer-link" onClick={()=>l.dest&&onNav(l.dest)}>{l.label}</button>
          ))}
        </div>

        {/* Stay Connected */}
        <div>
          <div className="footer-col-title">Stay Connected</div>
          <p style={{fontSize:".8rem",color:"var(--muted)",lineHeight:1.65}}>Join our community for support, resources, and updates.</p>
          {subscribed?(
            <div style={{marginTop:".85rem",fontSize:".78rem",color:"var(--sage-d)",fontWeight:700}}>✓ You're in — thank you 🐾</div>
          ):(
            <div className="footer-email-row">
              <input className="footer-email-input" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)}/>
              <button className="footer-email-btn" onClick={()=>email.includes("@")&&setSubscribed(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          Made with <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--terra)" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> for pet lovers everywhere
        </div>
        <div className="footer-bottom-right">
          <button className="footer-bottom-link">Privacy Policy</button>
          <button className="footer-bottom-link">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Shell ──────────────────────────────────────────────────────────── */
export default function App() {
  useEffect(()=>{
    document.head.appendChild(G);
    return ()=>{ try{ document.head.removeChild(G); }catch{} };
  },[]);

  const [view,setView]=useState("home");
  const [rememberMode,setRememberMode]=useState("list");
  const [pet,setPet]=useState(null);
  const [stage,setStage]=useState("raw");
  const [journeyStarted,setJourneyStarted]=useState(false);
  const [hasLocation,setHasLocation]=useState(null);
  const [showLoc,setShowLoc]=useState(false);
  const [currency,setCurrency]=useState("$");

  useEffect(()=>{
    Promise.all([ld("gj-pet"),ld("gj-stage"),ld("has-loc"),ld("gj-started")]).then(([p,s,l,j])=>{
      if(p?.name)setPet(p); if(s)setStage(s);
      if(j)setJourneyStarted(true);
      if(l!==null)setHasLocation(l); else setShowLoc(true);
    });
  },[]);

  const selectLoc=async(allow)=>{setHasLocation(allow);await sv("has-loc",allow);if(allow)setCurrency("₹");else setCurrency("$");setShowLoc(false);};

  const navTo = (dest) => {
    if(typeof dest === "string") { setView(dest); }
    else { setView(dest.view); if(dest.mode) setRememberMode(dest.mode); }
    document.querySelector(".main-scroll")?.scrollTo({top:0,behavior:"instant"});
  };

  return(
    <>
      {showLoc&&<LocationModal onSelect={selectLoc} onSkip={()=>selectLoc(false)}/>}
      <div className="app-top">
        <nav className="topnav">
          <div className="brand" onClick={()=>navTo("home")}>Remem<span>Fur</span></div>
          <div className="top-links">
            {NAV_ITEMS.map(n=><button key={n.id} className={`tnl ${view===n.id?"act":""}`} onClick={()=>navTo(n.id)}>{n.label}</button>)}
          </div>
          <div className="nav-right">
            <button className={`journey-btn ${pet?"has-pet":""}`} onClick={()=>navTo("myspace")}>
              {pet?`${pet.emoji} My Space`:"🕯 My Space"}
            </button>
            <button
              className={`loc-pin ${hasLocation?"active":""}`}
              onClick={()=>setShowLoc(true)}
              title={hasLocation?"Location on — click to change":"Location off — click to enable"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={hasLocation?"var(--sage)":"#9A8F80"}/>
                <circle cx="12" cy="9" r="2.5" fill={hasLocation?"#fff":"var(--bg2)"}/>
              </svg>
            </button>
          </div>
        </nav>
        <div className="main-scroll">
          {view==="home"      && <HomeView      onNav={navTo}/>}
          {view==="journey"   && <GriefJourneyView pet={pet} setPet={setPet} stage={stage} setStage={setStage} journeyStarted={journeyStarted} setJourneyStarted={setJourneyStarted}/>}
          {view==="remember"  && <RememberView  initialMode={rememberMode} onModeChange={setRememberMode}/>}
          {view==="community" && <CommunityView/>}
          {view==="gesture"   && <GestureView/>}
          {view==="shop"      && <ShopView      currency={currency}/>}
          {view==="resources" && <ResourcesView hasLocation={hasLocation}/>}
          {view==="myspace"   && <MySpaceView   pet={pet} setPet={setPet} stage={stage} setStage={setStage} onNav={navTo} journeyStarted={journeyStarted} setJourneyStarted={setJourneyStarted}/>}
          <Footer onNav={navTo}/>
        </div>
      </div>
    </>
  );
}
