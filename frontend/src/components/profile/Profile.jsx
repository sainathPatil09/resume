import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Dialog className="">
        <DialogTrigger className="rounded-xl p-2 border hover:bg-blue-600 hover:text-white duration-300 font-medium border-blue-500">
          Profile
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            
            <Link to="/edit-profle">
              <Button>Edit Profile</Button>
            </Link>
            <Link to="/be-mentor">
              <Button>Be a mentor</Button>
            </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
