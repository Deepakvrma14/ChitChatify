import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchRequests,
  FetchUsers,
} from "../../app/features/appSlice";
import {
  FriendRequestComponent,
  FriendsComponent,
  UserComponent,
} from "../UserComponent";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  const { users } = useSelector((state) => state.appState);
  return (
    <>
      {users.map((el, idx) => {
        // render the fragment or component to show users
        return (
         
            <UserComponent key={el._id} {...el} />
          
        );
      })}
    </>
  );
  //
};

const FriendsList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);
  const { friends } = useSelector((state) => state.appState);
  return (
    <>
      {friends.map((el, idx) => {
        return <FriendsComponent key={idx} {...el} />;
      })}
    </>
  );
};
const FriendsRequests = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchRequests());
  }, []);
  const { friendRequests, loading } = useSelector((state) => state.appState);
  return (
    <>
      {loading ? (
        <p> Loading ... </p>
      ) : (
        friendRequests && friendRequests.map((el, idx) => {
          // el => {_id, sender: {firstName, lastName, _id, image etc}}
          return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />;
        })
      )}
    </>
  );
};
const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      keepMounted
      maxWidth="xs"
      onClose={handleClose}
    >
      <Stack p={2} width={"100%"}>
        <Tabs centered onChange={handleChange} value={value}>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      {/* Dialog content to showing inside each tabs */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {/* immediately invoked function */}
            {(() => {
              switch (value) {
                case 0: // dispolay all users
                  return <UserList />;

                case 1: // display all friends
                  return <FriendsList />;
                case 2: // display all pending requests
                  return <FriendsRequests />;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
