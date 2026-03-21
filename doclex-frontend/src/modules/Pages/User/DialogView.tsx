import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

interface DialogProps {
  open: boolean;
  close: () => void;
  id: string;
}

const DialogView = ({ open, close, id }: DialogProps) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const fetchDocument = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/api/documents/${id}`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(res.data);
      setFileUrl(url);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && open) {
      fetchDocument();
    }
  }, [id, open]);

  // ✅ cleanup (important)
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <DialogTitle>Document</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <div className="flex justify-center p-10">
            <CircularProgress />
          </div>
        ) : fileUrl ? (
          <iframe
            src={fileUrl}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        ) : (
          <div>No document found</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;