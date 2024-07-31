import { Id } from '@/convex/_generated/dataModel';
import { LucideIcon } from 'lucide-react';

declare interface ConvexClientProviderProps {
  children: React.ReactNode;
}

declare interface NewNoteButtonProps {
  label?: String;
  className?: string;
  icon?: React.ReactNode;
}

declare interface UserItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpanded?: () => void;
  label: String;
  icon: LucideIcon;
  onClick: () => void;
}

declare interface TooltipProps {
  label: string;
  subtitle?: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
}
