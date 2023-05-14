import api from './api';

class MapelService {
    getMapel() {
        return api.get('/test/listmapel');
    }
    getMapelById(id) {
        return api.get(`/test/listmapel/${id}`);
    }
    createMapel(data) {
        return api.post("/test/listmapel", data);
    }
    updateMapel(id, data) {
        return api.patch(`/test/listmapel/${id}`, data);
    }
    deleteMapel(id) {
        return api.delete(`/test/listmapel/${id}`);
    }
}

export default new MapelService();