import React from 'react';
import url from '../../assets/data/url';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import book from '../../assets/img/book.png';

axios.defaults.withCredentials = true;

class VisitProfileBooklet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ArtistBooklet: []
        }
    }

    componentDidMount = () => {
        this.getArtistBooklet();
    }

    getArtistBooklet = async () => {
        const request = await axios.get(`${url}artistBooklet/get/${this.props.userId}`);
        if (request.data.artistBooklet) {
            this.setState({
                ArtistBooklet: request.data.artistBooklet
            })
        }
    }

    render() {
        let display;

        if (this.state.ArtistBooklet.length > 0) {
            display = (
                <div style={{ display: "flex" }}>
                    <div>
                        <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 0px 20px 20px" }}>
                            <p className="darkGray bold">Chapter List</p>
                            <hr className="mg0" />
                            {this.state.ArtistBooklet.map(e => (
                                <div className="chapterName"><a href={`#${e._id}`}><p className="bolder mg0">{e.Title}</p></a></div>
                            ))
                            }
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        {this.state.ArtistBooklet.map((e, i) => (
                            <div style={{ margin: "20px", marginTop: "0px" }} key={e._id} id={e._id}>
                                <div className="row" style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 2px" }}>
                                    <div className="col-md-6 p0">
                                        <img alt="Booklet Cover" className="bookletCover" src={`${url}artistBooklet/image/${e.CoverImage.ImageId}/${e.CoverImage.FileName}`}
                                            style={{ objectFit: 'cover', width: '100%' }} />
                                    </div>
                                    <div className="col-md-6 p0">
                                        <div className="bookletDetails left-150">
                                            <p><Link to={`/Booklet/${e._id}`} className="blue bolder">{moment(e.createdAt).fromNow()}</Link></p>
                                            <h5 className="darkGray bolder">{e.Title}</h5>
                                            <p className="lightGray bolder">{e.Description}</p>
                                            <br />
                                            <div className="row" style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: '10px' }}>
                                                <p className="col"><Link to={`/Booklet/${e._id}`} className="blue bolder">See Details<i className="fa fa-angle-right" /></Link></p>
                                                <p className="col lightGray bolder alignRight"><i className="fa fa-comment-o" /> 7 comments</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )
        }

        else {
            display = (
                <div style={{ textAlign:"center", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 20px 20px 20px" }}>
                    <p className="darkGray bolder mg0">This user's Art Booklet is empty</p>
                    <img alt="No Booklet" src={book} style={{ width: "150px", margin: "20px" }} />
                    <p className="darkGray bolder">Showcase your amazing talent today by starting a new chapter</p>
                </div>
            )
        }

        return (
            <>
                {display}
            </>
        )
    }

}

export default VisitProfileBooklet