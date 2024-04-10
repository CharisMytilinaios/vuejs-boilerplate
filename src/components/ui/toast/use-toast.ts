import { computed, ref } from 'vue';
import type { Action, State, Toast, ToasterToast, ToastReturn, UseToastReturn } from './types';
import { actionTypes } from './types';
import { TOAST_LIMIT, TOAST_REMOVE_DELAY } from './constants';

let count = 0;
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const state = ref<State>({
  toasts: [],
});

const genId = (): string => {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
};

const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

function dispatch(action: Action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT);
      break;
    case actionTypes.UPDATE_TOAST:
      state.value.toasts = state.value.toasts.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t,
      );
      break;
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.value.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }
      state.value.toasts = state.value.toasts.map((t) =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false,
            }
          : t,
      );
      break;
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) state.value.toasts = [];
      else state.value.toasts = state.value.toasts.filter((t) => t.id !== action.toastId);
      break;
  }
}

const toast = (props: Toast): ToastReturn => {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
};

const useToast = (): UseToastReturn => {
  return {
    toasts: computed(() => state.value.toasts),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
};

export { toast, useToast };
