import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link, Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Sidenav from './components/Sidenav';

function App() {

  return (
    <Container maxWidth='xl'>
    <Sidenav/>
    </Container>
  )
}

export default App
