import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import Qty from "./Qty.jsx";
import { BYID, WA } from "../data/menu.js";

const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem("rp_cust")) || {}; } catch { return {}; }
};

export default function Checkout({ cart, setQty, clear, close }) {
  const saved = loadSaved();
  const [f, setF] = useState({ name: saved.name || "", phone: saved.phone || "", address: saved.address || "", note: "" });
  const [tried, setTried] = useState(false);

  const rows = Object.entries(cart).map(([id, q]) => ({ ...BYID[id], q }));
  const total = rows.reduce((s, r) => s + r.price * r.q, 0);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const err = { name: f.name.trim().length < 2, address: f.address.trim().length < 10 };

  const send = () => {
    setTried(true);
    if (err.name || err.address || !rows.length) return;
    try { localStorage.setItem("rp_cust", JSON.stringify({ name: f.name, phone: f.phone, address: f.address })); } catch { /* ignore */ }

    // null lines are skipped (optional phone / note)
    const msg = [
      "*New Order – Roll Point*",
      "",
      "*Name:* " + f.name.trim(),
      f.phone.trim() ? "*Phone:* " + f.phone.trim() : null,
      "*Address:* " + f.address.trim(),
      "",
      "*Items:*",
      ...rows.map((r) => r.q + " x " + r.name + " – Rs. " + r.price * r.q),
      "",
      "*Subtotal:* Rs. " + total,
      "(Delivery charges to be confirmed)",
      f.note.trim() ? "" : null,
      f.note.trim() ? "*Note:* " + f.note.trim() : null,
    ].filter((x) => x !== null).join("\n");

    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className="ov" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Your order">
        <div className="sh">
          <h2>Your Order</h2>
          <button className="x" aria-label="Close" onClick={close}>✕</button>
        </div>

        {rows.length ? (
          <div className="lines">
            {rows.map((r) => (
              <div className="ln" key={r.id}>
                <div><b>{r.name}</b><small>Rs. {r.price} each</small></div>
                <Qty q={r.q} onChange={(n) => setQty(r.id, n)} />
                <span className="lt">Rs. {r.price * r.q}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">Your cart is empty. Add something tasty from the menu! 😋</p>
        )}

        {!rows.length ? (
          <button className="btn btn-p full" onClick={close}>Browse Menu</button>
        ) : (
          <>
            <div className="tot"><span>Subtotal</span><b>Rs. {total}</b></div>

            <label className="fld">Your name *
              <input value={f.name} onChange={set("name")} placeholder="e.g. Ahmed" autoComplete="name" />
              {tried && err.name && <em>Please enter your name</em>}
            </label>
            <label className="fld">Phone (optional)
              <input value={f.phone} onChange={set("phone")} inputMode="tel" placeholder="03xx-xxxxxxx" autoComplete="tel" />
            </label>
            <label className="fld">Delivery address *
              <textarea rows="3" value={f.address} onChange={set("address")} placeholder="House / shop no., street, area, nearby landmark" autoComplete="street-address" />
              {tried && err.address && <em>Please enter a complete address (house no., street, area)</em>}
            </label>
            <label className="fld">Note (optional)
              <input value={f.note} onChange={set("note")} placeholder="e.g. less spicy, extra mayo" />
            </label>

            <button className="btn btn-wa full" onClick={send}><Icon n="chat" />Send Order on WhatsApp</button>
            <p className="hint">WhatsApp will open with your order ready. Just press send.</p>
            <button className="lnk" onClick={clear}>Clear cart</button>
          </>
        )}
      </div>
    </div>
  );
}
