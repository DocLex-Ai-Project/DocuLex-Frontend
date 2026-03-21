import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Box, 
} from "@mui/material";
import type{SelectChangeEvent} from  "@mui/material";
import {
  Description as DocIcon,
  Assessment as AIIcon,
  Gavel as GavelIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  RemoveFromQueueTwoTone, // <-- Added for completed state
} from "@mui/icons-material";

import axiosInstance from "../../../utils/axiosInstance";
import DialogView from "./Components/DialogView"; 

// ================= TYPES =================

interface AiResult {
  id: string;
  decision: string;
  score: number;
  feedback: string;
}

interface AssignedDocument {
  id: string;
  title: string;
  source: string;
  status: string;
  createdAt: string;
  userId: string;
  aiResult: AiResult | null;
}

// ================= COMPONENT =================

const MyAssignmentsPage = () => {
  const [assignments, setAssignments] = useState<AssignedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // View Document Dialog State
  const [docID, setDocID] = useState<string>("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Submit Review Dialog State
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [decision, setDecision] = useState<string>("APPROVED");
  const [feedback, setFeedback] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // --- API CALLS ---
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/documents/my-assignments");
      setAssignments(res.data);
    } catch (error) {
      console.error("Failed to fetch assigned documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmitReview = async () => {
    if (!feedback.trim()) {
      alert("Please provide feedback for the client.");
      return;
    }

    try {
      setSubmitting(true);
      
     const response= await axiosInstance.patch(`/api/documents/${selectedDocId}/decision`, {
        decision, 
        feedback,
      });
      console.log(response);
      
      alert("Official review submitted successfully!");
      setReviewDialogOpen(false);
      setFeedback("");
      
      fetchAssignments(); 
    } catch (error: any) {
      console.error("Failed to submit review", error);
      alert(error.response?.data?.message || "Failed to submit reviewwww");
    } finally {
      setSubmitting(false);
    }
  };

  // --- HELPERS ---
  const cleanTitle = (title: string) => {
    const parts = title.split("-");
    return parts.length > 1 ? parts.slice(1).join("-") : title;
  };

  const openViewDialog = (id: string) => {
    setDocID(id);
    setViewDialogOpen(true);
  };

  const openReviewDialog = (id: string) => {
    setSelectedDocId(id);
    setDecision("APPROVED"); 
    setFeedback("");
    setReviewDialogOpen(true);
  };

  // Helper to determine Chip color
  const getStatusColor = (status: string) => {
    if (status === "APPROVED") return "success";
    if (status === "REJECTED") return "error";
    return "info"; // For ASSIGNED or REVIEW_REQUESTED
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="mb-8">
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1e293b" }}>
          My Active Cases
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Documents you have claimed. Review them thoroughly and submit your official legal decision.
        </Typography>
      </div>

      {/* TABLE */}
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
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Document</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>AI Score</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Assigned Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "#475569", pr: 4 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">
                      You have no active assignments. Head over to the global queue to claim a document.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                assignments.map((doc) => {
                  const isCompleted = doc.status === "APPROVED" || doc.status === "REJECTED";

                  return (
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

                      {/* AI SCORE */}
                      <TableCell>
                        {doc.aiResult ? (
                          <Tooltip title={doc.aiResult.feedback} arrow>
                            <div
                              className={`flex items-center gap-1 font-bold cursor-help ${
                                doc.aiResult.score >= 80 ? "text-green-600" : "text-yellow-600"
                              }`}
                            >
                              <AIIcon fontSize="small" />
                              {doc.aiResult.score}%
                            </div>
                          </Tooltip>
                        ) : (
                          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                            Pending
                          </Typography>
                        )}
                      </TableCell>

                      {/* DATE */}
                      <TableCell>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell align="right" sx={{ pr: 3 }}>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => openViewDialog(doc.id)}
                            sx={{ color: "#4f46e5", borderColor: "#4f46e5", "&:hover": { backgroundColor: "#e0e7ff" } }}
                          >
                            Read
                          </Button>

                          {/* Hide the submit button if the lawyer already approved/rejected it */}
                          {!isCompleted ? (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<GavelIcon />}
                              onClick={() => openReviewDialog(doc.id)}
                              sx={{
                                backgroundColor: "#10b981", 
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": { backgroundColor: "#059669", boxShadow: "none" },
                              }}
                            >
                              Submit Decision
                            </Button>
                          ) : (
                            <Button
                              variant="text"
                              size="small"
                              disabled
                              startIcon={<CheckCircleIcon />}
                              sx={{ color: "#10b981" }}
                            >
                              Reviewed
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* ================= DIALOGS ================= */}

      {/* 1. View Document Dialog */}
      <DialogView open={viewDialogOpen} close={() => setViewDialogOpen(false)} id={docID} />

      {/* 2. Submit Review Form Dialog */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Final Legal Decision</DialogTitle>
        <DialogContent dividers className="space-y-5">
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            Please select your final verdict for this document and provide detailed feedback for the client.
          </Typography>

          {/* Decision Dropdown */}
          <FormControl fullWidth size="medium">
            <InputLabel id="verdict-label">Verdict</InputLabel>
            <Select
              labelId="verdict-label"
              value={decision}
              label="Verdict"
              onChange={(e: SelectChangeEvent) => setDecision(e.target.value as string)} // <-- TypeScript fix
              sx={{ backgroundColor: "#f8fafc" }}
            >
              <MenuItem value="APPROVED" sx={{ color: "#10b981", fontWeight: 500 }}>
                Approve (Document is legally sound)
              </MenuItem>
              <MenuItem value="REJECTED" sx={{ color: "#ef4444", fontWeight: 500 }}>
                Reject (Needs major revisions)
              </MenuItem>
            </Select>
          </FormControl>

          {/* Feedback Text Area */}
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Lawyer Feedback & Required Edits"
            variant="outlined"
            placeholder="E.g., Section 3.2 needs clarification regarding liability limitations..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            sx={{ backgroundColor: "#f8fafc" }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2.5, px: 3, backgroundColor: "#f8fafc" }}>
          <Button onClick={() => setReviewDialogOpen(false)} color="inherit" sx={{ fontWeight: 500 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={submitting}
            sx={{ 
              backgroundColor: decision === "APPROVED" ? "#10b981" : "#ef4444", 
              fontWeight: 600,
              "&:hover": { backgroundColor: decision === "APPROVED" ? "#059669" : "#dc2626" }
            }}
          >
            {submitting ? "Submitting..." : `Confirm & ${decision === "APPROVED" ? "Approve" : "Reject"}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyAssignmentsPage;