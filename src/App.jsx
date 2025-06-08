import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Box, Card, Grid, Typography } from '@mui/material'
import Progressbar from './Progressbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Progressbar/>
    <Box sx={{px:"10%", paddingTop:"3%"}}>
      <Typography variant='h3' sx={{
        textAlign:"center",
        fontWeight:"bold"

      }}>Choose Your Skip Size </Typography>
        <Typography variant='h5' sx={{
          paddingTop:"10px",
        textAlign:"center",
        

      }}>Select the skip size that best suits your needs </Typography>
    </Box>
    <br />
    <br />
     <Grid container spacing={2} sx={{px:"10%"}} >
  {Array.from(Array(6)).map((_, index) => (
    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>{index + 1}</Card>
    </Grid>
  ))}
</Grid>


      
    </Box>
  )
}

export default App
