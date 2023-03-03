
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now() - 1000000,
      status: "in-process",
    },
    {
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ]
};