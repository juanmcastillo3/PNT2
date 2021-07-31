import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:3001/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
})

export default {
    getReservas(){
        return apiClient.get('/reservas');
    },
    postReservas(reserva){
        return apiClient.post('/reservas',reserva);
    },
    putReserva(idReserva,reserva){
        return apiClient.put('/reservas/'+ idReserva,reserva);
    },
    deleteReserva(idReserva){
        return apiClient.delete('/reservas/' + idReserva);
    }
}