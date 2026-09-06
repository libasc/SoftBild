import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../pages/home/Home'
import About from '../pages/about/About'
import Services from '../pages/services/Services'
import OnDemandResource from '../pages/on-demand-resource/OnDemandResource'
import AppLayout from '../components/layout/AppLayout'
import Blog from '../pages/blog/Blog'
import Page from '../pages/testpage/Page'
import Contactus from '../pages/contact/Contactus'
import BlogDetails from '../pages/blog/BlogDetails'
import Portfolio from '../pages/portfolio/Portfolio'
import PortfolioDetail from '../pages/portfolio/PortfolioDetail'
import ScrollToTop from '../components/ScrollToTop'
import ResourcePricing from '../pages/pricing/ResourcePricing'
import HireDeveloper from '../pages/pricing/HireDeveloper'

function Routing() {
  return (
    <>
      <section className="main">

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<AppLayout />}>

            <Route path="/" element={<Home />} />

            <Route path="/Aboutus" element={<About />} />

            <Route path="/Services" element={<Services />} />

            <Route
              path="/OnDemand-Resourse"
              element={<OnDemandResource />}
            />

            <Route path="/Blog" element={<Blog />} />

            <Route path="/Portfolio" element={<Portfolio />} />

            <Route
              path="/Portfolio/:slug"
              element={<PortfolioDetail />}
            />

            <Route path="/Pages" element={<Page />} />

            <Route path="/Contact" element={<Contactus />} />

            <Route
              path="/BlogDetails/:id"
              element={<BlogDetails />}
            />

            <Route
              path="/EditBlog/:id"
              element={<Page />}
            />

            <Route
              path="/DeleteBlog/:id"
              element={<Page />}
            />

            <Route
              path="/ResourcePricing"
              element={<ResourcePricing />}
            />

            <Route
              path="/HireDeveloper"
              element={<HireDeveloper />}
            />

          </Route>

          <Route
            path="*"
            element={<h1>Sorry!, Page not found</h1>}
          />

        </Routes>

      </section>
    </>
  )
}

export default Routing