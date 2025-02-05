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
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Distribución de Población por Continente
      </DialogTitle>
      <DialogContent>
        <PopulationChart />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained" fullWidth>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChartModal;
