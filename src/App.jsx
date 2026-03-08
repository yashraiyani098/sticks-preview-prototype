import React, { useState, useEffect, useRef, useCallback } from "react";

const WALLPAPERS = [
  { id:1, cat:"AMOLED",    grad:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)", title:"Cosmic Dark",   dl:12400, likes:3200, tags:["dark","4k","amoled"] },
  { id:2, cat:"Anime",     grad:"linear-gradient(135deg,#f093fb,#f5576c,#fda085)", title:"Sakura Bloom",  dl:9800,  likes:2800, tags:["anime","pink","cute"] },
  { id:3, cat:"Minimal",   grad:"linear-gradient(135deg,#e0c3fc,#8ec5fc)",         title:"Cloud Minimal", dl:7600,  likes:1900, tags:["minimal","blue","calm"] },
  { id:4, cat:"Nature",    grad:"linear-gradient(135deg,#11998e,#38ef7d)",         title:"Forest Dawn",   dl:11200, likes:2600, tags:["nature","green","calm"] },
  { id:5, cat:"Cyberpunk", grad:"linear-gradient(135deg,#0f0c29,#ff0080,#00d4ff)",title:"Neon City",     dl:15600, likes:4100, tags:["neon","dark","cyber"] },
  { id:6, cat:"Aesthetic", grad:"linear-gradient(135deg,#ffecd2,#fcb69f)",         title:"Sunset Glow",   dl:8300,  likes:2100, tags:["aesthetic","warm","calm"] },
  { id:7, cat:"AMOLED",    grad:"linear-gradient(135deg,#000000,#434343)",         title:"Pure Black",    dl:18000, likes:5200, tags:["dark","amoled","minimal"] },
  { id:8, cat:"Nature",    grad:"linear-gradient(135deg,#2980b9,#6dd5fa,#ffffff)", title:"Ocean Mist",    dl:6700,  likes:1500, tags:["nature","blue","calm"] },
];

const STICKER_PACKS = [
  { id:1, name:"Cute Animals",  count:24, emoji:"??", grad:"linear-gradient(135deg,#fccb90,#d57eeb)", trending:true,  stickers:["??","??","??","??","??","??","??","??","??","??","??","??"] },
  { id:2, name:"Diwali Fest",   count:18, emoji:"??", grad:"linear-gradient(135deg,#f7971e,#ffd200)", trending:true,  stickers:["??","??","??","??","??","?","??","??","??","??","??","??"] },
  { id:3, name:"Mood Vibes",    count:30, emoji:"??", grad:"linear-gradient(135deg,#4facfe,#00f2fe)", trending:false, stickers:["??","??","??","??","??","??","??","??","??","??","??","??"] },
  { id:4, name:"Food Lovers",   count:20, emoji:"??", grad:"linear-gradient(135deg,#43e97b,#38f9d7)", trending:false, stickers:["??","??","??","??","?","??","??","??","??","??","??","??"] },
  { id:5, name:"Cricket Cup",   count:16, emoji:"??", grad:"linear-gradient(135deg,#fa709a,#fee140)", trending:true,  stickers:["??","??","??","??","?","??","??","??","??","???","??","??"] },
  { id:6, name:"Love & Hearts", count:22, emoji:"??", grad:"linear-gradient(135deg,#ff9a9e,#fecfef)", trending:false, stickers:["??","??","??","??","??","??","??","??","??","??","??","??"] },
];

const COMMUNITY = [
  { id:1, user:"PixelArtist_rk", avatar:"??", wp:WALLPAPERS[4], likes:892,  saved:234, time:"2h ago", following:false },
  { id:2, user:"NeonDreamer",    avatar:"?", wp:WALLPAPERS[0], likes:1240, saved:567, time:"5h ago", following:true  },
  { id:3, user:"AestheticGirl",  avatar:"??", wp:WALLPAPERS[1], likes:430,  saved:120, time:"1d ago", following:false },
  { id:4, user:"MinimalistX",    avatar:"??", wp:WALLPAPERS[2], likes:315,  saved:98,  time:"2d ago", following:false },
];

const MOODS = [
  { label:"Calm",  emoji:"??", color:"#11998e", wps:[3,2,7] },
  { label:"Focus", emoji:"??", color:"#4facfe", wps:[0,6,2] },
  { label:"Happy", emoji:"??", color:"#ffd200", wps:[1,5,3] },
  { label:"Love",  emoji:"??", color:"#f093fb", wps:[1,5,0] },
  { label:"Sad",   emoji:"??", color:"#a8edea", wps:[2,7,3] },
];

const QUOTES = [
  "Stay hungry, stay foolish.",
  "Believe in yourself.",
  "Dream big, work hard.",
  "Every day is a new beginning.",
  "Make it happen. Shock everyone.",
  "Be the energy you want to attract.",
];

const C = {
  bg:"#08080f", surface:"#0d0d1a", card:"#13131f",
  border:"#ffffff12", border2:"#ffffff22",
  text:"#ffffff", muted:"#ffffff60", faint:"#ffffff20",
  cyan:"#00d4ff", purple:"#a855f7", pink:"#ff0080",
  green:"#38ef7d", gold:"#ffd200",
  grad1:"linear-gradient(135deg,#ff0080,#a855f7)",
  grad2:"linear-gradient(90deg,#00d4ff,#a855f7)",
  grad3:"linear-gradient(90deg,#ff0080,#ff6b35)",
  gradGold:"linear-gradient(90deg,#f7971e,#ffd200)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  ::-webkit-scrollbar{width:0;height:0;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideInR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInU{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.03)}}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes glow{0%,100%{box-shadow:0 0 10px #ff008055}50%{box-shadow:0 0 26px #ff008088,0 0 48px #00d4ff33}}
  @keyframes shimmer{0%{background-position:-300% 0}100%{background-position:300% 0}}
  @keyframes bounceIn{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
  @keyframes heartBeat{0%,100%{transform:scale(1)}30%{transform:scale(1.35)}60%{transform:scale(1)}}
  @keyframes neonPulse{0%,100%{opacity:1}50%{opacity:.7}}
  .tap{transition:transform .1s,filter .1s;cursor:pointer;user-select:none;}
  .tap:active{transform:scale(.94)!important;filter:brightness(1.2);}
`;

function Orbs() {
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {[...Array(10)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",borderRadius:"50%",
          background:`radial-gradient(circle,${["#ff008025","#00d4ff1a","#a855f722","#38ef7d16"][i%4]} 0%,transparent 70%)`,
          width:`${70+(i*21)%110}px`,height:`${70+(i*21)%110}px`,
          left:`${(i*23)%94}%`,top:`${(i*31)%88}%`,
          animation:`float ${4+(i%4)}s ease-in-out ${i*.6}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function Badge({children,color="#00d4ff"}){
  return <span style={{background:`${color}22`,border:`1px solid ${color}55`,borderRadius:10,padding:"2px 8px",fontSize:9,color,fontWeight:700}}>{children}</span>;
}

function Pill({children,active,onClick,style={}}){
  return(
    <div className="tap" onClick={onClick} style={{
      flexShrink:0,borderRadius:20,padding:"6px 14px",
      background:active?C.grad2:"#ffffff0e",
      border:active?"none":`1px solid ${C.border}`,
      color:C.text,fontSize:11,fontWeight:700,cursor:"pointer",
      fontFamily:"Rajdhani,sans-serif",letterSpacing:.4,
      transition:"all .2s",...style,
    }}>{children}</div>
  );
}

function Toggle({on,onToggle}){
  return(
    <div className="tap" onClick={onToggle} style={{width:46,height:26,borderRadius:13,background:on?C.cyan:"#ffffff20",position:"relative",cursor:"pointer",transition:"background .25s",flexShrink:0}}>
      <div style={{position:"absolute",top:3,left:on?22:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .25s",boxShadow:"0 2px 6px #0008"}}/>
    </div>
  );
}

function BottomSheet({open,onClose,title,children}){
  if(!open)return null;
  return(
    <div onClick={onClose} style={{position:"absolute",inset:0,background:"#000000b0",backdropFilter:"blur(4px)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%",background:C.surface,borderRadius:"24px 24px 0 0",
        border:`1px solid ${C.border}`,borderBottom:"none",
        animation:"slideInU .28s cubic-bezier(.22,.61,.36,1)",
        maxHeight:"82%",overflowY:"auto",
      }}>
        <div style={{textAlign:"center",padding:"12px 0 0"}}>
          <div style={{width:36,height:4,borderRadius:2,background:C.border2,margin:"0 auto 12px"}}/>
        </div>
        {title&&<div style={{color:C.text,fontWeight:700,fontSize:16,fontFamily:"Rajdhani,sans-serif",padding:"0 20px 14px",borderBottom:`1px solid ${C.border}`}}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

function Toast({msg,show}){
  if(!show)return null;
  return(
    <div style={{
      position:"absolute",bottom:88,left:"50%",transform:"translateX(-50%)",
      background:"#1a1a2e",border:`1px solid ${C.cyan}55`,
      borderRadius:14,padding:"10px 20px",color:C.text,
      fontSize:12,fontWeight:700,fontFamily:"Nunito,sans-serif",
      zIndex:300,whiteSpace:"nowrap",
      boxShadow:`0 0 20px ${C.cyan}35`,
      animation:"bounceIn .3s ease",
    }}>{msg}</div>
  );
}

/* ------------- SPLASH ------------- */
function SplashScreen({onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2400);return()=>clearTimeout(t);},[]);
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,position:"relative",overflow:"hidden"}}>
      <Orbs/>
      <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{fontSize:60,animation:"bounceIn .6s .2s both"}}>??</div>
        <div style={{fontFamily:"Rajdhani,sans-serif",fontWeight:700,fontSize:34,color:C.text,marginTop:14,animation:"fadeUp .5s .7s both",letterSpacing:-1}}>
          Personalize<span style={{color:C.cyan}}>Hub</span>
        </div>
        <div style={{color:C.muted,fontSize:13,animation:"fadeUp .5s .9s both",marginTop:4}}>Stickers · Wallpapers · AI Creation</div>
        <div style={{marginTop:40,animation:"fadeUp .5s 1.1s both"}}>
          <div style={{width:180,height:3,borderRadius:2,background:C.border,overflow:"hidden",margin:"0 auto"}}>
            <div style={{height:"100%",borderRadius:2,background:C.grad2,backgroundSize:"300% 100%",animation:"shimmer 1.5s linear infinite"}}/>
          </div>
          <div style={{color:C.muted,fontSize:10,marginTop:8}}>Loading your creative studio...</div>
        </div>
      </div>
    </div>
  );
}

/* ------------- ONBOARD ------------- */
function OnboardScreen({onDone}){
  const [step,setStep]=useState(0);
  const steps=[
    {emoji:"???",title:"Millions of Wallpapers",sub:"4K, AMOLED, Anime, Nature & more — perfectly curated for you"},
    {emoji:"?",title:"Create Your Stickers",sub:"Turn any photo into a sticker. Share instantly on WhatsApp & Telegram"},
    {emoji:"??",title:"AI-Powered Creation",sub:"Type a prompt and get a stunning wallpaper or sticker in seconds"},
    {emoji:"??",title:"Daily Rewards",sub:"Login every day to unlock free sticker packs and earn coins"},
  ];
  const s=steps[step];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,position:"relative",overflow:"hidden"}}>
      <Orbs/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30,position:"relative",zIndex:1}}>
        <div key={step} style={{textAlign:"center",animation:"fadeUp .35s ease"}}>
          <div style={{fontSize:76,marginBottom:28}}>{s.emoji}</div>
          <div style={{color:C.text,fontWeight:700,fontSize:26,fontFamily:"Rajdhani,sans-serif",marginBottom:14}}>{s.title}</div>
          <div style={{color:C.muted,fontSize:14,lineHeight:1.65,maxWidth:270,margin:"0 auto"}}>{s.sub}</div>
        </div>
      </div>
      <div style={{padding:"0 24px 44px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:26}}>
          {steps.map((_,i)=><div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i===step?C.cyan:C.border2,transition:"all .3s"}}/>)}
        </div>
        {step<steps.length-1
          ?<button className="tap" onClick={()=>setStep(s=>s+1)} style={{width:"100%",background:C.grad2,border:"none",borderRadius:16,color:C.text,fontWeight:800,padding:"16px 0",fontSize:15,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Next ?</button>
          :<button className="tap" onClick={onDone} style={{width:"100%",background:C.grad1,border:"none",borderRadius:16,color:C.text,fontWeight:800,padding:"16px 0",fontSize:15,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Let's Go! ??</button>
        }
        {step<steps.length-1&&<div className="tap" onClick={onDone} style={{textAlign:"center",color:C.muted,fontSize:12,marginTop:14,cursor:"pointer"}}>Skip</div>}
      </div>
    </div>
  );
}
/* ------------- WALLPAPER DETAIL ------------- */
function WallpaperDetail({wp,onBack,toast,setCoins}){
  const [liked,setLiked]=useState(false);
  const [saved,setSaved]=useState(false);
  const [sheet,setSheet]=useState(false);
  const [editSheet,setEditSheet]=useState(false);
  const [quote,setQuote]=useState("");
  const [quoteAdded,setQuoteAdded]=useState(false);

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{height:260,background:wp.grad,position:"relative",flexShrink:0,overflow:"hidden"}}>
        <Orbs/>
        {quoteAdded&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:6}}>
          <div style={{color:"#fff",fontWeight:800,fontSize:15,fontFamily:"Rajdhani,sans-serif",textShadow:"0 2px 12px #000c",textAlign:"center",padding:"0 30px"}}>{quote||"Stay hungry, stay foolish."}</div>
        </div>}
        <div style={{position:"absolute",top:14,left:14,zIndex:10}}>
          <div className="tap" onClick={onBack} style={{background:"#000000b0",backdropFilter:"blur(10px)",borderRadius:12,padding:"8px 14px",color:C.text,fontSize:12,fontWeight:700,border:`1px solid ${C.border}`,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>? Back</div>
        </div>
        <div style={{position:"absolute",top:14,right:14,display:"flex",gap:8,zIndex:10}}>
          <div className="tap" onClick={()=>{setSaved(!saved);toast(saved?"?? Removed from Favorites":"?? Added to Favorites!");}} style={{background:"#000000b0",backdropFilter:"blur(10px)",borderRadius:12,padding:"8px 12px",fontSize:16,cursor:"pointer",border:`1px solid ${C.border}`}}>{saved?"??":"??"}</div>
          <div className="tap" onClick={()=>toast("?? Link Copied!")} style={{background:"#000000b0",backdropFilter:"blur(10px)",borderRadius:12,padding:"8px 12px",fontSize:16,cursor:"pointer",border:`1px solid ${C.border}`}}>??</div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#08080f)",padding:"40px 20px 16px",zIndex:5}}>
          <Badge color={C.cyan}>{wp.cat}</Badge>
          <div style={{color:C.text,fontWeight:700,fontSize:24,fontFamily:"Rajdhani,sans-serif",marginTop:5}}>{wp.title}</div>
          <div style={{display:"flex",gap:6,marginTop:6}}>{wp.tags.map(t=><span key={t} style={{background:"#ffffff12",borderRadius:8,padding:"2px 8px",fontSize:9,color:C.muted,border:`1px solid ${C.border}`}}>{t}</span>)}</div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:16}}>
        <div style={{display:"flex",gap:0,justifyContent:"space-around",background:C.card,borderRadius:16,padding:"14px 10px",marginBottom:16,border:`1px solid ${C.border}`}}>
          {[[(wp.dl/1000).toFixed(1)+"k","Downloads",C.cyan],[(wp.likes/1000).toFixed(1)+"k","Likes",C.pink],["4K","Resolution",C.gold],["Free","Price",C.green]].map(([v,l,col])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{color:col,fontWeight:800,fontSize:18,fontFamily:"Rajdhani,sans-serif"}}>{v}</div>
              <div style={{color:C.muted,fontSize:9,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div className="tap" onClick={()=>{setLiked(!liked);toast(liked?"?? Unliked":"?? Liked!");}} style={{
            display:"flex",alignItems:"center",gap:5,background:liked?"#ff008020":"#ffffff0a",
            border:liked?`1px solid ${C.pink}`:`1px solid ${C.border}`,
            borderRadius:20,padding:"9px 14px",cursor:"pointer",
          }}>
            <span style={{fontSize:14,animation:liked?"heartBeat .4s ease":""}}>{liked?"??":"??"}</span>
            <span style={{color:liked?C.pink:C.muted,fontSize:11,fontWeight:700}}>{wp.likes+(liked?1:0)}</span>
          </div>
          <div className="tap" onClick={()=>{toast("?? Saved to Gallery! +5 coins");setCoins(c=>c+5);}} style={{
            flex:1,background:"#ffffff0a",border:`1px solid ${C.border}`,
            borderRadius:20,padding:"9px 0",textAlign:"center",
            color:C.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",
          }}>?? Download</div>
          <div className="tap" onClick={()=>setEditSheet(true)} style={{background:"#ffffff0a",border:`1px solid ${C.border}`,borderRadius:20,padding:"9px 12px",cursor:"pointer",fontSize:16}}>??</div>
        </div>

        <button className="tap" onClick={()=>setSheet(true)} style={{
          width:"100%",background:C.grad2,border:"none",borderRadius:16,
          color:C.text,fontWeight:800,padding:"15px 0",fontSize:14,cursor:"pointer",
          fontFamily:"Rajdhani,sans-serif",boxShadow:`0 4px 18px ${C.cyan}35`,marginBottom:16,
        }}>? Apply Wallpaper</button>

        <div style={{marginBottom:16}}>
          <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>Similar Wallpapers</div>
          <div style={{display:"flex",gap:10,overflowX:"auto"}}>
            {WALLPAPERS.filter(w=>w.id!==wp.id).slice(0,5).map(w=>(
              <div key={w.id} style={{flexShrink:0,width:86,height:124,borderRadius:14,background:w.grad,border:`1px solid ${C.border}`,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000d)",padding:"16px 8px 6px"}}>
                  <div style={{color:C.text,fontSize:9,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{w.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px"}}>
          <div style={{color:C.text,fontWeight:700,fontSize:13,fontFamily:"Rajdhani,sans-serif",marginBottom:8}}>?? Share to</div>
          <div style={{display:"flex",gap:10}}>
            {[["??","WhatsApp","#25D366"],["??","Telegram","#229ED9"],["??","Instagram","#e1306c"],["??","Copy Link",C.purple]].map(([icon,label,col])=>(
              <div key={label} className="tap" onClick={()=>toast(`${icon} Shared to ${label}!`)} style={{flex:1,background:`${col}20`,border:`1px solid ${col}40`,borderRadius:12,padding:"10px 4px",textAlign:"center",cursor:"pointer"}}>
                <div style={{fontSize:16}}>{icon}</div>
                <div style={{color:C.text,fontSize:9,fontWeight:700,marginTop:3,fontFamily:"Rajdhani,sans-serif"}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomSheet open={sheet} onClose={()=>setSheet(false)} title="? Apply Wallpaper">
        <div style={{padding:18}}>
          {["?? Home Screen","?? Lock Screen","?? Both Screens"].map((o,i)=>(
            <div key={o} className="tap" onClick={()=>{setSheet(false);toast(`? Applied to ${o.slice(3)}!`);}} style={{
              background:i===2?C.grad2:"#ffffff0a",border:i===2?"none":`1px solid ${C.border}`,
              borderRadius:14,padding:"15px 18px",marginBottom:10,
              color:C.text,fontWeight:700,fontSize:13,cursor:"pointer",
              fontFamily:"Rajdhani,sans-serif",display:"flex",alignItems:"center",gap:12,
            }}>{o}</div>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={editSheet} onClose={()=>setEditSheet(false)} title="?? Edit Wallpaper">
        <div style={{padding:18}}>
          <input value={quote} onChange={e=>setQuote(e.target.value)} placeholder="Add a quote to your wallpaper..."
            style={{width:"100%",background:"#ffffff0a",border:`1px solid ${C.border2}`,borderRadius:12,color:C.text,padding:"11px 14px",fontSize:12,outline:"none",fontFamily:"Nunito",marginBottom:12}}/>
          {["Glass Blur","Glow Effect","Vignette"].map(fx=>(
            <div key={fx} className="tap" onClick={()=>toast(`? ${fx} applied!`)} style={{background:"#ffffff0a",border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 16px",marginBottom:8,color:C.text,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>? {fx}</div>
          ))}
          <button className="tap" onClick={()=>{setQuoteAdded(true);setEditSheet(false);toast("? Quote added to wallpaper!");}} style={{width:"100%",background:C.grad2,border:"none",borderRadius:14,color:C.text,fontWeight:800,padding:"13px 0",fontSize:13,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",marginTop:4}}>Apply Changes</button>
        </div>
      </BottomSheet>
    </div>
  );
}

/* ------------- STICKER PACK DETAIL ------------- */
function StickerPackDetail({pack,onBack,toast}){
  const [added,setAdded]=useState({wa:false,tg:false});
  const [selectedStickers,setSelectedStickers]=useState([]);

  const toggleSticker=(s)=>setSelectedStickers(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s]);

  return(
    <div style={{flex:1,overflowY:"auto",paddingBottom:20}}>
      <div style={{height:150,background:pack.grad,position:"relative",overflow:"hidden",borderRadius:"0 0 28px 28px",flexShrink:0}}>
        <Orbs/>
        <div style={{position:"absolute",top:14,left:14,zIndex:10}}>
          <div className="tap" onClick={onBack} style={{background:"#000000b0",backdropFilter:"blur(10px)",borderRadius:12,padding:"8px 14px",color:C.text,fontSize:12,fontWeight:700,border:`1px solid ${C.border}`,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>? Back</div>
        </div>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:5}}>
          <div style={{fontSize:50}}>{pack.emoji}</div>
          <div style={{color:C.text,fontWeight:700,fontSize:20,fontFamily:"Rajdhani,sans-serif",textShadow:"0 2px 10px #000a"}}>{pack.name}</div>
          <div style={{color:"#ffffffb0",fontSize:11}}>{pack.count} stickers {pack.trending?"· ?? Trending":""}</div>
        </div>
      </div>

      <div style={{padding:"16px 14px 0"}}>
        {selectedStickers.length>0&&(
          <div style={{background:"#ffffff0a",border:`1px solid ${C.border}`,borderRadius:14,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",animation:"fadeIn .3s"}}>
            <div style={{color:C.text,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{selectedStickers.length} stickers selected</div>
            <div className="tap" onClick={()=>{toast(`?? ${selectedStickers.length} stickers shared!`);setSelectedStickers([]);}} style={{background:C.grad2,borderRadius:10,padding:"5px 12px",color:C.text,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Share</div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:18}}>
          {[...pack.stickers,...pack.stickers].slice(0,18).map((s,i)=>(
            <div key={i} className="tap" onClick={()=>{toggleSticker(`${s}${i}`);toast(`${s} selected!`);}} style={{
              aspectRatio:"1",background:selectedStickers.includes(`${s}${i}`)?"#ffffff25":"#ffffff0a",
              borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:22,cursor:"pointer",
              border:selectedStickers.includes(`${s}${i}`)?`2px solid ${C.cyan}`:`1px solid ${C.border}`,
              animation:`fadeUp ${i*.025}s ease both`,transition:"all .15s",
            }}>{s}</div>
          ))}
        </div>

        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <button className="tap" onClick={()=>{const n=!added.wa;setAdded(a=>({...a,wa:n}));toast(n?"? Added to WhatsApp!":"Removed from WhatsApp");}} style={{
            flex:1,background:added.wa?"#25D36620":"#25D366",
            border:added.wa?`1px solid #25D366`:"none",
            borderRadius:14,color:C.text,fontWeight:800,padding:"13px 0",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",
          }}>{added.wa?"? Added to WhatsApp":"? Add to WhatsApp"}</button>
          <button className="tap" onClick={()=>{setAdded(a=>({...a,tg:!a.tg}));toast("? Added to Telegram!");}} style={{
            flex:1,background:added.tg?"#229ED920":"#229ED9",border:added.tg?`1px solid #229ED9`:"none",
            borderRadius:14,color:C.text,fontWeight:800,padding:"13px 0",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",
          }}>? Telegram</button>
        </div>

        <button className="tap" onClick={()=>toast("?? Opening Instagram...")} style={{
          width:"100%",background:"linear-gradient(90deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
          border:"none",borderRadius:14,color:C.text,fontWeight:800,padding:"13px 0",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",
        }}>?? Share to Instagram</button>
      </div>
    </div>
  );
}
/* ------------- CREATE SCREEN ------------- */
function CreateScreen({toast,setCoins,navigate}){
  const [mode,setMode]=useState("wallpaper");
  const [prompt,setPrompt]=useState("");
  const [generating,setGenerating]=useState(false);
  const [result,setResult]=useState(null);
  const [quote,setQuote]=useState(QUOTES[0]);
  const [quoteStyle,setQuoteStyle]=useState("minimal");
  const [uploadStage,setUploadStage]=useState(0); // 0=idle 1=processing 2=done
  const [effects,setEffects]=useState([]);

  const GRADS=["linear-gradient(135deg,#0f0c29,#ff0080,#00d4ff)","linear-gradient(135deg,#11998e,#38ef7d)","linear-gradient(135deg,#f093fb,#f5576c)","linear-gradient(135deg,#302b63,#24243e)","linear-gradient(135deg,#ffecd2,#fcb69f)","linear-gradient(135deg,#4facfe,#00f2fe)"];

  const SUGG={wallpaper:["Neon cyberpunk city","Minimal dark mountain","Galaxy spiral AMOLED","Cherry blossom anime"],sticker:["Cute panda coffee","Funny cat gaming","Baby dragon","Astronaut surfing"],lockscreen:["Motivational minimal","Dark galaxy clock","Pastel love quotes","Neon city night"]};

  const generate=()=>{
    if(!prompt.trim())return;
    setGenerating(true);setResult(null);
    setTimeout(()=>{setGenerating(false);setResult(GRADS[Math.floor(Math.random()*GRADS.length)]);setCoins(c=>c+10);toast("? Generated! +10 coins");},2200);
  };

  const handleUpload=()=>{
    setUploadStage(1);
    setTimeout(()=>{setUploadStage(2);toast("?? Sticker ready!");},2000);
  };

  const toggleEffect=(fx)=>setEffects(prev=>prev.includes(fx)?prev.filter(x=>x!==fx):[...prev,fx]);

  return(
    <div style={{flex:1,overflowY:"auto",padding:"16px 14px 80px"}}>
      <div style={{color:C.text,fontWeight:700,fontSize:24,fontFamily:"Rajdhani,sans-serif",marginBottom:4}}>? Create Studio</div>
      <div style={{color:C.muted,fontSize:12,marginBottom:16}}>AI-powered creative tools</div>

      <div style={{display:"flex",gap:8,marginBottom:18,overflowX:"auto"}}>
        {[["wallpaper","?? Wallpaper"],["sticker","? Sticker"],["lockscreen","?? Lock Screen"]].map(([m,l])=>(
          <Pill key={m} active={mode===m} onClick={()=>{setMode(m);setResult(null);setUploadStage(0);}}>{l}</Pill>
        ))}
      </div>

      {/* AI Generator */}
      <div style={{background:C.card,borderRadius:20,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
        <div style={{color:C.cyan,fontWeight:700,fontSize:13,marginBottom:10,fontFamily:"Rajdhani,sans-serif"}}>?? AI Generator</div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()}
            placeholder={(SUGG[mode]||[])[0]+"..."}
            style={{flex:1,background:"#ffffff0e",border:`1px solid ${C.border2}`,borderRadius:12,color:C.text,padding:"10px 14px",fontSize:12,outline:"none",fontFamily:"Nunito"}}/>
          <button className="tap" onClick={generate} style={{background:C.grad1,border:"none",borderRadius:12,color:C.text,fontWeight:800,padding:"10px 16px",fontSize:14,cursor:"pointer"}}>?</button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {(SUGG[mode]||[]).map(s=>(
            <div key={s} className="tap" onClick={()=>setPrompt(s)} style={{background:"#ffffff09",borderRadius:20,padding:"4px 12px",color:C.muted,fontSize:10,cursor:"pointer",border:`1px solid ${C.border}`}}>{s}</div>
          ))}
        </div>
      </div>

      {generating&&(
        <div style={{textAlign:"center",padding:30,animation:"fadeIn .3s"}}>
          <div style={{fontSize:36,animation:"spin 1s linear infinite",display:"inline-block",color:C.cyan}}>?</div>
          <div style={{color:C.muted,fontSize:13,marginTop:10,fontFamily:"Nunito"}}>Generating with AI...</div>
          <div style={{width:180,height:3,background:C.border,borderRadius:2,margin:"12px auto 0",overflow:"hidden"}}>
            <div style={{height:"100%",background:C.grad2,borderRadius:2,backgroundSize:"300% 100%",animation:"shimmer 1.2s linear infinite"}}/>
          </div>
        </div>
      )}

      {result&&!generating&&(
        <div style={{animation:"bounceIn .4s ease",marginBottom:18}}>
          <div style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:10,fontFamily:"Rajdhani,sans-serif"}}>? Your AI Generation</div>
          <div style={{height:190,borderRadius:20,background:result,position:"relative",overflow:"hidden",border:`2px solid ${C.cyan}55`,boxShadow:`0 0 28px ${C.cyan}35`}}>
            <Orbs/>
            {mode==="lockscreen"&&(
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:5}}>
                <div style={{color:"#ffffffc0",fontSize:12}}>12:45</div>
                <div style={{color:C.text,fontWeight:800,fontSize:15,fontFamily:"Rajdhani,sans-serif",textAlign:"center",padding:"0 30px",marginTop:8,textShadow:"0 2px 8px #000b"}}>{quote}</div>
              </div>
            )}
            {effects.includes("Glow")&&<div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 50%,#ffffff10,transparent 70%)",zIndex:4}}/>}
            {effects.includes("Blur")&&<div style={{position:"absolute",inset:0,backdropFilter:"blur(2px)",zIndex:4}}/>}
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {[["??","Save",()=>{toast("?? Saved! +5 coins");setCoins(c=>c+5);}],["?","Apply",()=>toast("? Applied as wallpaper!")],["??","Remix",()=>{setResult(GRADS[Math.floor(Math.random()*GRADS.length)]);toast("?? Remixed!");}],["??","Share",()=>toast("?? Shared!")]].map(([icon,label,action])=>(
              <button key={label} className="tap" onClick={action} style={{flex:1,background:label==="Apply"?C.grad2:"#ffffff0a",border:label==="Apply"?"none":`1px solid ${C.border}`,borderRadius:12,color:C.text,padding:"8px 0",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>{icon} {label}</button>
            ))}
          </div>
          {/* Effects */}
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {["Glow","Blur","Vignette"].map(fx=>(
              <div key={fx} className="tap" onClick={()=>{toggleEffect(fx);toast(`${effects.includes(fx)?"Removed":"Added"} ${fx}`);}} style={{
                flex:1,background:effects.includes(fx)?`${C.cyan}20`:"#ffffff0a",
                border:effects.includes(fx)?`1px solid ${C.cyan}`:`1px solid ${C.border}`,
                borderRadius:10,padding:"7px 0",textAlign:"center",color:effects.includes(fx)?C.cyan:C.muted,fontSize:10,fontWeight:700,cursor:"pointer",
              }}>{fx}</div>
            ))}
          </div>
        </div>
      )}

      {/* Photo ? Sticker */}
      {mode==="sticker"&&(
        <div style={{background:C.card,borderRadius:20,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
          <div style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:4,fontFamily:"Rajdhani,sans-serif"}}>?? Photo ? Sticker</div>
          <div style={{color:C.muted,fontSize:11,marginBottom:12}}>Upload any photo, AI removes background instantly</div>
          {uploadStage===0&&<button className="tap" onClick={handleUpload} style={{width:"100%",background:"#ffffff09",border:`2px dashed ${C.border2}`,borderRadius:14,color:C.text,fontWeight:700,padding:"20px 0",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>?? Upload Photo</button>}
          {uploadStage===1&&<div style={{textAlign:"center",padding:20}}><div style={{fontSize:28,animation:"spin 1s linear infinite",display:"inline-block",color:C.cyan}}>?</div><div style={{color:C.muted,fontSize:12,marginTop:8}}>Removing background...</div></div>}
          {uploadStage===2&&(
            <div style={{animation:"bounceIn .4s ease"}}>
              <div style={{width:80,height:80,borderRadius:20,background:C.grad1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,margin:"0 auto 12px",boxShadow:`0 0 24px ${C.pink}55`}}>??</div>
              <div style={{color:C.green,fontWeight:700,fontSize:12,textAlign:"center",fontFamily:"Rajdhani,sans-serif",marginBottom:12}}>? Sticker Ready!</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {["Outline Glow","Cartoon Filter","Animated Export","Emoji Reaction"].map(fx=>(
                  <div key={fx} className="tap" onClick={()=>toast(`? ${fx} applied!`)} style={{background:"#ffffff09",border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 10px",textAlign:"center",color:C.muted,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>{fx}</div>
                ))}
              </div>
              <div style={{display:"flex",gap:8,marginTop:12}}>
                <button className="tap" onClick={()=>toast("? Added to WhatsApp!")} style={{flex:1,background:"#25D366",border:"none",borderRadius:12,color:C.text,fontWeight:800,padding:"11px 0",fontSize:11,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>WhatsApp</button>
                <button className="tap" onClick={()=>toast("? Added to Telegram!")} style={{flex:1,background:"#229ED9",border:"none",borderRadius:12,color:C.text,fontWeight:800,padding:"11px 0",fontSize:11,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Telegram</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lock Screen Quote */}
      {mode==="lockscreen"&&(
        <div style={{background:C.card,borderRadius:20,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
          <div style={{color:C.text,fontWeight:700,fontSize:13,marginBottom:10,fontFamily:"Rajdhani,sans-serif"}}>?? Quote Generator</div>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            {["minimal","neon","dark","glass"].map(st=>(
              <Pill key={st} active={quoteStyle===st} onClick={()=>{setQuoteStyle(st);toast(`Style: ${st}`);}} style={{fontSize:10,padding:"4px 10px"}}>{st}</Pill>
            ))}
          </div>
          {QUOTES.map((q,i)=>(
            <div key={i} className="tap" onClick={()=>{setQuote(q);toast("? Quote selected!");}} style={{
              background:q===quote?"#ffffff14":"#ffffff06",border:q===quote?`1px solid ${C.cyan}60`:`1px solid ${C.border}`,
              borderRadius:12,padding:"10px 14px",marginBottom:8,cursor:"pointer",color:q===quote?C.text:C.muted,fontSize:11,fontFamily:"Nunito",
            }}>"{q}"</div>
          ))}
        </div>
      )}

      {/* Customizer Tools */}
      <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>?? Wallpaper Customizer</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[
          {icon:"??",label:"Add Quote",fn:()=>setMode("lockscreen")},
          {icon:"??",label:"Gradients",fn:()=>toast("?? Gradient picker opened!")},
          {icon:"??",label:"Glass Blur",fn:()=>toast("?? Glass blur applied!")},
          {icon:"?",label:"Stickers",fn:()=>navigate("stickers")},
          {icon:"??",label:"Clock Widget",fn:()=>toast("?? Clock widget added!")},
          {icon:"?",label:"Glow FX",fn:()=>toast("? Neon glow applied!")},
        ].map((t,i)=>(
          <div key={i} className="tap" onClick={t.fn} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 10px",textAlign:"center",cursor:"pointer",transition:"transform .15s"}}>
            <div style={{fontSize:22,marginBottom:6}}>{t.icon}</div>
            <div style={{color:C.muted,fontSize:10,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ------------- TRENDING ------------- */
function TrendingScreen({navigate,toast}){
  const [view,setView]=useState("today");
  const [community,setCommunity]=useState(COMMUNITY.map(c=>({...c})));
  const sorted=[...WALLPAPERS].sort((a,b)=>(b.dl*3+b.likes*2)-(a.dl*3+a.likes*2));

  const toggleFollow=(id)=>{
    setCommunity(prev=>prev.map(c=>c.id===id?{...c,following:!c.following}:c));
    const user=community.find(c=>c.id===id);
    toast(user.following?`Unfollowed ${user.user}`:`? Following ${user.user}!`);
  };

  return(
    <div style={{flex:1,overflowY:"auto",padding:"16px 14px 80px"}}>
      <div style={{color:C.text,fontWeight:700,fontSize:24,fontFamily:"Rajdhani,sans-serif",marginBottom:4}}>?? Trending</div>
      <div style={{color:C.muted,fontSize:11,marginBottom:16}}>score = downloads×3 + likes×2 + shares</div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["today","?? Today"],["week","? Weekly"],["picks","?? Creator Picks"]].map(([v,l])=>(
          <Pill key={v} active={view===v} onClick={()=>setView(v)} style={{background:view===v?C.grad3:""}}>{l}</Pill>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        {sorted.map((wp,i)=>(
          <div key={wp.id} className="tap" onClick={()=>navigate("wallpaperDetail",{wp})} style={{borderRadius:20,background:wp.grad,height:158,position:"relative",overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,animation:`fadeUp ${i*.05}s ease both`,boxShadow:"0 5px 20px #0007"}}>
            <div style={{position:"absolute",top:10,left:10,background:"#000000c0",backdropFilter:"blur(8px)",borderRadius:11,padding:"3px 10px",color:C.gold,fontWeight:800,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>#{i+1}</div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000d)",padding:"20px 12px 10px"}}>
              <div style={{color:C.text,fontWeight:800,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{wp.title}</div>
              <div style={{color:"#ffffff70",fontSize:9}}>Score: {wp.dl*3+wp.likes*2}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:18}}>
        <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>?? Seasonal Collections</div>
        {[{label:"?? Diwali Special",grad:"linear-gradient(90deg,#f7971e,#ffd200)",pack:STICKER_PACKS[1]},{label:"?? Valentine's Day",grad:"linear-gradient(90deg,#f093fb,#f5576c)",pack:null},{label:"?? Cricket World Cup",grad:"linear-gradient(90deg,#43e97b,#38f9d7)",pack:STICKER_PACKS[4]}].map((c,i)=>(
          <div key={i} className="tap" onClick={()=>c.pack?navigate("stickerPackDetail",{pack:c.pack}):toast("?? Collection loading!")} style={{borderRadius:16,background:c.grad,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,cursor:"pointer"}}>
            <div style={{color:C.text,fontWeight:800,fontSize:14,fontFamily:"Rajdhani,sans-serif"}}>{c.label}</div>
            <div style={{color:"#ffffffc0",fontSize:11}}>View ?</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>?? Community Feed</div>
        {community.map((p,i)=>(
          <div key={p.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:"12px 14px",marginBottom:10,animation:`fadeUp ${i*.07}s ease both`}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:C.grad1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,border:`2px solid ${C.border2}`}}>{p.avatar}</div>
              <div style={{flex:1}}>
                <div style={{color:C.text,fontWeight:700,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>{p.user}</div>
                <div style={{color:C.muted,fontSize:10}}>{p.time}</div>
              </div>
              <div className="tap" onClick={()=>toggleFollow(p.id)} style={{
                background:p.following?C.grad2:"#ffffff10",border:p.following?"none":`1px solid ${C.border}`,
                borderRadius:20,padding:"5px 14px",color:C.text,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",
              }}>{p.following?"Following":"Follow"}</div>
            </div>
            <div className="tap" onClick={()=>navigate("wallpaperDetail",{wp:p.wp})} style={{height:120,borderRadius:14,background:p.wp.grad,cursor:"pointer",position:"relative",overflow:"hidden",marginBottom:10}}>
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000c)",padding:"20px 12px 10px"}}>
                <div style={{color:C.text,fontSize:12,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{p.wp.title}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:12}}>
              <span style={{color:C.pink,fontSize:11}}>?? {p.likes}</span>
              <span style={{color:C.cyan,fontSize:11}}>?? {p.saved}</span>
              <span className="tap" onClick={()=>toast("?? Shared!")} style={{color:C.muted,fontSize:11,cursor:"pointer"}}>?? Share</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ------------- STICKERS SCREEN ------------- */
function StickersScreen({navigate,toast,setCoins}){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [claimed,setClaimed]=useState(false);

  const filtered=STICKER_PACKS.filter(p=>{
    const matchSearch=p.name.toLowerCase().includes(search.toLowerCase());
    if(cat==="All")return matchSearch;
    const catMap={Animals:"animal",Festivals:"diwali",Moods:"mood",Food:"food",Sports:"cricket",Love:"love"};
    return matchSearch&&p.name.toLowerCase().includes(catMap[cat]||cat.toLowerCase());
  });

  return(
    <div style={{flex:1,overflowY:"auto",padding:"16px 14px 80px"}}>
      <div style={{color:C.text,fontWeight:700,fontSize:24,fontFamily:"Rajdhani,sans-serif",marginBottom:12}}>? Sticker Studio</div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sticker packs..."
        style={{width:"100%",background:"#ffffff09",border:`1px solid ${C.border2}`,borderRadius:14,color:C.text,padding:"11px 16px",fontSize:12,outline:"none",fontFamily:"Nunito",marginBottom:12}}/>
      <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto"}}>
        {["All","Animals","Festivals","Moods","Food","Sports","Love"].map(c=><Pill key={c} active={cat===c} onClick={()=>setCat(c)}>{c}</Pill>)}
      </div>

      <div className="tap" onClick={()=>{if(claimed)return;setClaimed(true);setCoins(c=>c+50);toast("?? Free pack claimed! +50 coins");}} style={{
        background:claimed?"#ffffff08":"linear-gradient(90deg,#ff008015,#a855f715)",
        border:`1px solid ${claimed?"#ffffff15":"#ff008040"}`,
        borderRadius:18,padding:"14px 16px",marginBottom:16,cursor:"pointer",
        display:"flex",justifyContent:"space-between",alignItems:"center",
      }}>
        <div>
          <div style={{color:claimed?C.muted:C.text,fontWeight:800,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>{claimed?"? Claimed!":"?? Daily Free Pack — Claim Now!"}</div>
          <div style={{color:C.muted,fontSize:11,marginTop:2}}>{claimed?"Come back tomorrow":"18 Diwali stickers · Expires in 6h 42m"}</div>
        </div>
        {!claimed&&<div style={{background:C.gradGold,borderRadius:12,padding:"8px 14px",color:"#000",fontWeight:800,fontSize:11,fontFamily:"Rajdhani,sans-serif",flexShrink:0}}>Claim!</div>}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {filtered.map((pack,i)=>(
          <div key={pack.id} className="tap" onClick={()=>navigate("stickerPackDetail",{pack})} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:"14px 14px 12px",cursor:"pointer",animation:`fadeUp ${i*.06}s ease both`}}>
            <div style={{width:52,height:52,borderRadius:16,background:pack.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:10,boxShadow:"0 4px 14px #0006"}}>{pack.emoji}</div>
            {pack.trending&&<Badge color={C.pink}>?? TRENDING</Badge>}
            <div style={{color:C.text,fontSize:13,fontWeight:700,fontFamily:"Rajdhani,sans-serif",marginTop:6}}>{pack.name}</div>
            <div style={{color:C.muted,fontSize:10,marginTop:2}}>{pack.count} stickers</div>
            <button className="tap" onClick={e=>{e.stopPropagation();toast("? Pack added!");}} style={{marginTop:10,width:"100%",background:C.grad2,border:"none",borderRadius:10,color:C.text,fontSize:10,fontWeight:700,padding:"7px 0",cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Get Pack</button>
          </div>
        ))}
      </div>

      {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.muted,fontSize:13}}>No packs found for "{search}"</div>}

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:16}}>
        <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:4}}>?? Quick Integration</div>
        <div style={{color:C.muted,fontSize:11,marginBottom:12}}>One tap to add any pack to your messaging app</div>
        <div style={{display:"flex",gap:8}}>
          <button className="tap" onClick={()=>toast("? Opening WhatsApp...")} style={{flex:1,background:"#25D366",border:"none",borderRadius:12,color:C.text,fontWeight:800,padding:"11px 0",fontSize:11,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>? WhatsApp</button>
          <button className="tap" onClick={()=>toast("? Opening Telegram...")} style={{flex:1,background:"#229ED9",border:"none",borderRadius:12,color:C.text,fontWeight:800,padding:"11px 0",fontSize:11,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>? Telegram</button>
        </div>
      </div>
    </div>
  );
}

/* ------------- WALLPAPERS SCREEN ------------- */
function WallpapersScreen({navigate,toast}){
  const [cat,setCat]=useState("All");
  const [autoChanger,setAutoChanger]=useState(null);
  const [likedMap,setLikedMap]=useState({});
  const filtered=WALLPAPERS.filter(w=>cat==="All"||w.cat===cat);

  const toggleLike=(id,e)=>{
    e.stopPropagation();
    setLikedMap(m=>{const n=!m[id];toast(n?"?? Liked!":"?? Unliked");return{...m,[id]:n};});
  };

  return(
    <div style={{flex:1,overflowY:"auto",padding:"16px 14px 80px"}}>
      <div style={{color:C.text,fontWeight:700,fontSize:24,fontFamily:"Rajdhani,sans-serif",marginBottom:12}}>? Wallpapers</div>
      <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto"}}>
        {["All","AMOLED","Anime","Minimal","Nature","Cyberpunk","Aesthetic"].map(c=><Pill key={c} active={cat===c} onClick={()=>setCat(c)}>{c}</Pill>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>
        {filtered.map((wp,i)=>(
          <div key={wp.id} className="tap" onClick={()=>navigate("wallpaperDetail",{wp})} style={{borderRadius:20,background:wp.grad,height:170,position:"relative",overflow:"hidden",cursor:"pointer",boxShadow:"0 6px 22px #0006",border:`1px solid ${C.border}`,animation:`fadeUp ${i*.06}s ease both`}}>
            <div className="tap" onClick={e=>toggleLike(wp.id,e)} style={{position:"absolute",top:10,right:10,background:"#000000b0",backdropFilter:"blur(8px)",borderRadius:10,padding:"5px 8px",fontSize:14,zIndex:5,cursor:"pointer"}}>{likedMap[wp.id]?"??":"??"}</div>
            <div style={{position:"absolute",top:10,left:10,background:C.grad2,borderRadius:20,padding:"3px 8px",fontSize:9,color:C.text,fontWeight:700,zIndex:5}}>{wp.cat}</div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000d)",padding:"20px 12px 10px",zIndex:5}}>
              <div style={{color:C.text,fontWeight:800,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{wp.title}</div>
              <div style={{color:"#ffffff70",fontSize:9}}>? {(wp.dl/1000).toFixed(1)}k · ? {(wp.likes/1000).toFixed(1)}k</div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.muted}}>No wallpapers in "{cat}" yet</div>}

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:16}}>
        <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:4}}>?? Auto Wallpaper Changer</div>
        <div style={{color:C.muted,fontSize:11,marginBottom:12}}>Smart auto-rotation for your wallpaper</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {["Every Hour","Daily","On Unlock","By Time of Day"].map(o=>(
            <div key={o} className="tap" onClick={()=>{setAutoChanger(o===autoChanger?null:o);toast(o===autoChanger?"?? Auto changer off":`?? Set to: ${o}`);}} style={{
              background:autoChanger===o?"linear-gradient(90deg,#00d4ff18,#a855f718)":C.card,
              border:autoChanger===o?`1px solid ${C.cyan}60`:`1px solid ${C.border}`,
              borderRadius:12,padding:"10px 12px",cursor:"pointer",color:autoChanger===o?C.cyan:C.muted,
              fontSize:11,fontWeight:700,fontFamily:"Rajdhani,sans-serif",textAlign:"center",transition:"all .2s",
            }}>{o}</div>
          ))}
        </div>
        {autoChanger==="By Time of Day"&&(
          <div style={{padding:12,background:"#ffffff07",borderRadius:12,border:`1px solid ${C.border}`,animation:"fadeIn .3s"}}>
            {[["?? Morning","Nature wallpaper","6AM–12PM"],["?? Afternoon","Minimal wallpaper","12PM–6PM"],["?? Night","AMOLED dark","6PM–6AM"]].map(([t,w,h])=>(
              <div key={t} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.text,fontSize:11}}>{t}</span>
                <span style={{color:C.cyan,fontSize:10}}>{w}</span>
                <span style={{color:C.muted,fontSize:10}}>{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
/* ------------- PROFILE SCREEN ------------- */
function ProfileScreen({coins,setCoins,toast,navigate}){
  const [claimed,setClaimed]=useState(false);
  const [notifOn,setNotifOn]=useState(true);
  const [section,setSection]=useState("overview");
  const [likedWps]=useState([WALLPAPERS[0],WALLPAPERS[4],WALLPAPERS[2]]);
  const [rewardHistory]=useState([{label:"Daily login",coins:50,time:"Today"},{label:"Wallpaper upload",coins:20,time:"Yesterday"},{label:"Content shared",coins:10,time:"2 days ago"}]);

  return(
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0f0c29,#302b63,#ff008018)",padding:"20px 20px 22px",position:"relative",overflow:"hidden"}}>
        <Orbs/>
        <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{width:66,height:66,borderRadius:"50%",background:C.grad1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,border:"3px solid #ffffff30",boxShadow:`0 0 24px ${C.pink}55`,color:C.text,fontFamily:"Rajdhani,sans-serif",flexShrink:0}}>P</div>
          <div style={{flex:1}}>
            <div style={{color:C.text,fontWeight:700,fontSize:20,fontFamily:"Rajdhani,sans-serif"}}>PixelStar</div>
            <Badge color={C.purple}>? PRO MEMBER</Badge>
            <div style={{color:C.muted,fontSize:11,marginTop:4}}>1.2k followers · 48 uploads</div>
          </div>
          <div className="tap" onClick={()=>toast("?? Settings opened!")} style={{background:"#ffffff10",border:`1px solid ${C.border}`,borderRadius:12,padding:"8px 10px",cursor:"pointer",fontSize:16,flexShrink:0}}>??</div>
        </div>
        <div style={{position:"relative",zIndex:1,display:"flex",gap:8}}>
          {[{val:coins,sub:"?? Coins",col:C.gold},{val:"48",sub:"?? Uploads",col:C.cyan},{val:"7",sub:"?? Streak",col:C.green},{val:"1.2k",sub:"?? Follows",col:C.purple}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#ffffff0e",borderRadius:12,padding:"10px 4px",textAlign:"center",border:`1px solid ${C.border}`}}>
              <div style={{color:s.col,fontWeight:800,fontSize:15,fontFamily:"Rajdhani,sans-serif"}}>{s.val}</div>
              <div style={{color:C.muted,fontSize:9}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 0"}}>
        {/* Daily Reward */}
        <div className="tap" onClick={()=>{if(claimed)return;setClaimed(true);setCoins(c=>c+50);toast("?? +50 coins claimed!");}} style={{
          background:claimed?"#ffffff07":"linear-gradient(90deg,#f7971e16,#ffd20016)",
          border:`1px solid ${claimed?"#ffffff12":"#ffd20040"}`,
          borderRadius:18,padding:"14px 16px",marginBottom:14,
          display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",
        }}>
          <div>
            <div style={{color:claimed?C.muted:C.gold,fontWeight:800,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>{claimed?"? Reward Claimed!":"?? Daily Login Reward"}</div>
            <div style={{color:C.muted,fontSize:11,marginTop:2}}>{claimed?"Come back tomorrow":"+50 coins for logging in today!"}</div>
          </div>
          {!claimed&&<div style={{background:C.gradGold,borderRadius:12,padding:"8px 14px",color:"#000",fontWeight:800,fontSize:11,fontFamily:"Rajdhani,sans-serif",flexShrink:0}}>Claim!</div>}
        </div>

        {/* Section tabs */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[["overview","Overview"],["library","Library"],["rewards","Rewards"],["uploads","Uploads"]].map(([v,l])=>(
            <Pill key={v} active={section===v} onClick={()=>setSection(v)} style={{fontSize:10,padding:"5px 10px"}}>{l}</Pill>
          ))}
        </div>

        {section==="overview"&&(
          <>
            <div style={{marginBottom:16}}>
              <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>?? Achievements</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[{icon:"??",label:"Creator",desc:"Uploaded 5 walls"},{icon:"??",label:"Trending",desc:"1 wallpaper viral"},{icon:"??",label:"Streak 7",desc:"7-day login"},{icon:"??",label:"Pro Member",desc:"Premium sub"}].map((a,i)=>(
                  <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"12px 14px",display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{fontSize:22}}>{a.icon}</div>
                    <div><div style={{color:C.text,fontWeight:700,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{a.label}</div><div style={{color:C.muted,fontSize:10}}>{a.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:"14px 16px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:C.text,fontWeight:700,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>?? Notifications</div><div style={{color:C.muted,fontSize:11,marginTop:2}}>Trending alerts & new packs</div></div>
              <Toggle on={notifOn} onToggle={()=>{setNotifOn(!notifOn);toast(notifOn?"?? Notifications off":"?? Notifications on");}}/>
            </div>
            <div style={{background:"linear-gradient(135deg,#a855f7,#6366f1,#00d4ff)",borderRadius:20,padding:"18px 18px",animation:"glow 2.5s infinite"}}>
              <div style={{color:C.text,fontWeight:700,fontSize:18,fontFamily:"Rajdhani,sans-serif"}}>?? PersonalizeHub Pro</div>
              <div style={{color:"#ffffffd0",fontSize:11,marginTop:4,marginBottom:14}}>No ads · Exclusive walls · Unlimited creation</div>
              <div style={{color:C.text,fontWeight:700,fontSize:26,fontFamily:"Rajdhani,sans-serif",marginBottom:14}}>?99<span style={{fontSize:13,fontWeight:400}}>/month</span></div>
              <button className="tap" onClick={()=>toast("?? Upgrade flow starting!")} style={{background:"#fff",border:"none",borderRadius:12,color:"#a855f7",fontWeight:900,padding:"12px 0",fontSize:13,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",width:"100%"}}>Upgrade to Pro ?</button>
            </div>
          </>
        )}

        {section==="library"&&(
          <div>
            <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:12}}>?? Favorite Wallpapers</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
              {likedWps.map((wp,i)=>(
                <div key={i} className="tap" onClick={()=>navigate("wallpaperDetail",{wp})} style={{height:90,borderRadius:14,background:wp.grad,cursor:"pointer",border:`1px solid ${C.border}`}}/>
              ))}
            </div>
            {[{icon:"??",label:"My Creations",count:12,col:C.purple},{icon:"??",label:"Downloads",count:36,col:C.cyan},{icon:"??",label:"Recently Used",count:8,col:C.gold}].map((f,i)=>(
              <div key={i} className="tap" onClick={()=>navigate("wallpapers")} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:12,background:`${f.col}18`,border:`1px solid ${f.col}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{f.icon}</div>
                  <div><div style={{color:C.text,fontWeight:700,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>{f.label}</div><div style={{color:C.muted,fontSize:11}}>{f.count} items</div></div>
                </div>
                <div style={{color:C.muted,fontSize:18}}>›</div>
              </div>
            ))}
          </div>
        )}

        {section==="rewards"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#f7971e20,#ffd20020)",border:`1px solid ${C.gold}40`,borderRadius:20,padding:16,marginBottom:16,textAlign:"center"}}>
              <div style={{color:C.gold,fontWeight:800,fontSize:36,fontFamily:"Rajdhani,sans-serif"}}>{coins} ??</div>
              <div style={{color:C.muted,fontSize:12}}>Total Coins Earned</div>
              <button className="tap" onClick={()=>toast("?? Redeeming coins!")} style={{marginTop:12,background:C.gradGold,border:"none",borderRadius:12,color:"#000",fontWeight:800,padding:"10px 28px",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif"}}>Redeem Coins</button>
            </div>
            <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>How to Earn</div>
            {[{icon:"??",label:"Daily Login",coins:50},{icon:"??",label:"Upload Wallpaper",coins:20},{icon:"??",label:"Watch Ad",coins:10},{icon:"??",label:"Share Content",coins:10}].map((r,i)=>(
              <div key={i} className="tap" onClick={()=>{setCoins(c=>c+r.coins);toast(`+${r.coins} coins!`);}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:20}}>{r.icon}</span>
                  <span style={{color:C.text,fontSize:13,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{r.label}</span>
                </div>
                <span style={{color:C.gold,fontWeight:800,fontSize:13,fontFamily:"Rajdhani,sans-serif"}}>+{r.coins} ??</span>
              </div>
            ))}
            <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",margin:"14px 0 10px"}}>Recent Activity</div>
            {rewardHistory.map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.text,fontSize:12,fontFamily:"Nunito"}}>{r.label}</span>
                <div style={{textAlign:"right"}}><div style={{color:C.gold,fontSize:12,fontWeight:700}}>+{r.coins}</div><div style={{color:C.muted,fontSize:10}}>{r.time}</div></div>
              </div>
            ))}
          </div>
        )}

        {section==="uploads"&&(
          <div>
            <button className="tap" onClick={()=>toast("?? Upload dialog opened!")} style={{width:"100%",background:"#ffffff09",border:`2px dashed ${C.border2}`,borderRadius:16,color:C.text,fontWeight:700,padding:"22px 0",fontSize:13,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",marginBottom:14}}>+ Upload Wallpaper / Sticker Pack</button>
            <div style={{color:C.text,fontWeight:700,fontSize:14,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>My Uploads</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {WALLPAPERS.slice(0,4).map((wp,i)=>(
                <div key={i} className="tap" onClick={()=>navigate("wallpaperDetail",{wp})} style={{borderRadius:16,background:wp.grad,height:120,position:"relative",overflow:"hidden",border:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent,#000c)",display:"flex",alignItems:"flex-end",padding:10}}>
                    <div style={{color:C.text,fontSize:10,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{wp.title}</div>
                  </div>
                  <div style={{position:"absolute",top:8,right:8,background:"#000000b0",borderRadius:8,padding:"3px 8px",color:C.cyan,fontSize:9,fontWeight:700}}>? {(wp.dl/1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/* ------------- HOME ------------- */
function HomeScreen({navigate,toast,coins,setCoins}){
  const [carousel,setCarousel]=useState(0);
  const [mood,setMood]=useState(null);
  const [likedMap,setLikedMap]=useState({});

  useEffect(()=>{const t=setInterval(()=>setCarousel(c=>(c+1)%WALLPAPERS.length),3200);return()=>clearInterval(t);},[]);

  const wp=WALLPAPERS[carousel];
  const moodWps=mood?MOODS.find(m=>m.label===mood)?.wps.map(i=>WALLPAPERS[i]):null;

  return(
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      {/* Carousel */}
      <div className="tap" onClick={()=>navigate("wallpaperDetail",{wp})} style={{height:210,background:wp.grad,position:"relative",overflow:"hidden",borderRadius:"0 0 28px 28px",cursor:"pointer",transition:"background .7s ease"}}>
        <Orbs/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#08080f)",padding:"40px 20px 16px",zIndex:5}}>
          <Badge color={C.cyan}>{wp.cat}</Badge>
          <div style={{color:C.text,fontWeight:700,fontSize:22,fontFamily:"Rajdhani,sans-serif",marginTop:5,lineHeight:1.1}}>{wp.title}</div>
          <div style={{color:"#ffffff90",fontSize:11,marginTop:4}}>Tap to view · ? {(wp.dl/1000).toFixed(1)}k</div>
        </div>
        <div className="tap" onClick={e=>{e.stopPropagation();toast("? Wallpaper applied!");}} style={{position:"absolute",bottom:14,right:14,zIndex:6,background:C.grad2,border:"none",borderRadius:14,color:C.text,fontWeight:800,padding:"10px 16px",fontSize:12,cursor:"pointer",fontFamily:"Rajdhani,sans-serif",animation:"glow 2s infinite"}}>Apply ?</div>
        <div style={{position:"absolute",bottom:15,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5,zIndex:5}}>
          {WALLPAPERS.map((_,i)=><div key={i} onClick={e=>{e.stopPropagation();setCarousel(i);}} style={{width:i===carousel?18:6,height:6,borderRadius:3,background:i===carousel?"#fff":"#ffffff50",cursor:"pointer",transition:"all .3s"}}/>) }
        </div>
      </div>

      <div style={{padding:"16px 14px 0"}}>
        {/* Quick Actions */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {l:"AI Sticker Maker",icon:"??",bg:"linear-gradient(135deg,#f093fb,#f5576c)",sub:"Photo ? Sticker",fn:()=>navigate("create")},
            {l:"AI Wallpaper",icon:"?",bg:"linear-gradient(135deg,#4facfe,#00f2fe)",sub:"Type a prompt",fn:()=>navigate("create")},
            {l:"Daily Free Pack",icon:"??",bg:"linear-gradient(135deg,#43e97b,#38f9d7)",sub:"Claim reward",fn:()=>{toast("?? Pack claimed! +50 coins");setCoins(c=>c+50);}},
            {l:"Auto Changer",icon:"??",bg:"linear-gradient(135deg,#f7971e,#ffd200)",sub:"Smart rotation",fn:()=>navigate("wallpapers")},
          ].map((a,i)=>(
            <div key={i} className="tap" onClick={a.fn} style={{borderRadius:18,background:a.bg,padding:"14px 14px",cursor:"pointer",boxShadow:"0 4px 16px #0005",animation:`fadeUp ${.1+i*.07}s ease both`}}>
              <div style={{fontSize:24,marginBottom:4}}>{a.icon}</div>
              <div style={{color:C.text,fontWeight:800,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{a.l}</div>
              <div style={{color:"#ffffffb0",fontSize:10,marginTop:2}}>{a.sub}</div>
            </div>
          ))}
        </div>

        {/* Mood */}
        <div style={{marginBottom:20}}>
          <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif",marginBottom:10}}>?? What's Your Mood?</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
            {MOODS.map(m=>(
              <div key={m.label} className="tap" onClick={()=>{const next=m.label===mood?null:m.label;setMood(next);if(next)toast(`${m.emoji} Showing ${m.label} wallpapers!`);}} style={{
                flexShrink:0,borderRadius:16,
                background:mood===m.label?`linear-gradient(135deg,${m.color}55,${m.color}28)`:"#ffffff0a",
                border:mood===m.label?`1px solid ${m.color}70`:`1px solid ${C.border}`,
                padding:"10px 14px",cursor:"pointer",textAlign:"center",transition:"all .2s",
              }}>
                <div style={{fontSize:20}}>{m.emoji}</div>
                <div style={{color:C.text,fontSize:10,fontWeight:700,marginTop:4,fontFamily:"Rajdhani,sans-serif"}}>{m.label}</div>
              </div>
            ))}
          </div>
          {moodWps&&(
            <div style={{marginTop:12,animation:"fadeIn .3s"}}>
              <div style={{display:"flex",gap:10,overflowX:"auto"}}>
                {moodWps.map((w,i)=>(
                  <div key={i} className="tap" onClick={()=>navigate("wallpaperDetail",{wp:w})} style={{flexShrink:0,width:110,height:150,borderRadius:16,background:w.grad,cursor:"pointer",border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000c)",padding:"16px 8px 8px"}}><div style={{color:C.text,fontSize:10,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{w.title}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trending Walls */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif"}}>?? Trending Walls</div>
            <div className="tap" onClick={()=>navigate("wallpapers")} style={{color:C.cyan,fontSize:11,fontWeight:700,cursor:"pointer"}}>See all ?</div>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
            {WALLPAPERS.map((w,i)=>(
              <div key={w.id} className="tap" onClick={()=>navigate("wallpaperDetail",{wp:w})} style={{flexShrink:0,width:120,height:175,borderRadius:18,background:w.grad,position:"relative",overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,animation:`fadeUp ${i*.04}s ease both`}}>
                <div className="tap" onClick={e=>{e.stopPropagation();setLikedMap(m=>{const n=!m[w.id];toast(n?"??":"??");return{...m,[w.id]:n};});}} style={{position:"absolute",top:8,right:8,background:"#000000b0",borderRadius:8,padding:"3px 7px",fontSize:12,zIndex:5,cursor:"pointer"}}>{likedMap[w.id]?"??":"??"}</div>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#000c)",padding:"18px 10px 10px",zIndex:5}}>
                  <div style={{color:C.text,fontSize:11,fontWeight:700,fontFamily:"Rajdhani,sans-serif"}}>{w.title}</div>
                  <div style={{color:"#ffffff70",fontSize:9}}>? {(w.dl/1000).toFixed(1)}k</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticker Packs */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif"}}>? Hot Sticker Packs</div>
            <div className="tap" onClick={()=>navigate("stickers")} style={{color:C.cyan,fontSize:11,fontWeight:700,cursor:"pointer"}}>See all ?</div>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
            {STICKER_PACKS.map((p,i)=>(
              <div key={p.id} className="tap" onClick={()=>navigate("stickerPackDetail",{pack:p})} style={{flexShrink:0,width:120,background:C.card,borderRadius:18,border:`1px solid ${C.border}`,padding:"14px 12px",cursor:"pointer",animation:`fadeUp ${i*.04}s ease both`}}>
                <div style={{width:44,height:44,borderRadius:14,background:p.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:8,boxShadow:"0 4px 12px #0006"}}>{p.emoji}</div>
                {p.trending&&<Badge color={C.pink}>??</Badge>}
                <div style={{color:C.text,fontSize:11,fontWeight:700,fontFamily:"Rajdhani,sans-serif",marginTop:6}}>{p.name}</div>
                <div style={{color:C.muted,fontSize:9,marginTop:2}}>{p.count} stickers</div>
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.text,fontWeight:700,fontSize:15,fontFamily:"Rajdhani,sans-serif"}}>?? Community</div>
            <div className="tap" onClick={()=>navigate("trending")} style={{color:C.cyan,fontSize:11,fontWeight:700,cursor:"pointer"}}>View all ?</div>
          </div>
          {COMMUNITY.slice(0,2).map((p,i)=>(
            <div key={p.id} className="tap" onClick={()=>navigate("wallpaperDetail",{wp:p.wp})} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:"12px 14px",marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:52,height:52,borderRadius:14,background:p.wp.grad,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:C.grad1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>{p.avatar}</div>
                  <span style={{color:C.text,fontWeight:700,fontSize:12,fontFamily:"Rajdhani,sans-serif"}}>{p.user}</span>
                  <span style={{color:C.muted,fontSize:10}}>{p.time}</span>
                </div>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>{p.wp.title}</div>
                <div style={{display:"flex",gap:10}}>
                  <span style={{color:C.pink,fontSize:10}}>?? {p.likes}</span>
                  <span style={{color:C.cyan,fontSize:10}}>?? {p.saved}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------- MAIN APP ------------- */
const TABS=[
  {id:"home",label:"Home",icon:"?"},
  {id:"trending",label:"Trend",icon:"??"},
  {id:"create",label:"",icon:"?"},
  {id:"stickers",label:"Stickers",icon:"?"},
  {id:"wallpapers",label:"Walls",icon:"?"},
  {id:"profile",label:"Profile",icon:"?"},
];

export default function App(){
  const [appScreen,setAppScreen]=useState("splash");
  const [tab,setTab]=useState("home");
  const [stack,setStack]=useState([]);
  const [coins,setCoins]=useState(340);
  const [toastMsg,setToastMsg]=useState("");
  const [toastShow,setToastShow]=useState(false);
  const [notif,setNotif]=useState(true);
  const toastRef=useRef(null);

  const toast=useCallback((msg)=>{
    setToastMsg(msg);setToastShow(true);
    clearTimeout(toastRef.current);
    toastRef.current=setTimeout(()=>setToastShow(false),2200);
  },[]);

  const navigate=useCallback((dest,params={})=>{
    const mainTabs=["home","trending","create","stickers","wallpapers","profile"];
    if(mainTabs.includes(dest)){setTab(dest);setStack([]);}
    else setStack(prev=>[...prev,{screen:dest,params}]);
  },[]);

  const goBack=useCallback(()=>setStack(prev=>prev.slice(0,-1)),[]);
  const top=stack[stack.length-1];

  const renderInner=()=>{
    if(!top)return null;
    const{screen:s,params}=top;
    if(s==="wallpaperDetail")return <WallpaperDetail wp={params.wp} onBack={goBack} toast={toast} setCoins={setCoins}/>;
    if(s==="stickerPackDetail")return <StickerPackDetail pack={params.pack} onBack={goBack} toast={toast}/>;
    return null;
  };

  const renderTab=()=>{
    const props={navigate,toast,coins,setCoins};
    switch(tab){
      case"home":      return <HomeScreen {...props}/>;
      case"trending":  return <TrendingScreen {...props}/>;
      case"create":    return <CreateScreen {...props}/>;
      case"stickers":  return <StickersScreen {...props}/>;
      case"wallpapers":return <WallpapersScreen {...props}/>;
      case"profile":   return <ProfileScreen {...props}/>;
      default:         return <HomeScreen {...props}/>;
    }
  };

  return(
    <div style={{minHeight:"100vh",background:"#04040a",display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"Nunito,sans-serif"}}>
      <style>{css}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse at 25% 20%,#ff008010 0%,transparent 50%),radial-gradient(ellipse at 75% 80%,#a855f710 0%,transparent 50%)",pointerEvents:"none"}}/>

      {/* Phone Frame */}
      <div style={{width:375,height:790,background:C.bg,borderRadius:46,border:"2px solid #ffffff16",boxShadow:"0 0 80px #a855f725,0 48px 120px #00000096,inset 0 1px 0 #ffffff16",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>

        {appScreen==="splash"&&<SplashScreen onDone={()=>setAppScreen("onboard")}/>}
        {appScreen==="onboard"&&<OnboardScreen onDone={()=>setAppScreen("app")}/>}

        {appScreen==="app"&&(
          <>
            {/* Status bar */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 6px",color:C.text,fontSize:11,fontWeight:700,flexShrink:0}}>
              <div style={{fontFamily:"Rajdhani,sans-serif"}}>9:41</div>
              <div style={{width:68,height:18,background:"#111",borderRadius:9,border:`1.5px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:"#333",marginRight:2}}/></div>
              <div style={{display:"flex",gap:4,alignItems:"center",color:C.muted,fontSize:10}}><span>?</span><span>WiFi</span><span style={{color:C.green}}>100%</span></div>
            </div>

            {/* App Header */}
            {!top&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2px 18px 8px",flexShrink:0}}>
                <div style={{color:C.text,fontWeight:700,fontSize:20,fontFamily:"Rajdhani,sans-serif",letterSpacing:-.5}}>Personalize<span style={{color:C.cyan}}>Hub</span></div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div className="tap" onClick={()=>navigate("profile")} style={{background:C.gradGold,borderRadius:20,padding:"4px 10px",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:800,color:"#000",fontFamily:"Rajdhani,sans-serif",cursor:"pointer"}}>?? {coins}</div>
                  <div className="tap" onClick={()=>{setNotif(!notif);toast(notif?"?? Notifications muted":"?? Notifications on");}} style={{width:34,height:34,borderRadius:"50%",background:"#ffffff09",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,cursor:"pointer",position:"relative"}}>
                    ??
                    {notif&&<div style={{position:"absolute",top:4,right:4,width:8,height:8,borderRadius:"50%",background:C.pink,border:`1.5px solid ${C.bg}`}}/>}
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div style={{flex:1,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column"}}>
              <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>{renderTab()}</div>

              {/* Inner screen */}
              {top&&(
                <div style={{position:"absolute",inset:0,background:C.bg,display:"flex",flexDirection:"column",animation:"slideInR .22s cubic-bezier(.22,.61,.36,1)",zIndex:50}}>
                  {renderInner()}
                </div>
              )}
            </div>

            {/* Bottom nav */}
            {!top&&(
              <div style={{display:"flex",background:"#0a0a18",borderTop:`1px solid ${C.border}`,padding:"8px 4px 14px",flexShrink:0}}>
                {TABS.map(t=>(
                  <div key={t.id} className="tap" onClick={()=>{setTab(t.id);setStack([]);}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",position:"relative",padding:"4px 0"}}>
                    {t.id==="create"?(
                      <div style={{width:50,height:50,borderRadius:"50%",background:C.grad1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 0 24px #a855f766",marginTop:-20,border:`3px solid ${C.bg}`,animation:"glow 2s infinite"}}>{t.icon}</div>
                    ):(
                      <>
                        <div style={{fontSize:17,color:tab===t.id?C.cyan:C.faint,transition:"all .2s",filter:tab===t.id?`drop-shadow(0 0 5px ${C.cyan})`:"none"}}>{t.icon}</div>
                        <div style={{fontSize:9,fontWeight:700,color:tab===t.id?C.cyan:C.faint,fontFamily:"Rajdhani,sans-serif",transition:"all .2s"}}>{t.label}</div>
                        {tab===t.id&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,borderRadius:2,background:C.grad2}}/>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Toast msg={toastMsg} show={toastShow}/>
      </div>

      <div style={{position:"fixed",bottom:14,color:"#ffffff20",fontSize:10,fontFamily:"Rajdhani,sans-serif",letterSpacing:2,textTransform:"uppercase"}}>PersonalizeHub · Interactive Prototype</div>
    </div>
  );
}
