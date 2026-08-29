import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
    <section className='main'>
      {/* <BrowserRouter> */}

        <ScrollToTop />
          <Routes>
            <Route path='/' element={<AppLayout />}>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/Aboutus' element={<About></About>}></Route>
                <Route path='/Services' element={<Services></Services>}></Route>
                <Route path='/OnDemand-Resourse' element={<OnDemandResource></OnDemandResource>}></Route>
                <Route path='/Blog' element={<Blog></Blog>}></Route>
                <Route path='/Portfolio' element={<Portfolio></Portfolio>}></Route>
                <Route path='/Portfolio/:slug' element={<PortfolioDetail />}/>
                <Route path='/Pages' element={<Page></Page>}></Route>
                <Route path='/Contact' element={<Contactus></Contactus>}></Route>

                <Route path='/BlogDetails/:id' element={<BlogDetails></BlogDetails>}></Route>
                <Route path='/EditBlog/:id' element={<Page></Page>}></Route>
                <Route path='/DeleteBlog/:id' element={<Page></Page>}></Route>

                {/* <Route path='/' element={<ResourcePricing></ResourcePricing>}></Route> */}
                <Route path='/ResourcePricing' element={<ResourcePricing />} />
                <Route path="/HireDeveloper" element={<HireDeveloper />}
/>
            </Route>

            <Route path='*' element={<h1>Sorry!, Page not found</h1>}></Route>
          </Routes>
      {/* </BrowserRouter> */}
    </section>

    {/* <Footer></Footer> */}
    </>
  )
}

export default Routing