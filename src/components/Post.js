import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Card, CardTitle, CardText, CardSubtitle, CardBody} from "reactstrap"

const Post = ({ title, author, path, date, body, fluid }) => {
    return(
        <Card>
            <Img className="card-image-top" fluid={fluid}/>
            <CardBody>
                <CardTitle>
                    <Link to={path}>
                        {title}
                    </Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by
                    <span className="text-info"> {author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <Link className="btn btn-outline-primary float-right" to={path}>Read more</Link>
            </CardBody>
        </Card>
    )
}

export default Post