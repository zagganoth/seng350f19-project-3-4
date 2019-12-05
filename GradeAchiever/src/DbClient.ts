import { Db, MongoClient, MongoNetworkError } from "mongodb";

class DbClient {
    public db!: Db;

    public async connect() {
        try {
            const client = await MongoClient.connect("mongodb://mongo:27017", {useUnifiedTopology: true});
            this.db = client.db("myapp");
            return this.db;
        } catch (error) {
            console.log("Unable to connect to db");
            console.log(error);
            throw MongoNetworkError;
        }
    }
}

export = new DbClient();
