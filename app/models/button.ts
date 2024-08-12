import { CallToAction } from '@/app/models/call-to-action.model';

export interface IButton extends CallToAction {
  onClick?: () => void;
}
