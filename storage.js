const storage = {
    get(key){
        const localStorageData = localStorage.getItem(key);
        return JSON.parse(localStorageData)
    },
    save(key, data){
       //const localStorageData = this.get(key)
       localStorage.setItem(key, JSON.stringify(data));
    }
}