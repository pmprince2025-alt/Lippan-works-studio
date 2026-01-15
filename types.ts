import React from 'react';

export enum Shape {
  CIRCLE = 'Circle',
  SQUARE = 'Square',
  RECTANGLE = 'Rectangle'
}

export interface Design {
  id: string;
  code: string;
  price: number;
  pricing?: { [size: string]: number }; // Size-based pricing (e.g., { '8x8': 600, '12x12': 800 })
  image: string;
  shape: Shape;
  title?: string;
  category?: 'decor' | 'photo-frame' | 'name-plate';
}

export interface SizeOption {
  label: string;
  value: string;
}

export interface ShapeOption {
  id: Shape;
  label: string;
  icon?: React.ReactNode;
}