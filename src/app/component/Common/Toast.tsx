import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../Ui/Alert";
import { useEffect } from "react";
import { ToastMessage } from "../../interface/global.interface";

const Toast: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  return (
   <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 duration-300">
      <Alert className={`w-96 shadow-lg border-2 ${
        toast.type === 'success' 
          ? 'bg-green-50 border-green-400 text-green-900' 
          : 'bg-red-50 border-red-400 text-red-900'
      }`}>
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-semibold">{toast.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
        <AlertDescription className="text-sm">{toast.message}</AlertDescription>
      </Alert>
    </div>
  );
};

export { Toast };