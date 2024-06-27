import ReviewCard from "../RatingReview/ReviewCard"

const Reviews = (props) => {
    let index = 1;
    let left = <div style={{ width: '100%' }}></div>
    let right = <div style={{ width: '100%' }}></div>
    let center = <div style={{ width: '100%' }}></div>

    return (
        <>
            {
                props.Reviews.map((e, i) => {
                    if (index === 1) {
                        left = (
                            <ReviewCard {...e} />
                        )
                        index++;
                    }
                    else if (index === 2) {
                        center = (
                            <ReviewCard {...e} />
                        )
                        index++;
                    }
                    else if (index === 3) {
                        right = <ReviewCard {...e} />
                        index = 1;
                        return (
                            <div className="flex mgLeft15 mgRight15 mgBottom10" key={i + Math.random()}>
                                {left} {center} {right}
                            </div>
                        )
                    }
                    if (props.Reviews.length - 1 === i) {
                        return (
                            <div className="flex mgLeft15 mgRight15 mgBottom10" key={i + Math.random()}>
                                {left} {center} {right}
                            </div>
                        )
                    }
                    return null;
                })
            }
        </>
    )
}

export default Reviews