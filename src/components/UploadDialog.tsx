import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button,} from "@mui/material";
import UploadFormDialog from "./UploadFormDialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: Props) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Upload Material</DialogTitle>

        <DialogContent>
          <Typography>
            Click Continue to provide the material information and upload your
            file.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              onClose();
              setOpenForm(true);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <UploadFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
}