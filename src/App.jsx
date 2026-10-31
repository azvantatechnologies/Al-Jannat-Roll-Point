import { useEffect, useState } from "react";
import Icon from "./components/Icon.jsx";
import Menu from "./components/Menu.jsx";
import Checkout from "./components/Checkout.jsx";
import { BYID, WA, AZVANTA_URL } from "./data/menu.js";

export default function App() {
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [open, setOpen] = useState(false); // checkout sheet
  const [nav, setNav] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);

  const setQty = (id, n) =>
    setCart((c) => {
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = Math.min(n, 50);
      return next;
    });

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce((s, [id, q]) => s + BYID[id].price * q, 0);

  useEffect(() => {
    const f = () => setScrolled(scrollY > 10);
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <div className="topbar"><div className="wrap">
        <span className="t1">Fresh · Hot · Delicious</span>
        <span>Home Delivery: <a href="tel:03002300039">0300-2300039</a> · <a href="tel:03213470035">0321-3470035</a></span>
      </div></div>

      <header className={scrolled ? "scrolled" : ""}><div className="wrap bar">
        <a className="brand" href="#home">
          <img src="/logo.jpg" alt="Al Jannat Fast Food logo" width="50" height="50" />
          <span><b>ROLL POINT</b><small>AL JANNAT FAST FOOD</small></span>
        </a>
        <button className="hcart" aria-label="Open cart" onClick={() => setOpen(true)}>
          <Icon n="bag" /><span>Cart</span>{count > 0 && <i className="bdg">{count}</i>}
        </button>
        <button className="burger" aria-label="Toggle navigation" aria-expanded={nav} onClick={() => setNav(!nav)}><Icon n="menu" /></button>
        <nav className={nav ? "open" : ""} onClick={(e) => e.target.closest("a") && setNav(false)}>
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#order">How to Order</a><a href="#contact">Contact</a>
          <a className="btn btn-p" href="tel:03002300039"><Icon n="phone" />Call Now</a>
        </nav>
      </div></header>

      <main>
        <section className="hero" id="home"><div className="wrap">
          <div>
            <span className="eyebrow">Al Jannat Fast Food</span>
            <h1>Big Flavour.<br /><em>Roll Point.</em></h1>
            <p className="lead">Loaded rolls, juicy burgers, sizzling BBQ, cheesy pizza and shawarma — freshly prepared and delivered to your door.</p>
            <div className="cta">
              <a className="btn btn-p" href="#menu">Order Now</a>
              <a className="btn btn-o" href="tel:03002300039"><Icon n="phone" />Call</a>
            </div>
            <div className="checks">
              {["Freshly prepared", "Home delivery", "Easy WhatsApp ordering"].map((t) => <span key={t}><Icon n="check" />{t}</span>)}
            </div>
          </div>
          <aside className="hcard">
            <img className="logo" src="/logo.jpg" alt="" width="112" height="112" />
            <h2>Featured Items</h2><p className="sub">A taste of our menu</p>
            <ul>
              {[["Jumbo Zinger", 330], ["Malai Boti Roll", 170], ["Chicken Cheese Roll", 200], ["Regular Pizza", 450], ["Zinger Shawarma", 200]].map(([n, p]) => (
                <li key={n}><span>{n}</span><span>Rs. {p}</span></li>
              ))}
            </ul>
          </aside>
        </div></section>

        <div className="band" aria-hidden="true"><div className="wrap">
          {["ROLLS", "BURGERS", "BBQ", "PIZZA", "SHAWARMA"].map((t, i) => (
            <span key={t}>{i > 0 && <i>✦ </i>}{t}</span>
          ))}
        </div></div>

        <section className="feat"><div className="wrap grid3">
          {[["flame", "Freshly Prepared", "Every order is made hot and fresh, from quick rolls to full BBQ platters."],
          ["bike", "Home Delivery", "Skip the trip. Order online and enjoy your meal at home."],
          ["bag", "Wide Variety", "Fast food, rolls, BBQ, bun kabab, pizza and shawarma — all in one place."]].map(([i, h, p]) => (
            <div className="card" key={h}><div className="ib"><Icon n={i} /></div><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div></section>

        <Menu cart={cart} setQty={setQty} />

        <section id="order"><div className="wrap">
          <div className="head"><div><span className="eyebrow">Simple &amp; quick</span><h2>How to <em style={{ color: "var(--amber)" }}>Order</em></h2></div></div>
          <div className="grid3 steps">
            {[["Choose", "Pick your favourite items and set the quantity."],
            ["Add address", "Enter your name and delivery address."],
            ["Send on WhatsApp", "Your full order opens in WhatsApp. Press send and we’ll confirm."]].map(([h, p]) => (
              <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div></section>

        <section className="cta-sec"><div className="wrap cta-in">
          <div><span className="eyebrow">Your favourites, at your door</span><h2>Hungry? We’re just a tap away.</h2><p>Order on WhatsApp or call us for home delivery.</p></div>
          <a className="btn btn-p" href="#menu"><Icon n="bag" />Start Your Order</a>
        </div></section>

        <section className="contact" id="contact"><div className="wrap cgrid">
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 style={{ fontSize: "clamp(34px,4.5vw,52px)", marginTop: 12 }}>Contact <em style={{ fontStyle: "normal", color: "var(--amber)" }}>Us</em></h2>
            <p style={{ color: "var(--mute)", marginTop: 12, maxWidth: 460 }}>Ready to order? Reach us on any of the options below.</p>
          </div>
          <div className="cl">
            <a href="tel:03002300039"><Icon n="phone" /><span><small>Home Delivery</small>0300-2300039</span></a>
            <a href="tel:03213470035"><Icon n="phone" /><span><small>Home Delivery</small>0321-3470035</span></a>
            <a href={"https://wa.me/" + WA} target="_blank" rel="noopener"><Icon n="chat" /><span><small>WhatsApp</small>Message us to order</span></a>
          </div>
        </div></section>
      </main>

      <footer><div className="wrap">
        <div className="fgrid">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}>
              <img src="/logo.jpg" alt="" width="50" height="50" />
              <span><b>ROLL POINT</b><small>AL JANNAT FAST FOOD</small></span>
            </div>
            <p style={{ maxWidth: 300 }}>Fast food favourites, freshly prepared for you.</p>
          </div>
          <div><h3>QUICK LINKS</h3><a href="#home">Home</a><a href="#menu">Menu</a><a href="#order">How to Order</a><a href="#contact">Contact</a></div>
          <div><h3>ORDER</h3><a href="tel:03002300039">0300-2300039</a><a href="tel:03213470035">0321-3470035</a><a href={"https://wa.me/" + WA} target="_blank" rel="noopener">WhatsApp</a></div>
        </div>
        <div className="fbot">
          <span>© {new Date().getFullYear()} Roll Point · Al Jannat Fast Food. All rights reserved.</span>
          <span className="credit">
            Designed &amp; organized by{" "}
            <a href={AZVANTA_URL} target="_blank" rel="noopener noreferrer">Azvanta Technologies</a>
          </span>
        </div>
      </div></footer>

      <div className="mbar">
        <a className="btn btn-p" href="tel:03002300039"><Icon n="phone" />Call</a>
        <a className="btn btn-wa" href={"https://wa.me/" + WA} target="_blank" rel="noopener"><Icon n="chat" />WhatsApp</a>
      </div>

      {count > 0 && !open && (
        <button className="cartbar" onClick={() => setOpen(true)}>
          <span><Icon n="bag" />{count} {count === 1 ? "item" : "items"} · Rs. {total}</span><b>View Order →</b>
        </button>
      )}
      {open && <Checkout cart={cart} setQty={setQty} clear={() => { setCart({}); setOpen(false); }} close={() => setOpen(false)} />}
    </>
  );
}
