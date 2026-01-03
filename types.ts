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