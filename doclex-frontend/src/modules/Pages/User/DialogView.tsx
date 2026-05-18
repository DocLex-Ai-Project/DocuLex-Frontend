import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

interface DialogProps {
  open: boolean;
  close: () => void;
  id: string;
}

interface DocumentData {
  id: string;
  title: string;
  source: string;
  contentType?: string;
  content?: string;
}

const DialogView = ({ open, close, id }: DialogProps) => {
  const [loading, setLoading] = useState(false);

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const [documentData, setDocumentData] =
    useState<DocumentData | null>(null);

  const fetchDocument = async () => {
    try {
      setLoading(true);

      // FIRST REQUEST AS JSON
      const res = await axiosInstance.get(`/api/documents/${id}`);

      // EDITOR SOURCE
      if (
        res.data.source === "EDITOR" ||
        res.data.contentType === "HTML"
      ) {
        setDocumentData(res.data);
        return;
      }

      // FILE SOURCE
      const fileRes = await axiosInstance.get(
        `/api/documents/${id}`,
        {
          responseType: "blob",
        }
      );

      const url = URL.createObjectURL(fileRes.data);

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

  // cleanup
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        {documentData?.title || "Document"}

        <IconButton
          onClick={close}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <div className="flex justify-center p-10">
            <CircularProgress />
          </div>
        ) : documentData?.contentType === "HTML" ? (
          // EDITOR HTML VIEW
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: documentData.content || "",
            }}
          />
        ) : fileUrl ? (
          // PDF / FILE VIEW
          <iframe
            src={fileUrl}
            width="100%"
            height="700px"
            style={{ border: "none" }}
            title="Document Preview"
          />
        ) : (
          <div>No document found</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;