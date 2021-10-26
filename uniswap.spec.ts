import { test, expect } from '@playwright/test';
 
test('Compare price with uniswap', async ({ page }) => {
    // Cowswap
    await page.goto('https://cowswap.exchange/#/swap?exactField=input&exactAmount=1000&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x111111111117dC0aa78b770fA6A738034120C302');
    // await page.goto('https://cowswap.exchange/#/swap');
    // await page.locator('#swap-currency-input .token-amount-input').type('1000');
    // await page.locator('#swap-currency-input .open-currency-select-button').click();
    // await page.locator('.sc-bdfBQB.sc-kaanls-0.sc-kaanls-3.sc-1a5f9hx-3.buyCov.iSBNWK.ipMcVL.fPfmMJ > :nth-child(1)').click();
    
    // await page.locator('#swap-currency-output .open-currency-select-button').click();
    // await page.locator('.token-item-0x111111111117dC0aa78b770fA6A738034120C302').click();

    await page.waitForSelector('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 .sc-2zitpm-0');
    const cowswapPrice = parseFloat(await page.innerText('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 .sc-2zitpm-0', { strict: true }));
    console.log(cowswapPrice);
    await page.screenshot({ path: 'cowswap.png' });

    // Uniswap
    await page.goto('https://app.uniswap.org/#/swap');

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
