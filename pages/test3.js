import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const Demo = () => {
  const [rows, setRows] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
  ]);
  const [editingRow, setEditingRow] = useState(null);
  const [newRowData, setNewRowData] = useState({ firstName: '', lastName: '', email: '' });

  const handleAddRow = () => {
    const newId = rows.length + 1;
    const newRow = { id: newId, ...newRowData };
    setRows([...rows, newRow]);
    setNewRowData({ firstName: '', lastName: '', email: '' });
  };

  const handleEditRow = (row) => {
    setEditingRow(row.id);
    setNewRowData({ firstName: row.firstName, lastName: row.lastName, email: row.email });
  };

  const handleUpdateRow = () => {
    const updatedRows = rows.map((row) => (row.id === editingRow ? { ...row, ...newRowData } : row));
    setRows(updatedRows);
    setEditingRow(null);
    setNewRowData({ firstName: '', lastName: '', email: '' });
  };

  const handleDeleteRow = (row) => {
    const filteredRows = rows.filter((r) => r.id !== row.id);
    setRows(filteredRows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <TextField label="First name" value={newRowData.firstName} onChange={(e) => setNewRowData({ ...newRowData, firstName: e.target.value })} style={{ marginRight: '1rem' }} />
        <TextField label="Last name" value={newRowData.lastName} onChange={(e) => setNewRowData({ ...newRowData, lastName: e.target.value })} style={{ marginRight: '1rem' }} />
        <TextField label="Email" value={newRowData.email} onChange={(e) => setNewRowData({ ...newRowData, email: e.target.value })} style={{ marginRight: '1rem' }} />
        {editingRow ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdateRow} style={{ marginRight: '1rem' }}>
              Update
            </Button>
            <Button variant="contained" onClick={() => setEditingRow(null)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddRow} style={{ marginRight: '1rem' }}>
            Add
          </Button>
        )}
      </div>
      {editingRow && <p style={{ color: 'gray', marginTop: '0.5rem' }}>Editing row {editingRow}</p>}
      <div style={{ marginTop: '1rem' }}>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleEditRow(row)} style={{ marginRight: '1rem' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteRow(row)}>
              <DeleteIcon />
            </IconButton>
            <p style={{ marginLeft: '0.5rem', marginBottom: 0 }}>{row.firstName} {row.lastName} ({row.email})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
