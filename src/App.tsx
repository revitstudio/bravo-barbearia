import { useMemo, useRef, useState } from 'react'

type Service = { id: string; name: string; description: string; price: number; duration: string }
type Barber = { id: string; name: string; role: string; image: string; specialties: string }
type Booking = { service: string; barber: string; time: string; name: string }

const services: Service[] = [
  { id: 'corte', name: 'Corte assinatura', description: 'Consulta, corte e finalização sob medida.', price: 85, duration: '50 min' },
  { id: 'barba', name: 'Barba clássica', description: 'Toalha quente, desenho e ritual de hidratação.', price: 65, duration: '40 min' },
  { id: 'combo', name: 'Ritual BRAVO', description: 'Corte, barba e acabamento completo.', price: 135, duration: '1h 25 min' },
  { id: 'pezinho', name: 'Manutenção', description: 'Contornos, nuca e acabamento entre cortes.', price: 42, duration: '25 min' },
]

const barbers: Barber[] = [
  { id: 'raul', name: 'Raul Nogueira', role: 'Diretor criativo', specialties: 'Tesoura · Clássicos', image: '/images/barber-raul.jpg' },
  { id: 'davi', name: 'Davi Monteiro', role: 'Barbeiro', specialties: 'Degradê · Textura', image: '/images/barber-davi.jpg' },
  { id: 'caio', name: 'Caio Ferraz', role: 'Barbeiro', specialties: 'Barba · Acabamento', image: '/images/barber-caio.jpg' },
]

const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30']
const gallery = [
  ['/images/gallery-interior.jpg', 'Interior da barbearia com cadeiras clássicas'],
  ['/images/gallery-shave.jpg', 'Acabamento de barba com navalha'],
  ['/images/gallery-tools.jpg', 'Detalhes de ferramentas de barbeiro'],
  ['/images/gallery-cut.jpg', 'Corte masculino sendo finalizado'],
]

const emptyBooking: Booking = { service: '', barber: '', time: '', name: '' }

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M14 7l5 5-5 5" /></svg>
}

function App() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<Booking>(emptyBooking)
  const bookingRef = useRef<HTMLElement>(null)
  const selectedService = useMemo(() => services.find((item) => item.id === booking.service), [booking.service])
  const selectedBarber = useMemo(() => barbers.find((item) => item.id === booking.barber), [booking.barber])
  const update = (key: keyof Booking, value: string) => setBooking((current) => ({ ...current, [key]: value }))
  const goToBooking = () => bookingRef.current?.scrollIntoView({ behavior: 'smooth' })
  const reset = () => { setBooking(emptyBooking); setStep(1) }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BRAVO, início">BRAVO<span>.</span></a>
        <nav aria-label="Navegação principal">
          <a href="#servicos">Serviços</a><a href="#equipe">Equipe</a><a href="#galeria">Galeria</a>
        </nav>
        <button className="header-cta" onClick={goToBooking}>Agendar horário</button>
      </header>

      <section className="hero" id="top">
        <img src="/images/hero-barber.jpg" alt="Barbeiro trabalhando em um ambiente de luz baixa" />
        <div className="hero-shade" />
        <div className="hero-content reveal">
          <p className="eyebrow">Barbearia & estilo · Curitiba</p>
          <h1>Precisão no corte.<br/><em>Presença no gesto.</em></h1>
          <p className="hero-copy">Um lugar para desacelerar, cuidar da imagem e sair mais inteiro do que entrou.</p>
          <button className="primary-cta" onClick={goToBooking}>Agendar horário <Arrow /></button>
        </div>
        <p className="hours">Ter — Sáb · 09:00 — 20:00<br/>Atendimento com hora marcada</p>
      </section>

      <section className="intro section-pad">
        <p className="section-index">01 / A casa</p>
        <div><h2>Barbearia sem pressa.<br/><em>Estilo sem esforço.</em></h2><p>Na BRAVO, técnica e escuta têm o mesmo peso. Cada atendimento começa com uma conversa e termina com um corte que funciona na vida real.</p></div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="section-heading"><p className="section-index">02 / Serviços</p><h2>Escolha o seu <em>ritual.</em></h2></div>
        <div className="service-list">
          {services.map((item, index) => (
            <button key={item.id} className="service-row" onClick={() => { update('service', item.id); setStep(2); goToBooking() }}>
              <span className="service-number">0{index + 1}</span><span className="service-main"><strong>{item.name}</strong><small>{item.description}</small></span>
              <span className="service-meta">{item.duration}<strong>R$ {item.price}</strong></span><Arrow />
            </button>
          ))}
        </div>
      </section>

      <section className="team section-pad" id="equipe">
        <div className="section-heading"><p className="section-index">03 / Profissionais</p><h2>Mãos que conhecem<br/><em>o ofício.</em></h2></div>
        <div className="team-grid">
          {barbers.map((barber) => <article key={barber.id} className="barber-card"><div className="image-wrap"><img src={barber.image} alt={`Retrato de ${barber.name}`} loading="lazy" /></div><div><h3>{barber.name}</h3><p>{barber.role}</p><small>{barber.specialties}</small></div></article>)}
        </div>
      </section>

      <section className="gallery section-pad" id="galeria">
        <div className="section-heading"><p className="section-index">04 / Atmosfera</p><h2>Entre, sente<br/><em>e fique à vontade.</em></h2></div>
        <div className="gallery-grid">{gallery.map(([src, alt], i) => <figure key={src} className={`gallery-${i + 1}`}><img src={src} alt={alt} loading="lazy" /></figure>)}</div>
      </section>

      <section className="booking section-pad" id="agendar" ref={bookingRef}>
        <div className="booking-intro"><p className="section-index">05 / Agenda</p><h2>Reserve o seu<br/><em>momento.</em></h2><p className="simulation-tag">Simulação de agendamento</p><p>Este protótipo não envia dados nem cria uma reserva real.</p></div>
        <div className="booking-panel">
          <div className="steps" aria-label={`Etapa ${Math.min(step, 5)} de 5`}>
            {[1,2,3,4,5].map((n) => <span key={n} className={step >= n ? 'active' : ''}>{n}</span>)}
          </div>
          {step === 1 && <Choice title="Qual serviço?" items={services.map(s => ({id:s.id, label:s.name, meta:`R$ ${s.price} · ${s.duration}`}))} selected={booking.service} onSelect={(id) => {update('service', id); setStep(2)}} />}
          {step === 2 && <Choice title="Com quem?" items={barbers.map(b => ({id:b.id, label:b.name, meta:b.specialties}))} selected={booking.barber} onSelect={(id) => {update('barber', id); setStep(3)}} />}
          {step === 3 && <Choice title="Qual horário?" items={times.map(t => ({id:t, label:t, meta:'Quinta-feira · 14 nov'}))} selected={booking.time} onSelect={(id) => {update('time', id); setStep(4)}} compact />}
          {step === 4 && <div className="booking-step"><p className="step-label">Seus dados</p><h3>Como podemos chamar você?</h3><label>Nome<input autoFocus value={booking.name} onChange={(e) => update('name', e.target.value)} placeholder="Digite seu nome" /></label><button className="confirm-button" disabled={booking.name.trim().length < 2} onClick={() => setStep(5)}>Revisar agendamento <Arrow /></button></div>}
          {step === 5 && <div className="booking-step review"><p className="step-label">Confirme os detalhes</p><h3>Está tudo certo?</h3><dl><div><dt>Serviço</dt><dd>{selectedService?.name}</dd><button onClick={() => setStep(1)}>Editar</button></div><div><dt>Profissional</dt><dd>{selectedBarber?.name}</dd><button onClick={() => setStep(2)}>Editar</button></div><div><dt>Horário</dt><dd>14 nov · {booking.time}</dd><button onClick={() => setStep(3)}>Editar</button></div><div><dt>Nome</dt><dd>{booking.name}</dd><button onClick={() => setStep(4)}>Editar</button></div></dl><button className="confirm-button" onClick={() => setStep(6)}>Confirmar simulação <Arrow /></button></div>}
          {step === 6 && <div className="booking-step success"><span className="success-mark">B</span><p className="step-label">Simulação concluída</p><h3>Até breve, {booking.name.split(' ')[0]}.</h3><p>Na experiência real, você receberia os detalhes da reserva por mensagem.</p><button className="text-button" onClick={reset}>Fazer nova simulação</button></div>}
          {step > 1 && step < 5 && <button className="back-button" onClick={() => setStep(step - 1)}>← Voltar</button>}
        </div>
      </section>

      <footer><div className="brand footer-brand">BRAVO<span>.</span></div><div><p>Rua Visconde do Rio Branco, 814<br/>Curitiba · PR</p><p>Ter — Sáb · 09:00 — 20:00<br/>Somente com hora marcada</p></div><p className="credit">Projeto conceitual — Revit Studio</p></footer>
    </main>
  )
}

function Choice({ title, items, selected, onSelect, compact = false }: {title:string; items:{id:string;label:string;meta:string}[]; selected:string; onSelect:(id:string)=>void; compact?:boolean}) {
  return <div className="booking-step"><p className="step-label">Monte seu horário</p><h3>{title}</h3><div className={compact ? 'choice-grid compact' : 'choice-grid'}>{items.map((item) => <button key={item.id} className={selected === item.id ? 'choice selected' : 'choice'} onClick={() => onSelect(item.id)}><strong>{item.label}</strong><small>{item.meta}</small><span>↗</span></button>)}</div></div>
}

export default App
