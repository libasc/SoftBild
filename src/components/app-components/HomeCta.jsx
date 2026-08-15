function HomeCta(){
    return(
        <>
        <section className="cta-section container-fluid py-40 bg-gradient3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <p className="light-small-subtitle">Subscribe To Our Newsletter</p>
                        <p className="mb-0 text-white">Stay updated with the latest trends, insights, and exclusive offers by subscribing to our newsletter. Get valuable content delivered to your inbox!</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="home-cta-form">
                        <label className="form-label text-white">Your Email Address</label>
                        <div className="input-group">
                            <input type="email" className="form-control subscribe-input" placeholder="Enter your e-mail" aria-label="Recipient's username" aria-describedby="subscribe-button" />
                            <button className="btn subscribe-btn1" type="button" id="subscribe-button">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}
export default HomeCta