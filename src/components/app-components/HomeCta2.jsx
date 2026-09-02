import { Link } from "react-router-dom"


function HomeCta2() {
  return (
    <>
    <section className="container-fluid bg-blue1 py-80 bg-cta1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="text-white light-subtitle"><span style={{ fontWeight: 300 }}>Let’s start something</span> <span className="text-gradient1" style={{ fontWeight: 800 }}>great together!!</span></h2>
                        <Link to="/HireDeveloper" className="sf-btn2 text-white">get started</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default HomeCta2