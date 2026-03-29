import { Box, Typography, LinearProgress, Chip, Stack } from "@mui/material";

interface Props {
  score: number;
  riskLevel: string;
  missingFields: string[];
  summary: string;
}

const getColor = (score: number) => {
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "error";
};

const getRiskColor = (risk: string) => {
  if (risk === "LOW") return "success";
  if (risk === "MEDIUM") return "warning";
  return "error";
};

const AIResultCard = ({ score, riskLevel, missingFields, summary }: Props) => {
  return (
    <Box p={3} border="1px solid #ddd" borderRadius={3} mt={3}>
      
      {/* SCORE */}
      <Typography variant="h6">AI Score</Typography>
      <LinearProgress
        variant="determinate"
        value={score}
        color={getColor(score)}
        sx={{ height: 10, borderRadius: 5, mt: 1 }}
      />
      <Typography mt={1}>{score}%</Typography>

      {/* RISK */}
      <Box mt={2}>
        <Typography variant="h6">Risk Level</Typography>
        <Chip
          label={riskLevel}
          color={getRiskColor(riskLevel)}
        />
      </Box>

      {/* MISSING */}
      <Box mt={2}>
        <Typography variant="h6">Missing Clauses</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {missingFields.map((field, index) => (
            <Chip key={index} label={field} variant="outlined" />
          ))}
        </Stack>
      </Box>

      {/* SUMMARY */}
      <Box mt={2}>
        <Typography variant="h6">Summary</Typography>
        <Typography mt={1}>{summary}</Typography>
      </Box>

    </Box>
  );
};

export default AIResultCard;