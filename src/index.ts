
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
    //console.log("__dirname", __dirname)
    const orm = await MikroORM.init(mikroOrmConfig); //connect db 
    await orm.getMigrator().up(); //run migration


    const post = orm.em.create(Post, { title: 'End of the game1' });
    await orm.em.persistAndFlush(post);
    console.log('----or sql 2----------');
    await orm.em.nativeInsert(Post, { title: 'my first5 post' });

    //const posts = await orm.em.find(Post, {})
    const posts = await orm.em.find(Post, { id: 57)
    console.log(posts)
};

main().catch(err => {
    console.log(err);
})
