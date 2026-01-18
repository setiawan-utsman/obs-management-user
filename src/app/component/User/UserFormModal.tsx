// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { UserFormData, User } from "../../interface/global.interface";
import { Button } from "../Ui/Button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "../Ui/Dialog";
import { Input } from "../Ui/Input";
import { Globe, Mail, Phone, X } from "lucide-react";

const UserFormModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: User;
  mode: 'add' | 'edit';
}> = ({ open, onClose, onSubmit, user, mode }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      });
    }
  }, [user, mode, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const fieldError = validate({ [name]: value });

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };

      if (fieldError[name as keyof UserFormData]) {
        // 3. Jika masih error → set error
        newErrors[name as keyof UserFormData] =
          fieldError[name as keyof UserFormData];
      } else {
        // 4. Jika sudah valid → hapus error
        delete newErrors[name as keyof UserFormData];
      }

      return newErrors;
    });
  };

  const handleSubmit = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      onClose();
    }
  };

  const validate = (data: Partial<UserFormData>) => {
    const newErrors: Partial<UserFormData> = {}

    if ('name' in data && !data.name?.trim()) {
      newErrors.name = 'Name is required'
    }

    if ('username' in data && !data.username?.trim()) {
      newErrors.username = 'Username is required'
    }

    if ('email' in data) {
      if (!data.email?.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        newErrors.email = 'Invalid email address'
      }
    }

    if ('phone' in data && !data.phone?.trim()) {
      newErrors.phone = 'Phone is required'
    }

    return newErrors
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[640px] p-0 overflow-hidden border bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b bg-white">
          <div>
            <DialogTitle className="text-lg font-semibold">
              {mode === 'add' ? 'Add User' : 'Edit User'}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {mode === 'add'
                ? 'Create a new user account'
                : 'Update user information'}
            </DialogDescription>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label>Name <span className="text-red-700">*</span></Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={` h-12
      transition
      ${errors.name
                  ? 'border-red-50 ring-1 ring-red-200 bg-red-100/15'
                  : 'focus:ring-2 focus:ring-primary'}
    `}
            />
            {errors.name && (
              <p className="text-xs text-destructive text-red-700 pt-1">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label>Username <span className="text-red-700">*</span></Label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={` h-12
      transition
      ${errors.username
                  ? 'border-red-50 ring-1 ring-red-200 bg-red-100/15'
                  : 'focus:ring-2 focus:ring-primary'}
    `}
            />
            {errors.username && (
              <p className="text-xs text-destructive text-red-700 pt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label>Email <span className="text-red-700">*</span></Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={` h-12 px-12
      transition
      ${errors.email
                    ? 'border-red-50 ring-1 ring-red-200 bg-red-100/15'
                    : 'focus:ring-2 focus:ring-primary'}
    `}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive text-red-700 pt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label>Phone <span className="text-red-700">*</span></Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="number"
                className={` h-12 pl-12
      transition
      ${errors.email
                    ? 'border-red-50 ring-1 ring-red-200 bg-red-100/15'
                    : 'focus:ring-2 focus:ring-primary'}
    `}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive text-red-700 pt-1">{errors.phone}</p>
            )}
          </div>

          {/* Website */}
          <div className="space-y-1.5 md:col-span-2">
            <Label>Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="pl-9 h-12"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-5 py-3 bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            className="transition hover:bg-gray-400/45 hover:-translate-y-0.5 active:translate-y-0 h-12 bg-gray-100 w-[50%]"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="
      w-[50%]
      bg-green-700
       h-12 text-white
      transition
      hover:-translate-y-0.5
      hover:shadow-lg
      active:translate-y-0
      hover:bg-green-700/85
    "
          >
            {mode === 'add' ? 'Add User' : 'Save Changes'}
          </Button>
        </div>

      </DialogContent>
    </Dialog>

  );
};

export { UserFormModal };