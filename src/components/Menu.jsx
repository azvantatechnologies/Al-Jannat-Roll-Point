import { useMemo, useState } from "react";
import Icon from "./Icon.jsx";
import Qty from "./Qty.jsx";
import { MENU, CATS } from "../data/menu.js";

export default function Menu({ cart, setQty }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return MENU.filter(
      (i) => (cat === "all" || i.category === cat) && (!t || (i.name + " " + i.label).toLowerCase().includes(t))
    );
  }, [cat, q]);

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">What are you craving?</span>
            <h2>Our <em>Menu</em></h2>
          </div>
          <p>Add items, choose quantity, then send your order with address on WhatsApp.</p>
        </div>

        <div className="tools">
          <label className="search">
            <span className="sr">Search menu</span>
            <Icon n="search" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search menu…" autoComplete="off" />
          </label>
          <div className="chips" role="group" aria-label="Menu categories">
            {CATS.map(([k, l]) => (
              <button key={k} className="chip" aria-pressed={cat === k} onClick={() => setCat(k)}>{l}</button>
            ))}
          </div>
        </div>

        <p className="count" aria-live="polite">{list.length} {list.length === 1 ? "item" : "items"}</p>

        <div className="mgrid">
          {list.length ? (
            list.map((i) => (
              <article className="item" key={i.id}>
                <div><small>{i.label}</small><h3>{i.name}</h3></div>
                <div className="row">
                  <div className="price"><span>Rs.</span>{i.price}</div>
                  {cart[i.id] ? (
                    <Qty q={cart[i.id]} onChange={(n) => setQty(i.id, n)} />
                  ) : (
                    <button className="add" onClick={() => setQty(i.id, 1)}><Icon n="bag" />Add</button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="empty">No items found. Try a different search.</p>
          )}
        </div>
        <p className="note">* Prices are in PKR. Delivery charges (if any) are confirmed by the restaurant on WhatsApp.</p>
      </div>
    </section>
  );
}
