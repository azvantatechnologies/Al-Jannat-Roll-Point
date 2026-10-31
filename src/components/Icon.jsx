// Small inline SVG icons. Usage: <Icon n="phone" />
const ICONS = {
  "phone": "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z\"/>",
  "chat": "<path d=\"M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5z\"/>",
  "check": "<path d=\"M20 6 9 17l-5-5\"/>",
  "flame": "<path d=\"M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 2.5-3 2 0-3-1-6-4-8 0 4-4 6-4 12 0 4 3 8 7 8z\"/>",
  "bike": "<circle cx=\"5.5\" cy=\"17\" r=\"3.5\"/><circle cx=\"18.5\" cy=\"17\" r=\"3.5\"/><path d=\"M12 17 9 8h4m-4 0H6m6 9 3-8h3\"/>",
  "bag": "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m21 21-4.3-4.3\"/>",
  "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\"/>"
};

export default function Icon({ n }) {
  return <svg className="ic" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[n] }} />;
}
