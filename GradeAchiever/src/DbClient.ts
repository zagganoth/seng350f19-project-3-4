import { MongoClient, Db } from "mongodb";

class DbClient {
    public db!: Db;

    async connect() {
        try {
            let client = await MongoClient.connect("mongodb://localhost:27017");
            this.db = client.db("myapp");
            return this.db;
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }
}

export = new DbClient();