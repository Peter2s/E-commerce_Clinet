const { Card, CardBody, CardFooter } = require("reactstrap")

const Cards = ({footer, body, style}) => {
    return (
        <Card style={style}>
            <CardBody>
               {body}
            </CardBody>
            <CardFooter>
                {footer}
            </CardFooter>
        </Card>
    )
}

export default Cards;