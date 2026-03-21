import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        className: "rounded-2xl",
      }}
    >
      {/* TITLE */}
      <DialogTitle className="font-semibold">
        {title}
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent>
        <Typography className="text-gray-600">
          {message}
        </Typography>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions className="px-4 pb-4">
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            backgroundColor: "#4f46e5",
            "&:hover": { backgroundColor: "#4338ca" },
          }}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;