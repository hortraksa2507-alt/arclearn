export interface ProductivityApp {
  id: string;
  name: string;
  category: "music" | "notes" | "calendar" | "storage" | "communication" | "documents";
  color: string;
  icon: string;
  description: string;
  connectUrl?: string;
}

export const PRODUCTIVITY_APPS: ProductivityApp[] = [
  {
    id: "spotify",
    name: "Spotify",
    category: "music",
    color: "#1DB954",
    icon: "spotify",
    description: "Focus music & lofi playlists",
    connectUrl: "https://open.spotify.com",
  },
  {
    id: "notion",
    name: "Notion",
    category: "notes",
    color: "#FFFFFF",
    icon: "notion",
    description: "Notes, wikis & databases",
    connectUrl: "https://notion.so",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "calendar",
    color: "#4285F4",
    icon: "calendar",
    description: "Sync classes & deadlines",
    connectUrl: "https://calendar.google.com",
  },
  {
    id: "apple-calendar",
    name: "Apple Calendar",
    category: "calendar",
    color: "#FF3B30",
    icon: "calendar",
    description: "iCloud schedule sync",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "storage",
    color: "#0F9D58",
    icon: "drive",
    description: "Docs, slides & files",
    connectUrl: "https://drive.google.com",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    category: "storage",
    color: "#0061FF",
    icon: "dropbox",
    description: "Cloud file storage",
    connectUrl: "https://dropbox.com",
  },
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    color: "#4A154B",
    icon: "slack",
    description: "Team & study group chat",
    connectUrl: "https://slack.com",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "communication",
    color: "#EA4335",
    icon: "mail",
    description: "Email & notifications",
    connectUrl: "https://mail.google.com",
  },
  {
    id: "apple-mail",
    name: "Apple Mail",
    category: "communication",
    color: "#007AFF",
    icon: "mail",
    description: "iCloud & IMAP email",
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "documents",
    color: "#217346",
    icon: "excel",
    description: "Spreadsheets & data",
    connectUrl: "https://office.com",
  },
  {
    id: "word",
    name: "Microsoft Word",
    category: "documents",
    color: "#2B579A",
    icon: "word",
    description: "Essays & reports",
    connectUrl: "https://office.com",
  },
];

/** Popular lofi beats playlist — Spotify embed */
export const LOFI_PLAYLIST = {
  id: "37i9dQZF1DWWQRwui0ExPn",
  name: "lofi hip hop music - beats to relax/study to",
  embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0",
};

export const DEFAULT_CALENDAR_EVENTS = [
  {
    id: "evt-1",
    title: "Architecture Studio",
    date: getRelativeDate(0),
    startTime: "09:00",
    endTime: "11:30",
    color: "#007AFF",
    source: "google-calendar" as const,
  },
  {
    id: "evt-2",
    title: "AutoCAD Practice Session",
    date: getRelativeDate(0),
    startTime: "14:00",
    endTime: "15:30",
    color: "#30D158",
    source: "apple-calendar" as const,
  },
  {
    id: "evt-3",
    title: "History Essay Due",
    date: getRelativeDate(1),
    startTime: "23:59",
    endTime: "23:59",
    color: "#FF9F0A",
    source: "notion" as const,
  },
  {
    id: "evt-4",
    title: "Study Group — Slack",
    date: getRelativeDate(2),
    startTime: "16:00",
    endTime: "17:00",
    color: "#BF5AF2",
    source: "slack" as const,
  },
];

function getRelativeDate(daysFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().split("T")[0];
}

export const DEFAULT_TODOS = [
  {
    id: "todo-1",
    title: "Review AutoCAD floor plan chapter 4",
    completed: false,
    priority: "high" as const,
    estimatedMinutes: 35,
    source: "notion" as const,
  },
  {
    id: "todo-2",
    title: "Write 3-page history essay draft",
    completed: false,
    priority: "high" as const,
    estimatedMinutes: 90,
    source: "word" as const,
  },
  {
    id: "todo-3",
    title: "Practice dimension commands — 30 min",
    completed: false,
    priority: "medium" as const,
    estimatedMinutes: 30,
    source: "google-drive" as const,
  },
  {
    id: "todo-4",
    title: "Organize project files in Dropbox",
    completed: true,
    priority: "low" as const,
    estimatedMinutes: 15,
    source: "dropbox" as const,
  },
];

export const DEFAULT_STICKY_NOTES = [
  {
    id: "note-1",
    text: "Research Art Deco references for facade",
    color: "#FFEB3B",
    x: 40,
    y: 30,
    width: 180,
    height: 140,
  },
  {
    id: "note-2",
    text: "Ask professor about site plan scale",
    color: "#FF9800",
    x: 260,
    y: 80,
    width: 170,
    height: 120,
  },
  {
    id: "note-3",
    text: "Idea: use glass curtain wall on south face",
    color: "#4CAF50",
    x: 120,
    y: 220,
    width: 200,
    height: 130,
  },
];
