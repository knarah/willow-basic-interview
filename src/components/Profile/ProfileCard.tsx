import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { useProfileCard } from "../../hooks/useProfileCard";

const ProfileCard = () => {
  const { user, updateUser } = useProfileCard();

  const [isModalOpen, setIsOpenModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState(user);

  React.useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => (prev === null ? null : { ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editUser !== null) {
      updateUser(editUser);
    } else {
      console.error("User is null");
    }
    setIsOpenModal(false);
  };

  return (
    <>
      {user && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="https://source.unsplash.com/random"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h3">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography sx={{ mt: 1.5 }}>{user.email}</Typography>
          <Typography sx={{ mt: 1.5 }}>{user.birthday}</Typography>
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="contained"
            size="small"
            sx={{ p: 0.5, mt: 1.5 }}
          >
            edit
          </Button>
          <Dialog
            open={isModalOpen}
            onClose={(prev) => setIsOpenModal(!prev)}
            PaperProps={{
              component: "form",
              onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log("e", e.target);
              },
            }}
          >
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <TextField
                required
                sx={{ mt: 2 }}
                label="First Name"
                name="firstName"
                value={editUser?.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                sx={{ mt: 2 }}
                label="Last Name"
                name="lastName"
                value={editUser?.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                sx={{ mt: 2 }}
                label="Email"
                name="email"
                type="email"
                value={editUser?.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                required
                sx={{ mt: 2 }}
                label="Birthday"
                name="birthday"
                type="date"
                value={editUser?.birthday}
                onChange={handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={(prev) => setIsOpenModal(!prev)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </>
  );
};

export default ProfileCard;
