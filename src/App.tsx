import React, { useState } from 'react'

type SymbolItem = {
  id: string
  name: string
  love: number
  live: string
  photo: string
  spots: { name: string; desc: string; business: number }[]
}

const SYMBOLS: SymbolItem[] = [
  {
    id: 'como',
    name: 'Como',
    love: 60,
    live: 'Live - 128 feel love now',
    photo: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    spots: [
      { name: 'Lungolago', desc: 'Lake promenade - Peak 19:00', business: 1 },
      { name: 'Duomo Como', desc: 'Cathedral square', business: 0 },
      { name: 'Bellagio', desc: 'Lake village', business: 0 },
      { name: 'Varenna', desc: 'Lake village', business: 0 },
    ],
  },
  {
    id: 'venice',
    name: 'Venice',
    love: 72,
    live: 'Live - 156 feel love now',
    photo: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1200&q=80',
    spots: [
      { name: 'San Marco', desc: 'St Mark Square', business: 1 },
      { name: 'Rialto Bridge', desc: 'Grand Canal', business: 0 },
      { name: 'Burano', desc: 'Colorful houses', business: 0 },
    ],
  },
  {
    id: 'colosseum',
    name: 'Colosseum',
    love: 55,
    live: 'Live - 142 feel grateful now',
    photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80',
    spots: [
      { name: 'Colosseum Area', desc: 'Ancient Rome', business: 1 },
      { name: 'Roman Forum', desc: 'Ancient forum', business: 0 },
    ],
  },
]

type SuspendedLock = {
  id: string
  giver: string
  what: string
  where: string
  text: string
  status: 'Available' | 'Reserved'
}

const INITIAL_SUSPENDED: SuspendedLock[] = [
  { id: 'SIM-4821', giver: 'Denis', what: 'coffee', where: 'Bar Lungolago, Como', text: 'A quiet coffee by the water, for someone who needed a pause.', status: 'Available' },
  { id: 'SIM-4822', giver: 'Ana', what: 'coffee', where: 'Bar Lungolago, Como', text: 'Slow down, look at the lake, breathe.', status: 'Available' },
  { id: 'SIM-4823', giver: 'Maria', what: 'walk', where: 'Bar Lungolago, Como', text: 'You were here with me in my thoughts.', status: 'Available' },
]

export default function App() {
  const [current, setCurrent] = useState<SybolItemFix>()
  const [symbolId, setSymbolId] = useState('como')
  const [showPut, setShowPut] = useState(false)
  const [showLocks, setShowLocks] = useState(false)
  const [showPassport, setShowPassport] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [sentence, setSentence] = useState('')
  const [isSuspended, setIsSuspended] = useState(false)
  const [whatLeave, setWhatLeave] = useState('coffee')
  const [whereLeave, setWhereLeave] = useState('Bar Lungolago, Como')
  const [suspended, setSuspended] = useState<SuspendedLock[]>(INITIAL_SUSPENDED)
  const [claimed, setClaimed] = useState<SuspendedLock | null>(null)
  const [tookIt, setTookIt] = useState(false)
  const [passportTab, setPassportTab] = useState<'my' | 'given' | 'received'>('my')
  const [myLocks, setMyLocks] = useState<string[]>([])
  const [filter, setFilter] = useState<'All' | 'Suspended' | 'Feelings'>('All')
  const [searchText, setSearchText] = useState('')
  const [proposeCity, setProposeCity] = useState('')
  const [proposeWhy, setProposeWhy] = useState('')
  const [showPropose, setShowPropose] = useState(false)
  const [pulse, setPulse] = useState<string | null>(null)

  const symbol = SYMBOLS.find((s) => s.id === symbolId) || SYMBOLS[0]
  const totalLocks = 59 + myLocks.length

  const claim = (lock: SuspendedLock) => {
    setSuspended((prev) => prev.map((l) => (l.id === lock.id ? { ...l, status: 'Reserved' } : l)))
    setClaimed(lock)
    setTookIt(false)
    setShowLocks(false)
  }

  const handlePut = () => {
    if (sentence.trim().length < 10) return
    setMyLocks((prev) => [...prev, sentence])
    setShowPut(false)
    setSentence('')
    setIsSuspended(false)
  }

  const searchResults = SYMBOLS.filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#FFFFFF', minHeight: '100vh', paddingBottom: 40 }}>
      {/* HEADER 56px */}
      <header style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderBottom: '1px solid #eee' }}>
        <div style={{ fontFamily: 'cursive', fontSize: 22, lineHeight: 1 }}>
          Simbol<span style={{ color: '#E11D48' }}>📍</span>Map
          <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#666' }}>Map of Feelings Around the World</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowSearch(true)} style={iconBtn}>🔍</button>
          <button style={iconBtn}>🗺️</button>
          <button onClick={() => setShowPut(true)} style={{ ...iconBtn, background: '#E11D48', color: '#fff' }}>+</button>
          <button onClick={() => setShowPassport(true)} style={{ ...iconBtn, background: '#FCE7F3' }}>M</button>
        </div>
      </header>

      <p style={{ textAlign: 'center', fontSize: 13, margin: '10px 0 2px' }}>The pulse of the place. The happiness of someone.</p>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#E11D48', margin: 0 }}>Leave a feeling for someone.</p>

      {/* PHOTO MAIN */}
      <div style={{ position: 'relative', margin: '12px 16px', borderRadius: 16, overflow: 'hidden', height: 420 }}>
        <img src={symbol.photo} alt={symbol.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button onClick={() => setShowLocks(true)} style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%,-50%)', background: '#E11D48', color: '#fff', border: 'none', borderRadius: '50%', width: 56, height: 56, fontSize: 20 }}>
          🔒<span style={{ position: 'absolute', top: -4, right: -4, fontSize: 12 }}>⭐</span>
        </button>
        <div style={{ position: 'absolute', bottom: 12, left: 12, background: '#fff', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
          {totalLocks} locks • tap to see list
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: '#fff', padding: '6px 10px', borderRadius: 999, fontSize: 12 }}>
          ● {symbol.live}
        </div>
      </div>

      <button onClick={() => setShowPut(true)} style={{ display: 'block', margin: '0 auto', width: 320, height: 48, background: '#E11D48', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800 }}>🔒 PUT A LOCK</button>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>{symbol.name} → Lungolago → Bar Lungolago, {symbol.name === 'Como' ? 'Como' : symbol.name === 'Venice' ? 'Venice' : 'Rome'} • <button onClick={() => setShowLocks(true)} style={{ background: 'none', border: 'none', color: '#E11D48' }}>See all locks</button></p>

      {/* CHOOSE SYMBOL */}
      <h3 style={{ padding: '0 16px' }}>Choose a symbol</h3>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }}>
        {SYMBOLS.map((s) => (
          <button key={s.id} onClick={() => setSymbolId(s.id)} style={{ minWidth: 120, textAlign: 'left', border: s.id === symbolId ? '2px solid #E11D48' : '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fff', padding: 0 }}>
            <img src={s.photo} alt={s.name} style={{ width: '100%', height: 70, objectFit: 'cover' }} />
            <div style={{ padding: 8, fontSize: 13, fontWeight: 700 }}>{s.name}<br /><span style={{ fontWeight: 400, fontSize: 11 }}>Love {s.love}%</span></div>
          </button>
        ))}
      </div>
      <button onClick={() => setShowPropose(true)} style={{ margin: '10px 16px', background: 'none', border: 'none', color: '#E11D48', fontSize: 13 }}>Don&apos;t see your place? Propose symbol →</button>

      {/* COMO TODAY */}
      <div style={{ margin: '0 16px', border: '1px solid #eee', borderRadius: 16, padding: 14 }}>
        <b>COMO TODAY — Love {symbol.love}%</b> <span style={{ fontSize: 11, color: '#E11D48' }}>● Live</span>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, fontSize: 12 }}>
          <span>● Love {symbol.love}%</span><span>● Calm 25%</span><span>● Joy 15%</span>
        </div>
        <p style={{ fontSize: 12, color: '#666' }}>128 feel love now. 80 want to come. Peak 19:00 Lungolago.</p>
      </div>

      {/* HOW DO YOU FEEL */}
      <div style={{ padding: '0 16px', marginTop: 16 }}>
        <b>How do you feel here?</b> <span style={{ fontSize: 12, color: '#666' }}>One tap = one pulse</span>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {['Love', 'Calm', 'Joy', 'Longing'].map((f) => (
            <button key={f} onClick={() => setPulse(f)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, border: pulse === f ? '2px solid #E11D48' : '1px solid #eee', background: pulse === f ? '#FFF1F2' : '#fff' }}>{f}</button>
          ))}
        </div>
        {pulse && <p style={{ fontSize: 12 }}>Saved: you feel {pulse} here. One tap places your pulse for today.</p>}
      </div>

      {/* SPOTS */}
      <div style={{ padding: '0 16px', marginTop: 16 }}>
        <b>Spots in {symbol.name}</b>
        <p style={{ fontSize: 11, color: '#666' }}>Symbol ({symbol.name}) → Spot / Subsymbol → Business</p>
        {symbol.spots.map((sp) => (
          <div key={sp.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <div><b style={{ fontSize: 13 }}>{sp.name}</b><div style={{ fontSize: 11, color: '#666' }}>{sp.desc}</div></div>
            <span style={{ fontSize: 12, color: '#E11D48' }}>{sp.business} business • Open →</span>
          </div>
        ))}
      </div>

      {/* BUSINESS */}
      <div style={{ margin: '16px', border: '1px solid #eee', borderRadius: 16, padding: 14 }}>
        <b>Business in this place — Lungolago</b>
        <p style={{ fontSize: 12, color: '#666' }}>Bars leave suspended coffees in Lungolago.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13 }}>Bar Lungolago, {symbol.name}</span>
          <span style={{ fontSize: 12, color: '#E11D48' }}>Suspended available</span>
        </div>
        <p style={{ fontSize: 11, color: '#666' }}>Bar has 0 app, 0 account. Barman just gives already-paid coffee when he hears SimbolMap.</p>
      </div>

      <footer style={{ textAlign: 'center', fontSize: 11, color: '#999', padding: '16px' }}>
        © SimbolMap 2026 - Map of Feelings Around the World<br />Do not publish full plan
      </footer>

      {/* LOCKS LIST */}
      {showLocks && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Locks in {symbol.name} — Lungolago</b><button onClick={() => setShowLocks(false)}>X</button></div>
          <p style={{ fontSize: 12, padding: '0 16px' }}>2-hour rule: 2 hours is PER LOCK, not per bar. If 1 lock is Reserved 2h, the other locks in the same bar stay Available.</p>
          <div style={{ display: 'flex', gap: 8, padding: '0 16px' }}>
            {(['All', 'Suspended', 'Feelings'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 14px', borderRadius: 999, border: '1px solid #eee', background: filter === f ? '#E11D48' : '#fff', color: filter === f ? '#fff' : '#111' }}>{f}</button>
            ))}
          </div>
          <div style={{ margin: 16, background: '#FFFBEB', padding: 12, borderRadius: 12 }}>
            <b>57 suspended - 42 coffees, 10 walks, 5 tips</b>
            <p style={{ fontSize: 12 }}>Summary for Lungolago. Showing 10 per page.</p>
            <button style={{ background: '#E11D48', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 999 }}>See all</button>
          </div>
          <p style={{ padding: '0 16px', fontSize: 12, fontWeight: 800 }}>TOP — SUSPENDED AVAILABLE FIRST</p>
          {suspended.filter((l) => filter !== 'Feelings').map((l) => (
            <div key={l.id} style={{ margin: '0 16px 12px', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, background: '#FFFBEB' }}>
              <span style={{ fontSize: 11, background: '#fff', padding: '3px 8px', borderRadius: 999 }}>⭐ Suspended - Gift</span>{' '}
              <span style={{ fontSize: 11, background: '#fff', padding: '3px 8px', borderRadius: 999 }}>{l.status}</span>
              <p style={{ fontSize: 13, fontWeight: 700 }}>{l.giver} leaves: {l.what} at {l.where}</p>
              <p style={{ fontSize: 13 }}>“{l.text}”</p>
              <p style={{ fontSize: 11, color: '#666' }}>Lungolago • {symbol.name} • {l.id}</p>
              <button onClick={() => claim(l)} style={{ width: '100%', background: '#E11D48', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 800 }}>Claim this gift</button>
              <p style={{ fontSize: 11, textAlign: 'center' }}>Bar has 0 app. Say SimbolMap, take coffee + note.</p>
            </div>
          ))}
          {filter !== 'Suspended' && (
            <div style={{ padding: '0 16px' }}>
              <p style={{ fontSize: 12, fontWeight: 800 }}>BOTTOM — FEELING LOCKS</p>
              <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
                <span style={{ fontSize: 11 }}>🔒 Feeling</span>
                <p>“Sunset by the water made the evening feel lighter.”</p>
                <p style={{ fontSize: 11, color: '#666' }}>Lungolago • {symbol.name}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CLAIMED */}
      {claimed && !tookIt && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Your gift is Reserved 2h</b><button onClick={() => setClaimed(null)}>X</button></div>
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 13 }}>This lock only is Reserved for 2 hours. Other locks in the same bar stay Available. If it expires, it becomes Available again with a new code.</p>
            <div style={{ textAlign: 'center', border: '1px solid #eee', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 28 }}>▦▦▦▦</div>
              <b style={{ fontSize: 18 }}>{claimed.id}</b>
              <p style={{ fontSize: 12 }}>Show this code at the bar - for your record only, bar does NOT check it.</p>
              <p style={{ fontSize: 12 }}>{claimed.what} at {claimed.where}</p>
            </div>
            <p style={{ fontSize: 12 }}>Go to the bar, say SimbolMap, take coffee + note. Bar has 0 app, 0 account.</p>
            <button onClick={() => setTookIt(true)} style={{ width: '100%', background: '#E11D48', color: '#fff', border: 'none', padding: 14, borderRadius: 12, fontWeight: 800 }}>I took it • Am luat-o</button>
            <p style={{ fontSize: 12, textAlign: 'center' }}>Liked it? Leave a feeling for someone.<br />Optional: Make a Story and tag @simbolmap — not required.</p>
          </div>
        </div>
      )}
      {claimed && tookIt && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Thank you</b><button onClick={() => { setClaimed(null); setShowPassport(true); setPassportTab('received') }}>X</button></div>
          <div style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 40 }}>✓</div>
            <b>Your lock moved to Passport - Suspended received</b>
            <p style={{ fontSize: 13 }}>You received 1 {claimed.what} in {symbol.name}. Bar did nothing, you marked it.</p>
            <button onClick={() => { setClaimed(null); setShowPassport(true); setPassportTab('received') }} style={{ width: '100%', background: '#E11D48', color: '#fff', border: 'none', padding: 14, borderRadius: 12, fontWeight: 800 }}>See my Passport</button>
            <p style={{ fontSize: 12 }}>Know someone who loves this place? Leave them a feeling.</p>
          </div>
        </div>
      )}

      {/* PUT A LOCK */}
      {showPut && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Put a lock in {symbol.name}</b><button onClick={() => setShowPut(false)}>X</button></div>
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 12, color: '#666' }}>Feeling Lock: 1 photo + 1 sentence. Your lock stays 30 days, then Passport forever. Edit max 2 times, no reset. Suspended Lock: leave 1 small gift for someone.</p>
            <label style={{ fontWeight: 700, fontSize: 13 }}>What did you live here?</label>
            <textarea value={sentence} onChange={(e) => setSentence(e.target.value)} placeholder="I lived it here..." style={{ width: '100%', height: 80, marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid #ddd' }} />
            <p style={{ fontSize: 11, textAlign: 'right' }}>{sentence.length} / 120</p>
            <div style={{ background: '#f8f8f8', padding: 12, borderRadius: 10, fontSize: 12, textAlign: 'center' }}>
              <b>Place photo will be used</b><br />Photo uploads are not available yet. Your lock shows the {symbol.name} photo.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
              <span style={{ fontSize: 13 }}><b>Is it a suspended lock?</b><br /><span style={{ fontSize: 11, color: '#666' }}>NO = normal feeling lock • YES = leave a small gift</span></span>
              <button onClick={() => setIsSuspended(!isSuspended)} style={{ width: 48, height: 26, borderRadius: 999, border: '1px solid #ddd', background: isSuspended ? '#E11D48' : '#eee' }}>{isSuspended ? 'YES' : 'NO'}</button>
            </div>
            {isSuspended && (
              <div style={{ background: '#FFFBEB', padding: 12, borderRadius: 12, marginTop: 12 }}>
                <b style={{ fontSize: 13 }}>Suspended Lock — red pin + small gold star</b>
                <p style={{ fontSize: 12 }}>What do you leave?</p>
                <select value={whatLeave} onChange={(e) => setWhatLeave(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #ddd' }}>
                  <option>coffee</option><option>walk</option><option>parking</option><option>small tattoo</option><option>1 night</option><option>advice</option>
                </select>
                <p style={{ fontSize: 12 }}>Where?</p>
                <select value={whereLeave} onChange={(e) => setWhereLeave(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #ddd' }}>
                  <option>Bar Lungolago, Como</option><option>Bar San Marco, Venice</option><option>Bar Colosseum, Rome</option>
                </select>
                <p style={{ fontSize: 11, color: '#666' }}>Leave a paid coffee + note in bar. You say to bartender 10 seconds: Second coffee is paid. For the next one. If someone says SimbolMap, give it to them.</p>
              </div>
            )}
            <button onClick={handlePut} style={{ width: '100%', background: sentence.trim().length < 10 ? '#D1D5DB' : '#E11D48', color: '#fff', border: 'none', padding: 14, borderRadius: 12, fontWeight: 800, marginTop: 14 }}>🔒 PUT A LOCK</button>
            <p style={{ fontSize: 11, textAlign: 'center', color: '#666' }}>Guest: 2 free locks. After that, log in to keep your Passport.</p>
          </div>
        </div>
      )}

      {/* PASSPORT */}
      {showPassport && (
        <div style={sheet}>
          <div style={sheetHeader}><b>My Passport</b><button onClick={() => setShowPassport(false)}>X</button></div>
          <div style={{ display: 'flex', gap: 8, padding: '0 16px' }}>
            {([['my', 'My locks'], ['given', 'Suspended given'], ['received', 'Suspended received']] as const).map(([k, label]) => (
              <button key={k} onClick={() => setPassportTab(k)} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #eee', background: passportTab === k ? '#E11D48' : '#fff', color: passportTab === k ? '#fff' : '#111', fontSize: 12 }}>{label}</button>
            ))}
          </div>
          <div style={{ padding: 16 }}>
            {passportTab === 'my' && (
              <div>
                <p style={{ fontSize: 12, color: '#666' }}>Feeling locks you placed. 30 days on map, then Passport forever.</p>
                {myLocks.length === 0 ? <p style={{ textAlign: 'center' }}><b>No locks yet in My locks</b><br />Put your first lock in {symbol.name}.</p> : myLocks.map((l, i) => <div key={i} style={{ border: '1px solid #eee', padding: 12, borderRadius: 12, marginBottom: 8 }}>🔒 {l}<br /><span style={{ fontSize: 11 }}>{symbol.name} • Available • Edits 0 / 2</span></div>)}
              </div>
            )}
            {passportTab === 'given' && (
              <div>
                <p style={{ fontSize: 12, color: '#666' }}>Suspended locks you left for someone.</p>
                {myLocks.length === 0 ? <p style={{ textAlign: 'center' }}>No suspended given yet.</p> : <p>See your given locks in list.</p>}
              </div>
            )}
            {passportTab === 'received' && (
              <div>
                <p style={{ fontSize: 12, color: '#666' }}>Suspended gifts you claimed and marked I took it.</p>
                {tookIt && claimed ? <div style={{ border: '1px solid #FDE68A', background: '#FFFBEB', padding: 12, borderRadius: 12 }}>⭐ {claimed.what} at {claimed.where} • {claimed.id} • Redeemed by you</div> : <p style={{ textAlign: 'center' }}><b>No locks yet in Suspended received</b></p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEARCH + PROPOSE */}
      {showSearch && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Search</b><button onClick={() => setShowSearch(false)}>X</button></div>
          <div style={{ padding: 16 }}>
            <input value={searchText} onChange={(e) => { setSearchText(e.target.value); setShowPropose(false) }} placeholder="Search Como, Venice, Sagrada..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #ddd' }} />
            <p style={{ fontSize: 11, color: '#666' }}>Search only in frozen list: 20 globals + Around Como / Venice / Rome + Iasi pilot.</p>
            {searchText && searchResults.length === 0 && (
              <div>
                <p style={{ fontSize: 13 }}>No results for {searchText}</p>
                <button onClick={() => setShowPropose(true)} style={{ background: '#E11D48', color: '#fff', border: 'none', padding: 12, borderRadius: 10, width: '100%', fontWeight: 700 }}>Propose {searchText} as new symbol</button>
              </div>
            )}
            {searchResults.map((s) => (
              <button key={s.id} onClick={() => { setSymbolId(s.id); setShowSearch(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: 12, border: '1px solid #eee', borderRadius: 10, marginBottom: 8, background: '#fff' }}><b>{s.name}</b> • Love {s.love}%</button>
            ))}
            {showPropose && (
              <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 12, marginTop: 12 }}>
                <b>Propose {searchText || 'new symbol'}</b>
                <p style={{ fontSize: 12 }}>City / Country (required)</p>
                <input value={proposeCity} onChange={(e) => setProposeCity(e.target.value)} placeholder="Brasov, Romania" style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #ddd' }} />
                <p style={{ fontSize: 12 }}>Why this place? (min 10 chars, required)</p>
                <textarea value={proposeWhy} onChange={(e) => setProposeWhy(e.target.value)} placeholder="Brasov is where I fell in love first time." style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #ddd' }} />
                <p style={{ fontSize: 11, color: '#666' }}>No photo upload. Coordinates are set automatically. Your proposal goes to waiting list 1 / 10 Wants.</p>
                <button style={{ width: '100%', background: proposeCity.trim() && proposeWhy.trim().length >= 10 ? '#E11D48' : '#D1D5DB', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 800 }}>Propose symbol</button>
                <p style={{ fontSize: 12, textAlign: 'center' }}>Know someone who loves this place? Leave them a feeling.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROPOSE from Choose */}
      {showPropose && !showSearch && (
        <div style={sheet}>
          <div style={sheetHeader}><b>Propose symbol</b><button onClick={() => setShowPropose(false)}>X</button></div>
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 13 }}>Search first. If not found, propose it. No photo upload. Coordinates automatic.</p>
            <button onClick={() => { setShowPropose(false); setShowSearch(true) }} style={{ width: '100%', background: '#E11D48', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontWeight: 700 }}>Search first, then Propose</button>
          </div>
        </div>
      )}
    </div>
  )
}

const iconBtn: React.CSSProperties = { width: 36, height: 36, borderRadius: '50%', border: '1px solid #eee', background: '#fff', fontSize: 16 }
const sheet: React.CSSProperties = { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(480px, 96vw)', maxHeight: '88vh', overflowY: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', zIndex: 50 }
const sheetHeader: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid #eee' }

type SybolItemFix = unknown
