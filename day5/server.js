const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        let feed = await parser.parseURL('https://thefactfile.org/feed/');
        res.render('pages/index', { posts: feed.items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching RSS feed');
    }
});

app.get('/search', (req, res) => {
    res.render('pages/search', { posts: [] });
});

app.post('/search/title', async (req, res) => {
    try {
        let feed = await parser.parseURL('https://thefactfile.org/feed/');
        const searchTerm = req.body.title.toLowerCase();
        const filteredPosts = feed.items.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );
        res.render('pages/search', { posts: filteredPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching posts');
    }
});

app.post('/search/category', async (req, res) => {
    try {
        let feed = await parser.parseURL('https://thefactfile.org/feed/');
        const category = req.body.category;
        const filteredPosts = feed.items.filter(item => 
            item.categories && item.categories.includes(category)
        );
        res.render('pages/search', { posts: filteredPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching by category');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});