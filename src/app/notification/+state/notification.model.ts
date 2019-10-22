import { guid } from '@datorama/akita';

export interface Notification {
  id: string;
  content: string;
  title: string;
  delay: number;
  type: 'danger' | 'success' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';
  action?: string;
}

/**
 * A factory function that creates Notification
 */
export function createNotification(params: Partial<Notification>): Notification {
  return {
    id: guid(),
    content: '',
    title: '',
    delay: 2000,
    type: 'primary',
    ...params
  };
}
