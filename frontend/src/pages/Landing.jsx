import React from 'react'
import PublicHeader from '../components/header/PublicHeader'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Snapshots from '../components/landing/Snapshots'
import Pricing from '../components/landing/Pricing'
import CTA from '../components/landing/CTA'
import Footer from '../components/footer/Footer'

function Landing() {
  return (
    <div>
      <PublicHeader />
      <Hero />
      <Features />
      <Snapshots />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}

export default Landing
