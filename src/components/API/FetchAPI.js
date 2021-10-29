import { useEffect , useState }  from 'react'
import * as React from 'react'
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";


const FetchAPI = () => {

    const [funds , setFunds] = useState([])

    const getFunds = async () => {
        const response = await fetch('https://api.mfapi.in/mf')
        const data = await response.json()
        setFunds(data)
        
    }


    useEffect(() => {
        getFunds()
    },[])


    const [value, setValue] = React.useState(funds[0]);

    
    return (
        <>
        <div>
            <h1>List of Mutual Funds</h1>
            <br />
            <Stack spacing={2} sx={{ width: 350}}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    options={funds.map((option) => option.schemeName)}
                    id="free-solo-demo"
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Search Mutual Fund" />}
                />
            </Stack>
            <br />
            <div>{`Scheme Name : ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div className="container-fluid mt-5">
                <div className="row">
                    {

                        funds.slice(0,5).map((current) =>{
                        return(
                            <ul style={{ listStyleType:'none' }}>
                                <li>Scheme Code : <a href={"https://api.mfapi.in/mf/" + current.schemeCode}><span>{current.schemeCode}</span></a></li>
                                <li>Scheme Name : <span>{current.schemeName}</span></li>
                            </ul>
                        )
                    })
                    }
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default FetchAPI



