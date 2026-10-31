// The − 2 + stepper
export default function Qty({ q, onChange }) {
  return (
    <div className="qty">
      <button aria-label="Decrease" onClick={() => onChange(q - 1)}>−</button>
      <b>{q}</b>
      <button aria-label="Increase" onClick={() => onChange(q + 1)}>+</button>
    </div>
  );
}
