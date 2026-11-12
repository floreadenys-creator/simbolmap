import React, { useState } from 'react'

type Sym = { id: string; name: string; locks: number; live: string; photo: string; spots: { name: string; desc: string }[] }
const SYMS: Sym[] = [
  { id: 'como', name: 'Como', locks: 61, live: '128 feel love now', photo: '/como.jpg', spots: [{ name: 'Lungolago', desc: 'Lake promenade - Peak 19:00' }, { name: 'Duomo Como', desc: 'Cathedral square' }, { name: 'Bellagio', desc: 'Lake village' }, { name: 'Varenna', desc: 'Lake village' }] },
  { id: 'venice', name: 'Venice', locks: 72, live: '156 feel love now', photo: '/venice.jpg', spots: [{ name: 'San Marco', desc: 'St Mark Square' }, { name: 'Rialto Bridge', desc: 'Grand Canal' }, { name: 'Burano', desc: 'Colorful houses' }] },
  { id: 'colosseum', name: 'Colosseum', locks: 55, live: '142 feel grateful now', photo: '/colosseum.jpg', spots: [{ name: 'Colosseum Area', desc: 'Ancient Rome' }, { name: 'Roman Forum', desc: 'Ancient forum' }] },
]

export default function App() {
  const [symId, setSymId] = useState('como')
  const [showPut, setShowPut] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showLocks, setShowLocks] = useState(false)
  const [lockType, setLockType] = useState<'feeling' | 'suspended'>('feeling')
  const [feeling, setFeeling] = useState('Love')
  const [sentence, setSentence] = useState('')
  const [suspendedWhat, setSuspendedWhat] = useState('coffee')
  const [guest, setGuest] = useState(false)
  const sym = SYMS.find(s => s.id === symId) || SYMS[0]

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const pickSym = (id: string) => {
    if (id === symId) return
    setSymId(id)
    goTop()
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', color: '#111', paddingBottom: 40 }}>
      <header style={{ height: 'auto', minHeight: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 12px', position: 'sticky', top: 0, background: '#fff', zIndex: 20, borderBottom: '1px solid #eee', overflow: 'visible' }}>
        <button onClick={goTop} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 6 }}>
          <img src="/logo.png" alt="SimbolMap" style={{ height: 56, width: 'auto', display: 'block' }} />
          <div style={{ fontSize: 11, color: '#000', marginTop: 4, letterSpacing: 0.5, lineHeight: 1.2 }}>Map of Feelings Around the World</div>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={iconBtn} onClick={() => setShowMap(true)}>🗺️</button>
          <button style={{ ...iconBtn, background: '#E11D48', color: '#fff', border: 'none' }} onClick={() => setShowPut(true)}>+</button>
          <button style={{ ...iconBtn, background: '#FCE7F3' }} onClick={() => setShowAccount(true)}>M</button>
        </div>
      </header>

      <p style={{ textAlign: 'center', fontSize: 16, margin: '16px 12px 8px', lineHeight: 1.4 }}>
        <span style={{ color: '#111' }}>The pulse of the place. </span>
        <span style={{ color: '#E11D48' }}>Leave a feeling for someone.</span>
      </p>

      <div style={{ display: 'flex', gap: 20, padding: '0 16px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 560px', minWidth: 300 }}>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 480 }}>
            <img src={sym.photo} alt={sym.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%,-50%)', width: 72, height: 96, pointerEvents: 'none' }}>
              <div style={{ width: 72, height: 72, background: '#E11D48', borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', clipPath: 'polygon(50% 100%, 0 45%, 0 25%, 50% 0, 100% 25%, 100% 45%)', backgroundColor: '#E11D48' }}>
                <div style={{ width: 44, height: 44, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#E11D48' }}>{sym.locks}</div>
              </div>
              <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, background: '#FFD700', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>★</div>
            </div>
            <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', background: '#fff', padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>{sym.locks} locks • tap to see list</div>
            <button onClick={() => setShowPut(true)} style={{ position: 'absolute', left: '50%', bottom: 62, transform: 'translateX(-50%)', width: '80%', background: '#E11D48', color: '#fff', border: 'none', padding: 14, borderRadius: 999, fontWeight: 800, fontSize: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>📌 PUT A LOCK</button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#666', margin: '12px 0' }}>{sym.name} → Lungolago → Bar Lungolago, {sym.name} - <button onClick={() => setShowLocks(true)} style={{ background: 'none', border: 'none', color: '#E11D48', fontWeight: 700 }}>See all locks</button></p>
        </div>

        <div style={{ flex: '1 1 320px', minWidth: 280, border: '1px solid #eee', borderRadius: 16, padding: 16, background: '#fff' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><b>Top feelings - {sym.name} Today</b><span style={{ color: '#059669', fontSize: 13 }}>● Live</span></div>
          <p style={{ fontSize: 13, color: '#666' }}>What the world feels now, in your places.</p>
          <p><b>1. Love</b> <span style={{ float: 'right' }}>60% • 120 feel love</span></p><div style={{ height: 10, background: '#eee', borderRadius: 999 }}><div style={{ width: '60%', height: '100%', background: '#E11D48', borderRadius: 999 }} /></div>
          <p><b>2. Calm</b> <span style={{ float: 'right' }}>25% • 50 feel calm</span></p><div style={{ height: 10, background: '#eee', borderRadius: 999 }}><div style={{ width: '25%', height: '100%', background: '#2563EB', borderRadius: 999 }} /></div>
          <p><b>3. Joy</b> <span style={{ float: 'right' }}>15% • 30 feel joy</span></p><div style={{ height: 10, background: '#eee', borderRadius: 999 }}><div style={{ width: '15%', height: '100%', background: '#F59E0B', borderRadius: 999 }} /></div>
          <p style={{ fontSize: 13 }}>🕐 Peak 19:00 Lungolago</p>
          <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}><b>Love Circle, today</b><br />19:00, Lungolago. Demo - not live yet.</div>
          <button onClick={() => setShowPut(true)} style={{ width: '100%', background: '#fff', border: '1px solid #111', padding: 12, borderRadius: 12, fontWeight: 700, marginTop: 12 }}>Leave your pulse</button>
        </div>
      </div>

      <h2 style={{ padding: '24px 16px 8px' }}>Choose a symbol</h2>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 16px 8px', scrollSnapType: 'x mandatory' }}>
        {SYMS.map(s => (
          <button key={s.id} onClick={() => pickSym(s.id)} style={{ minWidth: 220, textAlign: 'left', border: s.id === symId ? '2px solid #E11D48' : '1px solid #eee', borderRadius: 16, overflow: 'hidden', background: '#fff', padding: 0, scrollSnapAlign: 'start' }}>
            <img src={s.photo} alt={s.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            <div style={{ padding: 12 }}><b>{s.name}</b><br /><span style={{ fontSize: 12, color: '#666' }}>{s.locks} locks • Love {s.id === 'como' ? 60 : s.id === 'venice' ? 72 : 55}%</span></div>
          </button>
        ))}
      </div>

      <h2 style={{ padding: '16px 16px 8px' }}>Spots in {sym.name}</h2>
      <div style={{ padding: '0 16px' }}>{sym.spots.map((sp, i) => (
        <div key={sp.name} style={{ display: 'flex', gap: 12, border: '1px solid #eee', borderRadius: 12, padding: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FCE7F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</div>
          <div><b>{sp.name}</b><br /><span style={{ fontSize: 12, color: '#666' }}>{sp.desc}</span></div>
        </div>
      ))}</div>

      {showPut && (
        <div style={sheet}><div style={sheetHead}><div><b style={{ fontSize: 20 }}>Put a Lock</b><div style={{ fontSize: 13, color: '#666' }}>{sym.name} • Lungolago</div></div><button onClick={() => setShowPut(false)}>X</button></div>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setLockType('feeling')} style={{ flex: 1, padding: 12, borderRadius: 12, border: lockType === 'feeling' ? '2px solid #E11D48' : '1px solid #eee', background: '#fff', textAlign: 'left' }}><b>Feeling lock</b><br /><span style={{ fontSize: 12 }}>1 photo + 1 sentence, 30 days on map, then Passport forever</span></button>
              <button onClick={() => setLockType('suspended')} style={{ flex: 1, padding: 12, borderRadius: 12, border: lockType === 'suspended' ? '2px solid #E11D48' : '1px solid #eee', background: '#fff', textAlign: 'left' }}><b>★ Suspended lock</b><br /><span style={{ fontSize: 12 }}>For a stranger - coffee / walk / small tattoo / 1 night / 1 advice - red pin + gold star</span></button>
            </div>
            {lockType === 'feeling' ? (<>
              <p style={{ fontSize: 13 }}>Your feeling (1 sentence)</p>
              <input value={sentence} onChange={e => setSentence(e.target.value)} placeholder="I felt calm by the lake..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd' }} />
              <p style={{ fontSize: 13 }}>Choose feeling:</p>
              <div style={{ display: 'flex', gap: 8 }}>{['Love', 'Calm', 'Joy', 'Longing'].map(f => <button key={f} onClick={() => setFeeling(f)} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #eee', background: feeling === f ? '#E11D48' : '#fff', color: feeling === f ? '#fff' : '#111' }}>{f}</button>)}</div>
              <button style={{ width: '100%', marginTop: 12, padding: 12, borderRadius: 10, border: '1px solid #ddd', background: '#fff' }}>Add 1 photo (demo)</button>
            </>) : (<>
              <p style={{ fontSize: 13 }}>What are you leaving?</p>
              <select value={suspendedWhat} onChange={e => setSuspendedWhat(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd' }}><option value="coffee">coffee</option><option value="walk">walk</option><option value="small tattoo">small tattoo</option><option value="1 night">1 night</option><option value="1 advice">1 advice</option></select>
              <p style={{ fontSize: 13 }}>Where? Bar Lungolago, {sym.name}</p>
              <p style={{ fontSize: 12, color: '#666' }}>Reserved 2 hours per lock. Bar = 0 app, 0 account. Bar never verifies code.</p>
              <p style={{ fontSize: 12 }}>You will get code SIM-XXXX + QR after you leave it in bar.</p>
            </>)}
            <p style={{ fontSize: 12, color: '#666', marginTop: 12 }}>Guest: 2 free locks, no login. After login: 2 pins / symbol / day, max 6 / day. Edit max 2 times per lock, editing does not reset 30 days.</p>
            <button onClick={() => { alert('Demo - lock saved in this copy. In live app it saves to Supabase.'); setShowPut(false) }} style={{ width: '100%', background: '#E11D48', color: '#fff', border: 'none', padding: 14, borderRadius: 12, fontWeight: 800 }}>Leave lock</button>
            <button onClick={() => setShowPut(false)} style={{ width: '100%', background: '#fff', border: '1px solid #ddd', padding: 12, borderRadius: 12, marginTop: 8 }}>Close</button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>Know someone who loves this place? Leave them a feeling.</p>
          </div>
        </div>
      )}

      {showAccount && (
        <div style={sheet}><div style={sheetHead}><b>Your account</b><button onClick={() => setShowAccount(false)}>X</button></div>
          <div style={{ padding: 16 }}>
            <button onClick={() => { setGuest(true); setShowAccount(false); alert('Guest mode: 2 free locks') }} style={{ width: '100%', padding: 14, borderRadius: 12, border: '1px solid #ddd', background: '#fff', fontWeight: 700, textAlign: 'left' }}>Continue as Guest - 2 free locks, no login</button>
            <p style={{ fontSize: 13, marginTop: 16 }}>Login with Email</p>
            <input placeholder="you@email.com" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd' }} />
            <button onClick={() => alert('Demo - login not live yet')} style={{ width: '100%', padding: 12, borderRadius: 10, background: '#111', color: '#fff', marginTop: 8 }}>Send link</button>
            <p style={{ fontSize: 13, marginTop: 16 }}><b>Passport - Your locks</b><br />{guest ? 'Guest mode: 2 free locks' : '0 locks in this copy. Login to see your Passport.'}</p>
            <button onClick={() => alert('Demo - Passport')} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd', background: '#fff' }}>View Passport</button>
            <button onClick={() => setShowAccount(false)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd', background: '#fff', marginTop: 8 }}>Close</button>
          </div>
        </div>
      )}

      {showMap && (
        <div style={sheet}><div style={sheetHead}><b>Map view • {sym.name}</b><button onClick={() => setShowMap(false)}>Close map</button></div>
          <div style={{ padding: 16 }}><p>Map with pins Lungolago, Bellagio, Duomo {sym.name}, Varenna. Demo map.</p></div>
        </div>
      )}
      {showLocks && (
        <div style={sheet}><div style={sheetHead}><b>All locks - {sym.name}</b><button onClick={() => setShowLocks(false)}>X</button></div>
          <div style={{ padding: 16 }}><p>{sym.locks} locks in {sym.name}. Demo list.</p></div>
        </div>
      )}
    </div>
  )
}
const iconBtn: React.CSSProperties = { width: 40, height: 40, borderRadius: '50%', border: '1px solid #eee', background: '#fff', fontSize: 18 }
const sheet: React.CSSProperties = { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(480px, 96vw)', maxHeight: '88vh', overflowY: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', zIndex: 50 }
const sheetHead: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid #eee' }
