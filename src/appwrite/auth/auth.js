import conf from "../../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setProject(conf.projectId)
            .setEndpoint(conf.appwriteUrl);
        this.account = new Account(this.client)
    }

    async createAccountEmail({email, password}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
        })
        if(userAccount){
            return this.loginEmail({email, password})
        }else{
            return userAccount;
        }
        } catch (error) {
            console.log(`Appwrite createAccountEmail error :: ${error}`)
        }
    }

    async loginEmail({email, password}){
        try {
            return await this.account.createEmailPasswordSession({
                email,
                password
            })
        } catch (error) {
            console.log("Appwrite loginEmail error :: ", error)
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite logout error :: ", error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite getCurrentUser error ::", error)
        }
        return null
    }

}

const authService = new AuthService

export default authService