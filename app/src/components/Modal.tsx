import {
  Children,
  cloneElement,
  isValidElement,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type RefObject,
  useEffect,
} from "react";
import { cn } from "../lib/cn";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  labelledBy?: string;
  describedBy?: string;
  containerClassName?: string;
  overlayClassName?: string;
  contentWrapperClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  role?: "dialog" | "alertdialog";
  initialFocusRef?: RefObject<HTMLElement> | null;
};

function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  describedBy,
  containerClassName,
  overlayClassName,
  contentWrapperClassName,
  contentClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  role = "dialog",
  initialFocusRef,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }

    return () => {
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, initialFocusRef]);

  if (!isOpen) {
    return null;
  }

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  const handleContentClick = (
    event: ReactMouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (typeof child.props.onClick === "function") {
      child.props.onClick(event);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex min-h-full items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-red-950/80 backdrop-blur-sm transition-opacity duration-200 ease-out",
          overlayClassName,
        )}
        aria-hidden
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-3xl border border-red-400/20 bg-red-950/90 text-red-50 shadow-[0_40px_120px_rgba(127,29,29,0.45)]",
          "pointer-events-auto",
          contentWrapperClassName,
        )}
      >
        {cloneElement(child, {
          role,
          "aria-modal": true,
          "aria-labelledby": labelledBy,
          "aria-describedby": describedBy,
          className: cn(child.props.className, contentClassName),
          onClick: handleContentClick,
        })}
      </div>
    </div>
  );
}

export default Modal;
