// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../Ui/Button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "../Ui/Dialog";

const ConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}> = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="transition hover:bg-gray-400/45 hover:-translate-y-0.5 active:translate-y-0 h-12 bg-gray-100" variant="outline" onClick={onClose}>Cancel</Button>
          <Button className=" bg-green-700
       h-12 text-white
      transition
      hover:-translate-y-0.5
      hover:shadow-lg
      active:translate-y-0
      hover:bg-green-700/85" variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmDialog };