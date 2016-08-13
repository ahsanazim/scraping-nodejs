import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cheerio from 'cheerio';
import request from 'request';

// TODO
// npm run dev to make the server run, then localhost 9090
// must check about availability of menus - shut off at night

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// default index route
app.get('/', (req, res) => {
  const url = 'http://www.dartmouth.edu/dining/menus/';

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const data = $('[href=\'/dining/locations/collis.html\']')
                    .parent()     // <h2> tag
                    .next()       // skip 2 <p> tags
                    .next()
                    .html();
     // .text() instead to get text, and then maybe parse later

      const arr = data.split('<br>');

      console.log(arr);

      // arr.forEach((currVal, index, array) => {
      //   console.log('VALUE:');
      //   console.log(currVal);
      //   const bothFields = currVal.split('</strong>');
      //   console.log(bothFields);
      //   let first = bothFields[0];
      //   const second = bothFields[1];
      //   first = first.replace('<strong>', '');
      //   first = first.replace(':&#xA0;', '');
      //   console.log(first);
      //   console.log(second);
      // });

      console.log(data);
      res.send(data); // Show the HTML for the Google homepage.
    }
  });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
