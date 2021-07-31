import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:3001/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
})

export default {
    getCanchas(){
        return apiClient.get('/canchas');
    },
    postCanchas(cancha){
        return apiClient.post('/canchas',cancha);
    },
    putCanchas(idCancha,cancha){
        return apiClient.put('/canchas/'+idCancha,cancha);
    },
    deleteCanchas(idCancha){
        return apiClient.delete('/canchas/' + idCancha);
    }
}