import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

import Header from "./header"
import '../styles/index.scss'

const Layout = ({ authorImageFluid, children, pageTitle, postAuthor }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container" id="content">
            <h1>{pageTitle}</h1>
            <Row>
                <Col md="8">{children}</Col>
                <Col md="4"><Sidebar author={postAuthor} authorFluid={authorImageFluid}/></Col>
            </Row>
            <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </div>
        <Footer/>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
