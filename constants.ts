import { Design, Shape, SizeOption } from './types';

export const PHONE_NUMBER = "919556994620";

export const SIZES_CIRCLE: SizeOption[] = [
  { label: '12x12 inches', value: '12x12' },
  { label: '16x16 inches', value: '16x16' },
];

export const SIZES_SQUARE: SizeOption[] = [
  { label: '8x8 inches', value: '8x8' },
  { label: '12x12 inches', value: '12x12' },
  { label: '16x16 inches', value: '16x16' },
];

export const SIZES_RECTANGLE: SizeOption[] = [
  { label: '10x12 inches', value: '10x12' },
];

export const DESIGNS: Design[] = [
  // Circle Designs (Home Decor)
  { id: 'c1', code: 'C-01', price: 500, pricing: { '12x12': 500, '16x16': 1000 }, shape: Shape.CIRCLE, image: './decor_circle_1.jpg', title: 'Blue Mandala Bloom', category: 'decor' },
  { id: 'c2', code: 'C-02', price: 500, pricing: { '12x12': 500, '16x16': 1000 }, shape: Shape.CIRCLE, image: './decor_circle_2.jpg', title: 'Jagannath Traditional', category: 'decor' },
  { id: 'c3', code: 'C-03', price: 500, pricing: { '12x12': 500, '16x16': 1000 }, shape: Shape.CIRCLE, image: './decor_circle_3.jpg', title: 'Durga Maa Essence', category: 'decor' },
  { id: 'c4', code: 'C-04', price: 500, pricing: { '12x12': 500, '16x16': 1000 }, shape: Shape.CIRCLE, image: './decor_circle_4.jpg', title: 'Maa Samleswari blessing', category: 'decor' },

  // Square Designs
  { id: 's1', code: 'S-01', price: 600, pricing: { '8x8': 600, '12x12': 800, '16x16': 1100 }, shape: Shape.SQUARE, image: './decor_square_1.jpg', title: 'Maa Samleswari Square', category: 'decor' },

  // Rectangle Designs
  { id: 'r1', code: 'R-01', price: 1500, pricing: { '10x12': 1500 }, shape: Shape.RECTANGLE, image: './decor_rectangle_1.jpg', title: 'Jagannath Trio Art', category: 'decor' },

  // Photo Frame Designs
  { id: 'pfc1', code: 'PF-C-01', price: 600, pricing: { '12x12': 600, '16x16': 1000 }, shape: Shape.CIRCLE, image: './photo_frame_circle_1.jpg', title: 'Blue Petals Frame', category: 'photo-frame' },
  { id: 'pfc2', code: 'PF-C-02', price: 600, pricing: { '12x12': 600, '16x16': 1000 }, shape: Shape.CIRCLE, image: './photo_frame_circle_2.jpg', title: 'Green Lotus Frame', category: 'photo-frame' },
  { id: 'pfc3', code: 'PF-C-03', price: 600, pricing: { '12x12': 600, '16x16': 1000 }, shape: Shape.CIRCLE, image: './photo_frame_circle_3.jpg', title: 'Peacock Feather Frame', category: 'photo-frame' },
  { id: 'pfc4', code: 'PF-C-04', price: 600, pricing: { '12x12': 600, '16x16': 1000 }, shape: Shape.CIRCLE, image: './photo_frame_circle_4.jpg', title: 'Mandala Dotted Frame', category: 'photo-frame' },
  { id: 'pfr1', code: 'PF-R-01', price: 500, pricing: { '10x12': 500 }, shape: Shape.RECTANGLE, image: './photo_frame_rectangle_1.jpg', title: 'Peacock Rectangle Frame', category: 'photo-frame' },

  // Name Plate Designs
  { id: 'np1', code: 'NP-01', price: 400, shape: Shape.RECTANGLE, image: './name_plate_1.jpg', title: 'Swagat Shreehit', category: 'name-plate' },
  { id: 'np2', code: 'NP-02', price: 300, shape: Shape.RECTANGLE, image: './name_plate_2.jpg', title: 'Udit Ujjwal', category: 'name-plate' },
  { id: 'np3', code: 'NP-03', price: 300, shape: Shape.RECTANGLE, image: './name_plate_3.jpg', title: 'Prithek Prince', category: 'name-plate' },
];