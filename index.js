const axios = require('axios');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

axios({
    // 크롤링을 원하는 페이지 URL
    url: 'http://www.yes24.com/24/Category/BestSeller',
    method: 'GET',
    responseType: 'arraybuffer',
})
    // 성공했을 경우
    .then(response => {
        // 만약 content가 정상적으로 출력되지 않는다면, arraybuffer 타입으로 되어있기 때문일 수 있다.
        // 현재는 string으로 반환되지만, 만약 다르게 출력된다면 뒤에 .toString() 메서드를 호출하면 된다.
        const content = iconv.decode(response.data, 'EUC-KR');
        const $ = cheerio.load(content);

        // 1위~40위까지의 책들에 대한 selector
        const booksSelector = '#bestList > ol > li';
        $(booksSelector).each((i, elem) => {
            const title = $(elem).find('p:nth-child(3) > a').text();
            const description = $(elem).find('p.copy > a').text();
            const price = $(elem).find('p.price > strong').text();
            const imgUrl = $(elem).find('p.image > a > img').attr('src');
            console.log(i + 1, {
                title,
                description,
                price,
                imgUrl,
            });
        });
    })
    // 실패했을 경우
    .catch(err => {
        console.error(err);
    });
