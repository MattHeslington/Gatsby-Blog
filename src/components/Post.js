import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Badge, Card, CardTitle, CardText, CardSubtitle, CardBody} from "reactstrap"
import { slugify } from "../../util/utilityFunctions"

const Post = ({ title, author, slug, date, body, fluid, tags }) => {
    return(
        <Card>
            <Img className="card-image-top" fluid={fluid}/>
            <CardBody>
                <CardTitle>
                    <Link to={slug}>
                        {title}
                    </Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by
                    <span className="text-info"> {author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <ul className="post-tags">
                    {tags.map(tag => (
                        <li key={tag}>
                            <Link to={`/read/${slugify(tag)}`}>
                                <Badge color="primary" className="text-uppercase">{tag}</Badge>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link className="btn btn-outline-primary float-right" to={slug}>Read more</Link>
            </CardBody>
        </Card>
    )
}

export default Post