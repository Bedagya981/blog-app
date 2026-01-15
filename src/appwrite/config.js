import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";
export class Service{
    client = new Client
    tablesdb;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.tablesdb = new TablesDB(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost(title, content, featuredImage, status, userId){
        try {
            return await this.tablesdb.createRow({
                databaseId: conf.databaseId,
                tableId: conf.tableId,
                rowId: ID.unique(),
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite createPost error ::", error)
        }
    }

    async updatePost(rowId, {title, content, featuredImage, status}){
        try {
            return await this.tablesdb.updateRow({
                databaseId: conf.databaseId,
                tableId: conf.tableId,
                rowId,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
        })
        } catch (error) {
            console.log("Appwrite updatePost error ::", error)
        }
    }

    async deletePost(rowId){
        try {
            await this.tablesdb.deleteRow({
                databaseId: conf.databaseId,
                tableId: conf.tableId,
                rowId
            })
            return true
        } catch (error) {
            console.log("Appwrite deletePost error ::", error)
            return false
        }
    }

    async getPost(rowId){
        try {
            return await this.tablesdb.listRow({
                databaseId: conf.databaseId,
                tableId: conf.tableId,
                rowId,
            })
        } catch (error) {
            console.log("Appwrite getPost error ::", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.tablesdb.listRows({
                databaseId: conf.databaseId,
                tableId: conf.tableId,
                queries
            })
        } catch (error) {
            console.log("Appwrite getPosts error ::", error)
        }
    }

    //For file upload

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: conf.bucketId,
                fileId : ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite uploadFile error ::", error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile({
                bucketId: conf.bucketId,
                fileId
            })
        } catch (error) {
            console.log("Appwrite deleteFile error ::", error)
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview({
                bucketId: conf.bucketId,
                fileId
            })
        } catch (error) {
            console.log("Appwrite getFilePreview error ::", error)
        }
    }
}

const service = new Service
export default service