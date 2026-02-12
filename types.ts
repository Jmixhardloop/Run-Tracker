
export interface Interval {
  id: string;
  runMinutes: number;
  runSeconds: number;
  restMinutes: number;
  restSeconds: number;
}

export interface SessionStats {
  id: number;
  type: 'Free' | 'Interval';
  date: string;
  totalDistance: number;
  totalTime: number;
  avgPace: string;
  avgSpeed: number;
  intervals?: {
    block: number;
    distance: number;
    pace: string;
  }[];
}

export interface GPSCoordinate {
  lat: number;
  lon: number;
}

export type ViewState = 'SETUP' | 'ACTIVE' | 'HISTORY' | 'COACH';
