require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

var pusher = new Pusher({
    appId: '616137',
    key: '576dbef8f7eda6c71172',
    secret: '269cfc996c9fdd006774',
    cluster: 'ap1',
    encrypted: true
});
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.post('/messages', (req, res) => {
    const { body } = req;
    const { text, id } = body;
    const result = sentiment.analyze(text);
    const comparative = result.comparative;
    const tone = comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';
    const data = {
        text,
        id,
        timeStamp: new Date(),
        sentiment: {
            tone,
            score: result.score,
        },
    };

    pusher.trigger('chat', 'message', data);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});