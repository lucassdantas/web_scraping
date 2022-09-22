const pup = require('puppeteer');
const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

(async () => {
    const browser = await pup.launch(
        {headless: false}
    );
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('.nav-search-input')
    await page.type('.nav-search-input', searchFor);
    
    //Quando for realizar o carregamentode uma nova pagina, o código 
    //deve ser escrito com essa funcao
    await Promise.all([
        //essa funcao deve estar precedida do ato que vc levara a nova pagina
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ]);

    const links = await page.$$eval('.ui-search-result__image a', el => el.map(link => link.href));
    console.log(links[0]);
    await page.waitForTimeout(3000)
    await browser.close();
})()
