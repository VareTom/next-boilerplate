import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
