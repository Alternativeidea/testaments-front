/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv'
import { SSTConfig } from 'sst'
import { NextjsSite } from 'sst/constructs'

dotenv.config({
    path: './.env.production'
})

export default {
    config(_input) {
        return {
            name: 'testaments',
            region: 'eu-central-1'
        }
    },
    stacks(app) {
        app.stack(function Site({ stack }) {
            const site = new NextjsSite(stack, 'site', {
                memorySize: '2048 MB',
                environment: {
                    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY ?? '',
                    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET ?? '',
                    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET ?? '',
                    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION ?? ''
                }
            })

            stack.addOutputs({
                SiteUrl: site.url
            })
        })
    }
} satisfies SSTConfig
