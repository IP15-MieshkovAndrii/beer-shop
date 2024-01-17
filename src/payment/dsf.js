import axios from 'axios';


const lig = async(data) => {
    try{
        const value = await axios.get('/data');
        const newvalue = await axios.post ('/data', data);


    }catch{}
}

const lig2 = async() => {
    try{
        const data = await fetch('http://data')
    }catch{}
}