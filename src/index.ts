
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';

const main = async () => {
    //console.log("__dirname", __dirname)
    const orm = await MikroORM.init(mikroOrmConfig); //connect db 
    // await orm.getMigrator().up(); //run migration

    const app = express();

    const post = orm.em.create(Post, { title: 'End of the game1' });
    await orm.em.persistAndFlush(post);
    console.log('----or sql 2----------');
    //await orm.em.nativeInsert(Post, { title: 'my first511 post' });

    const posts = await orm.em.find(Post, {})
    //const posts = await orm.em.find(Post, { id: 57})
    console.log(posts)

    /**
     * multi line comment {shift+alt+a}
     */
    app.get("/", (req, res) => {
        res.send("hello world! Good Morning " + req.hostname)
    })

    app.listen(4001, () => {
        console.log("Server started at localhost : 4001")
    })

};

main().catch(err => {
    console.log(err);
})
