import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Chip,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  AssignmentInd as AssignIcon,
  Description as DocIcon,
} from "@mui/icons-material";

import axiosInstance from "../../../utils/axiosInstance";
import ConfirmDialog from "./Components/ConfirmDialog";
import DialogView from "./Components/DialogView";

// Define a type so we aren't using 'any[]'
interface QueueDocument {
  id: string;
  title: string;
  status: string;
}

const ReviewQueuePage = () => {
  const [docs, setDocs] = useState<QueueDocument[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loadingAction, setLoadingAction] = useState(false);
const [viewOpen, setViewOpen] = useState(false);
const [previewOpen, setPreviewOpen] = useState(false);
// const [selectedId, setSelectedId] = useState<string>("");

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/lawyer/review-queue");
      setDocs(res.data);
    } catch (error) {
      console.error("Failed to fetch queue", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // --- ACTIONS ---
  const handleAssignClick = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };


  

  const handleConfirmAssign = async () => {
    try {
      setLoadingAction(true);
      await axiosInstance.post(`/api/lawyer/${selectedId}/assign`);
      setConfirmOpen(false);
      
      // Refresh the table so the assigned document is removed from the open queue
      fetchDocs(); 
    } catch (error) {
      console.error("Failed to assign document", error);
    } finally {
      setLoadingAction(false);
    }
  };

 
  const cleanTitle = (title: string) => {
    const parts = title.split("-");
    return parts.length > 1 ? parts.slice(1).join("-") : title;
  };

  const getStatusColor = (status: string) => {
    if (status === "REVIEW_REQUESTED") return "warning";
    if (status === "ASSIGNED") return "info";
    return "default";
  };

  const handlePreview = (id: string) => {
setSelectedId(id);
  setPreviewOpen(true);
};

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="mb-8">
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1e293b" }}>
          Global Review Queue
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Unassigned documents requesting legal review. Claim a document to begin.
        </Typography>
      </div>

      {/* TABLE CONTAINER */}
      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white"
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={10}>
            <CircularProgress sx={{ color: "#4f46e5" }} />
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Document Title</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "#475569", pr: 4 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {docs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">
                      No documents are currently waiting in the queue.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                docs.map((doc) => (
                  <TableRow key={doc.id} hover sx={{ transition: "background-color 0.2s" }}>
                    
                    {/* TITLE */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                          <DocIcon fontSize="small" />
                        </div>
                        <Typography fontWeight={500} sx={{ color: "#0f172a" }}>
                          {cleanTitle(doc.title)}
                        </Typography>
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Chip 
                        label={doc.status.replace("_", " ")} 
                        size="small" 
                        color={getStatusColor(doc.status)}
                        sx={{ fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px" }}
                      />
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handlePreview(doc.id)}
                          sx={{ color: "#64748b", "&:hover": { color: "#4f46e5", backgroundColor: "#e0e7ff" } }}
                        >
                          Preview
                        </Button>

                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AssignIcon />}
                          onClick={() => handleAssignClick(doc.id)}
                          sx={{
                            backgroundColor: "#4f46e5",
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: "#4338ca", boxShadow: "none" },
                          }}
                        >
                          Assign to Me
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* CONFIRMATION DIALOG */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAssign}
        loading={loadingAction}
        title="Assign Document"
        message="Are you sure you want to claim this document? It will be moved to your personal review dashboard."
        confirmText="Yes, Assign to Me"
      />
      <DialogView
  open={previewOpen}
  close={()=>setPreviewOpen(false)}
  id={selectedId}
/>
      
    </div>
  );
};

export default ReviewQueuePage;