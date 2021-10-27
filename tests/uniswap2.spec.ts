import { test, expect } from '@playwright/test';
import { collectDefaultMetrics, register, Gauge, Pushgateway } from 'prom-client'
import fs from 'fs'

// const PROMETHEUS_JOB = 'cowswap_e2e'
const PROMETHEUS_PREFIX = 'cowswap_'
const PROMETHEUS_FILE = 'uniswap.prom'
const NETWORK = process.env.NETWORK || 'mainnet'
const PROMETHEUS_LABEL_REFERENCE = 'uniswap'

// const gateway = new Pushgateway('http://127.0.0.1:9091')
// gateway.push({ jobName: PROMETHEUS_JOB })

collectDefaultMetrics({ register, prefix: PROMETHEUS_PREFIX, labels: { NETWORK } })
const gauge = new Gauge({
  name: 'price_different_percent',
  help: 'Shows the relationsh between CowSwap price and other service prices',
  labelNames: ['reference']
});

 
test('Fake test to test Prometheus', async ({ page }) => {
    // Random percentage 0-100%
    const randomPercentage = Math.random() * 100

    // Set prometheus metric
    gauge.set({ reference: PROMETHEUS_LABEL_REFERENCE }, randomPercentage)

    // Write metrics to file
    const metrics = await register.metrics()
    fs.writeFileSync(PROMETHEUS_FILE, metrics)
    console.log('Written Prometheus metrics in ', PROMETHEUS_FILE)
});
