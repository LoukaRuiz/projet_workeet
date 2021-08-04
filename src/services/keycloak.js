import Keycloak from 'keycloak-js'

class ServiceKeycloak {

    keycloakAuth;

    constructor() {

        this.keycloakAuth = new Keycloak({
            realm: "workeet",
            url: "https://keycloak.nibaldonoso.fr/auth/",
            clientId: `${process.env.REACT_APP_Local}`,
        })     
        return this

    }

    async init() {
        let authenticated = await this.keycloakAuth.init({ onLoad: 'login-required' })
        return authenticated
    }

    getTokenAuth = () => {
        return this.keycloakAuth.token
    }

    isEmailValid = async () =>  {
        let email_valid = this.keycloakAuth.loadUserInfo()
        return email_valid
    }

}

export default ServiceKeycloak;