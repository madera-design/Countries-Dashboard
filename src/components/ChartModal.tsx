import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import PopulationChart from "./PopulationChart";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", fontWeight: "bold" }}>
        Population Distribution by Continent
      </DialogTitle>
      <DialogContent>
        <PopulationChart />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChartModal;
