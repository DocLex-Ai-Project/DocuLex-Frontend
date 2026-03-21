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
  Tooltip,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Description as DocIcon,
  Assessment as AIIcon,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import GavelIcon from "@mui/icons-material/Gavel";

import axiosInstance from "../../../utils/axiosInstance";
import DialogView from "./DialogView"; // Make sure this import is correct

// ================= TYPES =================
// (Keep all your existing types exactly as they were)
type AiDecision = "LIKELY_VALID" | "NEEDS_REVIEW" | "INVALID" | "UNKNOWN";

interface AiResult {
  id: string;
  decision: AiDecision;
  score: number;
  feedback: string;
  createdAt: string;
  documentId: string;
}

type DocumentStatus = "DRAFT" | "AI_PROCESSING" | "AI_REVIEWED" | "REVIEW_REQUESTED" | "APPROVED" | "REJECTED";

interface Document {
  id: string;
  title: string;
  source: "UPLOAD" | "MANUAL";
  status: DocumentStatus;
  createdAt: string;
  content: string | null;
  filePath: string | null;
  userId: string;
  lawyerId: string | null;
  lawyerDecision: string | null;
  lawyerFeedback: string | null;
  lawyerSuggestion: string | null;
  revisedContent: string | null;
  reviewedAt: string | null;
  aiResult: AiResult | null;
}

// ================= COMPONENT =================

const MyDocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  
  // Dialog State
  const [DocID, setDocID] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const open = Boolean(anchorEl);

  // --- FIX 1: Properly open and close the menu ---
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, doc: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // This actually hides the menu!
  };

  // --- FIX 2: Close the menu when a button is clicked ---
  const HandleView = () => {
    if (selectedDoc) {
      setDocID(selectedDoc.id);
      setOpenDialog(true);
    }
    handleMenuClose(); // Close the menu when dialog opens
  };

  const HandleDelete = () => {
    console.log("Deleting document:", selectedDoc?.id);
    handleMenuClose(); // Close menu after clicking delete
  };

  // API CALL
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await axiosInstance.get('/api/documents/my-documents');
      setDocuments(data.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // ================= HELPERS =================
  const cleanTitle = (title: string) => {
    const parts = title.split("-");
    return parts.length > 1 ? parts.slice(1).join("-") : title;
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "DRAFT": return "default";
      case "AI_PROCESSING": return "warning";
      case "AI_REVIEWED": return "info";
      case "REVIEW_REQUESTED": return "secondary";
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  // ================= UI =================

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#1e293b" }}>
              My Documents
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
              Manage your legal drafts and uploaded file
            </Typography>
          </div>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4f46e5",
              textTransform: "none",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#4338ca" },
            }}
          >
            Create Document
          </Button>
        </div>

        {/* TABLE */}
        <TableContainer
          component={Paper}
          elevation={0}
          className="border border-gray-200 shadow-sm rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <CircularProgress size={40} sx={{ color: "#4f46e5" }} />
            </div>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>AI</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Typography>No documents found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id} hover>
                      
                      {/* TITLE */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                            <DocIcon fontSize="small" />
                          </div>
                          <Typography fontWeight={500}>
                            {cleanTitle(doc.title)}
                          </Typography>
                        </div>
                      </TableCell>

                      {/* SOURCE */}
                      <TableCell>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          {doc.source}
                        </Typography>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Chip
                          label={doc.status.replace("_", " ")}
                          size="small"
                          color={getStatusColor(doc.status)}
                        />
                      </TableCell>

                      {/* AI RESULT */}
                      <TableCell>
                        {doc.aiResult ? (
                          <Tooltip title={doc.aiResult.feedback} arrow>
                            <div className="flex flex-col cursor-pointer">
                              <div
                                className={`flex items-center gap-1.5 font-bold ${getScoreColor(
                                  doc.aiResult.score
                                )}`}
                              >
                                <AIIcon fontSize="small" />
                                {doc.aiResult.score}%
                              </div>
                              <Typography
                                variant="caption"
                                sx={{ color: "#64748b" }}
                              >
                                {doc.aiResult.decision}
                              </Typography>
                            </div>
                          </Tooltip>
                        ) : (
                          <Typography sx={{ color: "#94a3b8" }}>
                            Pending
                          </Typography>
                        )}
                      </TableCell>

                      {/* DATE */}
                      <TableCell>
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, doc)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>

      {/* --- FIX 3: THE MENU MUST BE OUTSIDE THE TABLE LOOP --- */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose} // Handles clicking outside the menu
      >
        <MenuItem onClick={HandleView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        {selectedDoc?.status === "AI_REVIEWED" && (
          <MenuItem onClick={HandleView}>
            <ListItemIcon>
              <GavelIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Request Lawyer Review</ListItemText>
          </MenuItem>
        )}

        {selectedDoc?.status === "DRAFT" && (
          <MenuItem onClick={HandleView}>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={HandleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: "red" }}>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* DIALOG COMPONENT */}
      {/* Assuming DialogView is your actual component, not the MUI Dialog */}
      <DialogView open={openDialog} close={() => setOpenDialog(false)} id={DocID} />
      
    </>
  );
};

export default MyDocumentsPage;