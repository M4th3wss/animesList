const db = require("../db/queries");


async function getAllAnimes(req, res) {
    try {
        const animes = await db.getAllAnimes();
        const animeList = animes.map(anime => ({
            name: anime.name,
            describtion: anime.description,
            imgurl: anime.cover_image_url,
            imdb: anime.imdb_rating,
            myscore: anime.my_rating
        }))
        res.render('main', { animes: animeList });
    } catch (err) {
        console.error('Error fetching animes', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createAnimeGet(req, res) {
    //render the form
    res.render('form');
}

async function createAnimePost(req, res) {
    const { name, describtion, imgurl, imdb, myscore } = req.body;
    try {
        await db.addAnime(name, describtion, imgurl, imdb, myscore);
        res.status(201).json({ message: 'Anime added successfully' });
    } catch (err) {
        console.error('Error adding anime', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteAnime(req, res) {
    const { name } = req.params;
    try {
        await db.removeAnime(name);
        res.status(200).json({ message: 'Anime deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting anime', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAnimes,
    createAnimeGet,
    createAnimePost,
    deleteAnime
}