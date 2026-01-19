import { ArrowRight, Edit, Mail, Phone, Trash2 } from "lucide-react";
import { User } from "../../interface/global.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../Ui/Avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Ui/Card";
import { Button } from "../Ui/Button";

const UserCard: React.FC<{ 
  user: User; 
  onView: () => void; 
  onEdit: () => void; 
  onDelete: () => void;
  index: number;
}> = ({ user, onView, onEdit, onDelete, index }) => {
  return (
  <Card
  className="group relative overflow-hidden rounded-xl border bg-white transition hover:shadow-md"
  style={{ animationDelay: `${index * 80}ms` }}
>
  {/* Accent bar */}
  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

  {/* Header */}
  <CardHeader className="flex flex-row items-center gap-3 p-4 pb-3">
    <div className="relative">
      <Avatar className="h-11 w-11 ring-1 ring-border">
        <AvatarImage src={`https://picsum.photos/seed/${user.id}/200`} />
        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
    </div>

    <div className="min-w-0 flex-1">
      <CardTitle className="truncate text-sm font-semibold leading-tight">
        {user.name}
      </CardTitle>
      <p className="truncate text-xs text-muted-foreground">
        @{user.username}
      </p>
    </div>
  </CardHeader>

  {/* Content */}
  <CardContent className="space-y-2 px-4 pb-3 text-sm">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Mail className="h-4 w-4 shrink-0" />
      <span className="truncate">{user.email}</span>
    </div>

    <div className="flex items-center gap-2 text-muted-foreground">
      <Phone className="h-4 w-4 shrink-0" />
      <span>{user.phone}</span>
    </div>
  </CardContent>

  {/* Footer */}
<CardFooter className="flex items-center justify-between border-t px-4 py-3 pb-0">
  <Button
    variant="default"
    size="sm"
    onClick={onView}
    className="h-auto px-0 text-sm font-medium hover:text-blue-600"
  >
    View details <ArrowRight />
  </Button>

  <div className="flex items-center gap-2">
    {/* Edit */}
    <Button
      size="icon"
      variant="ghost"
      onClick={onEdit}
      className="h-10 w-10 rounded-lg hover:bg-blue-50 transition"
    >
      <Edit className="h-5 w-5" />
    </Button>

    {/* Delete */}
    <Button
      size="icon-lg"
      variant="ghost"
      onClick={onDelete}
      className="h-10 w-10 rounded-lg text-destructive hover:bg-red-50 transition"
    >
      <Trash2 className="h-5 w-5" />
    </Button>
  </div>
</CardFooter>

</Card>

  );
};

export { UserCard };