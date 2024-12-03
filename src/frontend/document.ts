// src/types/document.ts

export interface Document {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
    status: 'pending' | 'approved' | 'denied';
  }
  