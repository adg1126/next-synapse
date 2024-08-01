import { Id, Doc } from '@/convex/_generated/dataModel';
import { LucideIcon } from 'lucide-react';

declare interface ConvexClientProviderProps {
  children: React.ReactNode;
}

declare interface NewNoteButtonProps {
  label?: String;
  className?: string;
  icon?: React.ReactNode;
}

declare interface SidebarItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: String;
  icon: LucideIcon;
  onClick?: () => void;
  maxLevel?: number;
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

declare interface DocumentListProps {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
}

declare interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
  header: string;
  description?: string;
  confirmButtonClassName?: string;
}
