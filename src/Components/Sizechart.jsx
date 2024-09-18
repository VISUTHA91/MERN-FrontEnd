import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(Size, Chest, AcrossSholder, Frontlength) {
    return { Size, Chest, AcrossSholder, Frontlength };
  }
  
  const rows = [
    createData('S', 36.0, 16.5, 26.5,),
    createData('M', 39.0, 17.3, 27.5,),
    createData('L', 41.0, 18.0, 28.5,),
    createData('XL', 43.0, 18.8, 29.5, ),
    createData('XXL', 45.0, 19.5, 30.5,),
  ];






function Sizechart() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>  
    <React.Fragment>
    <Button onClick={handleClickOpen} >size chart </Button></React.Fragment>
    <Dialog
  fullScreen={fullScreen}
  open={open}
  onClose={handleClose}
  aria-labelledby="responsive-dialog-title"
>
  <DialogTitle id="responsive-dialog-title">
    Size Chart
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:550 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Size</StyledTableCell>
            <StyledTableCell>Chest&nbsp;(in)</StyledTableCell>
            <StyledTableCell>AcrossSholder&nbsp;(in)</StyledTableCell>
            <StyledTableCell>FrontLength&nbsp;(in)</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.Size}
              </StyledTableCell>
              <StyledTableCell >{row.Chest}</StyledTableCell>
              <StyledTableCell>{row.AcrossSholder}</StyledTableCell>
              <StyledTableCell>{row.Frontlength}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button autoFocus onClick={handleClose}>
      Close
    </Button>
    {/* <Button onClick={handleClose} autoFocus>
      Agree
    </Button> */}
  </DialogActions>
</Dialog>
</>
  


  )
}

export default Sizechart