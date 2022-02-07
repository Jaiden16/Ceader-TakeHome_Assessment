import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




export default function Text({ month, day, year, hour, min,doctor}) {
    // console.log(data)
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
        </Box>
    );


    const card = (
        <div>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`Date: ${month}-${day}-${year}`}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`Time: ${hour}:${min}`}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`Doctor: ${doctor}`}
                </Typography>
                <Typography variant="body2">
                    Please bring All Documents
                </Typography>
            </CardContent>
        </div>
    );
                    

    return (
        <div>
            {/* <p>{`Date: ${month}-${day}-${year}`}</p>
            <p>{`Time: ${hour}:${min}`}</p>
            <p>{`Doctor: ${first} ${last}`}</p>
            <p>Please bring All Documents</p> */}
            <Box sx={{ display: "inline-block", minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>
    );
}





