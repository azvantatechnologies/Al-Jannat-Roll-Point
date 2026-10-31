// Restaurant WhatsApp number (country code, no + or spaces)
export const WA = "923002300039";

export const AZVANTA_URL = "https://azvantatechnologies.netlify.app/";

// To add/change an item: edit this list. category key: [label, [[name, price], ...]]
const DATA = {
  fast: ["Fast Food", [["Junior Zinger", 250], ["Jumbo Zinger", 330], ["Club Sandwich", 280], ["Special Club Sandwich", 450], ["Zinger Club Sandwich", 400], ["BBQ Club Sandwich", 400], ["Malai Club Sandwich", 400], ["Broast Leg", 320], ["Broast Chest", 380], ["Chicken Burger", 220], ["Beef Burger", 220]]],
  rolls: ["Rolls", [["Kabab Roll", 100], ["Chicken Roll", 130], ["Beef Roll", 150], ["Kabab Mayo Roll", 120], ["Chicken Mayo Roll", 150], ["Beef Mayo Roll", 170], ["Zinger Mayo Roll with Fries", 220], ["Zinger Mayo Roll with Cheese", 270], ["Malai Boti Roll", 170], ["Malai Boti Mayo Roll", 200], ["Chicken Cheese Roll", 200], ["Beef Cheese Roll", 200], ["Kabab Cheese Roll", 170], ["Malai Boti Cheese Roll", 250]]],
  bbq: ["Bar B Q", [["Kabab Seekh", 100], ["Beef Seekh", 250], ["Chicken Seekh", 200], ["Malai Boti Seekh", 250], ["Ch. Reshmi Kabab Seekh", 200], ["Tikka Leg", 300], ["Tikka Chest", 350], ["Malai Tikka Chest", 400]]],
  bun: ["Bun Kabab", [["2 Roti 1 Kabab", 70], ["1 Roti 1 Kabab", 60], ["2 Roti 2 Kabab", 120], ["Single Kabab", 50], ["Single Roti", 12], ["1 Patra Roti", 70]]],
  pizza: ["Pizza", [["Small Pizza · All Flavours", 250], ["Regular Pizza · All Flavours", 450], ["Large Pizza · All Flavours", 600]]],
  shawarma: ["Shawarma", [["Regular Shawarma", 120], ["Zinger Shawarma", 200]]],
};

export const MENU = Object.entries(DATA).flatMap(([category, [label, items]]) =>
  items.map(([name, price]) => ({ id: category + "|" + name, category, label, name, price }))
);
export const CATS = [["all", "All"], ...Object.entries(DATA).map(([k, v]) => [k, v[0]])];
export const BYID = Object.fromEntries(MENU.map((i) => [i.id, i]));
