import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Fab,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import axiosInstance from "../../utils/axiosInstance";

interface Message {
  role: "user" | "ai";
  text: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔄 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/ai/chat", {
        message: userMessage.text,
      });

      const aiMessage: Message = {
        role: "ai",
        text: res.data.response || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ AI service unavailable. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Window */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 340,
            height: 450,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box p={2} bgcolor="primary.main" color="white">
            <Typography fontWeight="bold">
              Legal AI Assistant
            </Typography>
          </Box>

          {/* Messages */}
          <Box
            flex={1}
            p={2}
            sx={{ overflowY: "auto", bgcolor: "#f5f5f5" }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                mb={1}
                textAlign={msg.role === "user" ? "right" : "left"}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    p: 1,
                    borderRadius: 2,
                    maxWidth: "80%",
                    bgcolor:
                      msg.role === "user"
                        ? "primary.main"
                        : "white",
                    color:
                      msg.role === "user"
                        ? "white"
                        : "black",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}

            {/* 🔄 Typing indicator */}
            {loading && (
              <Box textAlign="left">
                <Typography
                  sx={{
                    display: "inline-block",
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "white",
                  }}
                >
                  Typing...
                </Typography>
              </Box>
            )}

            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Box display="flex" p={1}>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask legal question..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <IconButton onClick={sendMessage} disabled={loading}>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;