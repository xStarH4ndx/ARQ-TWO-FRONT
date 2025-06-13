// src/components/objects/casaSelector.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const casasMock = [
  { id: '1234', nombre: 'Casa 1' },
  { id: 'casa2', nombre: 'Casa 2' },
];

interface CasaSelectorProps {
  casaSeleccionada: string;
  onCasaChange: (event: SelectChangeEvent<string>) => void;
  casas?: { id: string; nombre: string }[];
}

const CasaSelector: React.FC<CasaSelectorProps> = ({
  casaSeleccionada,
  onCasaChange,
  casas = casasMock,
}) => {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel
        id="select-casa-label"
        sx={{
          color: 'black',
          '&.Mui-focused': {
            color: 'black',
          },
        }}
      >
        Casa
      </InputLabel>
      <Select
        labelId="select-casa-label"
        value={casaSeleccionada}
        label="Casa"
        onChange={onCasaChange}
        sx={{
          backgroundColor: '#e9ecef',
          color: 'black',
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6c757d',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#495057',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#343a40',
            borderWidth: '1.5px',
          },
        }}
      >
        {casas.map((casa) => (
          <MenuItem key={casa.id} value={casa.id}>
            {casa.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CasaSelector;
