import { useState } from "react";
import UserList from "./users/UserList";
import UserForm from "./users/UserForm";

export default function Usuarios() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && <UserList onEdit={handleEditUser} />}

      {showForm && (
        <UserForm user={selectedUser} onClose={handleCloseForm} />
      )}
    </div>
  );
}
