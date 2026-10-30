import { ComponentType, CSSProperties, ReactNode } from 'react';

export interface CardSwapItem {
  title: string;
  image?: string;
  icon?: ReactNode;
  alt?: string;
}

export interface CardSwapProps {
  items?: CardSwapItem[];
  children?: ReactNode;
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  depth?: number;
  skewAmount?: number;
  visibleCards?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  speed?: number;
  bounce?: number;
  parallax?: number;
  hoverSpread?: number;
  dim?: number;
  cardRadius?: number;
  intro?: boolean;
  theme?: 'dark' | 'light';
  onCardClick?: (index: number) => void;
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export interface CardProps {
  customClass?: string;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export declare const Card: ComponentType<CardProps>;

declare const CardSwap: ComponentType<CardSwapProps>;
export default CardSwap;
