import decode from 'jwt-decode';

// A singleton class used for fetching data from server
class ClientAuthService {

    // Initializing important variables
    constructor(domain) {
        if(ClientAuthService.instance !== null)
        {
            return ClientAuthService.instance;
        }   

        this.domain = domain || 'http://localhost:3000' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.getProfile = this.getProfile.bind(this)

        ClientAuthService.instance = this;
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('fl_jwt_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('fl_jwt_token')
    }

    login(idToken) {
        this.setToken(idToken);
    }

    logout() {
        
        localStorage.removeItem('fl_jwt_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // add to HTTP Authorization header
        if (this.isLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json());
    }


    // This function is necessary since fetch() by default considers error code like 404, 500 as success.  
    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

// Define an instance static object of the class
Object.defineProperty(ClientAuthService, 'instance', {
    value: null,
    writable : true,
    enumerable : true,
    configurable : false
});

ClientAuthService.getInstance = function(domain)
{
    if(ClientAuthService.instance !== null)
    {
        return ClientAuthService.instance;
    }
    else
    {
        return new ClientAuthService(domain);
    }
}

export default ClientAuthService;