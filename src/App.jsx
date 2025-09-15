import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";

/* =====================
   Shared UI Primitives
   ===================== */
const Button = ({ children, to, onClick, variant = "primary", size = "md", className = "" }) => {
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold shadow-sm transition-all active:scale-[.98]";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];
  const variants = {
    primary:
      "bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-300",
    outline:
      "bg-white text-amber-600 ring-1 ring-amber-300 hover:bg-amber-50",
    ghost:
      "bg-transparent text-amber-700 hover:bg-amber-50",
  }[variant];
  const cls = `${base} ${sizes} ${variants} ${className}`;
  if (to) return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ title, subtitle, children, footer }) => (
  <div className="rounded-3xl bg-white shadow-md ring-1 ring-black/5 p-5 md:p-6">
    {title && (
      <div className="mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    )}
    {children}
    {footer && <div className="mt-4">{footer}</div>}
  </div>
);

const Section = ({ heading, children }) => (
  <section className="space-y-4">
    <h2 className="text-2xl md:text-3xl font-extrabold text-amber-700">{heading}</h2>
    {children}
  </section>
);

const Field = ({ label, children }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
      props.className || ""
    }`}
  />
);

const Select = (props) => (
  <select
    {...props}
    className={`w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
      props.className || ""
    }`}
  />
);

/* =====================
   Demo Data
   ===================== */
const demoListings = {
  groomers: [
    { id: 1, name: "Fuzzy Friends Grooming", rating: 4.8, distance: "1.2 mi", price: "$$" },
    { id: 2, name: "SparklePaws Spa", rating: 4.6, distance: "2.4 mi", price: "$$$" },
  ],
  vets: [
    { id: 3, name: "Maple Veterinary Clinic", rating: 4.9, distance: "0.9 mi", price: "$$$" },
    { id: 4, name: "GentleCare Animal Hospital", rating: 4.7, distance: "3.1 mi", price: "$$" },
  ],
  sitters: [
    { id: 5, name: "HappyTail Sitters", rating: 4.8, distance: "Nearby", price: "$$" },
    { id: 6, name: "Paws & Play Overnight", rating: 4.5, distance: "5.2 mi", price: "$$$" },
  ],
};

/* =====================
   Pages
   ===================== */
function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-12 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-700 tracking-tight">
          🐾 PetCare Hub
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-2xl">
          A friendly home for everything your pet needs — find trusted pros, track wellness, and
          learn great behaviors from puppy to senior.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/services" size="lg">Find Vets, Sitters & Groomers</Button>
          <Button to="/wellness" variant="outline" size="lg">Pet Profile & Wellness</Button>
          <Button to="/training" variant="ghost" size="lg">Behavior & Training</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card title="Trusted Pros" subtitle="Browse verified local providers">
          <ul className="space-y-2 text-gray-700">
            <li>• Vets with great bedside manner</li>
            <li>• Gentle groomers for all breeds</li>
            <li>• Sitters & walkers your pet will love</li>
          </ul>
          <div className="mt-4">
            <Button to="/services">Explore Listings</Button>
          </div>
        </Card>
        <Card title="Wellness Tracker" subtitle="Keep shots, meds, and visits organized">
          <p className="text-gray-700">Simple scheduling and logs so nothing slips through the cracks.</p>
          <div className="mt-4">
            <Button to="/wellness" variant="outline">Open Wellness</Button>
          </div>
        </Card>
        <Card title="Behavior & Training" subtitle="From first sit to fancy tricks">
          <p className="text-gray-700">Age‑based tips and mini‑courses to build great habits.
          </p>
          <div className="mt-4">
            <Button to="/training" variant="ghost">View Courses</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Services() {
  const [tab, setTab] = useState("vets");
  const tabs = [
    { key: "vets", label: "🐶 Vets" },
    { key: "groomers", label: "✂️ Groomers" },
    { key: "sitters", label: "🏡 Sitters" },
  ];
  const list = demoListings[tab];
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-6">
      <Section heading="Find Trusted Providers">
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <Button key={t.key} variant={tab === t.key ? "primary" : "outline"} onClick={() => setTab(t.key)}>
              {t.label}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              subtitle={`${item.distance} • Rating ${item.rating} • ${item.price}`}
              footer={<Button variant="outline">View Details</Button>}
            >
              <p className="text-gray-700">Trusted by local pet parents. Book an appointment or message to ask questions.</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Wellness() {
  const [profile, setProfile] = useState({ name: "", species: "", age: "", breed: "" });
  const [events, setEvents] = useState([]);
  const [med, setMed] = useState({ name: "", dose: "", schedule: "Daily", nextDate: "" });
  const [visit, setVisit] = useState({ clinic: "", reason: "Checkup", date: "" });

  const addEvent = () => {
    if (!med.name || !med.nextDate) return;
    setEvents((e) => [
      ...e,
      { id: crypto.randomUUID(), type: "Medication", name: med.name, extra: `${med.dose || ""} • ${med.schedule}`, date: med.nextDate },
    ]);
    setMed({ name: "", dose: "", schedule: "Daily", nextDate: "" });
  };
  const addVisit = () => {
    if (!visit.clinic || !visit.date) return;
    setEvents((e) => [
      ...e,
      { id: crypto.randomUUID(), type: "Vet Visit", name: visit.clinic, extra: visit.reason, date: visit.date },
    ]);
    setVisit({ clinic: "", reason: "Checkup", date: "" });
  };
  const removeEvent = (id) => setEvents((e) => e.filter((x) => x.id !== id));

  const saveable = useMemo(() => JSON.stringify({ profile, events }), [profile, events]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
      <Section heading="Pet Profile & Wellness Tracker">
        <Card title="Pet Profile" subtitle="Quick details to personalize reminders">
          <div className="grid md:grid-cols-4 gap-4">
            <Field label="Pet Name"><Input value={profile.name} onChange={(e)=>setProfile({ ...profile, name: e.target.value })} placeholder="Runtz"/></Field>
            <Field label="Species"><Input value={profile.species} onChange={(e)=>setProfile({ ...profile, species: e.target.value })} placeholder="Dog, Cat, etc."/></Field>
            <Field label="Age"><Input value={profile.age} onChange={(e)=>setProfile({ ...profile, age: e.target.value })} placeholder="3"/></Field>
            <Field label="Breed"><Input value={profile.breed} onChange={(e)=>setProfile({ ...profile, breed: e.target.value })} placeholder="Terrier mix"/></Field>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={()=>localStorage.setItem("pch_profile", JSON.stringify(profile))}>Save Profile</Button>
            <Button variant="outline" onClick={()=>setProfile({ name:"", species:"", age:"", breed:"" })}>Clear</Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Medication Planner" subtitle="Doses and schedules">
            <div className="grid md:grid-cols-4 gap-3">
              <Field label="Medication"><Input value={med.name} onChange={(e)=>setMed({ ...med, name: e.target.value })} placeholder="Heartgard"/></Field>
              <Field label="Dose"><Input value={med.dose} onChange={(e)=>setMed({ ...med, dose: e.target.value })} placeholder="1 tab"/></Field>
              <Field label="Schedule">
                <Select value={med.schedule} onChange={(e)=>setMed({ ...med, schedule: e.target.value })}>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </Select>
              </Field>
              <Field label="Next Dose Date"><Input type="date" value={med.nextDate} onChange={(e)=>setMed({ ...med, nextDate: e.target.value })}/></Field>
            </div>
            <div className="mt-4">
              <Button onClick={addEvent}>Add Medication</Button>
            </div>
          </Card>

          <Card title="Vet Visit Scheduler" subtitle="Plan checkups & vaccines">
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="Clinic / Vet"><Input value={visit.clinic} onChange={(e)=>setVisit({ ...visit, clinic: e.target.value })} placeholder="Maple Vet"/></Field>
              <Field label="Reason">
                <Select value={visit.reason} onChange={(e)=>setVisit({ ...visit, reason: e.target.value })}>
                  <option>Checkup</option>
                  <option>Vaccination</option>
                  <option>Dental</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Date"><Input type="date" value={visit.date} onChange={(e)=>setVisit({ ...visit, date: e.target.value })}/></Field>
            </div>
            <div className="mt-4">
              <Button onClick={addVisit} variant="outline">Schedule Visit</Button>
            </div>
          </Card>
        </div>

        <Card title="Upcoming & Completed Health Events" subtitle="Keep everything in one list">
          {events.length === 0 ? (
            <p className="text-gray-600">No events yet. Add a medication or schedule a vet visit to get started.</p>
          ) : (
            <ul className="divide-y divide-amber-100">
              {events.map((e) => (
                <li key={e.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{e.type}: {e.name}</p>
                    <p className="text-sm text-gray-500">{e.extra} • {e.date}</p>
                  </div>
                  <Button variant="outline" onClick={() => removeEvent(e.id)}>Remove</Button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => setEvents([])}>Clear All</Button>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(saveable)}>Copy as JSON</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}

function Training() {
  const [stage, setStage] = useState("puppy");
  const stages = [
    { key: "puppy", label: "🐕 Puppy" },
    { key: "adult", label: "🦴 Adult" },
    { key: "senior", label: "🐾 Senior" },
  ];
  const content = {
    puppy: [
      { title: "Name Recognition & Sit", tips: ["Say name → reward eye contact", "Lure sit, mark, treat", "3×5 min sessions/day"] },
      { title: "Potty & Crate Basics", tips: ["Outdoors after sleep/meals", "Crate = safe den", "Heavily reward correct spots"] },
      { title: "Leash Intro", tips: ["Short hallway walks", "Reward loose leash", "Stop when pulling"] },
    ],
    adult: [
      { title: "Stay & Recall", tips: ["Add distance & duration", "Use long line for safety", "High‑value treats for recall"] },
      { title: "Leave‑It & Drop‑It", tips: ["Trade up, don't chase", "Mark calm disengage", "Short daily reps"] },
      { title: "Polite Greetings", tips: ["Ask for a sit first", "Reward 4 paws on floor", "Practice with friends"] },
    ],
    senior: [
      { title: "Gentle Mobility", tips: ["Low‑impact ramps", "Short sniff‑walks", "Warm‑up/cool‑down"] },
      { title: "Brain Games", tips: ["Snuffle mats", "Treat puzzles", "Hide‑and‑seek"] },
      { title: "Comfort & Care", tips: ["Orthopedic bed", "Softer foods if needed", "More frequent vet checks"] },
    ],
  };

  const tricks = [
    { title: "Paw/Shake", steps: ["Hold treat in fist", "Dog paws → mark", "Add cue word"] },
    { title: "Spin", steps: ["Lure circle with treat", "Mark when turn completes", "Fade hand lure"] },
    { title: "Roll Over", steps: ["Down → lure shoulder", "Mark halfway", "Reward full roll"] },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-6">
      <Section heading="Behavior & Training Courses">
        <div className="flex flex-wrap gap-2 mb-4">
          {stages.map((s) => (
            <Button key={s.key} variant={stage === s.key ? "primary" : "outline"} onClick={() => setStage(s.key)}>
              {s.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {content[stage].map((c, i) => (
            <Card key={i} title={c.title}>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {c.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Section heading="Tricks & Commands (Mini‑Lessons)">
          <div className="grid md:grid-cols-3 gap-6">
            {tricks.map((t, i) => (
              <Card key={i} title={t.title}>
                <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                  {t.steps.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </Section>
      </Section>
    </div>
  );
}

/* =====================
   App Shell / Navigation
   ===================== */
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-xl font-semibold transition-colors ${
        isActive ? "bg-white text-amber-700" : "text-white/90 hover:text-white"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function App() {
  return (
    <Router>
      <header className="sticky top-0 z-20 bg-amber-600/95 backdrop-blur supports-[backdrop-filter]:bg-amber-600/80 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            🐾 PetCare Hub
          </Link>
          <nav className="flex gap-1">
            <NavItem to="/services">Listings</NavItem>
            <NavItem to="/wellness">Wellness</NavItem>
            <NavItem to="/training">Training</NavItem>
          </nav>
        </div>
      </header>
      <main className="min-h-[70vh] bg-gradient-to-b from-amber-50 to-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </main>
      <footer className="border-t border-amber-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} PetCare Hub. All rights reserved.</p>
          <div className="flex gap-3">
            <Link className="hover:underline" to="/services">Find Providers</Link>
            <Link className="hover:underline" to="/wellness">Wellness</Link>
            <Link className="hover:underline" to="/training">Training</Link>
          </div>
        </div>
      </footer>
    </Router>
  );
}
