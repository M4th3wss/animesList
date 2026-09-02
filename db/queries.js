const pool = require('./pool');

async function getAllAnimes() {
    try {
        const { rows } = await pool.query('SELECT * FROM animes');
        return rows;
    }
    catch(err) {
        console.error('Error executing query', err.stack);
    }
}

async function addAnime(name, description, imgurl, imdb, myscore) {
    try {
        const query = 'INSERT INTO animes (name, description, cover_image_url, imdb_rating, my_rating) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, description, imgurl, imdb, myscore];
        await pool.query(query, values);
    }
    catch(err) {
        console.error('Error executing query', err.stack);
    }
}

module.exports = {
    getAllAnimes,
    addAnime
}