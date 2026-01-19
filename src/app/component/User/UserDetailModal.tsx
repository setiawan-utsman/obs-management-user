import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Mail, Phone, Globe } from "lucide-react";
import { User } from "../../interface/global.interface";
import { Button } from "../Ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../Ui/Dialog";

const UserDetailModal: React.FC<{ 
  user: User | null; 
  open: boolean; 
  onClose: () => void;
}> = ({ user, open, onClose }) => {
  if (!user) return null;

  return (
  <Dialog open={open} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden bg-white"
  showCloseButton={false}>
    {/* Header */}
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
      <DialogHeader className="gap-1">
        <DialogTitle className="text-base font-semibold text-white">
          User Profile
        </DialogTitle>
        <DialogDescription className="text-sm text-blue-100">
          Detail informasi pengguna
        </DialogDescription>
      </DialogHeader>
    </div>

    {/* Body */}
    <div className="px-6 pb-6 -mt-0 space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
          <AvatarImage src={`https://picsum.photos/seed/${user.id}/200`} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          @{user.username}
        </p>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <InfoItem icon={<Mail />} label="Email" value={user.email} />
        <InfoItem icon={<Phone />} label="Phone" value={user.phone} />
        <InfoItem icon={<Globe />} label="Website" value={user.website} />
      </div>

      {/* Company */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <p className="text-xs text-muted-foreground mb-1">Company</p>
        <p className="font-medium text-gray-900">
          {user.company.name}
        </p>
        <p className="text-sm text-gray-500 italic">
          “{user.company.catchPhrase}”
        </p>
      </div>

      {/* Action */}
      <Button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 h-12 text-white"
      >
        Close
      </Button>
    </div>
  </DialogContent>
</Dialog>


  );
};

export { UserDetailModal };

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-center gap-4 rounded-lg border bg-white px-4 py-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  </div>
)

