import { test, expect } from '@playwright/test';
 
test('Compare price with uniswap', async ({ page }) => {
    // Cowswap
    await page.goto('https://cowswap.exchange');

    await page.locator('#swap-currency-input .token-amount-input').type('1000', { delay: 100 });
    await page.locator('#swap-currency-input .open-currency-select-button').click();
    //await page.locator('#token-search-input').type('GNO', { delay: 100 });
    //await page.keyboard.pressKey('Enter');
    await page.locator('.sc-1a5f9hx-2 > :nth-child(1)').click();
    //await page.locator('#sc-htpNat .sc-kaanls-0 .sc-kaanls-1 .sc-ptofh8-7 .sc-fOICqy .AgjGe .token-item-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48').click();

    await page.locator('#swap-currency-output .open-currency-select-button').click();
    await page.locator('.token-item-0x111111111117dC0aa78b770fA6A738034120C302').click();

    await page.waitForSelector('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 > .sc-htpNat > .sc-kpOJdX > .sc-2zitpm-0');
    const cowswapPrice = parseFloat(await page.innerText('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 > .sc-htpNat > .sc-kpOJdX > .sc-2zitpm-0', { strict: true }));
    console.log(cowswapPrice);
    await page.screenshot({ path: 'cowswap.png' });

    // Uniswap
    await page.goto('https://uniswap.exchange');

    await page.locator('#swap-currency-input .token-amount-input').type('1000', { delay: 100 });

    await page.locator('#swap-currency-input .open-currency-select-button').click();
    await page.locator('.sc-bdnxRM.sc-nrd8cx-0.sc-nrd8cx-3.fzUdiI.bNRzcC.hlPUP > :nth-child(2)').click();

    await page.locator('#swap-currency-output .open-currency-select-button').click();
    await page.locator('.token-item-0x111111111117dC0aa78b770fA6A738034120C302').click();

    await page.waitForSelector('#swap-currency-output  .sc-19p08fx-0');
    const uniswapPrice = parseFloat(await page.innerText('#swap-currency-output .sc-19p08fx-0.jIAkCR', { strict: true }));
    console.log(uniswapPrice);
    await page.screenshot({ path: 'uniswap.png' });

    const differenceToUniswap = Math.abs(cowswapPrice - uniswapPrice) / cowswapPrice * 100;
    console.log(differenceToUniswap);
    expect(differenceToUniswap).toBeLessThanOrEqual(3);
});
