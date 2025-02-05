import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import PopulationChart from "./PopulationChart";
import { IoMdClose } from "react-icons/io";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", fontWeight: "bold" }}>
        Distribución de Población por Continente
      </DialogTitle>
      <IconButton
          aria-label="close"
          onClick={onClose}
          color="error"
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <IoMdClose />
        </IconButton>
      <DialogContent>
        <PopulationChart />
      </DialogContent>
    </Dialog>
  );
};

export default ChartModal;
