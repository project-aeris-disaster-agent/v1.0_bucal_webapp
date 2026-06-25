export type SeatSection = {
  id: string;
  label: string;
  color: string;
  priceLabel: string;
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  capacity: number;
  sections: SeatSection[];
};

export const venues: Venue[] = [
  {
    id: "bucal-coliseum",
    name: "BUCAL Coliseum",
    city: "Legazpi City",
    capacity: 4200,
    sections: [
      { id: "vip", label: "VIP Courtside", color: "#a3ff00", priceLabel: "₱850" },
      { id: "lower", label: "Lower Bowl", color: "#22d3ee", priceLabel: "₱450" },
      { id: "upper", label: "Upper Bowl", color: "#818cf8", priceLabel: "₱250" },
      { id: "ga", label: "General Admission", color: "#fb923c", priceLabel: "₱150" },
    ],
  },
  {
    id: "partido-gym",
    name: "Partido State Gymnasium",
    city: "Goa, Camarines Sur",
    capacity: 2800,
    sections: [
      { id: "vip", label: "VIP Courtside", color: "#a3ff00", priceLabel: "₱650" },
      { id: "lower", label: "Lower Bowl", color: "#22d3ee", priceLabel: "₱350" },
      { id: "upper", label: "Upper Bowl", color: "#818cf8", priceLabel: "₱200" },
      { id: "ga", label: "General Admission", color: "#fb923c", priceLabel: "₱120" },
    ],
  },
  {
    id: "catsu-arena",
    name: "CatSU Arena",
    city: "Virac, Catanduanes",
    capacity: 2400,
    sections: [
      { id: "vip", label: "VIP Courtside", color: "#a3ff00", priceLabel: "₱600" },
      { id: "lower", label: "Lower Bowl", color: "#22d3ee", priceLabel: "₱320" },
      { id: "upper", label: "Upper Bowl", color: "#818cf8", priceLabel: "₱180" },
      { id: "ga", label: "General Admission", color: "#fb923c", priceLabel: "₱100" },
    ],
  },
  {
    id: "naga-complex",
    name: "Naga City Sports Complex",
    city: "Naga City",
    capacity: 3600,
    sections: [
      { id: "vip", label: "VIP Courtside", color: "#a3ff00", priceLabel: "₱750" },
      { id: "lower", label: "Lower Bowl", color: "#22d3ee", priceLabel: "₱400" },
      { id: "upper", label: "Upper Bowl", color: "#818cf8", priceLabel: "₱220" },
      { id: "ga", label: "General Admission", color: "#fb923c", priceLabel: "₱130" },
    ],
  },
  {
    id: "adnu-gym",
    name: "Ateneo de Naga Gym",
    city: "Naga City",
    capacity: 1800,
    sections: [
      { id: "vip", label: "VIP Courtside", color: "#a3ff00", priceLabel: "₱550" },
      { id: "lower", label: "Lower Bowl", color: "#22d3ee", priceLabel: "₱300" },
      { id: "upper", label: "Upper Bowl", color: "#818cf8", priceLabel: "₱170" },
      { id: "ga", label: "General Admission", color: "#fb923c", priceLabel: "₱90" },
    ],
  },
];
