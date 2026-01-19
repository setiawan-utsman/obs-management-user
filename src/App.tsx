import React, { useState } from 'react';
import './App.css';
import { useUsers } from './app/context/UserContextProvider';
import { ToastMessage, User, UserFormData } from './app/interface/global.interface';
import { AlertCircle, Loader2, UserPlus, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './app/component/Ui/Alert';
import { Button } from './app/component/Ui/Button';
import { UserCard } from './app/component/User/UserCard';
import { UserDetailModal } from './app/component/User/UserDetailModal';
import { UserFormModal } from './app/component/User/UserFormModal';
import { ConfirmDialog } from './app/component/Common/ConfirmDialog';
import { Toast } from './app/component/Common/Toast';

function App() {
  const { users, loading, error, addUser, updateUser, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastMessage>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const handleAddUser = () => {
    setFormMode('add');
    setSelectedUser(null);
    setFormModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setFormMode('edit');
    setSelectedUser(user);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      showToast('User deleted successfully', 'success');
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = (data: UserFormData) => {
    if (formMode === 'add') {
      addUser(data);
      showToast('User added successfully', 'success');
    } else if (selectedUser) {
      updateUser(selectedUser.id, data);
      showToast('User updated successfully', 'success');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
    <div className="mx-auto max-w-7xl px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            {/* <Users className="h-5 w-5 text-primary" /> */}
            <img src="./logo.png" alt="" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-semibold tracking-tight">
              User Management
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage your users efficiently
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm">
          <span className="font-medium">{users.length}</span>
          <span className="text-muted-foreground">
            {users.length === 1 ? 'User' : 'Users'}
          </span>
        </div>
      </div>
    </div>
  </header>

      {/* Main Content */}
     <main className="mx-auto max-w-7xl px-4 py-5 pb-20">
  {users.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <UserPlus className="h-7 w-7 text-primary" />
      </div>

      <h3 className="text-lg font-semibold">No users found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by adding your first user
      </p>

      <Button onClick={handleAddUser} className="mt-5">
        <UserPlus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          index={index}
          user={user}
          onView={() => handleViewUser(user)}
          onEdit={() => handleEditUser(user)}
          onDelete={() => handleDeleteClick(user.id)}
        />
      ))}
    </div>
  )}
</main>


      {/* Floating Action Button */}
      <Button
        onClick={handleAddUser}
        size="icon-lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-md hover:shadow-xl transition-all"
      >
        <UserPlus className="" size={50} />
      </Button>

      {/* Modals */}
      <UserDetailModal
        user={selectedUser}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />

      <UserFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser || undefined}
        mode={formMode}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
}

export default App;
