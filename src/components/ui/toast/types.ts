import type { Component, ComputedRef, VNode } from 'vue';
import type { ToastProps } from '@/components/ui/toast/index';

export type StringOrVNode = string | VNode | (() => VNode);

export type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: StringOrVNode;
  action?: Component;
};

export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

export type ActionType = typeof actionTypes;

export type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

export interface State {
  toasts: ToasterToast[];
}

export type Toast = Omit<ToasterToast, 'id'>;

export interface UseToastReturn {
  toasts: ComputedRef<ToasterToast[]>;
  toast: (props: Toast) => ToastReturn;
  dismiss: (toastId?: string) => void;
}
export interface ToastReturn {
  id: string;
  update: (props: ToasterToast) => void;
  dismiss: () => void;
}
