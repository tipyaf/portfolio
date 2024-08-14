import { CallToAction } from '@/types/client/call-to-action.model';

export interface IButton extends CallToAction {
  onClick?: () => void;
}
