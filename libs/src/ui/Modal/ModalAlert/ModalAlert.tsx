import type { FC } from "react";
import { ModalBase } from "../ModalBase";
import { CustomButton } from "../../CustomButton";
import { AlertTriangle } from "lucide-react";

interface IModalAlertProps {
  setOpen: (value: boolean) => void;
  title?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ModalAlert: FC<IModalAlertProps> = ({
  setOpen,
  title = "Eliminar",
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <ModalBase setOpen={setOpen} className="max-w-lg">
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle width={50} height={50} />
        </div>

        <div className="text-center mb-8">
          <h3 className="font-headline-md text-2xl text-(--color-on-surface) mb-3">
            {title}
          </h3>
          <p className="font-body-md text-(--color-on-surface-variant) max-w-[320px] mx-auto">
            {text}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <CustomButton
            className="w-full py-3.5 rounded-lg border border-white/10 bg-transparent text-(--color-on-surface) hover:bg-(--color-surface-container-high)"
            text="Cancel"
            disabled={disabled}
            onClick={() => setOpen(false)}
          />
          <CustomButton
            className="w-full py-3.5 rounded-lg bg-(--color-error) text-(--color-on-error) font-bold shadow-lg shadow-error/20 hover:brightness-110"
            text="Delete"
            disabled={disabled}
            onClick={onClick}
          />
        </div>
      </div>
    </ModalBase>
  );
};
