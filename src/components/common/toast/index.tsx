import { Toast, ToastBody } from "reactstrap";

interface Props {
  isOpen: boolean;
  message: string;
  color: string;
}

const ToastComponent = function ({ isOpen, message, color }: Props) {
  return (
    <Toast
      className={`${color} text-white fixed-top ms-auto mt-3`}
      isOpen={isOpen}
      aria-live="polite"
    >
      <ToastBody className="text-center">{message}</ToastBody>
    </Toast>
  );
};

export default ToastComponent;
