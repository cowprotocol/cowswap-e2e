import { test, expect } from '@playwright/test';
 
test('Compare price with 1INCH', async ({ page }) => {
    // Cowswap
    await page.goto('https://cowswap.exchange/#/swap?exactField=input&exactAmount=1001&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x111111111117dC0aa78b770fA6A738034120C302');
    
    await page.waitForSelector('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 .sc-2zitpm-0');
    const cowswapPrice = parseFloat(await page.innerText('#swap-currency-output > .sc-bxw4oc-2 > .sc-bxw4oc-5 .sc-2zitpm-0', { strict: true }));
    console.log(cowswapPrice);
    await page.screenshot({ path: 'cowswap.png' });
    
    // 1inch
    await page.goto('https://app.1inch.io/#/1/swap/DAI/1INCH');
    
    await page.locator('.source-token-amount-input-container input').type('100', { delay: 1000 });
    await page.waitForSelector('.active .quote-data  .quote-token-amount-usd-price');
    
    var inchOutput = await page.innerText('.active .quote-data  .quote-token-amount-usd-price', { strict: true })
    console.log(inchOutput)
    inchOutput = inchOutput.replace('~$','').replace(',','');
    console.log(inchOutput)
    const inchPrice = parseFloat(inchOutput);
    console.log(inchPrice);
    await page.screenshot({ path: '1inch.png' });

    const differenceToinch = Math.abs(cowswapPrice - inchPrice) / cowswapPrice * 100;
    console.log(differenceToinch);
    // expect(differenceToinch).toBeLessThanOrEqual(3);
});